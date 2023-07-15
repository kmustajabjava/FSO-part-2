import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber,setNumber]=useState('')
  const [filter, showFiltered] = useState('')
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
      <PersonForm addperson={addperson}
      newName={newName} newNumber={newNumber}
      handleChange={handleChange} handleNumChange={handleNumChange}/>
      <h1>Numbers</h1>
      <Person  persons={persons} filter={filter} />
    </div>
  )
}

export default App