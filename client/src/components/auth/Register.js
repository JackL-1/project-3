import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import NavBar from '../NavBar.js'

const Register = () => {

  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    username: '',
    location: '',
    borough: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [ error, setError ] = useState('')

  // ! Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register', formFields)
      // Navigate to the login page
      navigate('/login')

    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }
  }

  // ! JSX
  return (
    <main className="form-page">
      <Container>
        <Row>
          {/* This Col is being renderes as a form element as we specified the "as" prop */}
          {/* As this is a form element, we can submit it and listen for the event */}
          <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit}>
            <h1 className='display-6 text-center'>Register</h1>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder='Username' onChange={handleChange} value={formFields.username} />
            {/* Location */}
            <label htmlFor="location">Location</label>
            <input type="text" name="location" placeholder='Location' onChange={handleChange} value={formFields.location} />
            {/* Borough */}
            <label htmlFor="borough">Borough</label>
            <input type="text" name="borough" placeholder='Borough' onChange={handleChange} value={formFields.borough} />
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email} />
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} />
            {/* Password Confirmation */}
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input type="password" name="passwordConfirmation" placeholder='Password Confirmation' onChange={handleChange} value={formFields.passwordConfirmation} />
            {/* Submit */}
            <div className='btnCenter'>
              <button className='btn mb-4'>Register</button>
            </div>
            {/* Error */}
            {error && <p className='text-danger text-center'>{error}</p>}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Register