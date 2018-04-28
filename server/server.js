const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
require('./modules/mongoose');

const taskRouter = require('./routes/task.router');

app.use(express.static('server/public'));
app.use(bodyParser.json());

app.use('/task', taskRouter);

app.listen(PORT, () => {
  console.log('listening on port ', PORT);
})