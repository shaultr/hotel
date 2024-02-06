const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/rooms', require('./routes/roomsRoute'))
app.use('/images', require('./routes/imagesRoute'))
app.use('/admin', require('./routes/adminRoute'))

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("The server is runnig on port " + port));