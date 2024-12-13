import React from 'react';
import { User as UserIcon, Mail } from 'lucide-react';
import { User } from '../../types';
import UserActions from './UserActions';

interface UserCardProps {
  user: User;
  currentUser: User | null;
  onRoleChange: (userId: string, newRole: string) => void;
  onDeleteClick: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  currentUser,
  onRoleChange,
  onDeleteClick,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <UserIcon className="text-gray-500" size={20} />
            <span className="font-medium text-gray-900">{user.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="text-gray-500" size={20} />
            <span className="text-gray-600">{user.email}</span>
          </div>
        </div>

        <UserActions
          user={user}
          currentUser={currentUser}
          onRoleChange={onRoleChange}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

export default UserCard;