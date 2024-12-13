import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export const useWordCount = () => {
  const { token } = useAuth();

  return useQuery(
    'wordCount',
    async () => {
      const response = await axios.get(
        'https://teacher-assistant-server-0a050558c608.herokuapp.com/api/games/words/count',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    }
  );
};