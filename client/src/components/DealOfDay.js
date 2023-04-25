import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import Spinner from './Spinner.js'
import Error from './Error.js'

const DealOfDay = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/items')

        data.sort((a, b) => a.messages.length < b.messages.length ? 1 : -1)
        setItems(data)
      } catch (err) {
        console.log(err.message)
        setError(err.message)
      }
    }

    getData()
  }, [])

  const filteredItems = items.filter(item => item.messages.length > 0)
  const randomItems = items.filter(item => item.messages.length === 0).sort(() => 0.5 - Math.random()).slice(0, 5)

  return (
    <>
      <Container>
        <Row>
          <Col xs="12">
            <h1 className="display-4 mb-4 text-center">Deals of the day </h1>
          </Col>
        </Row>

        <Row>
          {filteredItems.map(item => {
            const { _id, title, swapValue, image, owner, borough } = item

            return (
              <Col key={_id} lg="4" sm="12" className="item">
                <Link to={`/items/${_id}`}>
                  <Card>
                    <div style={{ backgroundImage: `url('${image}')` }} className="thumbnail"></div>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <Card.Subtitle>Swap value: £{swapValue}</Card.Subtitle>
                      <Card.Text>
                        <p>{owner.username}<br></br>{owner.location}, {borough}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          })}
          {randomItems.map(item => {
            const { _id, title, swapValue, image, owner, borough } = item

            return (
              <Col key={_id} lg="4" sm="12" className="item">
                <Link to={`/items/${_id}`}>
                  <Card>
                    <div style={{ backgroundImage: `url('${image}')` }} className="thumbnail"></div>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <Card.Subtitle>Swap value: £{swapValue}</Card.Subtitle>
                      <Card.Text>
                        <p>{owner.username}<br></br>{owner.location}, {borough}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
}

export default DealOfDay
