"use client";
import React, { useState } from "react";
import ShareCodeInput from "./ShareCodeInput";
import UserTextInput from "./UserTextInput";

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    shareCode: "",
    userInput: "",
  });
  const [isShared, setIsShared] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Generate a new share code
    const newShareCode = generateShareCode();

    // Update formData with the new share code
    setFormData((prevData) => ({
      ...prevData,
      shareCode: newShareCode,
    }));

    setIsShared(true);

    // Here you would typically send the data to your backend
    console.log({ ...formData, shareCode: newShareCode });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center m-24"
    >
      <ShareCodeInput shareCode={formData.shareCode} isShared={isShared} />
      <UserTextInput
        value={formData.userInput}
        onChange={handleChange}
        isShared={isShared}
      />
      <button
        className={`button ${
          formData.userInput === "" || isShared ? "button-inactive" : ""
        }`}
        type="submit"
        disabled={formData.userInput === "" || isShared}
      >
        {isShared ? "Shared" : "Share"}
      </button>
      {isShared && (
        <p className="text-green-600 mt-2">Text shared successfully!</p>
      )}
    </form>
  );
};

function generateShareCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

export default Form;
