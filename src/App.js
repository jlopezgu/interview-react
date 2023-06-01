import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, ListGroup, Table } from 'react-bootstrap'

/* Webapp
 Name - Textbox
 BDay - Date-picker
 Gender - Dropdown
 Hobbies list - Dynamicly add and delete
 Checkbox?
*/

const ModalForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('Male')
  const [birthday, setBirthday] = useState('')
  const [hobby, setHobby] = useState('')
  const [hobbies, setHobbies] = useState([])

  const genders = ['Male', 'Female', 'Other']

  const checkValidity = (name, birthday) => {
    return !!name && !!birthday
  };

  const isValid = checkValidity(name, birthday)

  const onModalSubmit = (e) => {
    e.preventDefault()
    onSubmit({name:name, gender:gender, birthday:birthday, hobbies:hobbies})
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && hobby != ''){
      setHobbies(arr => [...arr, hobby])
      setHobby('')
      e.preventDefault()
    }
  }

  const remove = e => {
    const id = e.target.id
    setHobbies(hobbies.filter(item => item !== id))
  }

  return (
    <Form onSubmit={onModalSubmit}>
      <Form.Group as={Row} className='mb-3' controlId='name'>
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type='text' placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className='mb-3' controlId='gender'>
        <Form.Label column sm={2}>
          Gender
        </Form.Label>
        <Col sm={10}>
          <Form.Control as='select' value={gender} onChange={(e) => setGender(e.target.value)}>
            {genders.map((gender) => <option value={gender} key={gender}>{gender}</option>)}
         </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className='mb-3' controlId='birthday'>
        <Form.Label column sm={2}>
          Birthday
        </Form.Label>
        <Col sm={10}>
          <Form.Control type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className='mb-3' controlId='hobby'>
        <Form.Label column sm={2}>
          Hobbies
        </Form.Label>
        <Col sm={10}>
          <Form.Control type='text' placeholder='Press enter to add hobby' value={hobby} onChange={(e) => setHobby(e.target.value)} onKeyPress={handleKeyPress}/>
        </Col>
      </Form.Group>

      {hobbies&&
        <Form.Group as={Row} className='mb-3' controlId='hobbies'>
        <Form.Label column sm={2}></Form.Label>
        <Col sm={10}>
          <ListGroup as='ol' numbered>
            {hobbies.map((item, index) => <ListGroup.Item key={"li-" + index} as='li'>{item}<Button variant='danger' onClick={remove} id={item}>Delete</Button> </ListGroup.Item>)}
          </ListGroup>
        </Col>
      </Form.Group>
      }

      <Col sm={{ span: 10, offset: 2 }}>
        <Button variant='primary' type='submit' disabled={!isValid}> Submit </Button>
      </Col>
    </Form>
  )
}


const DataTable = ({ persons, removePerson }) => {

  return <>
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Birthday</th>
          <th>Hobbies</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{person.name}</td>
            <td>{person.gender}</td>
            <td>{person.birthday}</td>
            <td>{person.hobbies.join()}</td>
            <td>
              <Button id={person.name} variant='danger' onClick={removePerson}>X</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
}

export default function App() {
  const [show, setShow] = useState(false)
  const [persons, setPersons] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onModalFormSubmit = (person) => {
    handleClose()
    setPersons(arr => [...arr, person])
  }

  const removePerson = (e) => {
    const id = e.target.id
    setPersons(persons.filter(item => item.name !== id))
  }

  return (
    <>
      {persons.length > 0 && <DataTable persons={persons} removePerson={removePerson}/>}
      <Button variant='primary' onClick={handleShow}>
        Add Person
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Person Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm onSubmit={onModalFormSubmit} />
        </Modal.Body>
      </Modal>
    </>
  )
}