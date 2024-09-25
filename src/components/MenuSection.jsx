import React from 'react';

const MenuSection = ({ title, onClick }) => {
  return (
    <div className="menu-section" onClick={onClick}>
      {title}
    </div>
  );
};

export default MenuSection;
