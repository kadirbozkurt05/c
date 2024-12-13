import React from 'react';
import { User } from '../../types';
import { UserCog, Trash2 } from 'lucide-react';

interface UserActionsProps {
  user: User;
  currentUser: User | null;
  onRoleChange: (userId: string, newRole: string) => void;
  onDeleteClick: (userId: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  user,
  currentUser,
  onRoleChange,
  onDeleteClick,
}) => {
  const isCurrentUser = currentUser?._id === user._id;
  const canDelete = currentUser?.role === 'admin' && !isCurrentUser;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <UserCog className="text-gray-500" size={20} />
        <select
          value={user.role}
          onChange={(e) => onRoleChange(user._id, e.target.value)}
          disabled={isCurrentUser}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="user">Öğrenci</option>
          <option value="teacher">Öğretmen</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {canDelete && (
        <button
          onClick={() => onDeleteClick(user._id)}
          className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-red-50"
          title="Kullanıcıyı Sil"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
};
export default UserActions;