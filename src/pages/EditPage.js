import React, { useCallback, useState, useRef, useEffect } from "react";
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BiLeftArrow, BiCube, BiCommentDetail, BiImageAdd } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { PiFrameCornersBold, PiFlowArrowFill } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
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




function EditPage() {
  // navigator
  let navigator = useNavigate();
  // 영역 관리 state
  const [state, setState] = useState({[uuidv4()]: []})
  
  // 블록 별 {id, data}
  const [dataList, setDataList] = useState([]);

  // 배경색, 기본글자색
  const [colorData, setColorData] = useState({});

  // 렌더링 시 return할 블록 {id, content}
  const [blockList, setBlockList] = useState([]);
  


  // 블록 렌더링 함수 (content로 식별)
  let createBlock = (content, id)=>{
    let result ;
    switch (content) {
      case '이미지1':
        return <ImageAdaptor id={id} dataList={dataList} setDataList={setDataList}/>;
    
      case '이미지2':
        return <ThreeImage id={id} dataList={dataList} setDataList={setDataList}/>;

      case '프로필1':
        return <Profile id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '프로필2':
        return <AboutMe3 id={id} dataList={dataList} setDataList={setDataList}/>;

      case '도형1':
        return <Scroll id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '도형2':
        return <AboutMe id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '도형3':
        return <Tag id={id} dataList={dataList} setDataList={setDataList}/>;

      case '도형4':
        return <Bar id={id} dataList={dataList} setDataList={setDataList}/>;


      case '글상자1':
        return <AboutMe1 id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '글상자2':
        return <AboutMe2 id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '글상자3':
        return <TextBox id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '글상자4':
        return <TextBox2 id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '글상자5':
        return <TextBox3 id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '그래프1':
        return <DoughnutChart id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '그래프2':
        return <Piechart id={id} dataList={dataList} setDataList={setDataList}/>;
        
        case '그래프3':
        return <Hchart id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '그래프4':
        return <Vcharts id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '연대기1':
        return <Shape id={id} dataList={dataList} setDataList={setDataList}/>;
      

      
      
      default:
        return <div>HELL</div>
    }
  }
  // 순서정렬
  const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
  
      return result;
  };

  // 새로운 블록 생성 함수(복사하여 붙여넣기)
  const copy = (source, destination, droppableSource, droppableDestination) => {
      console.log('==> dest', destination);
  
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const item = sourceClone[droppableSource.index];
      let newId = uuidv4();
      destClone.splice(droppableDestination.index, 0, { ...item, id: newId });
      blockList.push({id:newId, content:item.content});
      setBlockList(blockList);
      return destClone;
  };
  
  // 다른 영역으로 블록 옮기기
  const move = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);
  
      destClone.splice(droppableDestination.index, 0, removed);
      let temp = {...state}
      temp[droppableSource.droppableId] = sourceClone;
      temp[droppableDestination.droppableId] = destClone;
      setState(temp);
      // return result;
  };
  
  const Content = styled.div`
      /* margin-left: 280px; */
      min-width: 1200px;
      width: calc(100vw - 280px);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      padding-top: 50px;
  `;
  
  const Item = styled.div`
      display: flex;
      user-select: none;
      padding: 0.5rem;
      margin: 0 0 0.5rem 0;
      align-items: flex-start;
      align-content: flex-start;
      line-height: 1.5;
      border-radius: 3px;
      /* background: #fff; */
      border: 1px ${props => (props.isdragging == 'true' ? 'dashed #4099ff' : 'solid #ddd')};
  `;
  
  const Clone = styled(Item)`
      + div {
          /* display:b; */
      }
  `;
  const Handle = styled.div`
      display: flex;
      align-items: center;
      align-content: center;
      user-select: none;
      margin: -0.5rem 0.5rem -0.5rem -0.5rem;
      padding: 0.5rem;
      line-height: 1.5;
      border-radius: 3px 0 0 3px;
      background: #fff;
      border-right: 1px solid #ddd;
      color: #000;
  `;
  
  const List = styled.div`
      border: 1px ${props => (props.isdraggingover == "true" ? 'dashed #000' : 'solid #ddd')};
      background: #fff;
      padding: 0.5rem 0.5rem 0;
      border-radius: 3px;
      flex: 0 0 150px;
      font-family: sans-serif;
  `;
  
  const Kiosk = styled(List)`
      position: absolute;
      top: 0;
      left: 80px;
      bottom: 0;
      width: 200px;
  `;
  
  const Container = styled(List)`
      margin: 0.5rem 0.5rem 1.5rem;
      min-width: 1050px;
      background: #ffffff00;
      width: 80%;
  `;
  
  const Notice = styled.div`
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      padding: 0.5rem;
      margin: 0 0.5rem 0.5rem;
      border: 1px solid transparent;
      line-height: 1.5;
      color: #aaa;
  `;
  
  const Button = styled.button`
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      margin: 0.5rem;
      padding: 0.5rem;
      color: #000;
      border: 1px solid #ddd;
      background: #ffffff5b;
      border-radius: 3px;
      font-size: 1rem;
      cursor: pointer;
  `;
  const Button2 = styled.button`
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      margin: 0.5rem;
      padding: 0.5rem;
      color: #000;
      border: 1px solid #ddd;
      background: #ffffff5b;
      border-radius: 3px;
      font-size: 1rem;
      cursor: pointer;
  `;
  
  const ButtonText = styled.div`
      margin: 0 1rem;
  `;
  
  // 식별자 리스트
  const ITEMS = [
    {
      id: uuidv4(),
      title: '액티브 슬라이드',
      content: '도형1',
    },
    {
      id: uuidv4(),
      title: 'About Me',
      content: '도형2',
    },
    {
      id: uuidv4(),
      title: '태그',
      content: '도형3',
    },
    {
      id: uuidv4(),
      title: '구분선',
      content: '도형4',
    },
  ];
  const ITEMS1 = [
    {
      id: uuidv4(),
      title: "프로필1",
      content: '프로필1',
    },
    {
      id: uuidv4(),
      title: "프로필2",
      content: '프로필2',
    },
  ];
  const ITEMS2 = [
      {
        id: uuidv4(),
        title: '타이틀1',
        content: '글상자1',
      },
      {
        id: uuidv4(),
        title: '타이틀2',
        content: '글상자2',
      },
      {
        id: uuidv4(),
        title: '소제목1',
        content: '글상자3',
      },
      {
        id: uuidv4(),
        title: '소제목2',
        content: '글상자4',
      },
      {
        id: uuidv4(),
        title: '글상자',
        content: '글상자5',
      },
  ];
  const ITEMS3 = [
      {
        id: uuidv4(),
        title: '배너 이미지',
        content: '이미지1',
      },
      {
        id: uuidv4(),
        title: '3-set 이미지',
        content: '이미지2',
      },
  ];
  const ITEMS4 = [
      {
        id: uuidv4(),
        title: '도넛 차트',
        content: '그래프1',
      },
      {
        id: uuidv4(),
        title: '파이 차트',
        content: '그래프2',
      },
      {
        id: uuidv4(),
        title: '막대 차트(가로)',
        content: '그래프3',
      },
      {
        id: uuidv4(),
        title: '막대 차트(세로)',
        content: '그래프4',
      },
  ];
  const ITEMS5 = [
      {
        id: uuidv4(),
        title: '연대기',
        content: '연대기1',
      },
  ];


  // Drag끝날때
  let onDragEnd = result => {
    //Drop된 영역에 따른 처리
    const { source, destination } = result;

    console.log('==> result', result);

    if (!destination) {
      return;
    }

    
    switch (source.droppableId) {
      // 같은 영역 내 순서 정렬
      case destination.droppableId:
        setState({...state,
            [destination.droppableId]: reorder(
                state[source.droppableId],
                source.index,
                destination.index
            )
        });
        break;
      // 새로운 블록 생성
      case 'ITEMS':
        setState({...state,
            [destination.droppableId]: copy(
                kioItem,
                state[destination.droppableId],
                source,
                destination
            )
        });
        break;
      // 영역 옮기기
      default:
        move(
          state[source.droppableId],
          state[destination.droppableId],
          source,
          destination
        )
        break;
    }
  };

  // 새로운 영역 생성 함수
  let addList = e => {
      setState({ ...state, [uuidv4()]: [] });
  };
  const [page, setPage] = useState(-1);

  // 왼쪽 카테고리 클릭 이벤트 css 변화 함수
  let flip = (idx)=>{
    categoryBtnRef.current.map((item, index)=>{
      if(item.classList.contains("clicked")){
        if(index == idx){
          categoryBtnRef.current[idx].classList.remove("clicked")
          if(index == 0){
            bgCtlRef.current.classList.remove("visible");

          }
          setPage(-1);
        }
        else item.classList.remove("clicked");
      }
      else if(index == idx){
        item.classList+= " clicked";
        setPage(idx);
      }
    })
  }
  
  
  let categoryBtnRef = useRef([]);
  // 현재 보여줄 아이템 리스트 state
  const [kioItem, setKioItem] = useState();
  // 카테고리 선택 시 아이템 리스트 변화
  useEffect(()=>{
    switch (page) {
      case 0:
        setKioItem();
        bgCtlRef.current.classList.remove("none")
        bgCtlRef.current.classList += " visible";
        break;
      case 1:
        setKioItem(ITEMS);
        break;
      
      case 2:
        setKioItem(ITEMS1);
        break;
      
      case 3:
        setKioItem(ITEMS2);
        break;
      
      case 4:
        setKioItem(ITEMS3);
        break;
      
      case 5:
        setKioItem(ITEMS4);
        break;

      case 6:
        setKioItem(ITEMS5);
        break;
    
      default:
        setKioItem();
        break;
    }
  },[page])
  useEffect(()=>{
    if(page == 0){
      bgCtlRef.current.classList.remove("none")
      bgCtlRef.current.classList += " visible";
    }
    else{
      bgCtlRef.current.classList += " none"
    }
  },[kioItem])
  useEffect(()=>{
    if(page == 0){
      bgCtlRef.current.classList = "bg-controller visible";
    }
    else{
      bgCtlRef.current.classList = "bg-controller none"
    }
  })
  const resRef = useRef([]);
  const [bgColor, setBgColor] = useState('#fff');
  useEffect(()=>{
    if(bgColor[0]=="#"){ bgRef.current.style.background = bgColor;}
    else{
      bgRef.current.style.background = ''
      bgRef.current.style.backgroundImage = bgColor;
    }
    setColorData({...colorData, bgc:bgColor});
  },[bgColor])
  const bgRef = useRef();
  const bgCtlRef = useRef();
  
  
  const [textColor, setTextColor] = useState('#000');
  useEffect(()=>{
    setColorData({...colorData, dtc:textColor});
  },[textColor])
  useEffect(()=>{
    let ta = document.getElementsByTagName("textarea");
    if(ta.length !== 0){
      ta = [...ta]
      console.log(ta);
      ta.forEach((it)=>{
        it.style.color=textColor;
      })
    }
  })

  let bgGrRef = useRef([]);
  

  let bgGrList = [
    "linear-gradient(157deg, #25c139, #f55316, #4774ff)",
    "linear-gradient(157deg, #8360c3, #2ebf91)",
    "linear-gradient(157deg, #434343 0%, black 100%)",
    "linear-gradient(157deg, #0f0c29, #302b63, #24243e)",
    "linear-gradient(157deg, #870000, #190a05)",
    "radial-gradient(circle farthest-side, #fceabb, #f8b500)",
    "linear-gradient(157deg, rgb(242, 112, 156), rgb(255, 148, 114))",
    "linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )",
    "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )",
    "linear-gradient(157deg, #ff512f, #f09819)",
    "linear-gradient(157deg, #5a3f37, #2c7744)",
    "linear-gradient(157deg, #2c3e50, #4ca1af)",
    "linear-gradient(157deg, #141e30, #243b55)",
    "linear-gradient(152deg, #9e67d4, #8fb5ea, #3755b4)",
    "linear-gradient(152deg, #1c9963, #3f8573, #0b5643)",
    "linear-gradient(152deg, #e63a94, #ffbfd5, #f3547d)",
  ]  
  let setBgGr = (idx)=>{
    setBgColor(bgGrList[idx]);
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='category-container'>
        {/* state로 map 뿌리도록 바꿀 예정? */}
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[0]=el}} onClick={()=>{flip(0)}}>
            <div className='category-item-front'><PiFrameCornersBold/></div>
            <div className='category-item-back'><p>배경설정</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[2]=el}} onClick={()=>{flip(2)}}>
            <div className='category-item-front'><ImProfile/></div>
            <div className='category-item-back'><p>프로필</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[1]=el}} onClick={()=>{flip(1)}}>
            <div className='category-item-front'><BiCube/></div>
            <div className='category-item-back'><p>도형</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[3]=el}} onClick={()=>{flip(3)}}>
            <div className='category-item-front'><BiCommentDetail/></div>
            <div className='category-item-back'><p>글상자</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[4]=el}} onClick={()=>{flip(4)}}>
            <div className='category-item-front'><BiImageAdd/></div>
            <div className='category-item-back'><p>이미지</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[5]=el}} onClick={()=>{flip(5)}}>
            <div className='category-item-front'><GoGraph/></div>
            <div className='category-item-back'><p>그래프</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[6]=el}} onClick={()=>{flip(6)}}>
            <div className='category-item-front'><PiFlowArrowFill/></div>
            <div className='category-item-back'><p>연대기</p></div>
          </div>
        </div>
      </div>
      <Droppable droppableId="ITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <Kiosk
            {...provided.droppableProps}
            onDragStart={console.log(snapshot)}
            ref={provided.innerRef}
            isdraggingover={snapshot.isDraggingOver.toString()}>

            <div ref={bgCtlRef} className="bg-controller">
              <div className="bg-controller-content">
                <ColorPicker title={"배경 색"} color={bgColor} setColor={setBgColor}/>
                <div className="gradient-container">
                  <div ref={el=>bgGrRef.current[0]=el} onClick={()=>{setBgGr(0)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[1]=el} onClick={()=>{setBgGr(1)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[2]=el} onClick={()=>{setBgGr(2)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[3]=el} onClick={()=>{setBgGr(3)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[4]=el} onClick={()=>{setBgGr(4)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[5]=el} onClick={()=>{setBgGr(5)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[6]=el} onClick={()=>{setBgGr(6)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[7]=el} onClick={()=>{setBgGr(7)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[8]=el} onClick={()=>{setBgGr(8)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[9]=el} onClick={()=>{setBgGr(9)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[10]=el} onClick={()=>{setBgGr(10)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[11]=el} onClick={()=>{setBgGr(11)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[12]=el} onClick={()=>{setBgGr(12)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[13]=el} onClick={()=>{setBgGr(13)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[14]=el} onClick={()=>{setBgGr(14)}} className="gradient-item"></div>
                  <div ref={el=>bgGrRef.current[15]=el} onClick={()=>{setBgGr(15)}} className="gradient-item"></div>
                </div>
              </div>
              <div className="bg-controller-content">
                <ColorPicker title={"기본 글자 색"} color={textColor} setColor={setTextColor}/>
              </div>

            </div>



            {kioItem ?
              kioItem.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}>
                  {(provided, snapshot) => (
                    <React.Fragment>
                      <Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isdragging={snapshot.isDragging.toString()}
                        style={provided.draggableProps.style}>
                        {item.title}
                      </Item>
                      {snapshot.isDragging && (
                        <Clone>{item.title}</Clone>
                      )}
                    </React.Fragment>
                  )}
                </Draggable>
              ))
            :
              page == 0 ?
                null
                :
                <div className="noneClicked">
                  <BiLeftArrow/> <p>카테고리를 클릭해주세요</p>
                </div>
            }
            

          </Kiosk>
        )}
      </Droppable>
      <div ref={bgRef} className="bg bgr">
      <Content>
      <Button onClick={addList}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
          />
        </svg>
        <ButtonText>구역 생성</ButtonText>
      </Button>
      <Button2 onClick={()=>{navigator("./ready", {state: {dataList:dataList, stateList: state, colorData: colorData}})}}>
        <ButtonText>구역 생성</ButtonText>
      </Button2>
      
      {Object.keys(state).map((list, i) => {
        console.log('==> list', list);
        return (
          <Droppable key={list} droppableId={list}>
            {(provided, snapshot) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
                isdraggingover={snapshot.isDraggingOver.toString()}>
                {state[list].length
                  ? state[list].map(
                      (item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided,snapshot) => (
                            <Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              isdragging={snapshot.isDragging.toString()}
                              style={provided.draggableProps.style}>
                              <Handle
                                {...provided.dragHandleProps}>
                                <svg width="24"height="24"viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"/>
                                </svg>
                              </Handle>

                              {
                                createBlock(item.content,item.id)
                              }

                            </Item>
                          )}
                        </Draggable>
                      )
                    )
                  : !provided.placeholder && (
                    <Notice>
                      Drop items here
                    </Notice>
                  )}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        );
      })}
    </Content>
        
      </div>
  </DragDropContext>
  );
}


export default EditPage;