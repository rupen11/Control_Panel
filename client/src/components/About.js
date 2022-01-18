import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import user from "../images/user.png";

const About = () => {
    const history = useHistory();

    const [userdata, setUserdata] = useState({});

    const callAboutPage = async (req, res) => {
        try {
            const resAbout = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            const data = await resAbout.json();
            setUserdata(data);

            if (!resAbout.status === 200) {
                // console.log("Some Error");
            }
        }
        catch (error) {
            console.log("Some Error Occure In About Page " + error);
            history.push("/login");
        }
    }
    // console.log(userdata.email);

    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <>
            <div className="container mt-5" id="aboutsection">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="aboutbox">
                            <div className="about-title">
                                <h1>Your Account</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12">
                                    <div className="about-content">
                                        <div className="myaccount">
                                            <table>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{userdata.firstname} {userdata.lastname}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email ID</td>
                                                    <td>{userdata.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile Number</td>
                                                    <td>{userdata.mobile}</td>
                                                </tr>
                                                <tr>
                                                    <td>Profession</td>
                                                    <td>{userdata.profession}</td>
                                                </tr>
                                                <tr>
                                                    <td>Experience</td>
                                                    <td>{userdata.experience}</td>
                                                </tr>
                                            </table>
                                            <hr />
                                            <p><Link to="/logout">Logout</Link></p>
                                            <p><Link to="/logoutall">Logout All Device</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
