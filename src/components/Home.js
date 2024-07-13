import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import './Home.css'
const Home=()=> {
  return (
    <>
   <div className="background"></div>
        <div>
      <h1 style={{ fontSize:'50px',paddingTop: '5rem', margin: '50px',color:'white', fontWeight: 'normal' }}>
        Welcome to{' '}
        <span style={{ color: '#7DF9FF', fontWeight: 'bold' }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={['NewZyy','NewZyy','NewZyy']}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}          
          />
        </span>
      </h1>
      <div>
        <h2 style={{color:'white', marginTop: '60px', marginLeft:'60px'}}>📲 <span style={{color:'#4682B4'}}>You can</span> read headlines of your favourite choice.</h2>
        <h2 style={{color:'white', marginLeft:'70px'}}>📲 <span style={{color:'#4682B4'}}>You can</span> read detailed version of the news by clicking on Read More.</h2>
        <h2 style={{color:'white', marginLeft:'80px'}}>📲 <span style={{color:'#4682B4'}}>You can</span> make notes on your important headlines.</h2>
      </div>
      </div>
   
    </>
  )
}

export default Home
