import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Person from './Components/Person'
import PersonForm from './Components/PersonForm'
import PerService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNumber]=useState('')
  const [filter, showFiltered] = useState('')

  useEffect(() => {
    PerService
    .getAllContacts()
    .then((allPersons) => {
        setPersons(allPersons);
    })
}, []);

console.log('rendered', persons.length, 'persons')

const addperson = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number:newNumber
    }

    //check for empty fields of name and number
    if(!newName || !newNumber)
    {
      window.alert('Please Fill the Required Fields')
      return
    }

    //check for existing and updating person contact information/details by comparing name
    const existings = persons.find(
      (existingperson) => existingperson.name.toLowerCase() === newName.toLowerCase()
    )
    if(existings)
    {
      const person = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
      const updatedPerson = 
      {
         ...person, 
         number: newNumber 
      }
      const { id } = person;

      const UpdateAlert = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if(UpdateAlert)//Now update after confirmation
      {
          PerService
          .updatecontact(id, updatedPerson)
          .then((PersonData) => {
              //Update Person contact details
              setPersons(
                  persons.map((person) =>
                      person.id !== id ? person : PersonData
                  )
              )
          })
          .catch(console.log("Updated Contact Details/Information"))
      }
      setNewName("")
      setNumber("")
      return
  }
  //create a new Contact
    PerService
    .createContact(PersonObject)
    .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName('')
        setNumber('')
    })
    .catch(console.log("Added a new contact"))
  }
//delete a contact
const deleteperson=(id)=>
{
  const selectedperson = persons.find((p) => p.id === id);
  const DeleteAlert = window.confirm(`Delete ${selectedperson.name}?`);
  if(DeleteAlert)//delete after confirmation using id
  {
      PerService
      .removecontact(id)
      .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons)
      })
      .catch(console.log("Deleted "))
  }
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
      <Filter 
      filter={filter} 
      handleFilter={handleFilter}/>

      <h1>add a new</h1>
      <PersonForm 
      addperson={addperson}
      newName={newName} 
      newNumber={newNumber}
      handleChange={handleChange} 
      handleNumChange={handleNumChange}/>

      <h1>Numbers</h1>
      {/* filter the contacts based on filter search  */}
      {
      persons.filter(person => {
      if (!filter) return true // if filter is empty then all the contacts are displayed
      else if (person.name.toLowerCase().includes(filter.toLowerCase())) //matching contacts will be displayed
      return true
      else
      return false // nothing displays as match is not found
      }).map(person => 
      <Person  
       key={person.id} 
       persons={person} 
       deleteperson={deleteperson} />
    )}
    </div>
  )
}
export default App