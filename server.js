const express = require('express');
// const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/ensolvers'));
app.get('/*', (req, resp)=>{
  resp.sendFile(__dirname + '/dist/ensolvers/index.html');
})

app.listen(process.env.PORT || 8080);
