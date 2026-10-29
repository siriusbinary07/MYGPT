import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Chathub from './components/Chathub'
import Loading from './pages/Loading'
import Login from './pages/Login'
import Mycommunity from './pages/Mycommunity'
import Credits from './pages/Credits'
import { assets } from './assets/assets'
import { useAppContext } from './context/AppContext'


const App = () => {
  const {user} = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  if (pathname === '/Loading') return <Loading />
  return (
    <>
    {!isMenuOpen && (
      <button
        aria-label="Open menu"
        className="absolute top-3 left-3 w-8 h-8 p-0 md:hidden not-dark:invert"
        onClick={() => setIsMenuOpen(true)}
      >
        <img src={assets.menu_icon} alt="menu" className="w-full h-full" />
      </button>
    )}
      {user ? (
          <div className='dark:bg-indigo-950 dark:text-yellow-50'>
      <div className= 'flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Routes>
          <Route path='/' element={<Chathub />} />
          <Route path='/Loading' element={<Loading />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Mycommunity' element={<Mycommunity />} />
          <Route path='/Credits' element={<Credits />} />
        </Routes>
      </div>
    </div>
      ) : (
        <div className='bg-linear-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
          <Login />
        </div>
      )}

    
    </>

  )
}

export default App

