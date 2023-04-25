// * PUT route
import { sendError, NotFound, Unauthorized } from '../config/errors.js'
import Item from '../models/items.js'

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params
    const itemToUpdate = await Item.findById(id)
    if (!itemToUpdate) throw new Error('Record not found')

    if (!itemToUpdate.owner.equals(req.loggedInUser._id)){
      throw new Error('Unauthorised')
    }

    Object.assign(itemToUpdate, req.body)
    await itemToUpdate.save()

    return res.json(itemToUpdate)
  } catch (err) {
    return sendError(err, res)
  }
}


//* INDEX route
// endpoint: /items

export const getItems = async (req, res) => {
  try {
    console.log('GET ROUTE HIT')
    const items = await Item.find().populate('owner')
    return res.json(items)
  } catch (err) {
    sendError(err, res)
  } 
}

//* GET ITEM
// endpoint: /items/:id

export const getSingleItem = async (req, res) => {
  try {
    console.log('GET SINGLE')
    const { id } = req.params
    console.log(id)

    const item = await Item.findById(id).populate('owner')

    if (!item) throw new NotFound('Item not found on database')

    return res.json(item)

  } catch (err) {
    sendError(err, res)
  }
}


//* POST ITEM
// endpoint: /items
export const createItem = async (req, res) => {
  try {
    req.body.owner = req.loggedInUser._id
    const newItem = await Item.create(req.body)
    console.log(newItem)
    return res.status(201).json(newItem)
  } catch (err) {
    sendError(err, res)
  }

}

//* DELETE ROUTE
// Delete route 
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params
    const deletedItem = await Item.findById(id)
    if (!deletedItem) {
      throw new Error('Item not found')
    }
    await Item.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Item deleted' })
  } catch (err) {
    return sendError(err, res)
  }
}

//* SWAP ITEM
//Put request
//endpoint: /trade/:idA/:idB

export const swapItems = async (req, res) => {
  try {

    const { idA, idB } = req.params

    const loggedUser = JSON.stringify(req.loggedInUser._id)
    console.log('LOGGED USER', loggedUser)

    const itemA = await Item.findById(idA)
    const itemB = await Item.findById(idB)
    console.log('ITEM A', itemA)

    const itemAOwner = JSON.stringify(itemA.owner)
    const itemBOwner = JSON.stringify(itemB.owner)
    console.log('ITEM A OWNER', itemAOwner)

    if (loggedUser === itemAOwner) {

      const updatedA = { ...itemA._doc, owner: itemB.owner }
      const updatedB = { ...itemB._doc, owner: itemA.owner }

      console.log('UPDATED A', updatedA)

      Object.assign(itemA, updatedA)
      Object.assign(itemB, updatedB)
      await itemA.save()
      await itemB.save()
  
      return res.status(200).json(itemB)
      
    } else {
      throw new Unauthorized()
    } 
  } catch (err) {
    sendError(err, res)
  }
}
