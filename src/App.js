import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './App.css';

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="header">
        <h1>Telegram Clone</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>
      <div className="content">
        <ChatList onSelectChat={handleSelectChat} />
        {selectedChat && <ChatWindow chat={selectedChat} />}
      </div>
    </div>
  );
};

export default App;
