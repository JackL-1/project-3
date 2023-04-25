import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
import MessageForm from '../messages/MessageForm.js'
import { userIsOwner, authenticated, isAuthenticated } from '../helpers/auth.js'

const ItemPage = () => {
  console.log('itempage')
  const [item, setItem] = useState(null)
  const { id } = useParams()

  const navigate = useNavigate()

  console.log('TEST USER', userIsOwner(item))

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/items/${id}`)
      console.log('RESPONSE', data)
      setItem(data)
    }

    getData()
  }, [id])

  if (!item) {
    return <p>Loading...</p>
  }

  const { title, image, description, swapValue, condition, location, owner } = item

  const handleDelete = async () => {
    try {
      console.log('deleted')
      await authenticated.delete(`/api/items/${id}`)
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Container>
        <Row className="item-row">
          <Col className='titleLocation'>
            <h1>{title}</h1>
          </Col>
        </Row>
        <Row className="imageInfoRow">
          <Col md={6}>
            <div style={{ backgroundImage: `url('${image}')` }} className="image-pic"></div>
          </Col>
          <Col md={6} className='itemInfo'>
            <div className='itemInfoText'>
              <h3><span>Location:</span></h3> <p>{owner.location} , {owner.borough}</p>
              <h3><span>Condition:</span></h3> <p>{condition}</p>
              <h3><span>Approximate Value:</span></h3> <p>£{swapValue}</p>
              <h3><span>Owner:</span></h3>  <p> <Link to = {`/profile/${owner._id}`} >{owner.username}</Link> </p>
            </div>
            {userIsOwner(item) && <div><Link to={`/items/${id}/edit`} className='editItem'>Edit Item</Link></div>}
            {userIsOwner(item) && <div><Link className='deleteItem' onClick={handleDelete}>Delete Item</Link></div>}
          </Col>
          <Row className='description'>
            <Col>
              <div>
                <span>Description</span><br />
                <p>{description}</p>
              </div>
            </Col>
          </Row>
          {!userIsOwner(item) && isAuthenticated() && <MessageForm id = {id}  />}
          
        </Row>
      </Container>
    </>
  )
}

export default ItemPage