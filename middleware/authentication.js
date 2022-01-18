const jwt = require('jsonwebtoken');
const Register = require('../model/schema');

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.cp;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const currentUser = await Register.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!currentUser) {
            console.log("User Not Found");
        }
        req.token = token;
        req.currentUser = currentUser;
        req.userId = currentUser._id;
        next();
    }
    catch (error) {
        console.log("Some Error Occured To Authenticate User " + error);
        return res.status(401).send("Some Error Occured To Authenticate User " + error);
    }
}

module.exports = authentication;