import React from 'react'
import axios from 'axios';
import { baseURL } from '../utils/constant';
import { MdDelete } from "react-icons/md";
const InstTable=({notes,inst,setUpdateUI,id }) =>{
  const filteredNotes = notes.filter((el) => el.inst !== "" && el.notes==="");
  const [serialNumbers, setSerialNumbers] = React.useState([]);

  React.useEffect(() => {
    const newSerialNumbers = notes.map((note, index) => index + 1);
    setSerialNumbers(newSerialNumbers);
  }, [notes]);
  const deleteNotes=(id)=>{
    axios.delete(`${baseURL}/delete/${id}`).then(res =>{
        console.log(res.data);
        setUpdateUI((prevState)=>!prevState)
    });
  };
  return (
    <>
    
    <table style={{ width: '95%', textAlign: 'left', color:'black', margin:'10px' }}>
    {filteredNotes.map((note, index) => (
      <tr key={note._id}>
        <td>{index + 1}</td>
        <td>{note.inst}</td>
        <td><MdDelete className='icon delete-button' onClick={() => deleteNotes(note._id)}/></td>
            </tr>
      ))}
      </table>
    
    </>
  )
}

export default InstTable
