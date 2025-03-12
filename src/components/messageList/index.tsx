import React from 'react';

import { Message } from '../../models/message';

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className='overflow-y-auto' style={{maxHeight: '70vh'}}>
            {messages.map((msg) => (
                <div key={msg.id} className='d-flex align-items-center mb-2'>
                    {msg.photoURL && (
                        <img
                            src={msg.photoURL}
                            alt="profile avater"
                            className="rounded-circle me-2"
                            style={{ width: '40px', height: '40px' }}
                        />
                    )}
                    <div>
                        <p><strong>{msg.userName || "Anonymous"}</strong>: {msg.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
