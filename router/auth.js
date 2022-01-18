const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');
const router = express.Router();

require("../db/conn");
const Register = require('../model/schema');
const Product = require('../model/productSchema');

router.get("/logout", authentication, (req, res) => {
    try {
        req.currentUser.tokens = req.currentUser.tokens.filter((presentEle) => {
            return presentEle.token !== req.token;
        });
        res.clearCookie("cp");
        // console.log("Logout Sucessful");
        req.currentUser.save();
        res.status(200).send("Logout");
    }
    catch (error) {
        res.status(400).send("Some Error Occured To Logout " + error);
    }
});

router.get("/logoutall", authentication, (req, res) => {
    try {
        res.clearCookie("cp");
        req.currentUser.tokens = [];
        req.currentUser.save();
        // console.log("Logout All Device Sucessful");
        res.status(200).send("Logout All");
    }
    catch (error) {
        res.status(400).send("Some Error Occured To Logout " + error);
    }
});

router.get("/about", authentication, (req, res) => {
    res.send(req.currentUser);
});

router.get("/getContact", authentication, (req, res) => {
    res.send(req.currentUser);
});

router.get("/getData", authentication, (req, res) => {
    res.send(req.currentUser);
});

router.get("/productData", async (req, res) => {
    const getProductData = await Product.find({});
    if (getProductData) {
        res.status(200).send(getProductData);
    }
    else {
        res.status(400).send("No Data Available");
    }
});

router.post("/register", async (req, res) => {
    const { email, password, confirmpassword, firstname, lastname, mobile, profession, experience } = req.body;
    if (!email || !password || !confirmpassword || !firstname || !lastname || !mobile || !profession || !experience) {
        return res.status(422).send("Field Can Not Be Blank");
    }

    try {
        const exist = await Register.findOne({ email: email });

        if (exist) {
            // console.log("User Already Exists");
            return res.status(400).send("User Already Exists");
        }
        else {
            if (password == confirmpassword) {
                const user = new Register({ email, password, confirmpassword, firstname, lastname, mobile, profession, experience });
                const token = await user.generateAuthToken();

                res.cookie("cp", token, {
                    expires: new Date(Date.now + 600000),
                    httpOnly: true
                });

                const userRegister = await user.save();
                if (userRegister) {
                    // console.log("Register Successful");
                    return res.status(201).send("Register Successful");
                }
                else {
                    // console.log("Failed To Register");
                    return res.status(404).send("Failed To Register");
                }
            }
            else {
                // console.log("Password Not Match");
                return res.status(422).send("Password Doesn't Match");
            }
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        // console.log("Field Can Not Be Blank");
        return res.status(400).send("Field Can Not Be Blank");
    }
    else {
        const matchUser = await Register.findOne({ email: email });
        if (!matchUser) {
            // console.log("EmailID Can Not Be Find");
            return res.status(400).send("EmailID Can Not Be Find");
        }
        else {
            const token = await matchUser.generateAuthToken();

            res.cookie("cp", token, {
                expires: new Date(Date.now + 600000),
                httpOnly: true
            });

            const isMatch = await bcrypt.compare(password, matchUser.password);
            if (isMatch) {
                // console.log("Login Successful");
                return res.status(201).send("Login Successful");
            }
            else {
                // console.log("Invalid Password");
                return res.status(400).send("Invalid Password");
            }
        }
    }
})

router.post("/contact", authentication, async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;
        if (!name || !email || !mobile || !message) {
            // console.log("Please Fill The Contact Form");
            return res.status(401).send("Please Fill The Contact Form");
        }
        else {
            const userContactFind = await Register.findOne({ _id: req.userId });
            if (!userContactFind) {
                // console.log("Please Login First");
            }
            else {
                const userMessage = await userContactFind.addMessage(name, email, mobile, message);
                await userContactFind.save();
                // console.log("Message Saved Successfully");
                return res.status(201).send("Message Saved Successfully");
            }
        }
    }
    catch (error) {
        // console.log("Some Error Occured In Contact " + error);
        return res.status(401).send("Some Error Occured In Contact " + error);
    }
});

