import User from '../models/users.js'
import Item from '../models/items.js'
import { sendError, NotFound } from '../config/errors.js'

// * GET LOGGED IN USER'S OWN PROFILE

export const profileView = async (req, res) => {
  try {
    console.log('PROF ROUTE HIT')
    
    console.log('USER ID')

    const profile = await req.loggedInUser.populate('items')

    console.log('PROFILE', profile)

    return res.json(profile)

  } catch (err) {
    sendError(err, res)
  }
}

//* GET A DIFFERENT USER'S PROFILE

export const getSingleProfile = async (req, res) => {
  try {
    console.log('SINGLE ROUTE HIT')

    const { profileId } = req.params

    const profile = await User.findById(profileId)
    console.log('PROFILE', profile)

    if (!profile) throw new NotFound('Profile not found')

    const items = await Item.find()

    const userItems = items.filter(item => {
      if (JSON.stringify(item.owner._id) === JSON.stringify(profile._id) ) return item
    })

    console.log('userItems', userItems)

    const combined = { ...profile._doc, items: userItems }

    console.log('COMBINED', combined)

    delete combined.password

    return res.json(combined)

  } catch (err) {
    sendError(err, res)
  }

}