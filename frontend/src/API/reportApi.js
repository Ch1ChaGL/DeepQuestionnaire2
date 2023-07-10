import { $authHost, $host } from './index';
import FileSaver from 'file-saver';

export const createReport = async report => {
  const createdReport = await $authHost.post('api/report', report);
  return createdReport;
};

export const getReports = async searchString => {
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
export const deleteReport = async id => {
  const deletedReport = await $authHost.delete(`api/report/${id}`);
  return deletedReport;
};

export const getReportOnExcel = async (ids) => {
  try {
    console.log('ids', ids);
    const response = await $authHost.post('api/report/Excel/Report', { ids: ids }, { responseType: 'blob' });
    console.log(response);

    // Создание объекта URL для Blob
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Создание ссылки на файл
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.xlsx');

    // Добавление ссылки на страницу
    document.body.appendChild(link);

    // Нажатие на ссылку для скачивания файла
    link.click();

    // Удаление ссылки
    document.body.removeChild(link);
  } catch (error) {
    // Обработка ошибок
    console.error(error);
  }
};
