// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ItemForm = ({ title, formFields, setFormFields, error, setError, handleSubmit }) => {

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  return (
    <Container>
      <Row>
        <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit}>
          <h1 className='display-6 text-center'>{title}</h1>
          {/* Name */}
          <label htmlFor="title">Title</label>
          <input type="text" name="title" placeholder='Title' value={formFields.title} onChange={handleChange} />
          {/* Origin */}
          <label htmlFor="category">Category</label>
          <input type="text" name="category" placeholder='Category' value={formFields.category} onChange={handleChange} />
          {/* Description */}
          <label htmlFor="description">Description</label>
          <textarea name="description" placeholder='Description' value={formFields.description} onChange={handleChange}></textarea>
          {/* Condition */}
          <label htmlFor="condition">Condition</label>
          <textarea name="condition" placeholder='Condition' value={formFields.condition} onChange={handleChange}></textarea>
          {/* Swap Value */}
          <label htmlFor="swapValue">Swap Value</label>
          <textarea name="swapValue" placeholder='Swap Value' value={formFields.swapValue} onChange={handleChange}></textarea>
          {/* Image */}
          <label htmlFor="image">Image</label>
          <input type="text" name="image" placeholder='Image' value={formFields.image} onChange={handleChange} />
          {/* Submit */}
          <div className='btnCenter'>
            <button className="btn mb-4">Submit</button>
          </div>
          {/* Error Display */}
          { error && <p className='text-danger text-center'>{error}</p>}
        </Col>
      </Row>
    </Container>
  )
}

export default ItemForm