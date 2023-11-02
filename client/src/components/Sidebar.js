// SideBar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';

function SideBar() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({'Name': 'Select a Mentor'});
    const location = useLocation();


    useEffect(() => {
        axios.get('http://localhost:5000/mentors')
            .then(res => {
                console.log(res.data)
                setOptions(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    const handleSelect = (eventKey) => {
        setSelectedOption(options[eventKey]);
    };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" align='center' style={{width: "280px", height: "100vh"}}>
            <Dropdown onSelect={handleSelect} >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{width: '100%'}}>
                    {selectedOption.Name}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{width: '100%'}}>
                    {options.map((option, index) => (
                        <Dropdown.Item eventKey={index} key={option._id} style={{textAlign: 'center'}}>{option.Name}</Dropdown.Item>
                        ))}
                </Dropdown.Menu>
            </Dropdown>
            
            <hr/>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item"><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page">Home</Link></li>
                <li className="nav-item"><Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link></li>
                <li className="nav-item"><Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
            </ul>
        </div>
    );
}

export default SideBar;
