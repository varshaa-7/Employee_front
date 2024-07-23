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
import Popupl from "./Popupl"
import PopupA from "./PopupA"
import Inst from "./Inst";
import InstTable from "./InstTable";

const Notes = () => {
  const printRef=useRef();

  const [note, setNote] = useState([]);
  const [input, setInput] = useState({
    notes: "",
    posts: "",
    plant: "",
    shift: "",
    status: "working",
    date: new Date().toISOString().split('T')[0],
    leaveReason:"",
    leaveStartDate:new Date().toISOString().split('T')[0],
    leaveEndDate:new Date().toISOString().split('T')[0],
    inst:"",
  });
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [currentShift, setCurrentShift] = useState("");
  const [weekDates, setWeekDates] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
  const [showInputss, setShowInputss] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [inst, setInst] = useState("");

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
        setInput({ notes: "", posts: "", plant: "", shift: "" , date: new Date().toISOString().split('T')[0],leaveReason:"",
          leaveStartDate:new Date().toISOString().split('T')[0],
          leaveEndDate:new Date().toISOString().split('T')[0]});
        setShowInputs(false);
        setShowInputss(false);setShowInput(false);
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

  const renderNotesByPlantAndShift = (plant, shift,date) => {
  
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

  const renderOfficer =(postType,shiftType, date)=>{
    
    

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
const updatePopupContent = (text, post, plant, shift, status, id, date) => {
  setPopupContent({ text, post, plant, shift, status, id, date });
  setShowPopup(true);
};
const handleAddEmployee = () => {
  setShowInputss(true);
};
const handleAddInst = () => {
  setShowInput(true);
};

  return (
    <>

     
      <div className="button-container" >
  <div onClick={handlePrint} >
    <IoIosPrint className="printb" style={{ color: 'black' }} />
    <h6 className="prt" >Print</h6>
  </div>
</div>


<div ref={printRef}>
      
      <div
        className="container"
        style={{
          color: "#87CEEB",
          fontWeight: "bold",
          margin: "5px 2px",
          marginTop: "5px",
          padding:"3px",
          alignItems: "center",
        }}
      >
        
        <h1 className="title text-center">LPG Bottling Plant, Kanpur</h1>
        <h2 className="title-2 text-center">Officer Duty Roaster</h2>
        <div className="button-container">
        <button onClick={handleAddEmployee}className="add-employee-button">Add Employee</button>
        
        </div>
        {showInputss && (
        <PopupA
        input={input}
        setInput={setInput}
        saveNotes={saveNotes}
        setShowInputss={setShowInputss}
      />
        )}
        <div className="list">
  <div className="table-container table-container-responsive">
<table className="notes-table" style={{fontSize:'15px'}}>
  <thead>
    <tr>
      <th rowSpan="3">Date</th>
      <th colSpan="5">Shift A</th>
      <th colSpan="5">Shift B</th>
    </tr>
    <tr>
      <th colSpan="2">Mini Plant</th>
      <th colSpan="2">Major Plant</th>
      <th rowSpan="2">Officer(S&D or CMH)</th>
      <th colSpan="2">Mini Plant</th>
      <th colSpan="2">Major Plant</th>
      <th rowSpan="2">Officer(S&D or CMH)</th>
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
                
                return (
                  <tr key={index}>
                    <td data-label="Date">{date.toDateString()}</td>
                    {renderNotesByPlantAndShift("Mini", "A", date)}
                    {renderNotesByPlantAndShift("Major", "A", date)}
                    <td data-label="Shift A(Officers)">{renderOfficer("Officer", "A", date)}</td>
                    {renderNotesByPlantAndShift("Mini", "B", date)}
                    {renderNotesByPlantAndShift("Major", "B",date)}
                    <td data-label="Shift B(Officers)">{ renderOfficer("Officer", "B",date)}</td>
                  </tr>
                );
              })}
            </tbody>
</table>
</div>



<div className="center-container">
          
          <Table notes={note} setUpdateUI={setUpdateUI} setPopupContent={setPopupContent} setShowPopup ={setShowPopup}/>
          <div className="button-container">
          <button onClick={() => setShowInputs(!showInputs)}className="add-employee-button">Leave Employees</button></div>
          {showInputs && (
        <Popupl
          setShowPopup={setShowPopup}
          setShowInputs={setShowInputs}
          input={input}
          setInput={setInput}
          leaveStartDate={leaveStartDate}
          setLeaveStartDate={setLeaveStartDate}
          leaveEndDate={leaveEndDate}
          setLeaveEndDate={setLeaveEndDate}
          saveNotes={saveNotes}
        />
      )}

          <h2 className="title">On Leave Employee</h2>
          
          <NotesTable notes={note} setUpdateUI={setUpdateUI} />
          <div className="button-container">
        <button onClick={handleAddInst}className="add-employee-button">Special Instructions</button>
       
        </div>
        
        {showInput && (
        <Inst
        input={input}
        setInput={setInput}
        saveNotes={saveNotes}
        setShowInput={setShowInput}
        setShowPopup={setShowPopup}
        setInst={setInst} // Add this line to set the inst state
      />
        )}
        <InstTable notes={note} setInput={setInput} id={popupContent.id} setUpdateUI={setUpdateUI} />
        {/* <NotesItem/> */}
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
