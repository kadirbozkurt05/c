import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, FileText, GamepadIcon, Users } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard/resources', icon: <FileText size={20} />, label: 'Kaynaklar' },
    { path: '/dashboard/exams', icon: <BookOpen size={20} />, label: 'Sınavlar' },
    { path: '/dashboard/games', icon: <GamepadIcon size={20} />, label: 'Oyunlar' },
    { path: '/dashboard/users', icon: <Users size={20} />, label: 'Kullanıcılar' },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="h-full flex flex-col">
        <div className="flex-1 py-6 flex flex-col">
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;