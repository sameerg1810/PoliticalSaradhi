/* eslint-disable perfectionist/sort-imports */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom'
import close from './buttons/Close-button.jpeg'
import '../styles/Report-incident.css'
// eslint-disable-next-line arrow-body-style

// eslint-disable-next-line import/order
import { useState } from "react";

export default function Reportvoter(){
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        houseNumber: '',
        issue: 'Illegal Movement',
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, for example, by sending the data to a server.
        console.log('Form submitted with data:', formData);
      };
    return(
        <>
        <div className='closebutton' onClick={()=>{navigate("/udashboard")}}>
                 <img src={close} alt='close'/>
            </div>
        <h1>Report an Issue</h1>
        <form onSubmit={handleSubmit}></form>
        <div className='report'>
        <div className="main-report-con">
          <label htmlFor="houseNumber">House Number:</label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleInputChange}
          />
        </div> 
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
       
        <div>
          <label htmlFor="issue">Select Issue:</label>
          <select
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleInputChange}
          >
            <option value="Illegal Movement">Illegal Movement</option>
            <option value="Removal of Vote">Removal of Vote</option>
            <option value="Change of Address">Change of Address</option>
            <option value="Depth">Depth</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        </div>
       
        </>
    )
    
}

