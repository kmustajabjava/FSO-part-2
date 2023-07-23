import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App'

axios.get('https://restcountries.com/v3.1/all').then(response => {
  const person = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App person={person} />)
})