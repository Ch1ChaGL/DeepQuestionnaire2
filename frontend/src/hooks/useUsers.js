import { useMemo } from 'react';

export const useUsers = (users, query) => {
  const searchQuery = query.toLowerCase().trim();

  const FilteredUsers = useMemo(() => {
    return users.filter(user => {
      const UserId = (user.UserId + '').toLowerCase();
      const FullName = user.FullName.toLowerCase();
      const Email = user.Email.toLowerCase();
      return (
        UserId.includes(searchQuery) ||
        FullName.includes(searchQuery) ||
        Email.includes(searchQuery)
      );
    });
  }, [query, users]);

  return FilteredUsers;
};
