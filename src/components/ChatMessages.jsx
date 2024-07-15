import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatMessages.css';

const ChatMessages = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
        if (response.data.status === "success" && Array.isArray(response.data.data)) {
          setMessages(response.data.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error loading messages: {error}</div>;
  }

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <div key={message.id} className="message-item">
          <p><strong>{message.sender.name || 'Unknown'}:</strong> {message.message}</p>
          <p className="message-timestamp">{new Date(message.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
