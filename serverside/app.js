const express = require('express');
const route = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



var app = express();
const port = 3000;
app.use(cors());
app.get('/', (req, res) => {
    res.send('Project Working');
})


app.use('/', route)


mongoose.connect('mongodb+srv://shivam:9125078527@cluster0.4e0jp.mongodb.net/template?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    ).then(
        console.log('connected')
    )
    
app.listen(port);