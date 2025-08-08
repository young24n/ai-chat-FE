import { useState } from 'react';
import "./App.css";

import Sidebar from './components/Sidebar';
import ChatArea from './pages/ChatArea';
import SettingsModal from './components/SettingsModal';
import { Route, Routes } from 'react-router-dom';

export function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
  });

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  const updateSettings = (newSettings: typeof settings) => setSettings(newSettings);

  const sendMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', content: text }]);
  };

  return (
    <div className={`flex h-screen ${settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar openSettings={openSettings} settings={settings}/>
      <Routes>
        <Route path="/" element={
          <ChatArea
            messages={messages}
            sendMessage={sendMessage}
            settings={settings}
            isLoading={isLoading}
          />
        } />
      </Routes>
      {isSettingsOpen && (
        <SettingsModal 
          settings={settings} 
          updateSettings={updateSettings} 
          closeSettings={closeSettings}
        />
      )}
    </div>
  );
}

export default App;