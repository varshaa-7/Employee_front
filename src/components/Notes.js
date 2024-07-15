import React, { useEffect, useState,useRef } from "react";
import NotesItem from "./NotesItem";
import axios from "axios";
import { baseURL } from "../utils/constant";
import Popup from "./Popup";
import "./Home.css";
import "./NotesItem.css";
import NotesTable from './NotesTable';
import "./Notes.css"
import { useReactToPrint } from 'react-to-print';
import { IoIosPrint } from "react-icons/io";
import Table from "./Table";

const Notes = () => {
  const printRef=useRef();

  const [note, setNote] = useState([]);
  const [input, setInput] = useState({
    notes: "",
    posts: "",
    plant: "",
    shift: "",
    status: "working",
    date: new Date().toISOString().split('T')[0] 
  });
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [currentShift, setCurrentShift] = useState("");
  const [weekDates, setWeekDates] = useState([]);
  const [showInputs, setShowInputs] = useState(false);

useEffect(() => {
    // Fetch current shift and notes on component mount and when updateUI changes
    axios
      .get(`${baseURL}/shift`)
      .then((res) => setCurrentShift(res.data.currentShift))
      .catch((err) => console.log(err));

    axios
      .get(`${baseURL}/get`)
      .then((res) => setNote(res.data))
      .catch((err) => console.log(err));
      setWeekDates(calculateWeekDates());
  }, [updateUI]);

  useEffect(() => {
    // Fetch current shift periodically (every 5 minutes in this example)
    const interval = setInterval(() => {
      axios
        .get(`${baseURL}/shift`)
        .then((res) => setCurrentShift(res.data.currentShift))
        .catch((err) => console.log(err));
    }, 60000); 

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const calculateWeekDates = () => {
    let currentDate = new Date();
    let sunday = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );

    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(new Date(sunday));
      sunday.setDate(sunday.getDate() + 1);
    }

    return weekDates;
  };


  const saveNotes = () => {
    axios
      .post(`${baseURL}/save`, input)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput({ notes: "", posts: "", plant: "", shift: "" , date: new Date().toISOString().split('T')[0]});
        setShowInputs(false);
      })
      .catch((err) => console.log(err));
  };

  const inputStyle = {
    backgroundColor: "#e0f7fa",
    border: "2px solid #0288d1",
    borderRadius: "20px",
    padding: "10px 15px",
    fontSize: "16px",
    color: "#0277bd",
    outline: "none",
    transition: "border-color 0.3s ease",
    marginRight: "10px",
  };

  const groupNotesByTwo = (notes) => {
    const grouped = [];
    for (let i = 0; i < notes.length; i += 2) {
      grouped.push(notes.slice(i, i + 2));
    }
    return grouped;
  };

  const renderNotesByPlantAndShift = (plant, shift, isSunday, date) => {
    
    if (isSunday) {
      return (
        <>
          <td>-</td>
          <td>-</td>
        </>
      );
    }
    
    const filteredNotes = note.filter(
      (el) => el.plant === plant && el.shift === shift && el.posts === "Floor Officer"&&
      new Date(el.date).toDateString() === date.toDateString()
    );
    const uniqueNotes = Array.from(new Set(filteredNotes.map((el) => el._id)))
      .map((id) => {
        return filteredNotes.find((el) => el._id === id);
      });

    // Create array with two slots for floor officers
    const slots = Array(2).fill(null);
    uniqueNotes.forEach((el, index) => {
      if (index < 2) {
        slots[index] = (
          <NotesItem
            key={el._id}
            text={el.notes}
            post={el.posts}
            status={el.status}
            id={el._id}
            date={el.date}
            setUpdateUI={setUpdateUI}
            setShowPopup={setShowPopup}
            setPopupContent={setPopupContent}
            popupContent={popupContent}
          />
        );
      }
    });

    return slots.map((item, index) => (
      <td key={index}>{item || "-"}</td>
    ));
  };


  const renderNotesByPost = (postType) => {
    return note
      .filter((el) => !el.plant && (el.shift==='A' || el.shift==='B' || el.shift==='') && el.posts === postType)
      .map((el) => (
        <NotesItem
          key={el._id}
          text={el.notes}
          post={el.posts}
          status={el.status}
          id={el._id}
          date={el.date}
          setUpdateUI={setUpdateUI}
          setShowPopup={setShowPopup}
          setPopupContent={setPopupContent}
          popupContent={popupContent}
        />
      ));
  };

  const renderOfficer =(postType,shiftType,isSunday, date)=>{
    
    if (isSunday) {
      return "-";
    }

    return note
      .filter((el) => el.plant==="" && (el.shift===shiftType) && el.posts === postType&&
      new Date(el.date).toDateString() === date.toDateString())
      .map((el) => (
        <NotesItem
          key={el._id}
          text={el.notes}
          post={el.posts}
          status={el.status}
          id={el._id}
          date={el.date}
          setUpdateUI={setUpdateUI}
          setShowPopup={setShowPopup}
          setPopupContent={setPopupContent}
          popupContent={popupContent}
        />
      ));
  };

  const renderNotesByLeave = (leaveType) => {
    return note
      .filter((el) => el.status===leaveType)
      .map((el) => (
        <NotesItem
          key={el._id}
          text={el.notes}
          post={el.posts}
          status={el.status}
          id={el._id}
          date={el.date}
          setUpdateUI={setUpdateUI}
          setShowPopup={setShowPopup}
          setPopupContent={setPopupContent}
          popupContent={popupContent}
        />
      ));
  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const updateSpecificNotesDate = async () => {
    try {
        await axios.put(`${baseURL}/updateSpecificNotesDate`);
        setUpdateUI((prevState) => !prevState);
    } catch (err) {
        console.error("Error updating specific notes dates:", err);
    }
};

  return (
    <>

      {/* <ReactToPrint
      trigger={()=>{
        return <button>Print</button>
      }}
      content={()=>this.componentRef}
      documentTitle="New Doc"
      pageStyle="print"
      />
      <div ref={el=>(this.componentRef=el)}> */}
      <div className="button-container" style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
  <div onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'black' }}>
    <IoIosPrint className="printb" style={{ color: 'black' }} />
    <h4 className="prt" style={{ color: 'black', marginLeft: '5px'}}>Print</h4>
  </div>
