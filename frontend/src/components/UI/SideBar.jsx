import React from 'react';
import { Button } from 'react-bootstrap';
import s from './SideBar.module.css'

function SideBar({ items, sortSetters }) {
  return (
    <div className={s.container}>
      {items.map(item => (
        <Button
          variant='secondary'
          className='mb-3'
          onClick={() => sortSetters(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

export default SideBar;
