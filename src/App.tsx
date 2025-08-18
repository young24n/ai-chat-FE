import { useEffect, useState } from 'react';
import "./App.css";

import Sidebar from './components/Sidebar';
import ChatArea from './pages/ChatArea';
import SettingsModal from './components/SettingsModal';
import { Route, Routes } from 'react-router-dom';
import type { Message, Settings } from './types';
import axios from 'axios';

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const savedSettings = localStorage.getItem('settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // theme과 apiKey가 모두 있는지 확인
        if (parsedSettings.theme && typeof parsedSettings.apiKey !== 'undefined') {
          return parsedSettings;
        }
      }
    } catch (error) {
      console.error("Failed to parse settings from localStorage", error);
    }
    // 기본값
    return { theme: 'light', apiKey: '' };
  });

 useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 데이터를 가져옵니다.
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data');
        setMessages(response.data); // 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error('데이터 요청 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);
  
  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  
  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // 임시형태 추후 API 구현 후 변경 예정
  const sendMessage = (text: string) => {
    setMessages(prev => [...prev, { id: 123, sender: 'user', content: text }]);
  };

  return (
    <div className={`flex h-screen ${settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar openSettings={openSettings} settings={settings} clearMessages={clearMessages} />
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