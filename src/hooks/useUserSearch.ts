import { useState, useMemo } from 'react';
import { User } from '../types';

export const useUserSearch = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;

    const searchLower = searchTerm.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  }, [users, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers,
  };
};