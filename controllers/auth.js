import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { sendError } from '../config/errors.js'

// REGISTER 
export const registerUser = async (req, res) => {
  try {
    console.log('REQ BODY', req.body)
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    return sendError(err, res)
  }
}

// LOGIN 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('REQ.BODY', req.body)
    const userToLogin = await User.findOne({ email: email })
    console.log('userToLogin', userToLogin)
    const userIsValidated = await userToLogin.validatePassword(password)
    if (!userToLogin || !userIsValidated){
      throw new Error()
    }

    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '7d' })
    
    return res.json({ message: `Welcome back, ${userToLogin.username}`, token: token })

  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}
