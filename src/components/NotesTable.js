
import React from "react";
import './NotesTable.css';

const NotesTable = ({ notes }) => {
  const filteredNotes = notes.filter((el) => el.status === "on leave");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <table className="leave-table">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Post</th>
          <th>Leave Start Date</th>
          <th>Leave End Date</th>
          <th>Leave Reason</th>
        </tr>
      </thead>
      <tbody>
        {filteredNotes.map((note) => (
          <tr key={note._id}>
            <td>{note.notes}</td>
            <td>{note.posts}</td>
            <td>{formatDate(note.leaveStartDate)}</td>
            <td>{formatDate(note.leaveEndDate)}</td>
            <td>{note.leaveReason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotesTable;
