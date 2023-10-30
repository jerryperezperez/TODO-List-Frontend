const express = require('express');
// const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/ensolvers'));

app.all('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/ensolvers/index.html');
});

app.listen(process.env.PORT || 8080);
