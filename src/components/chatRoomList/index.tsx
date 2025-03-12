import React from 'react';

import { CHAT_ROOMS_HEADER, CHAT_ROOMS_LOOKUP } from '../../models/contants';

interface ChatRoomListProps {
  selectRoom: (room: string) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ selectRoom }) => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <h2>{CHAT_ROOMS_HEADER}</h2>
      <ul className="list-unstyled p-0">
        {CHAT_ROOMS_LOOKUP.map((room) => (
          <li className="btn lrg" key={room} onClick={() => selectRoom(room)}>
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
