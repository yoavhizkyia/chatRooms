import React, { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../config/firebase';

const SignIn: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName || 'User'}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <button onClick={signInWithGoogle}>Sign In with Google</button>
            )}
        </div>
    );
};

export default SignIn;
