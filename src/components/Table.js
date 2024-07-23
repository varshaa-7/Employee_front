import React from "react";
import './NotesTable.css';
import NotesItem from './NotesItem.js';
import "./Notes.css"
import "./Home.css";
const Table = ({ notes, setUpdateUI, setShowPopup, setPopupContent, popupContent }) => {
  const sections = [
    "Safety",
    "Maintenance",
    "Capital",
    "Store",
    "LIC",
    "SIC",
    "Bulk Loading",
    "Emergency Duty"
  ];

  const renderNotesByPost = (postType) => {
    return notes
      .filter(el => !el.plant && (el.shift === 'A' || el.shift === 'B' || el.shift === '') && el.posts === postType)
      .map(el => (
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

  // Prepare notes for each section
  const sectionNotes = sections.map(section => renderNotesByPost(section));

  // Determine the maximum number of notes in any section
  const maxRows = Math.max(...sectionNotes.map(notes => notes.length));

  return (
    <div className="list" style={{ fontSize:'15px'}}>
  <div className="table-container">
    <table className="notes-table" >
      <thead>
        <tr>
          {sections.map(section => (
            <th key={section} style={{ width: "140px" }}>{section}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: maxRows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {sectionNotes.map((notes, colIndex) => (
              <td key={sections[colIndex]} style={{ width: "150px" }}>
                {notes[rowIndex] || <p>-</p>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table></div></div>
  );
};

export default Table;
