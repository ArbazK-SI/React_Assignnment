const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();



const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoURI = 'mongodb+srv://arbazkhan:IvsUPoLmKTsZxZpX@cluster0.3r8r5ka.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import and use your routes
const equipmentRoutes = require('./routes/equipmentRoutes');
const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const sportRoutes = require('./routes/sportRoutes'); // Import your sport routes
const employeeRoutes = require('./routes/employeeRoutes');
const adminRoutes = require('./routes/adminRoutes');


// Use your routes with appropriate prefixes
app.use('/api/equipment', equipmentRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/sports', sportRoutes); // Use the sport routes
// Use admin and employee authentication routes
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