</div>


<div ref={printRef}>
      
      <div
        className="container"
        style={{
          color: "#87CEEB",
          fontWeight: "bold",
          margin: "10px 0px",
          marginTop: "30px",
          alignItems: "center",
        }}
      >
        
        <h1 className="title text-center">LPG Bottling Plant, Kanpur</h1>
        <h2 className="title-2 text-center">Officer Duty Roaster</h2>
        <div className="button-container">
        <button onClick={() => setShowInputs(!showInputs)}className="add-employee-button">Add Employee</button>
        {/* <button className="update-notes-btn add-employee-button" onClick={updateSpecificNotesDate}>
            Update Dates
          </button> */}
        </div>
        {showInputs && (
        <div className="input_holder text-center">
          <input
            value={input.notes}
            onChange={(e) => setInput({ ...input, notes: e.target.value })}
            style={inputStyle}
            type="text"
            placeholder="Add Emplyee Name"
            onFocus={(e) => (e.target.style.borderColor = "#01579b")}
            onBlur={(e) => (e.target.style.borderColor = "#0288d1")}
          />
          {/* <input
            value={input.posts}
            onChange={(e) => setInput({ ...input, posts: e.target.value })}
            style={inputStyle}
            type="text"
            placeholder="Add post"
            onFocus={(e) => (e.target.style.borderColor = "#01579b")}
            onBlur={(e) => (e.target.style.borderColor = "#0288d1")}
          />
          <input
            value={input.plant}
            onChange={(e) => setInput({ ...input, plant: e.target.value })}
            style={inputStyle}
            type="text"
            placeholder="Add plant"
            onFocus={(e) => (e.target.style.borderColor = "#01579b")}
            onBlur={(e) => (e.target.style.borderColor = "#0288d1")}
          /> */}

          <select
            value={input.posts}
            onChange={(e) => setInput({ ...input, posts: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#01579b")}
            onBlur={(e) => (e.target.style.borderColor = "#0288d1")}
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


          <select
            value={input.plant}
            onChange={(e) => setInput({ ...input, plant: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#01579b")}
            onBlur={(e) => (e.target.style.borderColor = "#0288d1")}
          >
            <option value="" >
              Select plant type
            </option>
            <option value="Mini">Mini</option>
            <option value="Major">Major</option>
          </select>



          <select
            value={input.shift}
            onChange={(e) => setInput({ ...input, shift: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#01579b")}
            onBlur={(e) => (e.target.style.borderColor = "#0288d1")}
          >
            <option value="">
              Select shift
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>


          <input
            type="date"
            name="date"
            value={input.date}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            style={inputStyle}
          />

          <button onClick={saveNotes} className="beautiful-button">
            Add
          </button>
        </div>
        )}
        <div className="list">
  <div className="table-container">
<table className="notes-table">
  <thead>
    <tr>
      <th rowSpan="3">Date</th>
      <th colSpan="5">Shift A</th>
      <th colSpan="5">Shift B</th>
    </tr>
    <tr>
      <th colSpan="2">Mini Plant</th>
      <th colSpan="2">Major Plant</th>
      <th rowSpan="2">Officer</th>
      <th colSpan="2">Mini Plant</th>
      <th colSpan="2">Major Plant</th>
      <th rowSpan="2">Officer</th>
    </tr>
    <tr>
      <th>Floor Officer</th>
      <th>Floor Officer</th>
      <th>Floor Officer</th>
      <th>Floor Officer</th>
      <th>Floor Officer</th>
      <th>Floor Officer</th>
      <th>Floor Officer</th>
      <th>Floor Officer</th>
    </tr>
  </thead>
  <tbody>
    
  {weekDates.map((date, index) => {
                const isSunday = date.getDay() === 0;
                return (
                  <tr key={index}>
                    <td data-label="Date">{date.toDateString()}</td>
                    {renderNotesByPlantAndShift("Mini", "A", isSunday,date)}
                    {renderNotesByPlantAndShift("Major", "A", isSunday,date)}
                    <td data-label="Shift A(Officers)">{isSunday ? "-" : renderOfficer("Officer", "A", isSunday,date)}</td>
                    {renderNotesByPlantAndShift("Mini", "B", isSunday,date)}
                    {renderNotesByPlantAndShift("Major", "B", isSunday,date)}
                    <td data-label="Shift B(Officers)">{isSunday ? "-" : renderOfficer("Officer", "B", isSunday,date)}</td>
                  </tr>
                );
              })}
            </tbody>
</table>
</div>



<div className="center-container">
          {/* <h2 className="title text-center">Maintenance(Normal Shift)</h2>
          <div className="notes-row">{renderNotesByPost("Maintenance")}</div>
          <h2 className="title">Safety (Normal Shift)</h2>
          <div className="notes-row">{renderNotesByPost("Safety")}</div>

          <h2 className="title">Capital (Normal Shift)</h2>
          <div className="notes-row">{renderNotesByPost("Capital")}</div>

          <h2 className="title">Store (Normal Shift)</h2>
          <div className="notes-row">{renderNotesByPost("Store")}</div>
          <h2 className="title">LIC (Normal Shift)</h2>
          <div className="notes-row">{renderNotesByPost("LIC")}</div>
          <h2 className="title">SIC (Normal Shift)</h2>
          <div className="notes-row">{renderNotesByPost("SIC")}</div>

          <h2 className="title">Bulk Loading</h2>
          <div className="notes-row">{renderNotesByPost("Bulk Loading")}</div>

          <h2 className="title3">Emergency Duty (From 22:00 to 06:00, including Sunday)</h2>
          <div className="notes-row">{renderNotesByPost("Emergency Duty")}</div> */}
          <Table notes={note}/>

          <h2 className="title">On Leave Employee</h2>
          <NotesTable notes={note} />
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
      </div>
    </>
  );
};
export default Notes;
