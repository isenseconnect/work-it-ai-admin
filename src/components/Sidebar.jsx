import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="menu-section">Dashboard</Link>
      <Link to="/tool" className="menu-section">Tool</Link>
      <Link to="/featured" className="menu-section">Data</Link>
      <Link to="/upload-csv" className="menu-section">Tools CSV</Link>
      <Link to="/reports" className="menu-section">Reports</Link>
      <Link to="/faq" className="menu-section">Faq</Link>
      <Link to="/collections" className="menu-section">Collections</Link>
      <Link to="/tags" className="menu-section">Tags</Link>
      <Link to="/users" className="menu-section">Users</Link>
      <Link to="/info" className="menu-section">Footer</Link>
      <Link to="/products" className="menu-section">Products</Link>
      <Link to="/settings" className="menu-section">Settings</Link>
    </div>
  );
};

export default Sidebar;
