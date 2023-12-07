import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import '../Minggi.css';

const App = (props) => {
  const [dataState, setDataState] = useState(
    // {label: "값"}
  );

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
      setLabels(Object.keys(it.data))
      setData(Object.values(it.data))
    }});
  },[])



  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedData, setSelectedData] = useState("");

  const labelsInputRef = useRef(null);

  const InputChange = (e) => {
    e.preventDefault();
    const val = e.target.labels.value;
    const inputLabels = e.target.labels.value.split(",");
    const inputData = e.target.data.value.split(",");

    const duplicateLabels = inputLabels.filter((label) =>
      labels.includes(label)
    );
    const invalidData = inputData.filter(
      (value) => isNaN(value) || Number(value) > 100
    );
    if (labelsInputRef.current.value === "") {
      alert("개발 스택 입력 또는 수치를 변경하세요.");
      return;
    }
    if (duplicateLabels.length > 0) {
      alert(`중복된 개발 스택이 있습니다: ${duplicateLabels.join(", ")}`);
      return;
    }
    if (inputData.length === 0) {
      alert(`수치를 입력하세요.`);
      return;
    }
    if (invalidData.length > 0) {
      alert(`입력 수치가 100을 초과했습니다.`);
      return;
    }

    const newData = inputData.map((value) => Number(value));
    setLabels((prevLabels) => [...prevLabels, ...inputLabels]);
    setData((prevData) => [...prevData, ...newData]);

    setDataState({...dataState, [val]:newData})

    labelsInputRef.current.focus();
    e.target.labels.value = ""; // 입력 필드 초기화
    e.target.data.value = ""; // 입력 필드 초기화
  };

  const Edit = (label) => {
    const index = labels.indexOf(label);
    if (index !== -1) {
      setSelectedLabel(labels[index]);
      setSelectedData(data[index]);
    }
  };

  const Update = () => {
    const index = labels.indexOf(selectedLabel);
    if (index !== -1) {
      const updatedLabels = [...labels];
      const updatedData = [...data];
      updatedLabels[index] = selectedLabel;
      updatedData[index] = selectedData;
      setLabels(updatedLabels);
      setData(updatedData);
      setSelectedLabel("");
      setSelectedData("");
    }
  };

  const Delete = (label) => {
    const index = labels.indexOf(label);
    if (index !== -1) {
      const updatedLabels = [...labels];
      const updatedData = [...data];
      updatedLabels.splice(index, 1);
      updatedData.splice(index, 1);
      setLabels(updatedLabels);
      setData(updatedData);
    }
  };

  const colors = [
    // 보라 계열
    "#D8BFD8",
    // 검정 계열
    "#DCDCDC",
    // 분홍 계열
    "#FFB5C5",
    // 노랑 계열
    "#FFFFE0",
    // 파랑 계열
    "#87CEFA",
    // 남색 계열
    "#B0E2FF",
    // 초록 계열
    "#98FB98",
    // 주황 계열
    "#FFA500",
    // 빨강 계열
    "#FFC0CB",
    
    "#DDA0DD",
    "#D3D3D3",
    "#FFC0CB",
    "#FFFACD",
    "#B0E0E6",
    "#87CEFF",
    "#90EE90",
    "#FF7F50",
    "#FFB6C1",
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "개발 스택",
        backgroundColor: labels.map((_, i) => colors[i % 18]),
        data: data,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "center",
        labels: {
          boxHeight: 10,
          font: {
            size: 12,
          },
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
  };
  let graphStyle = {width:"450px" ,height:"225px",margin:"10px 0"};
  return (
    <>
      {
        props.result ?

        <div className="wrapper graph">
          <div className="main-container resultDiv">
            <form className="chart-edit-container resultDiv" onSubmit={InputChange}>
              <div className="charts resultDiv">
                {/* maxWidth와 margin 속성을 사용하여 그래프의 최대 너비를 지정하고 가운데 정렬 */}
                <div
                  className="graph-container resultDiv"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* Bar 차트의 크기를 수동으로 지정 */}
                  <Pie style={graphStyle} data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="graphLabel-container">
                <div className="label-grid-column">
                  <div><p>항목</p></div>
                  <div><p>수치</p></div>
                </div>
                {labels.map((label, index) => (
                  <div className="graphLabel" key={label}>
                    <div className="label-grid">
                      <div><p>{label}</p></div>
                      <div><p>{data[index]}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>



        :



        <div className="wrapper">
          <div className="main-container">
            <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
            <form className="chart-edit-container" onSubmit={InputChange}>
              <div>
                <div className="chart-edit-title">데이터 추가</div>
                <div>
                  <label>
                    {" "}
                    <span>*</span> 개발 스택{" "}
                  </label>
                  <input
                    autoComplete="off" type="text" name="labels" ref={labelsInputRef} />
                </div>
                <div>
                  <label>
                    {" "}
                    <span>*</span> 수치{" "}
                  </label>
                  <input
                    autoComplete="off" type="text" name="data" />
                </div>
                <div className="submit">
                  <button className="addBtn" type="submit" name="buttons">
                    추가
                  </button>
                </div>
              </div>
              <div>
                {labels.map((label, index) => (
                  <div key={label}>
                    {label}: {data[index]}
                    <button name="buttons" onClick={() => Edit(label)}>
                      수정
                    </button>
                    <button name="buttons" onClick={() => Delete(label)}>
                      삭제
                    </button>
                  </div>
                ))}
              </div>
              <div>
                {selectedLabel && (
                  <div>
                    <input
                      autoComplete="off"
                      type="text"
                      name="inputbox"
                      value={selectedLabel}
                      onChange={(e) => setSelectedLabel(e.target.value)}
                    />
                    <input
                      autoComplete="off"
                      type="text"
                      name="inputbox"
                      value={selectedData}
                      onChange={(e) => setSelectedData(e.target.value)}
                    />
                    <button name="buttons" onClick={Update}>
                      수정 완료
                    </button>
                  </div>
                )}
              </div>
            </form>
            <div className="charts" style={{ maxWidth: "30%", margin: "10 auto" }}>
              {/* maxWidth와 margin 속성을 사용하여 그래프의 최대 너비를 지정하고 가운데 정렬 */}
              <div
                className="graph-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* Bar 차트의 크기를 수동으로 지정 */}
                <Pie style={graphStyle} data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>


      }
    </>
  );
};

export default App;
