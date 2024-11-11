import React from 'react';


const TopMenu: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/lion.webp" alt="Logo da Empresa" className="h-8 mr-2" />
      </div>

    </header>
  );
};

export default TopMenu;
