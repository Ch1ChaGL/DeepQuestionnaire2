import React, { useState } from 'react';
import SearchInput from '../../components/UI/SearchInput';
import { Button } from 'react-bootstrap';
import s from './ApplicationAccess.module.css'
import Card from '../../components/UI/Card';
function ApplicationAccess() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div style={{ padding: 20 }}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Button className={s.addButton}>Добавить</Button>
      <Card/>
    </div>
  );
}

export default ApplicationAccess;
