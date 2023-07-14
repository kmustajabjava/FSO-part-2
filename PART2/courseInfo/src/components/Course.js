const Heading = ({ coursename }) => {
  console.log(coursename)
    return (
      <h2>
        {coursename}
      </h2>
    )
  }
  const Part = ({ parts }) => {
    console.log(parts)
    return (
      <div>
        {parts.name} {parts.exercises}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const exercises = parts.map((part) => part.exercises)
    const total = exercises.reduce((sum, exercises) => sum + exercises, 0)
    console.log(exercises)
    console.log(total)
    return (
        <strong>Total of {total} exercises</strong>
    )
  }
  
  const Course = ({ course }) => {
    const parts = course.parts
    return (
      <div>
        <Heading coursename={course.name} />
          {
          parts.map(parts =>
            <Part key={parts.id} parts={parts} />)
          }
        <Total parts={parts} />
      </div>
    )
  }

export default Course