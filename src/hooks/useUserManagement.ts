import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from './useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://teacher-assistant-server-0a050558c608.herokuapp.com/api';

export const useUserManagement = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const deleteUser = useMutation(
    async (userId: string) => {
      const response = await axios.delete(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        toast.success('Kullanıcı başarıyla silindi');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Kullanıcı silinirken bir hata oluştu';
        toast.error(message);
      }
    }
  );

  const updateUserRole = useMutation(
    async ({ userId, role }: { userId: string; role: string }) => {
      const response = await axios.put(
        `${API_URL}/users/${userId}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        toast.success('Kullanıcı rolü güncellendi');
      },
      onError: () => {
        toast.error('Rol güncellenirken bir hata oluştu');
      }
    }
  );

  return {
    deleteUser,
    updateUserRole
  };
};