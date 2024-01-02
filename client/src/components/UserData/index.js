import React, { useState, useEffect } from "react"
import ListItems from '../ListItems'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const UserData = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        age: 0,
        profile: null,
        bio: '',
        interests: [],
    })
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    const interestOptions = ["Sports", "Music", "Travel", "Technology"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8989/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Error fetching user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchData();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prevData) => ({
                ...prevData,
                profile: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleAgeChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'age' ? parseInt(value, 10) : value;
        setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));

    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        console.log('Current formData:', formData);
        console.log('Checkbox value:', value);
        const currentInterests = formData && formData.interests && Array.isArray(formData.interests) ? formData.interests : [];
        const updatedInterests = currentInterests.includes(value)
            ? currentInterests.filter((interest) => interest !== value)
            : [...currentInterests, value];
        setFormData((prevState) => ({
            ...prevState,
            interests: updatedInterests,
        }));
    }

    const handleDelete = async (id) => {
        try {
            console.log('Deleting user with ID:', id);
            const response = await fetch(`http://localhost:8989/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    }

    const handleUpdate = async () => {
        try {
            const url = `http://localhost:8989/users/${editingUserId}`;
            const method = 'PUT';

            const requestBody = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            };

            const response = await fetch(url, requestBody);

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
                );
                setFormData({
                    firstName: "",
                    lastName: "",
                    gender: "",
                    age: 0,
                    profile: null,
                    bio: "",
                    interests: [],
                });
                setIsEditing(false);
                setEditingUserId(null);

                console.log('User updated successfully');
            } else {
                console.error('Error updating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    const handleEdit = (id) => {
        const userToEdit = users.find((user) => user._id === id);
        setEditingUserId(id);
        setFormData(userToEdit);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let url = 'http://localhost:8989/users';
            let method = 'POST';

            // if (isEditing) {
            //     url = `http://localhost:8989/users/${editingUserId}`;
            //     method = 'PUT'; // or 'PATCH' depending on your backend
            // }

            const requestBody = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            };

            const response = await fetch(url, requestBody);

            if (response.ok) {
                const data = await response.json();
                // if (isEditing) {
                //     setUsers((prevUsers) =>
                //         prevUsers.map((user) => (user._id === data._id ? data : user))
                //     );
                // } else {
                        setUsers((prevUsers) => [...prevUsers, data]);
                //}
                setFormData({
                    firstName: "",
                    lastName: "",
                    gender: "",
                    age: 0,
                    profile: null,
                    bio: "",
                    interests: [],
                });
                setIsEditing(false);
                setEditingUserId(null);

                console.log('User added/updated successfully');
             } 
           // else {
            //     console.error('Error adding/updating user:', response.statusText);
            // }
        } catch (error) {
            console.error('Error adding/updating user:', error.message);
        }
    };

    return (
        <div className="main-container text-center">
            <h1 className="text-center main-head">User Data Form</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="name-container">
                    <div className="namesub-container ">
                        <label className="label" htmlFor="firstName">FirstName*</label>
                        <input
                            id="firstName"
                            type="text"
                            className="input-field form-control"
                            name="firstName"
                            value={formData?.firstName}
                            onChange={handleChange} required /><br />
                    </div>
                    <div className="namesub-container">
                        <label className="label" htmlFor="lastName">LastName*</label>
                        <input
                            id="lastName"
                            type="text"
                            className="input-field form-control"
                            name="lastName"
                            value={formData?.lastName}
                            onChange={handleChange} required /><br />
                    </div>
                </div>

                <div className="age-container">
                    <div className="agesub-container">
                        <label htmlFor="age" className="label">Age*</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            min="10"
                            max="100"
                            className="input-field form-control"
                            value={formData?.age}
                            onChange={handleAgeChange}
                            required
                        /><br />
                    </div>
                    <div className="agesub-container">
                        <label htmlFor="profile" className="label">Profile*</label>
                        <input
                            type="file"
                            id="profile"
                            className="input-field profile form-control"
                            name="profile"
                            onChange={handleImageChange}
                        /><br />
                    </div>
                </div>

                <div className="interest-bio-container">
                    <div className="interest-container mr-3">
                        <label className="label">Interests:</label>
                        {interestOptions.map((interest) => (
                            <div key={interest} >
                                <input
                                    type="checkbox"
                                    className="m-3"
                                    id={interest}
                                    name="interests"
                                    value={interest}
                                    checked={formData?.interests?.includes(interest)}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor={interest} className="label">{interest}</label>
                            </div>
                        ))}
                    </div>

                    <div className="bio-container ml-3">
                        <label htmlFor="bio" className="label">Bio:</label><br />
                        <textarea name="bio" id="bio" rows="6" cols="30"
                            value={formData?.bio} onChange={handleChange} required
                        />
                    </div>
                </div>
                <div className="gender-container">
                    <label className="label " >Gender:</label>
                    <input id="male" type="radio" name="gender" className=" m-3"
                        value="male"
                        checked={formData?.gender === 'male'}
                        onChange={handleChange}
                    /><br />
                    <label className="label" htmlFor="male">Male</label>
                    <input id="female" type="radio" name="gender" className="m-3"
                        value="female"
                        checked={formData?.gender === 'female'}
                        onChange={handleChange}
                    /><br />
                    <label className="label" htmlFor="female">Female</label>
                </div>

                <div>
                    {isEditing ? (
                        <button type="button" className="btn btn-secondary m-3" onClick={handleUpdate}>
                            Update
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary m-3">
                            Submit
                        </button>
                    )}
                </div>
            </form>
            <ListItems
                users={users}
                onEdit={handleEdit}
                handleDelete={handleDelete} />
        </div>
    )
}

export default UserData