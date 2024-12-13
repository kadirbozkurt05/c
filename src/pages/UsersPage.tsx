import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import { useUserSearch } from '../hooks/useUserSearch';
import { useUserManagement } from '../hooks/useUserManagement';
import UserList from '../components/Users/UserList';
import SearchBar from '../components/Users/SearchBar';
import UserStats from '../components/Users/UserStats';
import axios from 'axios';

const UsersPage = () => {
  const { token, user: currentUser } = useAuth();
  const { deleteUser, updateUserRole } = useUserManagement();

  const { data: users = [], isLoading } = useQuery(
    'users',
    async () => {
      const response = await axios.get(
        'https://teacher-assistant-server-0a050558c608.herokuapp.com/api/users',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    }
  );

  const { searchTerm, setSearchTerm, filteredUsers } = useUserSearch(users);

  const handleRoleChange = (userId: string, newRole: string) => {
    updateUserRole.mutate({ userId, role: newRole });
  };

  const handleDelete = (userId: string) => {
    deleteUser.mutate(userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
        <UserStats 
          totalUsers={users.length} 
          filteredUsers={filteredUsers.length} 
        />
      </div>

      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <UserList
        users={filteredUsers}
        isLoading={isLoading}
        onRoleChange={handleRoleChange}
        onDelete={handleDelete}
        currentUser={currentUser}
      />
    </div>
  );
};

export default UsersPage;