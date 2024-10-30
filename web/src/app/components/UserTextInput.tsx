import React, { useState } from 'react';

interface UserTextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isShared: boolean;
}

const UserTextInput: React.FC<UserTextInputProps> = ({
  value,
  onChange,
  isShared,
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (isShared && value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="mb-6 w-full">
      <label htmlFor="userInput" className="block text-gray-700 font-bold mb-2">
        Your Input:
      </label>
      <div className="relative">
        <textarea
          id="userInput"
          value={value}
          onChange={onChange}
          readOnly={isShared}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 resize-y ${
            isShared ? 'bg-gray-100' : ''
          }`}
          disabled={isShared}
        />
        {isShared && (
          <div
            onClick={handleClick}
            className="absolute inset-0 cursor-pointer hover:bg-gray-200 opacity-50"
            title="Click to copy"
          />
        )}
      </div>
      {copied && <p className="text-xs text-green-500 mt-1">Copied!</p>}
    </div>
  );
};

export default UserTextInput;
