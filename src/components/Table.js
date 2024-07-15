import React from "react";
import './NotesTable.css';
import NotesItem from './NotesItem.js';

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
    const filteredNotes = notes
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
    return filteredNotes.length > 0 ? filteredNotes : <p>No data available</p>;
  };

  return (
    <table className="leave-table">
      <thead>
        <tr>
          {sections.map(section => (
            <th key={section}>{section}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {sections.map(section => (
            <td key={section}>
              {renderNotesByPost(section)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
