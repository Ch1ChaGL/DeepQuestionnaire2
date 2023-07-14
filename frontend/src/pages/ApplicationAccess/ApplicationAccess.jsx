import React, { useState, useEffect } from 'react';
import SearchInput from '../../components/UI/SearchInput';
import { Button, Container } from 'react-bootstrap';
import s from './ApplicationAccess.module.css';
import Card from './Card';
import { getUsers } from '../../API/userApi';
import AddUserForm from '../../components/AdminPage/AddUserForm';
function ApplicationAccess() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const user = await getUsers();
    console.log(user);
    setUsers(user);
  };
  return (
    <div
      className={s.container}
      style={{
        padding: 20,
      }}
    >
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Button className={s.addButton} onClick={() => setShowAddForm(true)}>
        Добавить
      </Button>
      <AddUserForm show={showAddForm} setShow={setShowAddForm} setUsers={setUsers}/>
      <div style={{ display: 'grid' }}>
        {users.map(user => {
          return <Card user={user} key={user.UserId} setUsers={setUsers} />;
        })}
      </div>
    </div>
  );
}

export default ApplicationAccess;
