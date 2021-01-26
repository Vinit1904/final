import React,{useState} from "react";
import './App.css';
import {Link} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { BsCodeSlash } from "react-icons/bs";

function Nav(){
    const [isAdmin,setIsAdmin] = useState(sessionStorage.getItem("role"));
    return(
        <div classNameName="container-fluid">
            <nav className="navbar navbar-expand-lg shadow-sm rounded" style={{"backgroundColor" : "#f9f7f7"}}>
                <Link to = "/" className="navbar-brand"><BsCodeSlash size="2em" color="#112d4e"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item active mx-3">
                        <a className="nav-link" href = {isAdmin ? '/AddCourse' : '/'} style={{"color" : "#112d4e"}}>Home</a>
                    </li>
                    <li className="nav-item mx-3">
                        <a className="nav-link" href = "/Login"  style={{"color" : "#112d4e"}}>Login</a>
                    </li>
                    <li className="nav-item mx-3">
                        <a className="nav-link" href = "/form"  style={{"color" : "#112d4e"}}>Register</a>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
export default Nav;