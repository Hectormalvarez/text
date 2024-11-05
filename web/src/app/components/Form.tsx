"use client";
import React, { useState } from "react";
import ShareCodeInput from "./ShareCodeInput";
import UserTextInput from "./UserTextInput";

const Form: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [retrieveCode, setRetrieveCode] = useState("");
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
      const response = await fetch("/api/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const handleRetrieve = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/text/${retrieveCode}`);
      if (response.ok) {
        const data = await response.json();
        setUserInput(data.text);
        setIsShared(true);
        setShareCode(retrieveCode);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Text not found");
      }
    } catch (error) {
      setError("An error occurred while retrieving the text.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Share Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Share Text</h2>
          <form onSubmit={handleSubmit}>
            <ShareCodeInput shareCode={shareCode} isShared={isShared} />
            <UserTextInput
              value={userInput}
              onChange={handleChange}
              isShared={isShared}
            />
            <button
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                userInput === "" || isShared
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              type="submit"
              disabled={userInput === "" || isShared || isLoading}
            >
              {isLoading ? "Sharing..." : isShared ? "Shared" : "Share"}
            </button>
            {isShared && (
              <p className="text-green-600 mt-2">Text shared successfully!</p>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>

        {/* Retrieve Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Retrieve Text</h2>
          <form onSubmit={handleRetrieve}>
            <div className="mb-6">
              <label htmlFor="retrieveCode" className="block text-gray-700 font-bold mb-2">
                Enter Share Code:
              </label>
              <input
                type="text"
                id="retrieveCode"
                value={retrieveCode}
                onChange={(e) => setRetrieveCode(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter 6-character code"
                maxLength={6}
              />
            </div>
            <button
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                retrieveCode.length !== 6
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              type="submit"
              disabled={retrieveCode.length !== 6 || isLoading}
            >
              {isLoading ? "Retrieving..." : "Retrieve"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
