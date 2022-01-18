import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    const [status, setStatus] = useState(false);
    const [username, setUsername] = useState({});
    
    const homePage = async (e) => {
        try {
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            const name = data.firstname;
            setUsername({ ...username, name });
            setStatus(true);
        }
        catch (error) {
            // console.log("Some Error Occured In Home Page " + error);    
        }
    }

    useEffect(() => {
        homePage();
    }, [])

    return (
        <>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="content-primary">
                                <h1>{status ? username.name: "Hellow"}, Welcome to control system</h1>
                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptatem dolores odit ipsam fugit amet, natus esse a in soluta! Debitis voluptatem dolores odit ipsam fugit amet, natus esse a in soluta!</span>
                                <button type="button" className="myBtn btnstart"><Link to="./control">Start<i className="fa fa-angle-right"></i></Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="infosection">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="headerline">System Info</h1>
                            <div className="mainbox">
                                <div className="box">
                                    <h3>MongoDB Database</h3>
                                    <div className="line">
                                        <span className="hori-line-blue"></span><span className="hori-line-gray"></span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam perspiciatis corrupti delectus autem temporibus nobis adipisci ullam dolores, quo enim esse quae rem quas consequuntur ex dolore odio maiores.</p>
                                    <div className="boxover"></div>
                                </div>
                                <div className="box">
                                    <h3>Express.JS</h3>
                                    <div className="line">
                                        <span className="hori-line-blue"></span><span className="hori-line-gray"></span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam perspiciatis corrupti delectus autem temporibus nobis adipisci ullam dolores, quo enim esse quae rem quas consequuntur ex dolore odio maiores.</p>
                                    <div className="boxover"></div>
                                </div>
                                <div className="box">
                                    <h3>React.JS</h3>
                                    <div className="line">
                                        <span className="hori-line-blue"></span><span className="hori-line-gray"></span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam perspiciatis corrupti delectus autem temporibus nobis adipisci ullam dolores, quo enim esse quae rem quas consequuntur ex dolore odio maiores.</p>
                                    <div className="boxover"></div>
                                </div>
                                <div className="box">
                                    <h3>BackEnd - Node.JS</h3>
                                    <div className="line">
                                        <span className="hori-line-blue"></span><span className="hori-line-gray"></span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam perspiciatis corrupti delectus autem temporibus nobis adipisci ullam dolores, quo enim esse quae rem quas consequuntur ex dolore odio maiores.</p>
                                    <div className="boxover"></div>
                                </div>
                                <div className="box">
                                    <h3>JavaScript</h3>
                                    <div className="line">
                                        <span className="hori-line-blue"></span><span className="hori-line-gray"></span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam perspiciatis corrupti delectus autem temporibus nobis adipisci ullam dolores, quo enim esse quae rem quas consequuntur ex dolore odio maiores.</p>
                                    <div className="boxover"></div>
                                </div>
                                <div className="box">
                                    <h3>Design HTML CSS</h3>
                                    <div className="line">
                                        <span className="hori-line-blue"></span><span className="hori-line-gray"></span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam perspiciatis corrupti delectus autem temporibus nobis adipisci ullam dolores, quo enim esse quae rem quas consequuntur ex dolore odio maiores.</p>
                                    <div className="boxover"></div>
                                </div>
                                <div className="box">
                                    <h3>Bootstrap 5</h3>
                                    <div className="line">
                                        <span className="hori-line-blue"></span><span className="hori-line-gray"></span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam perspiciatis corrupti delectus autem temporibus nobis adipisci ullam dolores, quo enim esse quae rem quas consequuntur ex dolore odio maiores.</p>
                                    <div className="boxover"></div>
                                </div>
                                <div className="box">
                                    <h3>Signup With Authentication</h3>
                                    <div className="line">
                                        <span className="hori-line-blue"></span><span className="hori-line-gray"></span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam perspiciatis corrupti delectus autem temporibus nobis adipisci ullam dolores, quo enim esse quae rem quas consequuntur ex dolore odio maiores.</p>
                                    <div className="boxover"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
