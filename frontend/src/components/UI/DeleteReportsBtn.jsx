import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteReport } from '../../API/reportApi';
function DeleteReportsBtn({ checkedReports, setReports, setCheckedReports }) {
  console.log('checkedReports', checkedReports);
  console.log('setReports', setReports);
  const deleteSelectedReports = async () => {
    const selectedReports = Object.entries(checkedReports)
      .filter(([reportId, isSelected]) => isSelected)
      .map(([reportId]) => parseInt(reportId));

    // Удаление выбранных отчетов
    await Promise.all(selectedReports.map(reportId => deleteReport(reportId))).catch(err => console.log(`Ошибочка ну и что ${err}`));

    setCheckedReports(prevValue => {
      return Object.keys(prevValue).reduce((updatedCheckedReports, key) => {
        if (!selectedReports.includes(parseInt(key))) {
          updatedCheckedReports[key] = prevValue[key];
        }
        return updatedCheckedReports;
      }, {});
    });

    // Обновление состояния reports без удаленных отчетов
    setReports(prevReports => {
      return prevReports.filter(
        report => !selectedReports.includes(report.ReportId),
      );
    });
  };

  return (
    <Button variant={'danger'} onClick={deleteSelectedReports}>
      Удалить
    </Button>
  );
}

export default DeleteReportsBtn;
