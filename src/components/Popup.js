
import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { baseURL } from '../utils/constant';
import axios from 'axios';
import './Popup.css'

const Popup = ({setShowPopup,setUpdateUI,popupContent={}})=> {
    const [input, setInput] = useState(popupContent.text || '');
    
    
    const updateNotes = ()=>{
        axios.put(`${baseURL}/update/${popupContent.id}`, {notes:input})
        .then((res)=>{
            console.log(res.data);
            setUpdateUI((prevState)=>!prevState);
            setShowPopup(false)
        })
    }
  
  
    return (
    <>
      <div className='backdrop'>
        <div className='popup leave-popup'>
            <RxCross1 className='cross' onClick={()=>setShowPopup(false)}/>
            <h1 className='popup-title'>Update Name</h1>
            <div className='popup__input_holder'>
                <input className='popup-input'
                 value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder='Update notes'/>
                <button onClick={updateNotes} className='beautiful-button'>Update</button>
            </div>

        </div>
      </div>
    </>
  )
}

export default Popup