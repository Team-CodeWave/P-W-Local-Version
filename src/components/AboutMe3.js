import React from 'react';
import { useState, useRef, forwardRef, useEffect } from "react";
import '../Shape.css';
import { CiCirclePlus } from "react-icons/ci";
import ColorPicker from "./ColorPicker.js";


function AboutMe3(props) {
  
  const [imageURLState, setImageURLState] = useState();
  const [dataState, setDataState] = useState({
    r1:'',t1:"", t2:"",c:"",
  });

  let t1Ref = useRef();
  let t2Ref = useRef();
  let t3Ref = useRef();
  let inputRef = useRef();
  let inputBtnRef = useRef();

  let uploadImage = (e, idx)=>{
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    
    let tempURL = {...dataState}
    tempURL[idx] = imageURL;
    setDataState(tempURL);

    let temp = [...props.dataList]
    temp.forEach((item)=>{
      if(item.id==props.id){
        item.data = tempURL;
        props.setDataList(temp);
        return;
      }
    })
    
    temp.push({id:props.id, data:tempURL});
    props.setDataList(temp);
  }

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
    t2Ref.current.style.height = t2Ref.current.scrollHeight + "px"
  })

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleCircleClick = () => {
      fileInputRef.current.click();
  };
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
    inputBtnRef.current.style.color = bColor;
  },[bColor])
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
        <div className='wrapper'>
          <div className="aboutme3-container resultDiv">
            <div ref={inputBtnRef} className="aboutme3-image-upload-Btn">
              <CiCirclePlus />
              <div>
                {
                  dataState.r1?
                  <img className="image" src={dataState.r1}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="wholebox3 resultDiv">
                <div ref={t1Ref} className="Text-area-a3 resultDiv">{dataState.t1}</div>
                <div ref={t2Ref} className="Text-area-c3 resultDiv">{dataState.t2}</div>
            </div>
          </div>
        </div>

      :

        <div className='wrapper'>
          <button className="scroll-colorPicker-btn" style={{transform:"translateX(-120%)"}} onClick={()=>{cpVisible()}}>Color</button>
          <div ref={cpRef} className="block-colorPicker-container">
            {
              temp ?
              <>
                <ColorPicker title={"그림자색"} color={dataState.c} setColor={setBColor}/>
              </>
              :
              <></>
            }
          </div>
          <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
          <div className="aboutme3-container">

          <div className="uploadImage-btn-container">
            <input ref={inputRef} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r1")}}/>
          </div>
            <div ref={inputBtnRef} className="aboutme3-image-upload-Btn" onClick={()=>{
              inputRef.current.click()
            }}>
              <CiCirclePlus />
              <div>
                {
                  dataState.r1?
                  <img className="image" src={dataState.r1}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="wholebox3">
                <textarea ref={t1Ref} onInput={(e)=>{t1Ref.current.style.height=""; setDataState({...dataState, t1:e.target.value})}} value={dataState.t1} placeholder='제목' className="Text-area-a3"></textarea>
                <textarea ref={t2Ref} onInput={(e)=>{t2Ref.current.style.height=""; setDataState({...dataState, t2:e.target.value})}} value={dataState.t2} placeholder='소제목' className="Text-area-c3"></textarea>
            </div>
          </div>
        </div>

      }
    </>
      
  );
}

export default AboutMe3;
