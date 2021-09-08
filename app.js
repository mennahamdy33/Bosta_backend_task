const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
// app.use(bodyParser.json());

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
// app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=> {
    res.send(console.log('Hi'));
})
app.use('/', require("./routes/signUp"));
app.use('/', require("./routes/signin"));

// starting the server
app.listen(PORT, ()=> {
    console.log('app is running on port' , PORT);
});




