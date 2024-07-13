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
        <div className='popup'>
            <RxCross1 className='cross' onClick={()=>setShowPopup(false)}/>
            <h1 style={{color:'#87CEEB', fontWeight: 'bold'}}>Update Name</h1>
            <div className='popup__input_holder'>
                <input style={{
                    backgroundColor: '#e0f7fa',
                    border: '2px solid #0288d1',
                    borderRadius: '20px',
                    padding: '10px 15px',
                    fontSize: '16px',
                    color: '#0277bd',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    marginRight:'10px'
                }} value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder='Update notes'/>
                <button onClick={updateNotes} className='beautiful-button'>Update</button>
            </div>

        </div>
      </div>
    </>
  )
}

export default Popup
