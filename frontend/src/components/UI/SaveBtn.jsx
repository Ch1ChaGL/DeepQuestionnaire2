import React from 'react';
import { Button } from 'react-bootstrap';
import { getReportOnExcel } from '../../API/reportApi';
function SaveBtn({ text, checkedReports }) {
  const ids = Object.keys(checkedReports).reduce((acc, reportId) => {
    if (checkedReports[reportId]) {
      acc.push(parseInt(reportId));
      return acc;
    }
    return acc;
  }, []);

  console.log('ids', ids);
  const saveExcel = async () => {
    await getReportOnExcel(ids);
  };

  return <Button onClick={saveExcel}>{text}</Button>;
}

export default SaveBtn;
