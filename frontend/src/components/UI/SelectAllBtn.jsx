import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DeleteReportsBtn from './DeleteReportsBtn';

function SelectAllBtn({
  reports,
  checkedReports,
  setCheckedReports,
  setReports,
}) {
  console.log('рендерю кнопку');
  const [isAllSelected, setIsAllSelected] = useState(false);
  useEffect(() => {
    console.log('Эта ФУНКЦИЯ ОТРАБОТАЛА');
    checkCurrentSelectedReport();
  }, [checkedReports, reports]);
  const handleSelectAll = () => {
    if (isAllSelected) {
      // Отменить выбор всех карточек
      const updatedSelectedCards = { ...checkedReports };
      Object.keys(updatedSelectedCards).forEach(reportId => {
        updatedSelectedCards[reportId] = false;
      });
      setCheckedReports(updatedSelectedCards);
    } else {
      // Выбрать все карточки
      const updatedSelectedCards = { ...checkedReports };
      Object.keys(updatedSelectedCards).forEach(reportId => {
        updatedSelectedCards[reportId] = true;
      });
      setCheckedReports(updatedSelectedCards);
    }
    setIsAllSelected(!isAllSelected);
  };

  const buttonVariant = isAllSelected ? 'danger' : 'success';
  const buttonText = isAllSelected ? 'Отменить все' : 'Выбрать все';

  const checkCurrentSelectedReport = () => {
    // Проверить, есть ли хотя бы один выбранный отчет
    const hasSelectedReports = Object.values(checkedReports).includes(true);
    const hasReports = reports.length > 0;
    setIsAllSelected(hasSelectedReports && hasReports);
  };
  return (
    <>
      <Button
        className='me-2'
        variant={buttonVariant}
        disabled={!reports.length}
        onClick={handleSelectAll}
      >
        {buttonText}
      </Button>
      {isAllSelected ? (
        <DeleteReportsBtn
          setReports={setReports}
          checkedReports={checkedReports}
          setCheckedReports={setCheckedReports}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default SelectAllBtn;
