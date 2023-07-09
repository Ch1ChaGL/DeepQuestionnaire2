import React from 'react';
import { Form } from 'react-bootstrap';
function SearchInput({ searchQuery, setSearchQuery }) {
  return (
      <Form.Group controlId='searchForm'>
        <Form.Control
          type='text'
          placeholder='Введите запрос'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
  );
}

export default SearchInput;
