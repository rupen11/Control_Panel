import React, { useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    
    const history = useHistory();
    const logout = async () => {
        try {
            const userLogout = await fetch("/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (userLogout.status === 200) {
                dispatch({type:"USER", payload: false});
                // console.log("Logout Successfully");
                history.push("/");
            }
            else {
                // console.log("Can Not Logout User or User Already Logout");
                history.push("/login");
            }
        }
        catch (error) {
            // console.log("Error Occured To Logout " + error);
        }
    }

    useEffect(() => {
        logout();
    }, [])

    return (
        <>
            <h1>Logout</h1>
        </>
    )
}

export default Logout
