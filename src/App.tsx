import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import ChatRoomList from './components/chatRoomList';
import ChatRoom from './components/chatRoom';
import ProfilePictureUpload from './components/profilePicture';
import SignIn from './components/auth';
import { auth } from './config/firebase';

const App: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="container">
      <h1>Firebase Chat App</h1>
      {!selectedRoom ? (
        <>
          <ProfilePictureUpload />
          <ChatRoomList selectRoom={setSelectedRoom} />
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedRoom(null)}>Back to Rooms</button>
          <ChatRoom room={selectedRoom} />
        </div>
      )}
    </div>
  );
};

export default App;
