import React,{ useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// Custom functions
import { authenticated, isAuthenticated, userIsOwner } from '../helpers/auth.js'

// Custom Components
import ItemForm from './ItemForm'

const ItemEdit = () => {

  // ! Location variables
  const navigate = useNavigate()
  const { itemId } = useParams()
  const [ item, setItem ] = useState(null)

  // ! State
  const [ formFields, setFormFields ] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    condition: '',
    swapValue: '',
    image: '',
  })
  const [ error, setError ] = useState('')

  useEffect(() => {
    const getItemInfo = async () => {
      const { data } = await axios.get(`/api/items/${itemId}`)
      console.log('ITEM DATA', data)
      setItem(data)
    }
    getItemInfo()
  }, [itemId])
  

  // ! On Mount

  useEffect(() => {
  

    const getItem = async () => {
      try {
        const { data } = await authenticated.get(`/api/items/${itemId}`)
        if (!isAuthenticated() || !userIsOwner(data)) navigate(`/items/${itemId}`)
        console.log('Not Authenticated', !isAuthenticated())
        console.log('Not Owner', !userIsOwner(data))
        console.log('Item', data)
        setFormFields(data)
      } catch (err) {
        console.log(err)
      }
    }
    getItem()
    

  }, [itemId])

  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authenticated.put(`/api/items/${itemId}`, formFields)
      navigate(`/items/${itemId}`)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }


  return (
    <main className='form-page'>
      <ItemForm 
        formFields={formFields}
        setFormFields={setFormFields}
        error={error}
        setError={setError}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default ItemEdit