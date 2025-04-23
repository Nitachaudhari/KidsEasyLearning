const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const storyRoutes = require('./routes/storyRoutes');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const path = require('path');

const app = express();

app.use(express.json());


app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get('/health', (req, res) => {
  res.send("Kids learning backend is running");
});

app.use('/api/auth', authRoutes);
app.use("/stories", express.static(path.join(__dirname, "public/stories")));
app.use('/stories', storyRoutes);
app.use('/quizzes', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
