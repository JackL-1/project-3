import mongoose from 'mongoose'
import 'dotenv/config'

// !Models
import User from '../models/users.js'
import Item from '../models/items.js'

//! Data
import itemData from './data/items.js'
import userData from './data/users.js'


const seedDatabase = async () => {
  try {

    //Connect to database
    await mongoose.connect(process.env.MONGO_URI, { maxPoolSize: 10 })
    console.log('💎 Database connected.')

    //Drop database
    await Promise.all(Object.values(mongoose.connection.collections).map(async collection => await collection.deleteMany()))
    console.log('👹 Database dropped.')

    //Create default users
    const createdUsers = await User.create(userData)
    //console.log(createdUsers)
    console.log(`😎 ${createdUsers.length} users have been added to the database.`)

    //Assign _id of users to each item as owner field randomly
    const createdItemsWithOwner = itemData.map(item => {
      const random = createdUsers[Math.floor(Math.random() * createdUsers.length)] 
      return { ...item, owner: random._id }
    })

    const createdItems = await Item.create(createdItemsWithOwner)
    //console.log(createdItems)
    console.log(`💫 ${createdItems.length} items have been added to the database.`)

    await mongoose.connection.close()
    console.log('🚫 Connection to the database has been terminated.')


  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
    console.log('🚫 Connection to the database has been terminated.')
  }
}

seedDatabase()