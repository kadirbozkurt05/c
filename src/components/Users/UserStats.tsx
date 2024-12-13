import React from 'react';

interface UserStatsProps {
  totalUsers: number;
  filteredUsers: number;
}

const UserStats: React.FC<UserStatsProps> = ({ totalUsers, filteredUsers }) => {
  return (
    <div className="flex space-x-4">
      <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
        <span className="font-semibold">{totalUsers}</span> toplam kullanıcı
      </div>
      {totalUsers !== filteredUsers && (
        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full">
          <span className="font-semibold">{filteredUsers}</span> sonuç
        </div>
      )}
    </div>
  );
};

export default UserStats;