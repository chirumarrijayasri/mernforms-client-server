import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Item = (props) => {
    const { id, firstName, lastName, profile, onEdit, onDelete } = props;
    
    return (
       
       
            <li className="list-item-container">
                <p className="full-name">{firstName} {lastName}</p>
                <img src={profile} width="30px" height="30px" className="image" alt={`${firstName} ${lastName}`} />
                <FaUserEdit className="icons" onClick={() => onEdit(id)}/> 
                <MdDelete className="icons" onClick={() => onDelete(id)} />
            </li>
    )
    
}

export default Item