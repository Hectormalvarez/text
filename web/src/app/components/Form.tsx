"use client";
import React, { useState } from "react";
import ShareCodeInput from "./ShareCodeInput";
import UserTextInput from "./UserTextInput";

const Form: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); 
    setError(null);

    try {
      const response = await fetch('/api/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setShareCode(data.share_code); 
        setIsShared(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred"); 
      }

    } catch (error) {
      setError("An error occurred while saving the text.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center m-16"
    >
      <ShareCodeInput shareCode={shareCode} isShared={isShared} />
      <UserTextInput
        value={userInput}
        onChange={handleChange}
        isShared={isShared}
      />
      <button
        className={`button ${userInput === "" || isShared ? "button-inactive" : ""
          }`}
        type="submit"
        disabled={userInput === "" || isShared || isLoading}
      >
        {isLoading ? "Sharing..." : isShared ? "Shared" : "Share"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display errors */}
      {isShared && (
        <p className="text-green-600 mt-2">Text shared successfully!</p>
      )}
    </form>
  );
};

export default Form;
