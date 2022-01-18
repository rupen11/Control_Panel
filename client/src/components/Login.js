import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from "../App";

const Login = () => {
    const {state, dispatch} = useContext(UserContext);

    let tarName, tarValue;
    let history = useHistory();
    const [loginuser, setLoginuser] = useState({
        email: "", password: ""
    });

    const getLoginInput = (e) => {
        tarName = e.target.name;
        tarValue = e.target.value;
        setLoginuser({ ...loginuser, [tarName]: tarValue });
    };

    const accessuser = async (e) => {
        e.preventDefault();
        const { email, password } = loginuser;
        const userLoginData = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:email, password:password
            })
        });

        const loginData = userLoginData.json();
        if (userLoginData.status === 400 || !loginData) {
            window.alert("Invalid Email or Password");
            // console.log("Failed To Login");
        }
        else {
            dispatch({type:"USER", payload: true});
            // window.alert("Success To Login");
            // console.log("Success To Login");
            history.push("/");
        }
    }

    return (
        <>
            <div id="signin">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="control-signin-section">
                                <div className="control-signin">
                                    <h2>Sign in to <Link to="/">control <span>panel</span></Link></h2>
                                    <form method="post" id="myForm">
                                        <label htmlFor="email">EmailID</label><span>*</span>
                                        <input type="email" name="email" className="myInput" id="email" placeholder="Email" title="Email" value={loginuser.email} onChange={getLoginInput} />

                                        <label htmlFor="password">Password</label><span>*</span>
                                        <input type="password" name="password" className="myInput" id="password" placeholder="Password" title="Password" value={loginuser.password} onChange={getLoginInput} />

                                        <button type="submit" id="signinbtn" className="btn-signin" onClick={accessuser}>Sign in</button>
                                    </form>
                                    <div className="newSignup">
                                        <p>New to control <span>panel</span>?<Link to="/signup">Creat an account</Link>.</p>
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

export default Login
