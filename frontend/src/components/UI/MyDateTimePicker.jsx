import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

function MyDateTimePicker({ initialSurveyData, onDateChange, name }) {
  dayjs.locale('ru');

  console.log('initialSurveyData', initialSurveyData);
  const initialDate = dayjs(initialSurveyData, 'DD.MM.YYYY, HH:mm:ss');
  console.log('initialDate', initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = date => {
    setSelectedDate(date);
    onDateChange(date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
      <MobileDateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
        name={name}
      />
    </LocalizationProvider>
  );
}

export default MyDateTimePicker;
