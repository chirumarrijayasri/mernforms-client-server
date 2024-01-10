import users from '../models/model.js'
import mongoose from 'mongoose'

export const readUser = async (req, res) => {
    try {
        const readUser = await users.find()
        res.status(200).json(readUser);
    } catch(err) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const createUser = new users(req.body);
        await createUser.save();

        const updatedUsers = await users.find({});
        res.status(201).json(updatedUsers); // 201 Created status for successful creation
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
};

export const readPerticularUser = async(req, res) => {
    const getUser = await users.findById(req.params.id)
    res.json(getUser)

}

export const updateUser = async(req,res) => {
    let id = req.params.id
    console.log('Updating user with ID:', req.params.id)
    let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        age: req.body.age,
        profile: req.body.profile,
        bio: req.body.bio,
        interests: req.body.interests
    }
    try {
        console.log('New user data:', newUser);
        const result = await users.findByIdAndUpdate(id, newUser, {new: true})
        if (!result) {
            return res.status(404).send("User not found");
        }
        res.send(result)

    } catch(err) {
        if (err.name === 'ValidationError') {
            
            return res.status(400).send(err.message);
        }
    
        console.error(err);
        res.status(500).send("internal server error")
    }
}

export const updateSmallChangesUser = async (req, res) => {
    try {
        const getUser = await users.findById(req.params.id);

        if (!getUser) {
            return res.status(404).json({ message: "User not found" });
        }

        getUser.firstName = req.body.firstName;
        getUser.lastName = req.body.lastName;

        await getUser.save();
        res.json(getUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
          }
      const deletedUser = await users.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


