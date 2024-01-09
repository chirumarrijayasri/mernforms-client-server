import React from "react"
import Item from '../Item'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const ListItems = (props) => {
    console.log(props)
    const {users, onEdit, handleDelete} = props
    return (
    <>
    <h3 className="available-users p-3">Available Users</h3>
    {users.length === 0  ? (<p className="no-user-para">No users are available</p>) : (
    <ul>
        {users.map(user => {
            console.log(user)
            return(
                <Item 
                key={`${user._id}`}
                // id={user._id}
                userDetails = {user}
                onEdit={onEdit}
                onDelete={handleDelete}
            />
            )
        })}
    </ul> )}
    
    </>
    )
}

export default ListItems