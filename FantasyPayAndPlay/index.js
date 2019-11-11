const express = require("express");
const path = require('path');
const app = require("./server/server");


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/public'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});