// AboutMe.jsx
import React from 'react';
import { useState, useRef, forwardRef, useEffect } from "react";
import '../Shape.css';
import ColorPicker from "./ColorPicker.js";


const TextBox3 = (props) => {
  const [dataState, setDataState] = useState({
    c:"",
  });
  let t1Ref = useRef();
  
  let saveText = ()=>{
    let tempDataState = {...dataState, c: bColor};
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
    t1Ref.current.style.backgroundColor = bColor;
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
          <div className="wholebox center">
            <div ref={t1Ref} className="bar resultDiv"></div>
          </div>
        </div>
        


        :



        <div className="wrapper">
          <button className="scroll-colorPicker-btn" style={{transform:"translateX(-120%)"}} onClick={()=>{cpVisible()}}>Color</button>
          <div ref={cpRef} className="block-colorPicker-container">
            {
              temp ?
              <>
                <ColorPicker title={"블록색"} color={dataState.c} setColor={setBColor}/>
              </>
              :
              <></>
            }
          </div>
          <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
          <div className="wholebox center">
            <div ref={t1Ref} className="bar"></div>
          </div>
        </div>    
      }
    </>
);
}
export default TextBox3;
