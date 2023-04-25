import User from '../models/users.js'
import { sendError, NotFound } from '../config/errors.js'


//! Post rating 
export const addRating = async (req, res) => {
  try {
    const seller = await User.findById(req.params.userId)

    if (!seller) {
      throw new NotFound('Seller not found')
    }
    
    console.log('REQUSER', req.loggedInUser)
    const ratingToAdd = { ...req.body, owner: req.loggedInUser._id }

    seller.ratings.push(ratingToAdd)
    await seller.save()

    return res.status(201).json(seller)
  } catch (err) {
    return sendError(err, res)
  }
}

//! Delete rating 
export const deleteRating = async (req, res) => {
  try {
    const { id, ratingId } = req.params
    const loggedInUserId = req.loggedInUser._id

    const seller = await User.findById(req.params.userId)
    if (!seller) throw new NotFound('Seller Not Found')

    const ratingToDelete = seller.ratings.id(ratingId)
    if (!ratingToDelete) throw new NotFound('Rating Not Found')

    await ratingToDelete.deleteOne()
    await seller.save()

    return res.status(204).json()
  } catch (err) {
    return sendError(err, res)
  }
}

