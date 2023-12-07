// AboutMe.jsx
import React from 'react';
import { useState, useRef, forwardRef, useEffect } from "react";
import '../Shape.css';


const AboutMe1 = (props) => {
  const [dataState, setDataState] = useState({
    t1:"", t2:"", t3:"",
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
    t3Ref.current.style.height = t3Ref.current.scrollHeight + "px"
  })

  return(
    <>
      {
        props.result ? 
        <div className="wrapper">
          <div className="wholebox resultDiv">
            <div ref={t1Ref} className="Text-area-a1 resultDiv">{dataState.t1}</div>
            <div ref={t2Ref} className="Text-area-b1 resultDiv">{dataState.t2}</div>
            <div ref={t3Ref} className="Text-area-c1 resultDiv">{dataState.t3}</div>
          </div>
        </div>
        


        :



        <div className="wrapper">
          <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
          <div className="wholebox">
            <textarea ref={t1Ref} onInput={(e)=>{t1Ref.current.style.height=""; setDataState({...dataState, t1:e.target.value})}} value={dataState.t1} placeholder='소제목' className="Text-area-a1"></textarea>
            <textarea ref={t2Ref} onInput={(e)=>{t2Ref.current.style.height=""; setDataState({...dataState, t2:e.target.value})}} value={dataState.t2} placeholder='제목' className="Text-area-b1"></textarea>
            <textarea ref={t3Ref} onInput={(e)=>{t3Ref.current.style.height=""; setDataState({...dataState, t3:e.target.value})}} value={dataState.t3} placeholder='소제목' className="Text-area-c1"></textarea>
          </div>
        </div>    
      }
    </>
);
}
export default AboutMe1;
