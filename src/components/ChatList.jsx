import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatList.css';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1');
        if (response.data.status === "success") {
          setChats(response.data.data.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return <div>Loading chats...</div>;
  }

  if (error) {
    return <div>Error loading chats: {error}</div>;
  }

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => onSelectChat(chat)}
        >
          <p><strong>{chat.creator.name || 'Unknown'}</strong></p>
          <p>{chat.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
