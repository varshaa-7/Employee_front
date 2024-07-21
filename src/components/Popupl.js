import React from "react";
import { RxCross1 } from "react-icons/rx";
import './Popup.css';
const Popupl = ({
  setShowPopup,
  setShowInputs,
  input,
  setInput,
  leaveStartDate,
  setLeaveStartDate,
  leaveEndDate,
  setLeaveEndDate,
  saveNotes
}) => {
    const handleClose = () => {
        setShowPopup(false);
        setShowInputs(false);
      };
  return (
    <div className="backdrop">
      <div className="popup leave-popup">
      <RxCross1 className='cross' onClick={handleClose} />
        <h2 className='popup-title'>Leave Employees</h2>
        <div className='popup__input_holder'>
          <input
          className='popup-input'
            value={input.notes}
            onChange={(e) => setInput({ ...input, notes: e.target.value })}
            type="text"
            placeholder="Add Employee Name"
          /></div>
          <div className='popup__input_holder'>
          <select className='popup-input'
            value={input.posts}
            onChange={(e) => setInput({ ...input, posts: e.target.value })}
          >
            <option value="" disabled>
              Select post
            </option>
            <option value="Officer">Officer</option>
            <option value="Floor Officer">Floor Officer</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Safety">Safety</option>
            <option value="Capital">Capital</option>
            <option value="Store">Store</option>
            <option value="LIC">LIC</option>
            <option value="SIC">SIC</option>
            <option value="Bulk Loading">Bulk Loading</option>
            <option value="Emergency Duty">Emergency Duty</option>
          </select>
          </div>
          <div className='popup__input_holder'>
          
          <input
          className='popup-input'
            value={input.leaveReason}
            onChange={(e) => setInput({ ...input, leaveReason: e.target.value })}
            type="text"
            placeholder="Add Leave Reason"
          />
          </div>
          <div className='popup__input_holder'>
         
          <input
          className='popup-input'
            value={leaveStartDate}
            onChange={(e) => setLeaveStartDate(e.target.value)}
            type="date"
            placeholder="Start Date"
          />
          </div>
          <div className='popup__input_holder'>
          <input
          className='popup-input'
            value={leaveEndDate}
            onChange={(e) => setLeaveEndDate(e.target.value)}
            type="date"
            placeholder="End Date"
          />
         </div>
         <div className='popup__input_holder'>
          <select
          className='popup-input'
            value={input.status}
            onChange={(e) => setInput({ ...input, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="on leave">On Leave</option>
            <option value="working">Working</option>
          </select>
          </div>
          <button onClick={saveNotes}className='beautiful-button'>Add</button>
          
      </div>
      
    </div>
  );
};

export default Popupl;