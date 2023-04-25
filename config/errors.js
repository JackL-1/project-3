
//401
export class Unauthorized extends Error{
  constructor(message = 'Unauthorized'){
    super(message)
    this.name = 'UnauthorizedError'
    this.status = 401
  }
}

//404
export class NotFound extends Error{
  constructor(message = 'Resource Not Found'){
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
  }
}

export const sendError = (err, res) => {
  console.log('MESSAGE ->', err)
  if (err.status) return res.status(err.status).json({ message: err.message })
  return res.status(422).json({ message: err.message })
}