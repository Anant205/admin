

import React from 'react';
import { Search, User } from 'lucide-react';

const Header = ({ searchTerm, onSearch }) => { 
  const handleSearchChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your business today.</p>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search trips, users, bookings..."
            value={searchTerm || ''}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">
            
          </div>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
