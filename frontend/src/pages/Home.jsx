import React from 'react'
import Header from '../components/Header'
import PropertyType from '../components/PropertyType'
import TopDestonations from '../components/TopDestonations'
import SubFooter from '../components/SubFooter'
import Middle from '../components/Middle'

function Home() {
  return (
    <div>
      <Header/>
      <TopDestonations/>
      <Middle/>
      <PropertyType/>
      <SubFooter/>
    </div>
  )
}

export default Home
