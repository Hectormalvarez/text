import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200 p-4">
      <div className="container mx-auto flex items-center">
        <Image
          src="/Logo-full.png"
          alt="Text Sharing App Logo"
          width={100}
          height={100}
        />
      </div>
    </header>
  );
};

export default Header;
