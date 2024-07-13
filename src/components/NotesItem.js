import {React, useState} from 'react'
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Notes from './Notes';
import { baseURL } from '../utils/constant';
import './NotesItem.css'
import LeavePopup from './LeavePopup';

const NotesItem = ({text,post,plant, shift,status,id,date, setUpdateUI,setShowPopup,setPopupContent})=> {
    const [showLeavePopup, setShowLeavePopup] = useState(false);
    const [leaveReason, setLeaveReason] = useState('');
    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    const deleteNotes=()=>{
        axios.delete(`${baseURL}/delete/${id}`).then(res =>{
            console.log(res.data);
            setUpdateUI((prevState)=>!prevState)
        })
    }
    const updateNotes =()=>{
        setPopupContent({text,post,plant, shift,status, id,date});
        setShowPopup(true);
    }
    
    const markOnLeave = () => {
        status === "working" ? setShowLeavePopup(true):setShowLeavePopup(false);
        const updatedStatus = status === "working" ? "on leave" : "working"; // Toggle status
    
        axios
          .put(`${baseURL}/update/${id}`, { status: updatedStatus })
          .then((res) => {
            console.log(res.data);
            setUpdateUI((prev) => !prev); // Trigger UI update
          })
          .catch((err) => console.log(err));
      };
    const handleLeaveSubmit = (reason, startDate, endDate) => {
        const updatedStatus = "on leave";
        axios.put(`${baseURL}/leave/${id}`, { status: updatedStatus, leaveReason:reason,leaveStartDate: startDate,
            leaveEndDate: endDate })
            .then((res) => {
                console.log(res.data);
                setUpdateUI((prev) => !prev);
                setLeaveReason(reason); // Update the leave reason
                // setLeaveStartDate(startDate);
                // setLeaveEndDate(endDate);
            })
            .catch((err) => console.log(err));
    };
    // const toggleStatus = () => {
    //     const newStatus = status === 'working' ? 'on leave' : 'working';
    //     axios.put(`${baseURL}/update/${id}`, { status: newStatus })
    //         .then(res => {
    //             console.log(res.data);
    //             setUpdateUI((prevState) => !prevState);
    //         })
    //         .catch(err => console.log(err));
    // }
    

      // Function to format date as DDMMYY
    const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = String(dateObj.getFullYear()).slice(-2); // Get last two digits of the year
        return `${day}-${month}-${year}`;
    };

  return (
    <>
      <div className='notes text-center'>
                <div className='note-content'>
                    <div>{text}</div>
                    {/* <div>{post}</div> */}
                    {plant && <div>Plant: {plant}</div>}
                    {shift && <div>Shift: {shift}</div>}
                    <div>Status: {status}</div>
                    {status === 'on leave' && <div>Reason: {leaveReason}</div>}
                    {status === 'on leave' && <div>Leave Dates: {formatDate(leaveStartDate)} - {formatDate(leaveEndDate)}</div>}
                    <div>Date: {formatDate(date)}</div>
                </div>
                <div className='icons'>
                    <CiEdit className='icon' onClick={updateNotes}/>
                    <MdDelete className='icon' onClick={deleteNotes}/>
                    <button onClick={markOnLeave} className="beautiful-buttonl mark-button">
                        {status === 'working' ? 'On leave' : 'working'}
                    
                    </button>
                </div>
            </div>
            {showLeavePopup && (
                <LeavePopup 
                    setShowLeavePopup={setShowLeavePopup}
                    handleLeaveSubmit={handleLeaveSubmit}
                />
            )}
    </>
  );
};

export default NotesItem
