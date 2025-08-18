export type Theme = 'light' | 'dark';

export interface Settings {
  theme: 'light' | 'dark';
  apiKey: string;
}

export type Sender = 'user' | 'bot';

export interface Message {
  id: number;
  sender: Sender;
  content: string;
}

// Component prop types
export interface SidebarProps {
  openSettings: () => void;
  settings: Settings;
  clearMessages: () => void;
}

export interface SettingsModalProps {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
  closeSettings: () => void;
}

// sendMessage의 경후 추후 변경예정
export interface ChatAreaProps {
  messages: Message[];
  sendMessage: (text: string) => void;
  isLoading: boolean;
  settings: Settings;
}

export interface ChatMessageProps {
  message: Message;
  settings: Settings;
}

export interface ChatInputProps {
  sendMessage: (text: string) => void;
  isLoading: boolean;
  settings: Settings;
}