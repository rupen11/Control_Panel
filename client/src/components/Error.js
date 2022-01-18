import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <>
            <div id="errorpage" className="container text-center">
                <div className="error-content">
                    <div className="errorpage-404">
                        <h1>404</h1>
                    </div>
                    <div className="error-text">
                        <h1>Sorry Page Not Found!</h1>
                        <span>The page you are looking for cannot be found or has been temporarily closed</span>
                        <button type="button" className="myBtn btn-blue"><Link to="/">Home Page</Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error
