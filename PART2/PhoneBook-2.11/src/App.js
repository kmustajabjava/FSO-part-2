import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Person from './Components/Person'
import PersonForm from './Components/PersonForm'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNumber]=useState('')
  const [filter, showFiltered] = useState('')
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addperson = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number:newNumber,
      id: persons.length + 1
    }
    console.log('Persons ',persons);
    (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) ? window.alert(`${newName} is already added to phonebook`) 
    : setPersons(persons.concat(PersonObject))
    setNewName('')
    setNumber('')
    /* in simple way: 
    if (persons.find(person => person.name === newName))
    {
      window.alert(`${newName} is already added to phonebook`)}
    else{
    setPersons(persons.concat(PersonObject))
    setNewName('')}*/
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNumber(event.target.value)
  }
  const handleFilter = (event) => {
    showFiltered(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h1>add a new</h1>
      <PersonForm 
      addperson={addperson}
      newName={newName} 
      newNumber={newNumber}
      handleChange={handleChange} 
      handleNumChange={handleNumChange}/>
      <h1>Numbers</h1>
      {persons.filter(person => {
      if (!filter) return true
      else if (person.name.toLowerCase().includes(filter.toLowerCase()))
      return true
      else
      return false
    }).map(person => 
      <Person  key={person.id} persons={person} />
    )}
    {/* {persons.map(person => 
      <Person  key={person.id} persons={person} />)} */}
    </div>
  )
}
export default App