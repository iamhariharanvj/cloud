const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Item = require('./models/item');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

mongoose.connect('mongodb+srv://hariharanvj:hari@cluster0.a69zphe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect('/');
});

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndUpdate(id, req.body);
    res.redirect('/');
});

app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
