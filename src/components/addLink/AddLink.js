import React, {useState} from 'react'
import { Alert, Button,Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './AddLink.css'
import useLocalStorage from '../../hooks/useLocalStorage'
import {Link} from 'react-router-dom';
import uuid from 'react-uuid';
import { VscArrowLeft } from 'react-icons/vsc';

const AddLink = () => {

  const [name, setName] = useState('')
  const [url, setURL] = useState('')
  
  const [links, setLinks] = useLocalStorage('Links', [])

  const [visible, setVisible] = useState(false);
  
  const handleSubmit = (e) => { 
    e.preventDefault();     
    setVisible(true)
    const newLink = { id: uuid(), name: name, url: url, vote: 0, date: Date.now()};      
    setLinks([newLink, ...links])
    setTimeout(() => {
      setVisible(false)
    }, 2000);
  }

  return (
    <div className='add-new-link-wrapper'>

      <Link to='/'>
        <Button color='default' data-testid='return-button'> <VscArrowLeft /> Return to List</Button>
      </Link>

      <h2 data-testid='title'>Add New Link</h2>

      {visible &&
        <Alert color='success'>
          {name} added!
        </Alert>
      }

      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for='linkName' sm={12}>Link Name:</Label>
          <Col sm={12}>
            <Input
              type='text'
              name='name'
              id='linkName'
              value={name}
              placeholder='e.g. Alphabet'
              required={true}
              onChange={(e) => setName(e.target.value)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='linkURL' sm={12}>Link URL:</Label>
          <Col sm={12}>
            <Input 
              type='text'
              name='url'
              id='linkURL'
              value={url}
              placeholder='e.g. http://abc.xyz'
              required={true}
              onChange={(e) => setURL(e.target.value)} />
          </Col>
        </FormGroup>
        <Button data-testid='submit-button' type='submit' value='Submit'>ADD</Button>
      </Form>
    </div>
  )
}

export default AddLink
