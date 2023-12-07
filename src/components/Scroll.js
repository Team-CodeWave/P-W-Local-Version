import { useState, useRef, forwardRef, useEffect } from "react";
import '../App.css';
import { CiCirclePlus } from "react-icons/ci";
import ColorPicker from "./ColorPicker.js";

const Scroll = forwardRef( (props, ref)=>{
  const [dataState, setDataState] = useState({
    r1:"", r2:"", r3:"", r4:"", r5:"",
    t1:"", t2:"", t3:"", t4:"", t5:"",
    c:"", tc:"",
  });

  let uploadImage = (e, idx)=>{
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    
    let tempURL = {...dataState, c: bColor, tc: tColor}
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
    // let val = e.target.value;
    let tempDataState = {...dataState, c: bColor, tc: tColor};
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

  const [temp, setTemp] = useState(false);
  
  useEffect(()=>{
    if(typing == -1 || typing == false){
      props.dataList.forEach((it)=>{if(it.id == props.id){
        setDataState(it.data);
        setBColor(it.data.c);
        setTColor(it.data.tc);
      }});
    }
  },[])

  useEffect(()=>{
    let time = setTimeout(() => {
      setTemp(true);
    },500);
  },[])

  const [typing, setTyping] = useState(-1);
  useEffect(()=>{
    if(typing !== -1){
      if(!typing){
        saveText()
      }
      else{
        setTimeout(() => {
          console.log("HELL");
          setTyping(false);
        }, 1000);
      }
    }
  },[typing])
  let inputRef = useRef();
  let inputBtnRef = useRef();
  const [aniState, setAniState] = useState(false); // 상위권한 애니메이션 핸들
  const [aniPlayState, setAniPlayState] = useState('paused')
  useEffect(()=>{
    if(props.result){
      setAniPlayState('running');
      setAniState(true);
    }
  },[])
  let handleAniOver = ()=>{
    if(aniState) setAniPlayState('paused');
  }
  let handleAniOut = ()=>{
    if(aniState) setAniPlayState('running');
  }

  let handleScroll = ()=>{
    if(aniPlayState == 'running'){
      setAniPlayState("paused");
      setAniState(false);
    }
    else{
      setAniPlayState("running")
      setAniState(true);
    }
  }
  
  let inputRef1 = useRef();
  let inputRef2 = useRef();
  let inputRef3 = useRef();
  let inputRef4 = useRef();
  let inputRef5 = useRef();
  let inputBtnRef1 = useRef();
  let inputBtnRef2 = useRef();
  let inputBtnRef3 = useRef();
  let inputBtnRef4 = useRef();
  let inputBtnRef5 = useRef();
  
  let cpRef = useRef();
  let cpVisible = ()=>{
    if (cpRef.current.classList.contains("visible")){
      cpRef.current.classList.remove("visible")
    }
    else{
      cpRef.current.classList+= " visible"
    }
  }
  // 블록 컬러
  const [bColor, setBColor] = useState("#ccc");
  const [tColor, setTColor] = useState("#000");
  
  useEffect(()=>{
    let scrollItem = document.getElementsByClassName("scroll-item");
    scrollItem = [...scrollItem];
    if(scrollItem){
      scrollItem.forEach(it=>it.style.backgroundColor = bColor);
    }
  },[bColor])
  useEffect(()=>{
    let ta = document.getElementsByClassName("scroll-item-content")
    ta = [...ta];
    ta.forEach(it=>it.style.color = tColor)
  },[tColor])

  
  return(
    <>
    {
      props.result ?
      // 결과페이지
      <div className="wrapper scroll-result">
        <div className="scroll-wrapper scroll-result">
          <div className="scroll-container">
            <div className="scroll-item-container roll1" style={{animationPlayState: aniPlayState }}>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r1?
                      <img className="image" src={dataState.r1} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t1}</div>
              </div>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r2?
                      <img className="image" src={dataState.r2} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t2}</div>
              </div>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r3?
                      <img className="image" src={dataState.r3} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t3}</div>
              </div>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r4?
                      <img className="image" src={dataState.r4} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t4}</div>
              </div>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r5?
                      <img className="image" src={dataState.r5} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t5}</div>
              </div>
              
            </div>
            <div className="scroll-item-container roll2" style={{animationPlayState: aniPlayState }}>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r1?
                      <img className="image" src={dataState.r1} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t1}</div>
              </div>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r2?
                      <img className="image" src={dataState.r2} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t2}</div>
              </div>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r3?
                      <img className="image" src={dataState.r3} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t3}</div>
              </div>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r4?
                      <img className="image" src={dataState.r4} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t4}</div>
              </div>
              <div className="scroll-item result" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div className="scroll-item-thumbnail">
                  <div>
                    {
                      dataState.r5?
                      <img className="image" src={dataState.r5} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <div className="scroll-item-content result" >{dataState.t5}</div>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>




      :


      // 편집페이지
      <div className="wrapper">
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
        <button className="scroll-save-btn" onClick={()=>{saveText()}}>저장</button>
        <button className="scroll-handle-btn" onClick={()=>{handleScroll()}}>
          {
            aniPlayState == "running" ?
            "멈춤"
            :
            "진행"
          }
        </button>
        <button className="scroll-colorPicker-btn" onClick={()=>{cpVisible()}}>Color</button>
        <div className="uploadImage-btn-container">
          <input ref={inputRef1} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r1")}}/>
        </div>
        <div className="uploadImage-btn-container">
          <input ref={inputRef2} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r2")}}/>
        </div>
        <div className="uploadImage-btn-container">
          <input ref={inputRef3} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r3")}}/>
        </div>
        <div className="uploadImage-btn-container">
          <input ref={inputRef4} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r4")}}/>
        </div>
        <div className="uploadImage-btn-container">
          <input ref={inputRef5} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r5")}}/>
        </div>
        <div className="scroll-wrapper">
          <div className="scroll-container">
            <div className="scroll-item-container roll1" style={{animationPlayState: aniPlayState }}>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef1} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef1.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r1?
                      <img className="image" src={dataState.r1} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t1:e.target.value})}} value={dataState.t1} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef2} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef2.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r2?
                      <img className="image" src={dataState.r2} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t2:e.target.value})}} value={dataState.t2} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef3} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef3.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r3?
                      <img className="image" src={dataState.r3} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t3:e.target.value})}} value={dataState.t3} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef4} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef4.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r4?
                      <img className="image" src={dataState.r4} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t4:e.target.value})}} value={dataState.t4} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef5} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef5.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r5?
                      <img className="image" src={dataState.r5} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t5:e.target.value})}} value={dataState.t5} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
            </div>
            <div className="scroll-item-container roll2" style={{animationPlayState: aniPlayState }}>
            <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef1} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef1.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r1?
                      <img className="image" src={dataState.r1} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t1:e.target.value})}} value={dataState.t1} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef2} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef2.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r2?
                      <img className="image" src={dataState.r2} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t2:e.target.value})}} value={dataState.t2} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef3} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef3.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r3?
                      <img className="image" src={dataState.r3} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t3:e.target.value})}} value={dataState.t3} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef4} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef4.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r4?
                      <img className="image" src={dataState.r4} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t4:e.target.value})}} value={dataState.t4} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
              <div className="scroll-item" onMouseOver={()=>{handleAniOver()}} onMouseOut={handleAniOut}>
                <div ref={inputBtnRef5} className="scroll-item-thumbnail" onClick={()=>{
                  inputRef5.current.click()
                }}>
                  <CiCirclePlus />
                  <div>
                    {
                      dataState.r5?
                      <img className="image" src={dataState.r5} ref={ref}/>
                      :
                      null
                    }
                  </div>
                </div>
                <textarea onInput={(e)=>{setDataState({...dataState, t5:e.target.value})}} value={dataState.t5} placeholder="내용" rows="1" className="scroll-item-content" maxLength="25"></textarea>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    }

    


    </>
  );
});
export default Scroll;
