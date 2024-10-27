const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import models
const User = require('./models/Users');
const Photo = require('./models/Photos');
const AcademicProfile = require('./models/AcademicProfile');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/useless_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Get User by ID
app.get('/users/', async (req, res) => {
  try {
    const user = await User.find().populate('AcademicProfile');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('AcademicProfile');
      console.log(user)
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
app.post('/signin', async (req, res) => {
    const { password, email } = req.body;
    console.log(email,password, req.body);
    const user = await User.findOne({email, password}).populate('AcademicProfile');
    if(!user)
        return res.status(400).json({ message: "Invalid Email or Password!"})
    else
        return res.status(200).json({ message: "Login Successful", userId: user._id})
})

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const newUser = new User({ username, password, email });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/photosall', async(req,res) => {
    try {
        const photo = await Photo.find();
        if (!photo) return res.status(404).json({ message: 'Photo not found' });
        res.json(photo);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

// Get Photo by ID
app.get('/photos/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Academic Profile by ID
app.get('/academicProfiles/:id', async (req, res) => {
  try {
    const profile = await AcademicProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Academic profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create User
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create Photo
app.post('/photos', async (req, res) => {
  const photo = new Photo(req.body);
  try {
    const savedPhoto = await photo.save();
    res.status(201).json(savedPhoto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create Academic Profile
app.post('/academicProfiles', async (req, res) => {
  const profile = new AcademicProfile(req.body);
  try {
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
