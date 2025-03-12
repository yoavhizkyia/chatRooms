import React, { useState } from 'react';
import { storage, auth } from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const ProfilePictureUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    //TODO: fix the uploadProfile cors error

    const uploadProfilePicture = () => {
        if (!auth.currentUser) {
            setError('User not signed in. Please log in to update your profile picture.');
            return;
        }
        if (!file) {
            setError('No file selected. Please choose a file.');
            return;
        }

        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Optional: Monitor progress here.
            },
            (uploadError) => {
                console.error('Upload error:', uploadError);
                setError('Failed to upload the image.');
            },
            () => {
                getDownloadURL(storageRef)
                    .then((url) => {
                        updateProfile(auth.currentUser!, { photoURL: url })
                            .then(() => {
                                console.log('Profile updated successfully');
                                setError(null);
                            })
                            .catch((updateError) => {
                                console.error('Error updating profile:', updateError);
                                setError('Failed to update profile.');
                            });
                    })
                    .catch((urlError) => {
                        console.error('Error getting download URL:', urlError);
                        setError('Failed to get image URL.');
                    });
            }
        );
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadProfilePicture}>Upload Profile Picture</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ProfilePictureUpload;
