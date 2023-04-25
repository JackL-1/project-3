import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Custom functions
import { authenticated, isAuthenticated } from '../helpers/auth'

// Custom Components
import ItemForm from './ItemForm'

const ItemNew = () => {

  // ! Location variables
  const navigate = useNavigate()
  
  // ! State
  const [ formFields, setFormFields ] = useState({
    title: '',
    category: '',
    description: '',
    condition: '',
    swapValue: '',
    image: '',
  })

  const [ error, setError ] = useState('')

  // ! On Mount
  useEffect(() => {
    !isAuthenticated() && navigate('/login')
  }, [navigate])

  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await authenticated.post('/api/items', formFields)
      navigate(`/items/${data._id}`)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }

  // ! JSX
  return (
    <main className="form-page">
      <ItemForm 
        title="Add Item To Swap"
        formFields={formFields}
        setFormFields={setFormFields}
        error={error}
        setError={setError}
        handleSubmit={handleSubmit} />
    </main>
  )
}

export default ItemNew