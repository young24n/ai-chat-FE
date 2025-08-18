import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import { LoaderCircle } from 'lucide-react';
import type { ChatAreaProps } from '../types';

const ChatArea = ({ messages, sendMessage, isLoading, settings }: ChatAreaProps) => {
  const isDark = settings.theme === 'dark';

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <select className={`text-lg text-grey-500 ${isDark ? 'text-gray-400' : 'text-gray-500'} `} name='model'>
            <option value="model1">model 1</option>
            <option value="model2">model 2</option>
            <option value="model3">model 3</option>
          </select>
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {
          messages.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className={`rounded-full p-4 mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="w-8 h-8">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p className="text-lg font-medium">무엇을 도와드릴까요?</p>
                <p className="text-sm">궁금한 것을 물어보세요</p>
                {!settings.apiKey ? 
                <p className="mt-4 text-sm text-red-600">
                  시작 전 제공받은 키를 설정에서 입력하세요
                </p> : (
                <p className="mt-4 text-sm text-green-600">
                  키가 확인되었습니다
                </p>
              )}
              </div>
            )
            : messages.map(message => (
              <ChatMessage key={message.id} message={message} settings={settings} />
            ))
        }
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <LoaderCircle className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}
      </div>
      <div className={`p-5 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <ChatInput sendMessage={sendMessage} isLoading={isLoading} settings={settings} />
      </div>
    </div>
  );
};

export default ChatArea;