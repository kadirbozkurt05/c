import React, { useState } from 'react';
import { User } from '../../types';
import UserCard from './UserCard';
import DeleteConfirmation from '../common/DeleteConfirmation';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onRoleChange: (userId: string, newRole: string) => void;
  onDelete: (userId: string) => void;
  currentUser: User | null;
}

const UserList: React.FC<UserListProps> = ({
  users,
  isLoading,
  onRoleChange,
  onDelete,
  currentUser
}) => {
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  if (isLoading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (!users.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Henüz kullanıcı bulunmamaktadır.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            currentUser={currentUser}
            onRoleChange={onRoleChange}
            onDeleteClick={setDeleteUserId}
          />
        ))}
      </div>

      <DeleteConfirmation
        isOpen={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onConfirm={() => {
          if (deleteUserId) {
            onDelete(deleteUserId);
            setDeleteUserId(null);
          }
        }}
        title="Kullanıcıyı Sil"
        message="Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      />
    </>
  );
};

export default UserList;