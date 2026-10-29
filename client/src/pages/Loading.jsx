import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div
      className='bg-linear-to-b from-[#531B81] to-[#29184B] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl font-bold'
    >
      <div className='w-10 h-10 rounded-full border-3 border-white border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Loading
