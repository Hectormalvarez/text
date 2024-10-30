import React, { useState } from "react";

interface ShareCodeInputProps {
  shareCode: string;
  isShared: boolean;
}

const ShareCodeInput: React.FC<ShareCodeInputProps> = ({ shareCode, isShared }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (isShared && shareCode) {
      navigator.clipboard.writeText(shareCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="mb-6 w-full">
      <label htmlFor="shareCode" className="form-label">
        Share Code:
      </label>
      <input
        type="text"
        id="shareCode"
        value={shareCode}
        readOnly
        disabled={!isShared}
        onClick={handleClick}
        className={`share-code-input ${
          isShared && shareCode
            ? 'cursor-pointer hover:bg-gray-100 active:bg-gray-200'
            : 'cursor-not-allowed opacity-50'
        }`}
        title={isShared ? "Click to copy" : "Share your text to enable copying"}
      />
      {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
    </div>
  );
};

export default ShareCodeInput;
