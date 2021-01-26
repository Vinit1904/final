import React, { useEffect, useState } from 'react'
import 'bootstrap'
import ProblemEditor from './ProblemEditor'
import Error from './Error'
import NavBar from '../Navbar'
import { NavBar2 } from '../NavBar2'

const SolveChallenge = ({ match }) => {

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("token"));
    const [x, setX] = useState();
    const [y, setY] = useState();

    let i = "2 ";
    let o = "";
    const [problemInfo, setProblemInfo] = useState({
        "problemName": "",
        "difficulty": "",
        "tags": "",
        "description": "",
        "testCases": ""
    });

    // const getInputOutput = () => {
    //     console.log(problemInfo.testCases[0].input);
    //     for(var x of problemInfo.testCases){
    //         i += x.input;
    //         i += " ";
    //     }

    //     for(var y of problemInfo.testCases){
    //         o += y.output;
    //         o += " ";
    //     }
    //     console.log(i);
    //     console.log(o);
    //     setXAndY();
    // }

    const setXAndY = () => {
        setX(i);
        setY(o);

        console.log(x);
        console.log(y);
    }

    const reqBody = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }

    const getProblemDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/problem/one/${match.params.id}/${match.params.name}`, reqBody);
            const data = await response.json();
            console.log(data);
            setProblemInfo(data);
        } catch (e) {
            <Error />
        }

        //getInputOutput();    
    }

    useEffect(() => {
        getProblemDetails();
    }, []);

    return (
        <div className="container-fluid p-0">
            {isLogged ? <NavBar2 /> : <NavBar />}

            <div className="problemcontent">
                <p>{problemInfo.problemName}</p>
                <p>{problemInfo.difficulty}</p>
                <p>{problemInfo.tags}</p>
                <div dangerouslySetInnerHTML={{ __html: problemInfo.description }} />
                <ProblemEditor tags={problemInfo.tags} test={problemInfo.testCases} />
            </div>

        </div>
    )
}

export default SolveChallenge
