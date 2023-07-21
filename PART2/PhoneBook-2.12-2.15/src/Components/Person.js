const Person = ({persons, deleteperson}) => {
  return ( 
     <div> {persons.name} {persons.number}
     <button onClick={() => deleteperson(persons.id)}> delete </button>
     </div>
  )
}
export default Person  