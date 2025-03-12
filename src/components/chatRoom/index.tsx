import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import { db } from '../../config/firebase';
import MessageList from '../messageList';
import MessageInput from '../messageInput';
import { Message } from '../../models/message';

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
        <div className='d-flex flex-column justify-content-between' style={{height:'90%'}}>
            <div>
                <h2 className='d-flex justify-content-center'>{`${room} Chat Room`}</h2>
                <MessageList messages={messages} />
            </div>
            <MessageInput room={room} />
        </div>
    );
};

export default ChatRoom;