router.post("/productData", async (req, res) => {
    try {
        const { customerid, customername, email, contact, productname, productprice, productquantity, totalamount } = req.body;

        if (!customerid || !customername || !email || !contact || !productname || !productprice || !productquantity || !totalamount) {
            return res.status(422).send("Product Field Can Not Be Blank");
        }
        else {
            const existCustomer = await Product.findOne({ customerid: customerid });
            if (existCustomer) {
                // console.log("Customer Already Entire");
                res.status(400).send("Customer Already Entire");
            }
            else {
                const productdata = new Product({ customerid, customername, email, contact, productname, productprice, productquantity, totalamount });
                const productSave = await productdata.save();
                if (productSave) {
                    // console.log("Record Saved Successfully");
                    res.status(200).send("Record Saved Successfully");
                }
                else {
                    // console.log("Record Not Saved");
                    res.status(400).send("Record Not Saved");
                }
            }
        }
    }
    catch (error) {
        // console.log("Some Error Occured TO Save Product " + error);
        res.status(400).send("Some Error Occured TO Save Product " + error);
    }
});

router.post("/updateProductData", async (req, res) => {
    try {
        const { customerid, customername, email, contact, productname, productprice, productquantity, totalamount } = req.body;

        if (!customerid || !customername || !email || !contact || !productname || !productprice || !productquantity || !totalamount) {
            return res.status(422).send("Product Field Can Not Be Blank");
        }
        else {
            const productDataFind = await Product.findOne({ customerid: customerid });
            if (!productDataFind) {
                res.status(400).send("Product not found by this customer id");
            }
            else {
                const productDataUpdate = await Product.updateOne({ customerid: customerid }, {
                    $set: {
                        customername: customername,
                        email: email,
                        contact: contact,
                        productname: productname,
                        productprice: productprice,
                        productquantity: productquantity,
                        totalamount: totalamount
                    }
                });
                console.log(productDataUpdate);
                if (productDataUpdate) {
                    console.log("Record Update Successfully");
                    res.status(200).send("Record Update Successfully");
                }
                else {
                    console.log("Record Not Update");
                    res.status(400).send("Record Not Update");
                }
            }
        }
    }
    catch (error) {
        // console.log("Some Error Occured TO Save Product " + error);
        res.status(400).send("Some Error Occured TO Save Product " + error);
    }
});

router.post("/deleteProductData", async (req, res) => {
    try {
        const { customerid } = req.body;

        if (!customerid) {
            return res.status(422).send("Product Delete Field Can Not Be Blank");
        }
        else {
            const productDataFind = await Product.findOne({ customerid: customerid });
            if (!productDataFind) {
                res.status(400).send("Product not found by this customer id");
            }
            else {
                const productDataDelete = await Product.deleteOne({ customerid: customerid });
                if (productDataDelete) {
                    // console.log("Delete Successful");
                    res.status(200).send("Delete Successful");
                }
                else {
                    // console.log("Delete Not Successful");
                    res.status(400).send("Delete Not Successful");
                }
            }
        }
    }
    catch (e) {
        // console.log("Error occurs in delete product " + e);
        res.status(400).send("Error occurs in delete product " + e);
    }
});

router.post("/searchProductData", async (req, res) => {
    try {
        const { customerid } = req.body;

        if (!customerid) {
            return res.status(422).send("Product Search Field Can Not Be Blank");
        }
        else {
            const productDataSearch = await Product.findOne({ customerid: customerid });
            if (productDataSearch) {
                res.status(200).send(productDataSearch);
            }
            else {
                // console.log("Data Not Found");
                res.status(400).send("Data Not Found");
            }
        }
    }
    catch (e) {
        // console.log("Error occurs in search " + e);
        res.status(400).send("Error occurs in search " + e);
    }
});

module.exports = router;