import React from 'react'
import Navbar from '../Component/Navbar'
import Hero from '../Component/Hero'
import JobListing from '../Component/JobListing'
import AppDownload from '../Component/AppDownload'
import Footer from '../Component/Footer'

function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <JobListing />
        <AppDownload />
        <Footer />
    </div>
  )
}

export default Home