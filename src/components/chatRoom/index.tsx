import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import { db } from '../../config/firebase';
import MessageList, { Message } from '../messageList';
import MessageInput from '../messageInput';

interface ChatRoomProps {
    room: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const messagesRef = collection(db, 'chatrooms', room, 'messages');
        const q = query(messagesRef, orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, snapshot => {
            const messagesData: Message[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Message));
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }, [room]);

    return (
        <div>
            <h2>{room} Chat Room</h2>
            <MessageList messages={messages} />
            <MessageInput room={room} />
        </div>
    );
};

export default ChatRoom;
