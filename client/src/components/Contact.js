import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

const Contact = () => {
    const history = useHistory();
    let tarName, tarValue;
    const [userContactData, setUserContactData] = useState({
        name: "",
        mobile: "",
        email: "",
        message: ""
    });

    const userContact = async (req, res) => {
        try {
            const res = await fetch("/getContact", {
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            let fullname = data.firstname + " " + data.lastname;
            setUserContactData({ ...userContactData, name: fullname, mobile: data.mobile, email: data.email });
            if (!res.status === 200) {
                // console.log("Some Error Occured To Get User Contact Data ");
            }
        }
        catch (error) {
            console.log("Some Error Occured Contact " + error);
            history.push("/login");
        }
    }

    const userContactMessage = async (e) => {
        try {
            e.preventDefault();
            const { name, mobile, email, message } = userContactData;
            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, mobile, email, message
                })
            });
            if (res.status === 201) {
                // console.log("Message Send");
                window.alert("Message Sent, We will contact you shortly");
                setUserContactData({ ...userContactData, message: "" });
            }
            else {
                // console.log("Message Not Send");
                window.alert("Message Not Send");
            }
        }
        catch (error) {
            console.log("Some Error Occure To Contact Page " + error);
        }
    }

    const getContactInput = (e) => {
        tarName = e.target.name;
        tarValue = e.target.value;
        setUserContactData({ ...userContactData, [tarName]: tarValue });
    }

    useEffect(() => {
        userContact();
    }, [])

    return (
        <>
            <div id="contactsection">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="formsection">
                                <div className="innerform">
                                    <h3>Get in touch</h3>
                                    <form method="POST" className="myForm">
                                        <div className="mycontactinput">
                                
                                            <input type="text" name="name" id="name" className="myInput" placeholder="Name" value={userContactData.name} onChange={getContactInput} />
                                            <input type="text" name="Mobile" id="Mobile" className="myInput" placeholder="Mobile Number" value={userContactData.mobile} onChange={getContactInput} />
                                            <input type="text" name="email" id="email" className="myInput" placeholder="Email ID" value={userContactData.email} onChange={getContactInput} />
                                        </div>
                                        <textarea name="message" id="message" className="myTextarea" placeholder="Message" value={userContactData.message} onChange={getContactInput}></textarea>
                                        <button type="submit" className="btn-blue" onClick={userContactMessage}>Send Message</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
