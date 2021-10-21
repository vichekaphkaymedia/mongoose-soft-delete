const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const errorHandler = require('./middleware/error')

const courses = require('./routes/courses');
// load env vars
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// Connect to database
mongoose.connect(process.env.MONGODB_LOCAL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('Successfully connected to database'))
    .catch(err => {
        console.log('Could not connect to database. Exiting now!...', err)
    });
app.get('/', (req, res) => res.send({message: "Welcome to mongoose validation API"}));
app.use('/courses', courses);

app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));