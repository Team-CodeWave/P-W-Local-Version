// AboutMe.jsx
import React from 'react';
import { useState, useRef, forwardRef, useEffect } from "react";
import '../Shape.css';
import ColorPicker from "./ColorPicker.js";


const TextBox2 = (props) => {
  const [dataState, setDataState] = useState({
    t1:"", c:"",
  });
  let t1Ref = useRef();
  let saveText = ()=>{
    let tempDataState = {...dataState, c:bColor};
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
      setBColor(it.data.c);
    }});
  },[])

  useEffect(()=>{
    t1Ref.current.style.height = t1Ref.current.scrollHeight + "px"
  })

  // border 컬러
  let cpRef = useRef();
  let cpVisible = ()=>{
    if (cpRef.current.classList.contains("visible")){
      cpRef.current.classList.remove("visible")
    }
    else{
      cpRef.current.classList+= " visible"
    }
  }
  const [bColor, setBColor] = useState("#ccc");
  
  useEffect(()=>{
    t1Ref.current.style.borderColor = bColor;
  },[bColor])
  const [temp, setTemp] = useState(false);




  useEffect(()=>{
    let time = setTimeout(() => {
      setTemp(true);
    },500);
  },[])
  return(
    <>
      {
        props.result ? 
        <div className="wrapper">
          <div className="wholebox center resultDiv">
            <div ref={t1Ref} className="Text-area-z2 resultDiv">{dataState.t1}</div>
          </div>
        </div>
        


        :



        <div className="wrapper">
          <button className="scroll-colorPicker-btn" style={{transform:"translateX(-120%)"}} onClick={()=>{cpVisible()}}>Color</button>
          <div ref={cpRef} className="block-colorPicker-container">
            {
              temp ?
              <>
                <ColorPicker title={"구분선 색"} color={dataState.c} setColor={setBColor}/>
              </>
              :
              <></>
            }
          </div>
          <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
          <div className="wholebox center">
            <textarea ref={t1Ref} onInput={(e)=>{t1Ref.current.style.height=""; setDataState({...dataState, t1:e.target.value})}} value={dataState.t1} placeholder='제목' className="Text-area-z2"></textarea>
          </div>
        </div>    
      }
    </>
);
}
export default TextBox2;
