
import { Colorful, Sketch, Chrome } from '@uiw/react-color';
import { useState, useRef, forwardRef, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { FaCheck } from "react-icons/fa";
import '../App.css';
import { CiCirclePlus } from "react-icons/ci";
import { SketchPicker } from 'react-color';
import Saturation from '@uiw/react-color-saturation';
const Spinner = forwardRef( (props, ref)=>{
  let navigator = useNavigate();
  const location = useLocation();
  let [workDone, setWorkDone] = useState(false);
  useEffect(()=>{
    let time = setInterval(() => {
      navigator("/result", {state: {...location.state}})
      clearInterval(time);
    }, 5000);
  },[])
  useEffect(()=>{
    let time = setInterval(() => {
      checkRef.current.style.opacity = 1;
      checkTextRef.current.style.color = "rgb(8, 145, 65)";
      setWorkDone(true)
      clearInterval(time);
    }, 4500);
  },[])

  let checkRef = useRef();
  let checkTextRef = useRef();

  return(
    <>
      <div className='spinner-container'>
        <div className="spinner">
          <div id='loader'><span></span></div>
          <div ref={checkTextRef}>
            {workDone ? "완료!" : "템플릿 제작중..."}
          </div>
          <div className='check-container' ref={checkRef}><FaCheck className='checkIcon' /></div>
        </div>
      </div>
    </>
  );
});
export default Spinner;



