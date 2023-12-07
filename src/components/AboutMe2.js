// AboutMe.jsx
import React from 'react';
import { useState, useRef, forwardRef, useEffect } from "react";
import '../Shape.css';



const AboutMe2 = (props) => {
  const [dataState, setDataState] = useState({
    t1:"", t2:"",
  });
  let t1Ref = useRef();
  let t2Ref = useRef();
  let t3Ref = useRef();
  let saveText = ()=>{
    let tempDataState = {...dataState};
    // tempDataState[idx] = val;
  
    let temp = [...props.dataList]
    temp.forEach((item)=>{
      if(item.id==props.id){
        item.data = tempDataState;
        props.setDataList(temp);
        return;
      }
    })
    
    temp.push({id:props.id, data:tempDataState});
    props.setDataList(temp);
  }
  useEffect(()=>{
    props.dataList.forEach((it)=>{if(it.id == props.id){
      setDataState(it.data);
    }});
  },[])

  useEffect(()=>{
    t1Ref.current.style.height = t1Ref.current.scrollHeight + "px"
    t2Ref.current.style.height = t2Ref.current.scrollHeight + "px"
  })


  return(
    <>
      {
        props.result ?
        <div className="wrapper AM2">
          <div className="wholebox2 resultDiv">
            <div ref={t1Ref} className="Text-area-a2 resultDiv">{dataState.t1}</div>
            <di ref={t2Ref} className="Text-area-c2 resultDiv">{dataState.t2}</di>
          </div>
        </div>


        :


          <div className="wrapper">
            <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
            <div className="wholebox2">
              <textarea ref={t1Ref} onInput={(e)=>{t1Ref.current.style.height=""; setDataState({...dataState, t1:e.target.value})}} value={dataState.t1} placeholder='제목' className="Text-area-a2"></textarea>
              <textarea ref={t2Ref} onInput={(e)=>{t2Ref.current.style.height=""; setDataState({...dataState, t2:e.target.value})}} value={dataState.t2} placeholder='소제목' className="Text-area-c2"></textarea>
            </div>
          </div>


      }
    
    </>


)};

export default AboutMe2;