import React from 'react';

interface ChatRoomListProps {
  selectRoom: (room: string) => void;
}

const chatRooms: string[] = ['General', 'Tech Talk', 'Random'];

const ChatRoomList: React.FC<ChatRoomListProps> = ({ selectRoom }) => {
  return (
    <div>
      <h2>Chat Rooms</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room} onClick={() => selectRoom(room)} style={{ cursor: 'pointer' }}>
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
