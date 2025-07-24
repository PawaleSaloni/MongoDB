const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// App setup
const app = express();
const PORT = 9000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (flowers database)
mongoose.connect('mongodb://localhost:27017/flowers');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Mongoose schema and model for Flower
const flowerSchema = new mongoose.Schema({
    flowerid: String,
    name: String,
    color: String,
    price: String,
    stock: String,
    imageurl: String,
    category: String
});

const Flower = mongoose.model('Flower', flowerSchema, 'flotus');

// --- REST API Routes ---

// Create flower
app.post('/api/flowers', async (req, res) => {
    try {
        const flower = new Flower(req.body);
        await flower.save();
        res.status(201).send(flower);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all flowers
app.get('/api/flowers', async (req, res) => {
    try {
        const flowers = await Flower.find({});
        res.send(flowers);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a single flower
app.get('/api/flowers/:id', async (req, res) => {
    try {
        const flower = await Flower.findById(req.params.id);
        if (!flower) return res.status(404).send({ message: "Flower not found" });
        res.send(flower);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a flower
app.put('/api/flowers/:id', async (req, res) => {
    try {
        const flower = await Flower.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!flower) return res.status(404).send({ message: "Flower not found" });
        res.send(flower);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a flower
app.delete('/api/flowers/:id', async (req, res) => {
    try {
        const flower = await Flower.findByIdAndDelete(req.params.id);
        if (!flower) return res.status(404).send({ message: "Flower not found" });
        res.send({ message: "Flower deleted" });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
