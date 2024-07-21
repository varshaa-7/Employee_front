import React from "react";
import "./Popup.css"
import { RxCross1 } from "react-icons/rx";

const PopupA = ({ input, setInput, saveNotes, setShowInputss }) => {
  const handleClose = () => {
    setShowInputss(false);
  };

  return (
    <div className="backdrop">
      <div className="popup leave-popup">
      <RxCross1 className='cross' onClick={handleClose} />
      <h2 className='popup-title'>Add Employee</h2>
      <div className='popup__input_holder'>
          <input className='popup-input'
            value={input.notes}
            onChange={(e) => setInput({ ...input, notes: e.target.value })}
            type="text"
            placeholder="Add Employee Name"
          />
          </div>
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
         
          <select className='popup-input'
            value={input.plant}
            onChange={(e) => setInput({ ...input, plant: e.target.value })}
          >
            <option value="" >
              Select plant type
            </option>
            <option value="Mini">Mini</option>
            <option value="Major">Major</option>
          </select>
          </div>
          <div className='popup__input_holder'>
         
          <select className='popup-input'
            value={input.shift}
            onChange={(e) => setInput({ ...input, shift: e.target.value })}
          >
            <option value="">
              Select shift
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          </div>
          <div className='popup__input_holder'>
         
          <input className='popup-input'
            type="date"
            name="date"
            value={input.date}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          />
          </div>
          <button onClick={saveNotes} className='beautiful-button'>Add</button>
         
       
      </div>
    </div>
  );
};

export default PopupA;