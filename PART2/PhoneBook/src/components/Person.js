const Person = ({ persons,filter }) => {
    return ( 
      <div>
      {persons.filter(person => {
        if (!filter) return true
        if (person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))
        return true
      }).map(persons => 
       <div key={persons.id}> {persons.name} {persons.number}</div>
      )}</div>
    )
  }
export default Person  