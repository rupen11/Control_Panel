import React, { useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();
    const logoutall = async () => {
        try {
            const userLogout = await fetch("/logoutall", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (userLogout.status === 200) {
                dispatch({ type: "USER", payload: false });
                // console.log("Logout All Device Successfully");
                history.push("/");
            }
            else {
                // console.log("Can Not Logout User or User Already Logout All Devices");
                history.push("/login");
            }
        }
        catch (error) {
            // console.log("Error Occured To Logout All Devices " + error);
        }
    }

    useEffect(() => {
        logoutall();
    }, [])

    return (
        <>
            <h1>Logout All</h1>
        </>
    )
}

export default Logout
