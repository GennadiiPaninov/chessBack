const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false } // Нужно для Railway
// });
app.get('/', (req, res) => res.send('Express on V'));


app.listen(port, () => console.log(`Server running on port ${port}`));
