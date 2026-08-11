import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Process from './components/Process/Process'
import Works from './components/Works/Works'
import Contact from './components/Contacts/Contact'




export default function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Process/>
      <Works/>
      <Contact/>
    </div>
  )
}
