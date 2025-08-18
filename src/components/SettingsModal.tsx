import { useState } from 'react';
import { XIcon, SunIcon, KeyIcon } from 'lucide-react';
import type { SettingsModalProps, Settings } from '../types';
const SettingsModal = ({ settings, updateSettings, closeSettings }: SettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState<Settings>(settings);
  const handleThemeChange = (value: Settings['theme']) => {
    setLocalSettings((prev) => ({
      ...prev,
      theme: value,
    }))
  }
  const handleApiKeyChange = (value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      apiKey: value,
    }))
  }
  const handleSave = () => {
    updateSettings(localSettings);
    closeSettings();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl w-96 max-w-[90vw] ${localSettings.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">설정</h2>
          <button
            onClick={closeSettings}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center mb-3">
              <SunIcon className="w-5 h-5 mr-2" />
              <h3 className="font-medium">테마</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={localSettings.theme === 'light'}
                  onChange={() => handleThemeChange('light')}
                  className="mr-2"
                />
                <span>라이트 모드</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={localSettings.theme === 'dark'}
                  onChange={() => handleThemeChange('dark')}
                  className="mr-2"
                />
                <span className="flex items-center">다크 모드</span>
              </label>
            </div>
          </div>
          {/* API Key Settings */}
          <div>
            <div className="flex items-center mb-3">
              <KeyIcon className="w-5 h-5 mr-2" />
              <h3 className="font-medium">API 키</h3>
            </div>
            <div className="relative">
              <input
                type="password"
                id="apiKey"
                value={localSettings.apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="API 키를 입력하세요"
                className={`block w-full rounded-md border p-2 ${localSettings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:outline-none`}
              />
              <p
                className={`mt-1 text-sm ${localSettings.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}
              >
                API 키는 안전하게 브라우저에 저장됩니다.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={closeSettings}
            className={`px-4 py-2 rounded ${localSettings.theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;
