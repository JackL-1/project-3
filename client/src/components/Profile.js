import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { authenticated, getPayload, getToken, isAuthenticated, userIsOwner } from './helpers/auth'

import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import Spinner from './Spinner.js'
import Error from './Error.js'
import NavBar from './NavBar'



const Profile = () => {

  const navigate = useNavigate()
  const [notification, setNotification] = useState('')
  console.log('PROFILE PAGE')
  let messagesExist = false

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {


    const getInfo = async () => {
      try {
        console.log('USER INFO', userInfo)
        console.log('PAYLOAD', getPayload())
        const { data } = await authenticated.get('/api/profile')
        console.log('response', data)
        setUserInfo(data)
      } catch (err) {
        console.log(err.message)
        setError(err.message)
      }
    }
    getInfo()
  }, [])

  const [error, setError] = useState('')

  const postNewItem = () => {
    navigate('/items/new')
  }


  return (
    <Container className="profile-container">
      {userInfo &&
        <Row>
          <Col xs="12" className="welcome">
            <h1>Welcome back, <span>{userInfo.username}</span></h1>
            <h2>Listed items:</h2>
          </Col>

          <Col className="item-container-profile" lg="7">

            {userInfo.items ?
              userInfo.items.map(item => {
                const { _id, title, swapValue, image } = item

                return (
                  <Col key={_id} lg="3" sm="12" className="item-card-profile">
                    <Link to={`/items/${_id}`}>
                      <Card>
                        <div style={{ backgroundImage: `url('${image}')` }} className="profile-thumbnail"></div>
                        <Card.Body>
                          <Card.Title>{title}</Card.Title>
                          <Card.Text>Swap value: £{swapValue}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )

              })
              :
              <>
                {error ?
                  <Error error={error} />
                  :
                  <Spinner />}
              </>
            }

          </Col>

          <Col className="right-content">

            <h2>Location: <span>{userInfo.location}</span></h2>
            <h3>Your average rating: <span>{userInfo.averageRating}</span></h3>
            <p>Click an item card to view your listing and make edits.</p>
            <div className="info-wrapper">
              <Button onClick={postNewItem} className="list-item-btn lib">List new item</Button>
            </div>

            <div className="messages-container">
              {userInfo.items.map(item => {
                console.log('Item Message', item.messages)
                
                const itemMessages = item.messages
                console.log('constMessages', itemMessages)
                if (itemMessages.length > 0) {
                  messagesExist = true
                  return itemMessages.map((message, index) => {
                    console.log('logged message', message.text)
                    console.log('messageID', message._id)
                    console.log('item url', message.itemToSwap)
                    const idB = message.itemToSwap.split('/')
                    const swapURL = idB[idB.length - 1]
                    console.log('idb', idB)
                    if (message.text) {
                      return (
                        <div className="message-field" key={`${item.id}-${index}`}>
                          <h4>{item.title}</h4>
                          <p>{message.text}</p>
                          <Link to={message.itemToSwap}>Click here to see my Item! </Link>
                          <Button className="list-item-btn swap-button" onClick={async () => {
                            try {
                              await authenticated.delete(`api/items/${item._id}/messages`)
                              await authenticated.put(`api/trade/${item._id}/${swapURL}`)
                              location.reload()
                              setNotification('Swap Successful!')
                            } catch (err) {
                              console.log(err)
                            }
                          }}>Accept Swap</Button>
                          {notification ? <p>{notification}</p> : null}
                          <Button className="list-item-btn delete-button" onClick={async () => {
                            try {
                              await authenticated.delete(`api/items/${item._id}/messages/${message._id}`)
                              //http://localhost:3000/api/items/6425b34c05da630d0cbb1ff5/messages/6425c6d64b868beb20cfbac8
                              
                              location.reload()
                            } catch (err) {
                              console.log(err.message)
                            }
                          }
                          } >Delete Message</Button>
                        </div>

                      )
                    } else {
                      return null
                    }
                  })
                }
              }
              )}
              {!messagesExist && (<> <p>You have no messages</p> </>)}
            </div>

          </Col>

        </Row>}

    </Container>

  )

}

export default Profile