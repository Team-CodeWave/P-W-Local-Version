import { Colorful, Sketch, Chrome } from '@uiw/react-color';
import { useState, useRef, forwardRef, useEffect } from "react";
import '../App.css';
import { CiCirclePlus } from "react-icons/ci";
import { SketchPicker } from 'react-color';
import Saturation from '@uiw/react-color-saturation';
const ColorPicker = forwardRef( (props, ref)=>{
  const [imageURLState, setImageURLState] = useState();
  const [hex, setHex] = useState(props.color);
  const graphStyle = {width:"100%" ,height:"185px", transition:"none"}
  // useEffect(()=>{
  //   props.setColor(hex)
  // },[hex])
  return(
    <>
      <div className="bg-save-btn-container">
        <p className="color-picker-title">{props.title}</p>
        <button className="bg-save-btn" onClick={()=>{props.setColor(hex)}}>적용</button>
      </div>
      <Colorful
      style={graphStyle}
      color={hex}
      disableAlpha={true}
      onChange={(color) => {
        setHex(color.hex);
      }}
    />
    </>
  );
});
export default ColorPicker;



