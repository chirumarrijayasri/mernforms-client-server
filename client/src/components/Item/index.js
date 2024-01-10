import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Item = (props) => {
    const { userDetails, onEdit, onDelete } = props;
    const {_id, firstName, lastName, profile} = userDetails;
    
    return (
       <li key={_id} className="list-item-container">
            <p className="full-name">{firstName} {lastName}</p>
            <img src={profile} width="30px" height="30px" className="image" alt={`${firstName} ${lastName}`} />
            <FaUserEdit className="icons" onClick={() => onEdit(_id)}/> 
            <MdDelete className="icons" onClick={() => onDelete(_id)} />
        </li>
    )
    
}

export default Item