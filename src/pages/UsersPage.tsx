import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import UserList from '../components/Users/UserList';
import axios from 'axios';
import toast from 'react-hot-toast';

const UsersPage = () => {
  const { token } = useAuth();

  const { data: users, isLoading, refetch } = useQuery(
    'users',
    async () => {
      const response = await axios.get('https://teacher-assistant-server-0a050558c608.herokuapp.com/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  );

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axios.put(
        `https://teacher-assistant-server-0a050558c608.herokuapp.com/api/users/${userId}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Kullanıcı rolü güncellendi');
      refetch();
    } catch (error) {
      toast.error('Rol güncellenirken bir hata oluştu');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
      <UserList
        users={users || []}
        isLoading={isLoading}
        onRoleChange={handleRoleChange}
      />
    </div>
  );
};

export default UsersPage;