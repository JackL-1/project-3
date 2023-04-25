//! React
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

//!Components
import Home from './components/Home'
import ItemPage from './components/items/ItemPage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ItemNew from './components/items/ItemNew'
import ItemEdit from './components/items/ItemEdit'
import Profile from './components/Profile'
import IndividualProfile from './components/IndividualProfile'
import NavBar from './components/NavBar'
import { getToken } from './components/helpers/auth'
import MessageForm from './components/messages/MessageForm'
import DealOfDay from './components/DealOfDay' 


const App = () => {

  

  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items/:id" element={<ItemPage />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/items/new" element={<ItemNew />} /> 
          <Route path="/items/:itemId/edit" element={<ItemEdit />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:profileId" element={<IndividualProfile/>} />
          <Route path="/sendmessage" element={<MessageForm />} /> 
          <Route path="/dealofday" element={<DealOfDay />} /> 
        </Routes>
      </BrowserRouter>
    </div>

  )

}

export default App
