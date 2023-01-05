import React, { useState } from "react";
import "./App.css";
import { TimePicker, Input, Select, Form, Button, Typography } from "antd";
import ResultComponent from "./components/ResultComponent/ResultComponent";
import { calcFuel } from "./helpers";

const { Option } = Select;

function App() {
  const [state, setState] = useState({
    resultTotalLaps: "",
    fillFuel: "",
    typeRaceDuration: "min",
  });

  console.log("state", state);

  const onSubmit = (values) => {
    calcFuel(values, setState, state);
    console.log("Received values of form: ", values);
  };

  const requiredLapTime = state.typeRaceDuration === "laps";
  return (
    <div
      className="App"
      style={{ border: "2px solid black", borderRadius: 10 }}
    >
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
          rules={[
            { required: !requiredLapTime, message: "Please input laptime" },
          ]}
        >
          <TimePicker showNow={false} size="large" disabled={requiredLapTime} />
        </Form.Item>
        <Form.Item
          name="raceDuration"
          rules={[{ required: true, message: "Please input race duration" }]}
        >
          <Input
            addonBefore="Race Duration"
            addonAfter={
              <Form.Item name="typeRaceDuration" noStyle>
                <Select
                  onChange={(e) => setState({ ...state, typeRaceDuration: e })}
                >
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
