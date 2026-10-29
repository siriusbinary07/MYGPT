import React, {useEffect, useState} from 'react'
import {dummyPlans} from '../assets/assets'
import Loading from './Loading'


const Credits = () => {

  const [plans, setplans] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchplans = () => {
    setplans(dummyPlans)
    setLoading(false)
  }

  useEffect(() => {
    fetchplans()
  }, [])

  if (loading) return <Loading />

  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h2 className='text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800
      dark:text-white'>Credit Plans</h2>

      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((plan, index) => (
          <div key={plan._id} className={`border bg-purple-50 dark:border-purple-700
            rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-75 flex flex-col
            ${plan._id === "pro" ? 'bg-purple-50 dark:bg-purple-900' : 'bg-purple-50'}`}>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>{plan.name}</h3>
              <p className='text-2xl font-bold text-blue-500 dark:text-blue-400'>${plan.price.toFixed(2)}</p>
              <p className='text-gray-600 dark:text-gray-300'> <span>/ {plan.credits} credits</span>

              </p>
              <ul className='mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 font-bold'> 
                
                {plan.features.map((feature, index) => (
                  <li key={index} > {feature}</li>
                ))}
              </ul>

              </div> 
              <button className={`mt-6 bg-purple-600 hover:bg-purple-700
                active:bg-purple-800 text-white font-semibold
                py-2 rounded transition-colors cursor-pointer`}>
              Buy Now</button>
          </div>
        ))}

      </div>
      
    </div>
  )
}

export default Credits
