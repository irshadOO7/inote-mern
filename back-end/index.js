const  mongooseToConnect = require("./db.js");
const express = require('express')

mongooseToConnect();

const app = express()
const port = 5000

// Avalaible Routes
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})