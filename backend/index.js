const connectToMongo = require("./db");
const express = require("express");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const cors = require('cors')

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

//Available Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


app.listen(port, () => {
    console.log(`iNoteBook Server is running on port http://localhost:${port}`);
})