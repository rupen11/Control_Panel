import React, { useContext } from 'react'
import logo from "../images/logo.jpg";
import { Link } from 'react-router-dom';
import { UserContext } from "../App";

const Header = () => {
    const { state, dispatch } = useContext(UserContext);
    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/control">Control System</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/About">About Me</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/control">Control System</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/About">About Me</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Singup</Link>
                    </li>
                </>
            )
        }

    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mymenubar">
            <Link className="navbar-brand" to="#"><h3 className="maintext">Control <span>Panel</span></h3><i className="fa fa-cubes"></i></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto menubar">
                        <RenderMenu/>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header
