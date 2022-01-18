const mongoose = require('mongoose');

// Connection To Database
const database = process.env.DATABASE;
mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection Successful To Database");
}).catch((error) => {
    console.log("Some Error Occured To Connect Database " + error);
});