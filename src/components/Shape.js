import React, { useState, useEffect } from 'react';
import '../Shape.css';





const Shape = (props) => {
  const [dataState, setDataState] = useState({
    0:"",1:"",2:"",3:"",4:"",
    5:"",6:"",7:"",8:"",9:"",
  });
  let saveText = ()=>{
    // let val = e.target.value;
    let tempDataState = {...dataState, shapeCount:shapeCount, backgroundColor:backgroundColor, direction:direction};
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
      setDirection(it.data.direction);
      setShapeCount(it.data.shapeCount);
      setBackgroundColor(it.data.backgroundColor);
    }});
  },[])
  const createShapes = (direction, shapeCount, backgroundColor) => {
    const shapes = [];
    if (direction === 'column') {
      for (let i = 0; i < shapeCount; i++) {
  
        const isLastShape = i === shapeCount - 2;
        const isEven = i % 2 === 0;
  
        shapes.push(
          <div key={i} className="shape-container-column">
            <div className="point-column" style={{ backgroundColor }}></div>
            <div className="line-column" style={{ backgroundColor }}></div>
            {isLastShape && (<div className="circle-column" style={{ backgroundColor }}></div>)}
            {isLastShape && isEven && (<div className="text-box-last-left" >
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t1:e.target.value}})}} value={dataState[i].t1} className="text-area1"placeholder="제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t2:e.target.value}})}} value={dataState[i].t2}  className="text-area2"placeholder="소제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t3:e.target.value}})}} value={dataState[i].t3} className="text-area3"placeholder="본문을 입력하세요"></textarea>
            </div>)}
            {isLastShape && !isEven && (<div className="text-box-last-right" >
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t1:e.target.value}})}} value={dataState[i].t1} className="text-area1"placeholder="제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t2:e.target.value}})}} value={dataState[i].t2}  className="text-area2"placeholder="소제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t3:e.target.value}})}} value={dataState[i].t3} className="text-area3"placeholder="본문을 입력하세요"></textarea>
            </div>)}
            {isEven && (<div className="text-box-right" >
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t1:e.target.value}})}} value={dataState[i].t1} className="text-area1"placeholder="제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t2:e.target.value}})}} value={dataState[i].t2}  className="text-area2"placeholder="소제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t3:e.target.value}})}} value={dataState[i].t3} className="text-area3"placeholder="본문을 입력하세요"></textarea>
            </div>)}
            {!isEven && (<div className="text-box-left " >
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t1:e.target.value}})}} value={dataState[i].t1} className="text-area1"placeholder="제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t2:e.target.value}})}} value={dataState[i].t2}  className="text-area2"placeholder="소제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t3:e.target.value}})}} value={dataState[i].t3} className="text-area3"placeholder="본문을 입력하세요"></textarea>
            </div>)}
          </div>
        );
      }
    }
    else if (direction === 'row') {
      for (let i = 0; i < shapeCount; i++) {
  
        const isLastShape = i === shapeCount - 1;
        const isEven = i % 2 === 0;
  
        shapes.push(
          <div className="shape-container-row" key={i}>
            <div className="point-row" style={{ backgroundColor }}></div>
            <div className="line-row" style={{ backgroundColor }}></div>
            {isLastShape && (<div className="circle-row" style={{ backgroundColor }}></div>)}
            {isLastShape && isEven && (<div className="text-box-last-bottom" >
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t1:e.target.value}})}} value={dataState[i].t1} className="text-area1"placeholder="제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t2:e.target.value}})}} value={dataState[i].t2}  className="text-area2"placeholder="소제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t3:e.target.value}})}} value={dataState[i].t3} className="text-area3"placeholder="본문을 입력하세요"></textarea>
            </div>)}
            {isLastShape && !isEven && (<div className="text-box-last-top" >
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t1:e.target.value}})}} value={dataState[i].t1} className="text-area1"placeholder="제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t2:e.target.value}})}} value={dataState[i].t2} className="text-area2"placeholder="소제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t3:e.target.value}})}} value={dataState[i].t3} className="text-area3"placeholder="본문을 입력하세요"></textarea>
            </div>)}
            {isEven && (<div className="text-box-bottom" >
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t1:e.target.value}})}} value={dataState[i].t1} className="text-area1"placeholder="제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t2:e.target.value}})}} value={dataState[i].t2} className="text-area2"placeholder="소제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t3:e.target.value}})}} value={dataState[i].t3} className="text-area3"placeholder="본문을 입력하세요"></textarea>
            </div>)}
            {!isEven && (<div className="text-box-top " >
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t1:e.target.value}})}} value={dataState[i].t1} className="text-area1"placeholder="제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t2:e.target.value}})}} value={dataState[i].t2} className="text-area2"placeholder="소제목을 입력하세요"></textarea>
            <textarea onInput={(e)=>{setDataState({...dataState, [i]:{...dataState[i], t3:e.target.value}})}} value={dataState[i].t3} className="text-area3"placeholder="본문을 입력하세요"></textarea>
            </div>)}
          </div>
        );
      }
    }
    return shapes;
  };
  const [direction, setDirection] = useState('column'); // 기본값으로 'column' 설정

  const [shapeCount, setShapeCount] = useState(3);

  const [backgroundColor, setBackgroundColor] = useState('white');


  // const addTextbox = () => {
  //   setTextboxes
  // }



  const handleShapeCountChange = (e) => {

    setShapeCount(Number(e.target.value));

  };



  const handleBackgroundColorChange = (e) => {

    setBackgroundColor(e.target.value);

  };








  return (
    <div className="wrapper shape">
      <div className="shapes-container">
        {
          props.result ?
          <></>
          :
          <>
            <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
            <div className='shapeBtn-container' style={{ display: 'flex', width: '200px' }}>
              <button className="button" onClick={() => setDirection('row')}>가로</button>
              <button className="button1" onClick={() => setDirection('column')}>세로</button>
            </div>
            <label htmlFor="shapeCount">도형 개수 선택:</label>
            <select id="shapeCount" value={shapeCount} onChange={handleShapeCountChange}>
              {
                [1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))
              }
            </select>

            <label htmlFor="backgroundColor">배경색 선택:</label>
            <input className='shapeColor' type="color" id="backgroundColor" value={backgroundColor} onChange={handleBackgroundColorChange}/>
          </>
        }
        <div className="shape-creation-area">
          {direction === 'row' ? <div className="flex-container">{createShapes(direction, shapeCount, backgroundColor)}</div> : createShapes(direction, shapeCount, backgroundColor)}
        </div>
    </div>

    </div>

  );

};



export default Shape;
