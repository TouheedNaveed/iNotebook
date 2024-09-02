const express = require('express');
const connectToMongo = require('./db');
const app = express();
connectToMongo();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
