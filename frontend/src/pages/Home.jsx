import React from 'react'
import Header from '../components/Header'
import PropertyType from '../components/PropertyType'
import TopDestonations from '../components/TopDestonations'
import SubFooter from '../components/SubFooter'
import Middle from '../components/Middle'

function Home() {
  return (
    <div className='min-h-screen'>
      {/* Header without navbar */}
      <Header/>
      
      {/* Content sections with responsive container */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <TopDestonations/>
        <Middle/>
        <PropertyType/>
      </div>
      
      <SubFooter/>
    </div>
  )
}

export default Home
