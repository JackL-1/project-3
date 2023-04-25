//!React
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//!Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import Spinner from './Spinner.js'
import Error from './Error.js'
import haglLogo from '../images/HAGLLOGO.png'
import Hero from './Hero.js'

const Home = () => {


  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/items') // * <-- replace with your endpoint
        setItems(data.sort((a, b) => a.swapValue < b.swapValue ? 1 : -1))
      } catch (err) {
        console.log(err.message)
        setError(err.message)
      }
    }
    getData()
    console.log(items)
  }, [])

  return (
    <>
      <div>
        <Col xs="12" className="hero">
          <img src={haglLogo} className="logo" alt="hagl logo"></img>
          {<Hero />}
        </Col>
      </div>
      <Container>
        <Row>
          {items.length > 0 ?
            items.map(item => {
              const { _id, title, swapValue, image, owner, borough } = item

              return (
                <Col key={_id} lg="4" sm="12" className="item">
                  <Link to={`/items/${_id}`}>
                    <Card>
                      <div style={{ backgroundImage: `url('${image}')` }} className="thumbnail"></div>
                      <Card.Body>
                        <Card.Title className="card-title">{title}</Card.Title>
                        <Card.Subtitle>Swap value: £{swapValue}</Card.Subtitle>
                        <Card.Text>
                          <p>{owner.username}<br></br>{owner.location}, {owner.borough}</p>
                        </Card.Text>
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

        </Row>
      </Container>
    </>

  )


}

export default Home