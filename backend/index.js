const express = require('express');
const connectToMongo = require('./db');
const app = express();
connectToMongo();
const PORT = process.env.PORT || 5000;
app.use(express.json());
var cors=require('cors');
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.use('/api/contact',require('./routes/contact'));

app.listen(PORT, () => {
  console.log(`iNotebook Server is running on port ${PORT}`);
});
