const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 10000;

// Use environment variable for MongoDB URI or fallback to default
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://navalthakur70:RfDyFM6oydhjD4M2@myinstagramdb-cluster.ueymcds.mongodb.net/?tls=true';

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const userSchema = new mongoose.Schema({
  instagramAccount: { type: String, unique: true },
  password: String
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return this.password === candidatePassword;
};

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { instagramAccount, password } = req.body;
  console.log(`Received registration request for: ${instagramAccount}`);
  
  try {
    const existingUser = await User.findOne({ instagramAccount });

    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    const newUser = new User({ instagramAccount, password });
    await newUser.save();

    console.log('User registered successfully');
    res.json({
      message: 'User registered successfully',
      success: true,
      redirectTo: '/login.html'
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
});

app.post('/login', async (req, res) => {
  const { instagramAccount, password } = req.body;

  try {
    const user = await User.findOne({ instagramAccount });

    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({ message: 'Invalid username or password', success: false });
    }

    res.cookie('session', 'authenticated');
    res.json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
});

const authenticateUser = (req, res, next) => {
  const isAuthenticated = req.cookies && req.cookies.session === 'authenticated';

  if (isAuthenticated) {
    next();
  } else {
    res.redirect('/login.html');
  }
};

app.use(['/home.html', '/about.html', '/contact.html', '/links.html'], authenticateUser);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
