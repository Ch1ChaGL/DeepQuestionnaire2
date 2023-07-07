import { $authHost, $host } from './index';

export const createReport = async report => {
  const createdReport = await $authHost.post('api/report', report);
  return createdReport;
};

export const getReports = async (searchString) => {
  console.log('searchString', searchString);
  const getedReports = await $authHost.get(`api/report/?${searchString}`);
  return getedReports.data;
};
export const updateReport = async report => {
  const updatedReport = await $authHost.put('api/report', report);
  return updatedReport;
};
export const getReportById = async id => {
  const getedReport = await $authHost.get(`api/report/${id}`);
  return getedReport.data;
};
export const deleteReport = async (id) => {
  const deletedReport = await $authHost.delete(`api/report/${id}`);
  return deletedReport;
}