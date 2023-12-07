import React, { useCallback, useState, useRef, useEffect } from "react";
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BiLeftArrow, BiCube, BiCommentDetail, BiImageAdd } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { PiFrameCornersBold, PiFlowArrowFill } from "react-icons/pi";
import { SketchPicker } from 'react-color';
import { Sketch } from "@uiw/react-color";

import ImageAdaptor from "../components/ImageAdaptor.js";
import ThreeImage from "../components/ThreeImage.js";
import AboutMe from "../components/AboutMe.js";
import Scroll from "../components/Scroll.js";
import Profile from "../components/Profile.js";
import ColorPicker from "../components/ColorPicker.js";

// 재현
import AboutMe1 from "../components/AboutMe1.js";
import AboutMe2 from "../components/AboutMe2.js";
import AboutMe3 from "../components/AboutMe3.js";
import Shape from "../components/Shape.js";

// 민기
import DoughnutChart from "../components/DoughnutChart.js";
import Vcharts from "../components/Vcharts.js";
import Hchart from "../components/Hchart.js";
import Piechart from "../components/Piechart.js";
import Tag from "../components/Tag.js";

import TextBox from "../components/TextBox.js";
import TextBox2 from "../components/TextBox2.js";
import TextBox3 from "../components/TextBox3.js";
import Bar from "../components/Bar.js";

function ResultPage() {
  const location = useLocation();
  const dState = location.state;
  const dStateList = Object.keys(dState.stateList);
  let a=[1,2,3];
  useEffect(()=>{
    console.log(dStateList)
    if(location.state.colorData.bgc && location.state.colorData.bgc[0] == "#"){
      pageRef.current.style.backgroundColor = location.state.colorData.bgc;
    }
    else{
      pageRef.current.style.backgroundImage = location.state.colorData.bgc;
    }
    let ta = document.getElementsByClassName("resultDiv");
    if(ta.length !== 0){
      ta = [...ta]
      console.log(ta);
      ta.forEach((it)=>{
        it.style.color=location.state.colorData.dtc;
      })
    }
  },[])
  
  // 영역 관리 state
  const [state, setState] = useState({[uuidv4()]: []})
  
  // 블록 별 {id, data}
  const [dataList, setDataList] = useState(location.state.dataList);

  // 렌더링 시 return할 블록 {id, content}
  const [blockList, setBlockList] = useState([]);
  

  // 블록 렌더링 함수 (content로 식별)
  let createBlock = (content, id)=>{
    let result ;
    switch (content) {
      case '이미지1':
        return <ImageAdaptor result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
    
      case '이미지2':
        return <ThreeImage result={true} id={id} dataList={dataList} setDataList={setDataList}/>;

      case '프로필1':
        return <Profile result={true} id={id} dataList={dataList} setDataList={setDataList}/>;

      case '프로필2':
        return <AboutMe3 result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
  
      case '도형1':
        return <Scroll result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '도형2':
        return <AboutMe result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
    
      case '도형3':
        return <Tag result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
    
      case '도형4':
        return <Bar result={true} id={id} dataList={dataList} setDataList={setDataList}/>;


      case '글상자1':
        return <AboutMe1 result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '글상자2':
        return <AboutMe2 result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '글상자3':
        return <TextBox result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
        
      case '글상자4':
        return <TextBox2 result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '글상자5':
        return <TextBox3 result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
        case '그래프1':
          return <DoughnutChart result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
          
      case '그래프2':
        return <Piechart result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
        
        case '그래프3':
        return <Hchart result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '그래프4':
        return <Vcharts result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '연대기1':
        return <Shape result={true} id={id} dataList={dataList} setDataList={setDataList}/>;
        
      default:
        return <div>HELL</div>;
    }
  }
  
  let pageRef = useRef();
  return (
    <>
    <div ref={pageRef} className="result-page-container bgr">
      <div className="result-page-wrapper">
        {
          dStateList ?
            dStateList.map((item, idx)=>(
              dState.stateList[item].map((it, i)=>(
                createBlock(it.content, it.id)
              ))
            ))
          :
            <div>dfjk</div>
        }
      </div>
    </div>
    </>
  );
}


export default ResultPage;