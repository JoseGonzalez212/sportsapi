const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./routes/index');
const teamsRouter = require('./routes/teams');
const gamesRouter = require('./routes/games');
const playersRouter = require('./routes/players');
const userRouter = require('./routes/user');
const draftRounter = require('./routes/draft');

const mongoose = require('mongoose');
// enter password for 'PWD'
mongoose.connect('mongodb+srv://jose123:jose123@cluster0.vml09.mongodb.net/development?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("connected to database"));

app.use(express.json());

app.use('/home', indexRouter);
app.use('/teams', teamsRouter);
app.use('/games', gamesRouter);
app.use('/players', playersRouter);
app.use('/user', userRouter);
app.use('/draft', draftRounter);

app.listen(port, () => console.log(`Sports API app listening on port ${port}`))
