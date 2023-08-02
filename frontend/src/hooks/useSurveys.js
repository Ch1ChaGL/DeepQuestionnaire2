import { useMemo } from 'react';

export const useSurveys = (survey, query) => {
  const searchQuery = query.toLowerCase().trim();

  const FilteredUsers = useMemo(() => {
    return survey.filter(survey => {
      const Name = (survey.Name + '').toLowerCase();
      return Name.includes(searchQuery);
    });
  }, [query, survey]);

  return FilteredUsers;
};
