import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from "../App";

const Signup = () => {
    const { state, dispatch } = useContext(UserContext);
    
    let history = useHistory();
    let tarName, tarValue;
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        firstname: "",
        lastname: "",
        mobile: "",
        profession: "",
        experience: ""
    });

    const getInput = (e) => {
        tarName = e.target.name;
        tarValue = e.target.value;
        setUser({ ...user, [tarName]: tarValue });
    }

    const submitUser = async (e) => {
        e.preventDefault();
        const { email, password, confirmpassword, firstname, lastname, mobile, profession, experience } = user;
        const userSignupData = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, password: password, confirmpassword: confirmpassword, firstname: firstname, lastname: lastname, mobile:mobile, profession: profession, experience: experience
            })
        });

        const signupData = userSignupData.json();
        if (userSignupData.status === 422 || !signupData) {
            window.alert("Password Doesn't Match");
            // console.log("Failed To Register");
        }
        else if (userSignupData.status === 400) {
            window.alert("User Already Exists");
        }
        else if (userSignupData.status === 404) {
            window.alert("Failed To Register");
            }
        else {
            dispatch({type:"USER", payload: true});
            // window.alert("Success To Register");
            // console.log("Success To Register");
            history.push("/");
        }
    }

    return (
        <>
            <div id="signup">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="control-signup-section">
                                <div className="control-signup">
                                    <h5>Join<Link to="/">control <span>panel</span><i className="fa fa-cubes"></i></Link></h5>
                                    <h3>Create Your Account</h3>
                                    <form method="post" id="myForm">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-12">
                                                <label htmlFor="email">EmailID</label><span>*</span>
                                                <input type="email" name="email" className="myInput" id="email" placeholder="Email" title="Email" autoComplete="off" value={user.email} onChange={getInput} />

                                                <label htmlFor="password">Password</label><span>*</span>
                                                <input type="password" name="password" className="myInput" id="password" placeholder="Password" title="Password" autoComplete="off" value={user.password} onChange={getInput} />

                                                <label htmlFor="confirmpassword">Confirm Password</label><span>*</span>
                                                <input type="password" name="confirmpassword" className="myInput" id="confirmpassword" placeholder="Confirm Password" title="Confirm Password" autoComplete="off" value={user.confirmpassword} onChange={getInput} />

                                                <label htmlFor="mobile">Mobile Number</label><span>*</span>
                                                <input type="text" name="mobile" className="myInput" id="mobile" placeholder="Mobile Number" title="Mobile Number" autoComplete="off" value={user.mobile} onChange={getInput} />
                                            </div>

                                            <div className="col-md-6 col-sm-12">
                                                <label htmlFor="profession">Profession</label><span>*</span>
                                                <input type="text" name="profession" className="myInput" id="profession" placeholder="Profession" title="Profession" autoComplete="off" value={user.profession} onChange={getInput} />
                                                
                                                <label htmlFor="experience">Experience</label><span>*</span>
                                                <input type="text" name="experience" className="myInput" id="experience" placeholder="Experience" title="Experience" autoComplete="off" value={user.experience} onChange={getInput} />

                                                <label htmlFor="firstname">Firstname</label><span>*</span>
                                                <input type="text" name="firstname" className="myInput" id="firstname" placeholder="Firstname" title="Firstname" autoComplete="off" value={user.firstname} onChange={getInput} />

                                                <label htmlFor="lastname">Lastname</label><span>*</span>
                                                <input type="text" name="lastname" className="myInput" id="lastname" placeholder="Lastname" title="Lastname" autoComplete="off" value={user.lastname} onChange={getInput} />
                                            </div>
                                        </div>

                                        <button type="submit" id="signupbtn" className="btn-signup" onClick={submitUser}>Sign up</button>
                                    </form>
                                    <div className="oldSignin">
                                        <p>Already have an account ?<Link to="/login">Sign in here</Link>.</p>
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

export default Signup
