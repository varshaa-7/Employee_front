
import React from "react";
import './Notes.css';
import axios from 'axios';
import { baseURL } from '../utils/constant';
import { MdDelete } from "react-icons/md";

const NotesTable = ( {notes,setUpdateUI,id }) => {
  const filteredNotes = notes.filter((el) => el.status === "on leave");

  const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = String(dateObj.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day}-${month}-${year}`;
};
const deleteNotes=(id)=>{
  axios.delete(`${baseURL}/delete/${id}`).then(res =>{
      console.log(res.data);
      setUpdateUI((prevState)=>!prevState)
  });
};
  return (
    <table className="leave-table" style={{width:'92%',fontSize:'15px'}}>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Post</th>
          <th>Leave Start Date</th>
          <th>Leave End Date</th>
          <th>Leave Reason</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {filteredNotes.map((note) => (
          <tr key={note._id}>
            <td>{note.notes}</td>
            <td>{note.posts}</td>
            <td>{formatDate(note.leaveStartDate)}</td>
            <td>{formatDate(note.leaveEndDate)}</td>
            {/* <td>{note.leaveStartDate}</td>
            <td>{note.leaveEndDate}</td> */}
            <td>{note.leaveReason}</td>
            <td><MdDelete className='icon delete-button' onClick={() => deleteNotes(note._id)}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotesTable;
