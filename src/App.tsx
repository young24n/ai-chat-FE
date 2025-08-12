import { useState } from 'react';
import "./App.css";

import Sidebar from './components/Sidebar';
import ChatArea from './pages/ChatArea';
import SettingsModal from './components/SettingsModal';
import { Route, Routes } from 'react-router-dom';
import type { Message, Settings } from './types';

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const savedSettings = localStorage.getItem('settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        if (parsedSettings.theme) {
          return parsedSettings;
        }
      }
    } catch (error) {
      console.error("Failed to parse settings from localStorage", error);
    }
    return { theme: 'light' };
  });

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  
  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  // 임시형태 추후 API 구현 후 변경 예정
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