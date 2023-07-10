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

export const getReportOnExcel = async ids => {
  try {
    console.log('ids', ids);
    const response = await $authHost.get('api/report/Excel/Report', { ids: ids });

    // Создание Blob из полученных данных
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Генерация URL для Blob
    const url = URL.createObjectURL(blob);

    // Сохранение файла
    FileSaver.saveAs(url, 'report.xlsx');
  } catch (error) {
    // Обработка ошибок
    console.error(error);
  }
};
