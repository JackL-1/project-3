import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { authenticated, getPayload, getToken, isAuthenticated, userIsOwner } from './helpers/auth'

import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import Spinner from './Spinner.js'
import Error from './Error.js'
import NavBar from './NavBar'



const IndividualProfile = () => {

  const navigate = useNavigate()

  const { profileId } = useParams()
  console.log(profileId)
  const [ownerInfo, setOwnerInfo] = useState(null)
  const [averageRating, setAverageRating] = useState('')
  const [item, setItem] = useState([])
  let count = 1
  const [rating, setRating] = useState(1)

  useEffect(() => {
    const getInfo = async () => {
      try {
        console.log('Onwer', profileId)
        console.log('PAYLOAD', getPayload())
        const { data } = await authenticated.get(`/api/profile/${profileId}`)
        //http://localhost:3000/profile/6425b34a05da630d0cbb1fc5
        console.log('response', data)
        setOwnerInfo(data)
        const ratings = data.ratings
        const sumRatings = ratings.reduce((acc, rating) => {
          return acc + rating.rating
        }, 0)

        const averageRating = parseFloat((sumRatings / ratings.length).toFixed(2))
        setAverageRating(averageRating)
        console.log('OwnerInfo', ownerInfo)
      } catch (err) {
        console.log(err.message)
        setError(err.message)
      }
    }
    getInfo()
  }, [])

  const [error, setError] = useState('')


  const [selectedOption, setSelectedOption] = useState('')



  const handleSubmit = async () => {
    await authenticated.post(`/api/users/${profileId}/ratings`, { rating: selectedOption })

    setRating(count++)

    console.log('SUCCESS ratingSent')
    console.log(ownerInfo.rating)

    const ratings = ownerInfo.ratings
    const sumRatings = ratings.reduce((acc, rating) => {
      return acc + rating.rating
    }, 0)

    const averageRating = parseFloat((sumRatings / ratings.length).toFixed(2))
    setAverageRating(averageRating)
    location.reload()
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  console.log('OwnerInfo', ownerInfo)
  return (

    <Container className="profile-container">

      {ownerInfo &&
        <Row>
          <Col xs="12" className="welcome">
            <h1> <span> {ownerInfo.username} </span></h1>
            <h2>Leave a Rating</h2>
            <div>
              <select className='reviewDropdown ' value={selectedOption} onChange={handleSelectChange} onSubmit={handleSubmit} required>
                <option value=""></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button className='reviewDropdown ' onClick={handleSubmit}> submit </button>
            </div>
            <h2>{ownerInfo.location}, {ownerInfo.borough}</h2>
            <h3> <span> Average rating: {averageRating || 'No ratings for the user'}</span></h3>
            <h2>Listed items:</h2>

          </Col>

          <Col className="item-container-profile" lg="7">

            {ownerInfo.items ?
              ownerInfo.items.map(things => {
                return (
                  <Col key={things._id} lg="3" sm="12" className="item-card-profile">
                    <Link to={`/items/${things._id}`}>
                      <Card>
                        <div style={{ backgroundImage: `url('${things.image}')` }} className="profile-thumbnail"></div>
                        <Card.Body>
                          <Card.Title>{things.title}</Card.Title>
                          <Card.Text>Swap value: £{things.swapValue}</Card.Text>
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

        </Row>}

    </Container>

  )

}

export default IndividualProfile