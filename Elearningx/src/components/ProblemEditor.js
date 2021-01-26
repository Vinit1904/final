import { ControlledEditor } from '@monaco-editor/react'
import React, { useState, useEffect } from 'react'
import { problem } from './program'
import Error from './Error'
import { useHistory } from 'react-router-dom'
import NavBar from '../Navbar'
import { NavBar2 } from '../NavBar2'

const ProblemEditor = (props) => {

  const [isLogged, setIsLogged] = useState(sessionStorage.getItem("token"));

  let history = useHistory();
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [matches, setMatches] = useState(0);
  const res = ["3 3", "7 5"];
  let r = "";

  //let stdi = '3 5 1 2 3 4 5 5 2 3 8 6 7 3 6 7 8';
  //   res.forEach(x =>{
  //     r += x;
  //     r += " ";
  //   });
  //   console.log(r);

  //   let i = "2 ";
  //   props.test.forEach(x => {
  //         i += x.input;
  //         i += " ";
  //   })

  //const stdi = props.ip;

  //console.log(props.test);

  //   let o = "";

  //   props.test.forEach(x => {
  //       o += x.output;
  //       o += " "; 
  //   })

  // const matchTestCases = () => {
  //     for(var i = 0; i < props.op.length; i++){
  //         if(props.op.charAt(i) === output.charAt(i)){
  //             setMatches(prev => prev + 1);
  //             //setResult('test case' + i + 'failed');
  //         }else{
  //             setResult('sorry some test cases failed :(');
  //             return;
  //         }
  //     }
  //     setResult('passed all test cases :)');
  // }


  const languages = {
    "cpp": 52,
    "csharp": 51,
    "java": 62,
    "python": 71,
    "javascript": 63
  }

  const apiUrl = "https://judge0-ce.p.rapidapi.com";
  const apiAuth = {
    "Content-type": "application/json",
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    "x-rapidapi-key": "5461fe29efmsh4a2d0f0a4e07fa5p1278dajsn73080f2bdf88" // Your RapidAPI Key
  };
  const encode = (str) => {
    return btoa(unescape(encodeURIComponent(str || "")));
  };
  const decode = (bytes) => {
    var escaped = escape(atob(bytes || ""));
    try {
      return decodeURIComponent(escaped);
    } catch {
      return unescape(escaped);
    }
  }
  const handleResult = (d) => {
    setStatus(d.status.description);
    setOutput(decode(d.stdout));
    setError(decode(d.stderr));
  }

  const data = {
    stdin: ''/*encode(stdi)*/,
    source_code: encode(input),
    language_id: languages[props.tags]
  };
  const requestBody = {
    method: 'POST',
    headers: apiAuth,
    body: JSON.stringify(data, null)
  };

  const getOutput = async () => {
    try {
      const response = await fetch(apiUrl + `/submissions?base64_encoded=true&wait=true`, requestBody);
      const data = await response.json();
      handleResult(data);
    }
    catch {
      history.push("/errorpage");
    }
    // matchTestCases();

  }
  return (

    <div className="container-fluid p-0">
      <div className="row" style={{ height: "400px", border: "2px solid #3f72af" }}>
        <ControlledEditor language={props.tags} value={problem} theme="dark" onChange={(e, v) => setInput(v)} />
      </div>
      <div className="btn btn-success" onClick={() => { getOutput() }}>Run...</div>
      <div>{output}</div>
      <div>{result}</div>
      <div>{matches}</div>
    </div>
  )
}

export default ProblemEditor


