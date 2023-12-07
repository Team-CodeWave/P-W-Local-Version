import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import ColorPicker from "./ColorPicker.js";


function TagInputBox(props) {
  const [tags, setTags] = useState([]); // 태그 목록을 저장하는 상태
  const [inputVisible, setInputVisible] = useState(true); // 입력 창의 가시성을 관리하는 상태

  const TagInput = (e) => {
    if (e.key === "Enter"){
      if(tRef.current.value !== "") {
        const newTag = tRef.current.value; // 입력된 태그
        tRef.current.value = ""; // 입력 상자 초기화
        let temp = [...tags];
        temp.push(newTag);
        setTags(temp); // 기존 태그 목록에 새로운 태그 추가
        setInputVisible(true);
      }
    }  
  };

  const TagDelete = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag); // 선택된 태그 제외한 새로운 태그 목록
    setTags(updatedTags); // 태그 목록 업데이트
  };
  
  let tRef = useRef();

  const [dataState, setDataState] = useState({
    c:"", tc:"", tags:[],
  });
  let t1Ref = useRef();
  let tagRef = useRef();
  
  let saveText = ()=>{
    let tempDataState = {tags: tags, c: bColor, tc:tColor};
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
      setTags(it.data.tags);
      setBColor(it.data.c);
      setTColor(it.data.tc);
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
  const [tColor, setTColor] = useState("#333");
  useEffect(()=>{
    if(tags.length > 0){
      let ta = document.getElementsByClassName("tag-container")
      ta = [...ta];
      ta.forEach(it=>it.style.backgroundColor = bColor);
    }
  },[bColor])
  useEffect(()=>{
    if(tags.length > 0){
      let ta = document.getElementsByClassName("tag-container")
      ta = [...ta];
      ta.forEach(it=>it.style.color = tColor);
    }
  },[tColor])
  const [temp, setTemp] = useState(false);




  useEffect(()=>{
    let time = setTimeout(() => {
      setTemp(true);
    },500);
  },[])


  return (
    <>

      {
        props.result ?
          <div className="wrapper resultDiv">
            {tags.length > 0 && (
              <div style={{display: "flex", flex:"flex-wrap", justifyContent:"center", alignItems:"start"}}>
                {tags.map((tag, index) => (
                  <div ref={tagRef} key={index} className="tag-container">
                    <div>{"#"}</div>
                    <div>{tag}</div>
                  </div>
                ))}
              </div>
            )}
          </div>


        :

          <div className="wrapper">
            <button className="scroll-colorPicker-btn" style={{transform:"translateX(-120%)"}} onClick={()=>{cpVisible()}}>Color</button>
            <div ref={cpRef} className="block-colorPicker-container">
              {
                temp ?
                <>
                  <ColorPicker title={"블록색"} color={dataState.c} setColor={setBColor}/>
                  <ColorPicker title={"글자색"} color={dataState.tc} setColor={setTColor}/>
                </>
                :
                <></>
              }
            </div>
            <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
            <div style={{ display: "flex", marginTop: "50px" }}>
              <input 
                className="tagInput"
                ref={tRef}
                type="text"
                name="inputbox"
                placeholder="태그를 입력하세요"
                onKeyUp={TagInput}
              />
            </div>

            {tags.length > 0 && (
              <div style={{display: "flex", flex:"flex-wrap"}}>
                {tags.map((tag, index) => (
                  <div ref={tagRef} key={index} className="tag-container">
                    {"#\t"}
                    {
                      tag
                    }
                    <IoIosClose onClick={() => TagDelete(tag)}/>
                  </div>
                ))}
              </div>
            )}
          </div>
      }


    </>
  );
}

export default TagInputBox;
