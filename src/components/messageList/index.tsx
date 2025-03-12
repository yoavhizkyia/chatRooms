import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export interface Message {
    id: string;
    text: string;
    createdAt: firebase.firestore.Timestamp;
    userName: string;
    photoURL?: string;
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div>
            {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    {msg.photoURL && (
                        <img
                            src={msg.photoURL}
                            alt="profile avater"
                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }}
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
