import React, { useState, useEffect } from 'react';
import { Form, Alert, InputGroup, Button, ButtonGroup } from 'react-bootstrap';

import BookDataService from '../services/book-services';

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('Available');
  const [flag, setFlag] = useState(true);
  const [msg, setMsg] = useState({ error: false, msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (title === ' ' || author === '') {
      setMsg({ error: true, msg: 'All Fields are Mandatory!!' });
      return;
    }

    const newBook = {
      title,
      author,
      status,
    };

    try {
      if (id !== undefined && id !== '') {
        await BookDataService.updateBook(id, newBook);
        setBookId('');
        setMsg({ error: false, msg: 'Updated Successfully' });
      } else {
        await BookDataService.addBooks(newBook);
        setMsg({ error: false, msg: 'New Book Added Successfully' });
      }
    } catch (err) {
      setMsg({ error: true, msg: err.message });
    }
    setTitle('');
    setAuthor('');
  };

  const editHandler = async () => {
    setMsg('');
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log(docSnap.data());
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMsg({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    if (id !== undefined && id !== '') {
      editHandler();
    }
  }, [id]);

  return (
    <>
      <div className="p-4 box">
        {msg?.msg && (
          <Alert
            variant={msg?.error ? 'danger' : 'success'}
            dismissible
            onClose={() => setMsg('')}
          >
            {msg?.msg}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus('Available');
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus('Not Available');
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
