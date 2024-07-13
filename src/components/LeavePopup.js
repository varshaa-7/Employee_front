import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import './Popup.css';

const LeavePopup = ({ setShowLeavePopup, handleLeaveSubmit }) => {
    const [leaveReason, setLeaveReason] = useState('');

    const handleSubmit = () => {
        handleLeaveSubmit(leaveReason);
        setShowLeavePopup(false);
    };

    return (
        <>
            <div className='backdrop'>
                <div className='popup'>
                    <RxCross1 className='cross' onClick={() => setShowLeavePopup(false)} />
                    <h1 style={{ color: '#87CEEB', fontWeight: 'bold' }}>Leave Reason</h1>
                    <div className='popup__input_holder'>
                        <input
                            style={{
                                backgroundColor: '#e0f7fa',
                                border: '2px solid #0288d1',
                                borderRadius: '20px',
                                padding: '10px 15px',
                                fontSize: '16px',
                                color: '#0277bd',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                marginRight: '10px'
                            }}
                            value={leaveReason}
                            onChange={(e) => setLeaveReason(e.target.value)}
                            type='text'
                            placeholder='Write leave reason'
                        />
                        <button onClick={handleSubmit} className='beautiful-button'>Add</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeavePopup;
