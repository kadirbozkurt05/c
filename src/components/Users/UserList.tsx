import React from 'react';
import { User } from '../../types';
import { Mail, UserCog } from 'lucide-react';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onRoleChange: (userId: string, newRole: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, isLoading, onRoleChange }) => {
  if (isLoading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {users.map((user) => (
        <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-500" size={20} />
                <span className="text-gray-800">{user.email}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <UserCog className="text-gray-500" size={20} />
              <select
                value={user.role}
                onChange={(e) => onRoleChange(user._id, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="user">Öğrenci</option>
                <option value="teacher">Öğretmen</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;