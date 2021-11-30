const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const userRouter  = require('./routers/user.router');

const app = express();
dotenv.config();

// const userRouter = require('./routers/user.router');
const port = process.env.PORT || 3003;

// configure cors

// request parser
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// routing setup
app.use('/api/v1/users', userRouter);
// app.use('/', userRouter);

// error handling

app.listen(port, () => {
    console.log(`app listening to port ${port}`);
})
