import Item from '../models/items.js'
import { NotFound, Unauthorized, sendError } from '../config/errors.js'

// * POST Message
// Endpoint: /items/:itemId/messages
export const addMessage = async (req, res) => {
  try {
    const { itemId } = req.params
    const item = await Item.findById(itemId)
    if (!item) throw new NotFound('Item Not Found')
    const messageToAdd = { ...req.body, owner: req.loggedInUser._id }
    item.messages.push(messageToAdd)
    console.log('ITEM ->', item)
    await item.save()
    return res.status(201).json(item)
  } catch (err) {
    return sendError(err, res)
  }
}

// * DELETE Message
// Endpoint: /items/:itemId/messages/:messageId
export const deleteMessage = async (req, res) => {
  try {
    const { itemId, messageId } = req.params
    const item = await Item.findById(itemId)
    console.log(item)
    if (!item) throw new NotFound('Message not found')
    const messageToDelete = item.messages.id(messageId)
    if (!messageToDelete) throw new NotFound('Message not found')
    await messageToDelete.deleteOne()
    console.log(item)
    await item.save()

    return res.sendStatus(204)
  } catch (err) {
    return sendError(err, res)
  }
}

export const deleteAllMessages = async (req, res) => {
  try {
    const { itemId } = req.params
    const item = await Item.findById(itemId)
    if (!item) throw new NotFound('Messages not found')
    console.log(item.messages)
    item.messages = []
    await item.save()
    return res.sendStatus(204)
  } catch (err) {
    return sendError(err, res)
  }
}
