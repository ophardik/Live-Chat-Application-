import React from 'react';
import './Messages.css';
import Message from './Message';
import useGetRealTimeMessage from '../Hooks/useRealTimeMessages';
import { useSelector } from 'react-redux';
import useGetMessages from '../Hooks/useGetMessages';

const Messages = () => {
    useGetMessages()
       useGetRealTimeMessage(); // Set up real-time messaging

    const { messages } = useSelector(store => store.message);

    if (!messages || messages.length === 0) return <div>No messages</div>;

    return (
        <div className='messages-container'>
            {messages.map((message) => (
                <Message key={message._id} message={message} />
            ))}
        </div>
    );
};

export default Messages;
