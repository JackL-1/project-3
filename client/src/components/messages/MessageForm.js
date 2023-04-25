// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'
import { authenticated } from '../helpers/auth'
import { useParams } from 'react-router-dom'

//! State 



const MessageForm = ({ id }) => {

  const [formFields, setFormFields] = useState({
    text: '',
    itemToSwap: '',

  })
  console.log('ID', id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = confirm('Are you sure you want to offer this trade? Your offer is final once submitted.')
      if (response) {
        window.alert('Your swap request has been submitted.')
        await authenticated.post(`/api/items/${id}/messages`, formFields)
        setFormFields({
          text: '',
          itemToSwap: '',
        })
      } else {
        alert('Your swap request has been cancelled.')
      }
    } catch (err) {
      console.log(err)  
    }

  }
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })

  }


  return (
    <main className='form-page'>
      <Container>
        <Row>
          <Col as="form" md={6} onSubmit={handleSubmit}>
            <h1 className='display-6 text-center'></h1>
            {/*message */}
            <label htmlFor="text">Message</label>
            <input type="text" name="text" placeholder='Insert your message here' value={formFields.text} onChange={handleChange} />
            <br></br>
            <label htmlFor="itemToSwap">Item To Swap Url</label>
            <textarea name="itemToSwap" placeholder='Insert Item Url to be swapped' value={formFields.itemToSwap} onChange={handleChange} ></textarea>
            <div className="btnCenter">
              <button className="submitbtn">Submit</button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  )

}
export default MessageForm