import React, { useState } from "react";
import "./App.css";
import {
  TimePicker,
  Input,
  Select,
  Form,
  Button,
  Card,
  Row,
  Col,
  Typography,
} from "antd";

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
  const onFinish = (values) => {
    calcFuel(values);
    console.log("Received values of form: ", values);
  };
  const selectAfter = (
    <Form.Item name="typeRaceDuration" noStyle>
      <Select>
        <Option value="min">min</Option>
        <Option value="laps">laps</Option>
      </Select>
    </Form.Item>
  );
  const [form] = Form.useForm();
  const test = form.getFieldsValue("laptime");
  console.log(test);
  return (
    <div className="App" style={{ width: "400px" }}>
      <Typography.Title level={2}>ACC Calc Fuel</Typography.Title>

      <Form
        form={form}
        name="normal_login"
        initialValues={{
          typeRaceDuration: "min",
        }}
        onFinish={onFinish}
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
            addonAfter={selectAfter}
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
      <div>
        <Card>
          <Typography.Title level={4}>Result</Typography.Title>
          <Row>
            <Col span={12} style={{ border: "1px solid lightGray" }}>
              label
            </Col>
            <Col span={12} style={{ border: "1px solid lightGray" }}>
              result
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ border: "1px solid lightGray" }}>
              label2
            </Col>
            <Col span={12} style={{ border: "1px solid lightGray" }}>
              result2
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default App;
