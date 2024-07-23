import React from 'react'
import { RxCross1 } from "react-icons/rx";
import './Popup.css';
 const Inst=({
    setShowPopup,
    setShowInput,
    input,
    setInput,
    saveNotes
 })=> {
    const handleClose = () => {
        setShowPopup(false);
        setShowInput(false);
      };
  return (
    <>
    <div className="backdrop">
        <div className="popup leave-popup">
            <RxCross1 className='cross' onClick={handleClose} />
            <h2 className='popup-title'>Special Instructions</h2>
            <div className='popup__input_holder'>
            <input
            className='popup-input'
            value={input.inst}
            onChange={(e) => setInput({ ...input, inst: e.target.value })}
            type="text"
            placeholder="Write Instructions"
          />
            </div>
            <button onClick={saveNotes}className='beautiful-button'>Add</button>
        </div>
    </div>

    </>
  )
}

export default Inst
