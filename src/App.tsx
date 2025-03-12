import React from 'react';

import ChatRoomList from './components/chatRoomList';
import ChatRoom from './components/chatRoom';
import ProfilePictureUpload from './components/profilePicture';
import { useAuth } from "./contexts/auth";
import { APP_HEADER, SIGN_IN_WITH_GOOGLE, SIGN_OUT } from './models/contants';

const App: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = React.useState<string | null>(null);
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className='text-center p-4'>
        <h1>{APP_HEADER}</h1>
        <button className='btn-primary rounded' onClick={signInWithGoogle}>{SIGN_IN_WITH_GOOGLE}</button>
      </div>
    );
  }

  return (
    <div className='container-fluid vh-100'>
      <header className='d-flex justify-content-between align-items-center mb-3'>
        <h1>{APP_HEADER}</h1>
        <div>
          <span className='me-3'>Welcome, {user.displayName || "User"}</span>
          <button className='btn-primary rounded' onClick={signOutUser}>{SIGN_OUT}</button>
        </div>
      </header>
      {!selectedRoom ? (
        <>
          {/* <ProfilePictureUpload /> */}
          <ChatRoomList selectRoom={setSelectedRoom} />
        </>
      ) : (
        <div style={{height: '90%'}}>
          <button className='btn-primary rounded' onClick={() => setSelectedRoom(null)}>Back to Rooms</button>
          <ChatRoom room={selectedRoom} />
        </div>
      )}
    </div>
  );
};

export default App;
