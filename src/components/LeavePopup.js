import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import './Popup.css';

const LeavePopup = ({ setShowLeavePopup, handleLeaveSubmit }) => {
    const [leaveReason, setLeaveReason] = useState('');
    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    const handleSubmit = () => {
        handleLeaveSubmit(leaveReason, leaveStartDate, leaveEndDate);
        setShowLeavePopup(false);
    };

    return (
        <>
            <div className='backdrop'>
                <div className='popup leave-popup'>
                    <RxCross1 className='cross' onClick={() => setShowLeavePopup(false)} />
                    <h1 className='popup-title'>Leave Reason</h1>
                    <div className='popup__input_holder'>
                        <input
                            className='popup-input'
                            value={leaveReason}
                            onChange={(e) => setLeaveReason(e.target.value)}
                            type='text'
                            placeholder='Write leave reason'
                        />
                        </div>
                        <div className='popup__input_holder'>
                         <input
                            className='popup-input'
                            value={leaveStartDate}
                            onChange={(e) => setLeaveStartDate(e.target.value)}
                            type='date'
                            placeholder='Start Date'
                        />
                        </div>
                        <div className='popup__input_holder'>
                        <input
                            className='popup-input'
                            value={leaveEndDate}
                            onChange={(e) => setLeaveEndDate(e.target.value)}
                            type='date'
                            placeholder='End Date'
                        /></div>
                        <button onClick={handleSubmit} className='beautiful-button'>Add</button>
                    </div>
                </div>
            
        </>
    );
};

export default LeavePopup;
