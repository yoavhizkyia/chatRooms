import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db, auth } from '../../config/firebase';
import { CHAT_INPUT_PLACEHOLDER, SEND } from '../../models/contants';

interface MessageInputProps {
    room: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ room }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() === '') return;

        try {
            await addDoc(collection(db, 'chatrooms', room, 'messages'), {
                text: message,
                createdAt: serverTimestamp(),
                userName: auth.currentUser ? auth.currentUser.displayName : 'Anonymous',
                photoURL: auth.currentUser ? auth.currentUser.photoURL : null,
            });
            setMessage('');
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    return (
        <form onSubmit={sendMessage}>
            <input
                style={{width: '90%'}}
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={CHAT_INPUT_PLACEHOLDER}
            />
            <button type="submit">{SEND}</button>
        </form>
    );
};

export default MessageInput;
