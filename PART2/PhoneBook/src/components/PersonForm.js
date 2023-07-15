
const PersonForm = ({addperson,newName, newNumber, handleChange, handleNumChange}) => {
    return <div><form onSubmit={addperson}>
    <div>Name:     <input value={newName} onChange={handleChange} /></div>
    <div>Number:   <input value={newNumber} onChange={handleNumChange}/></div>
    <div><button type="submit">add</button></div>
  </form></div>
  }
  export default PersonForm