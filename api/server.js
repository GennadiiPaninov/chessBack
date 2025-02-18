const express = require("express");

const app = express();

app.get('/', (req, res) => res.send('Express on V'));


app.listen(8080, () => console.log(`Server running on port ${8080}`));

module.export = app