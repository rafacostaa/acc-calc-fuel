import React, { useState } from "react";
import "./App.css";
import { TimePicker, Input, Select, Form, Button, Typography } from "antd";
import ResultComponent from "./components/ResultComponent/ResultComponent";

const { Option } = Select;

function App() {
  const [state, setState] = useState({
    resultTotalLaps: "",
    fillFuel: "",
  });

  console.log("state", state);
  const calcFuel = (values) => {
    const newValues = {
      ...values,
      laptime: values.laptime.format("HH:mm:ss"),
    };
    const { laptime, raceDuration, average } = newValues;
    const newLaptime = laptime.split(":");
    // 1min = 60000milisegundos
    // 1seg = 1000milisegundos
    const newLaptime2 =
      newLaptime[0] * 60000 + newLaptime[1] * 1000 + newLaptime[2] * 10;
    const newRaceDuration = raceDuration * 60000;
    setState({
      ...state,
      resultTotalLaps: newRaceDuration / newLaptime2,
      fillFuel: (newRaceDuration / newLaptime2) * average,
    });
    console.log("result total laps", newRaceDuration / newLaptime2);
    console.log("fill fuel", (newRaceDuration / newLaptime2) * average);
  };
  const onSubmit = (values) => {
    calcFuel(values);
    console.log("Received values of form: ", values);
  };

  return (
    <div className="App" style={{ width: "400px", border: "1px solid red" }}>
      <Typography.Title level={2}>ACC Calc Fuel</Typography.Title>

      <Form
        name="calcForm"
        initialValues={{
          typeRaceDuration: "min",
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="laptime"
          rules={[{ required: true, message: "Please input laptime" }]}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          name="raceDuration"
          rules={[{ required: true, message: "Please input race duration" }]}
        >
          <Input
            addonBefore="Race Duration"
            addonAfter={
              <Form.Item name="typeRaceDuration" noStyle>
                <Select>
                  <Option value="min">min</Option>
                  <Option value="laps">laps</Option>
                </Select>
              </Form.Item>
            }
            placeholder="Insert minutes or laps"
          />
        </Form.Item>
        <Form.Item
          name="average"
          rules={[{ required: true, message: "Please input avg consumption" }]}
        >
          <Input
            addonBefore="Avg fuel consumption"
            addonAfter="L/Laps"
            placeholder="Insert average"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Calculate
          </Button>
        </Form.Item>
      </Form>
      <ResultComponent data={state} />
      {/* {state.fillFuel && <ResultComponent data={state} />} */}
    </div>
  );
}

export default App;
