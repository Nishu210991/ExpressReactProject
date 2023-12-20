const connectToMongo = require('./db')
const express = require('express')
connectToMongo();

const app = express()
const port = 5000

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
  console.log(`Example app listening on port ${port}`)
})

