const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/rooms', require('./routes/roomsRoute'))
app.use('/images', require('./routes/imagesRoute'))
app.use('/admin', require('./routes/adminRoute'))
app.use('/customer', require('./routes/customerRoute'))
app.use('/create-payment', require('./routes/stripeRoute'))

app.listen(8000, () => console.log("The server is runnig on port 8000"));