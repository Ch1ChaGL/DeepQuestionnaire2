import { useMemo, useState, useEffect } from 'react';
import { getReportById } from '../API/reportApi';
export const useSortedReports = (reports, sort) => {
  console.log('Входящие reports', reports);
  const sortedReports = useMemo(() => {
    if (sort === 'oldReports') {
      return reports.sort(
        (a, b) => new Date(a.QuizTime) - new Date(b.QuizTime),
      );
    }
    if (sort === 'newReports') {
      return reports.sort(
        (a, b) => new Date(b.QuizTime) - new Date(a.QuizTime),
      );
    }
    return reports;
  }, [reports, sort]);

  console.log('исходящие', reports);
  return sortedReports;
};

export const useReports = (reports, sort, query) => {
  console.log('я работаю');
  const sortedReports = useSortedReports(reports, sort);
  const searchQuery = query.toLowerCase();
  const sortedAndFilteredReports = useMemo(() => {
    return sortedReports.filter(report => {
      const reportId = (report.ReportId + '').toLowerCase();
      const name = report.RespondentName.toLowerCase();
      const email = report.Email.toLowerCase();
      const phone = report.PhoneNumber.toLowerCase();
      const companyName = report.CompanyName.toLowerCase();
      const jobTitle = report.JobTitle.toLowerCase();

      return (
        reportId.includes(searchQuery) ||
        name.includes(searchQuery) ||
        email.includes(searchQuery) ||
        phone.includes(searchQuery) ||
        companyName.includes(searchQuery) ||
        jobTitle.includes(searchQuery)
      );
    });
  }, [sort, query, sortedReports]);

  return sortedAndFilteredReports;
};

export const useReportsById = id => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const res = useEffect(() => {
    const fetchData = async () => {
      try {
        if (id === 0) return 0;
        const response = await getReportById(id);
        console.log('response', response);
        setReport({
          ...response,
          QuizTime: new Date(response.QuizTime),
          Survey: JSON.parse(response.Survey),
        });
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  if (res === 0) return { report: null, error: null };

  return { report, error };
};
