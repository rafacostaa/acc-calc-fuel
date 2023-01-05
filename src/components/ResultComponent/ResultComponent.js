import React from "react";
import { Card, Row, Col, Typography, Divider } from "antd";
const ResultComponent = ({ data: { resultTotalLaps, fillFuel } }) => {
  console.log("====================================");
  console.log(resultTotalLaps);
  console.log("====================================");
  return (
    <Card>
      <Typography.Title level={4}>Result</Typography.Title>
      <Row>
        <Col span={8}>total laps</Col>
        <Col span={8}>{resultTotalLaps && resultTotalLaps?.toFixed(3)}</Col>
        <Col span={8}>{resultTotalLaps && Math.ceil(resultTotalLaps)}</Col>
      </Row>
      <Divider style={{ margin: 5 }} />
      <Row>
        <Col span={8}>fill fuel</Col>
        <Col span={8}>{fillFuel && fillFuel?.toFixed(3)}</Col>
        <Col span={8}>{fillFuel && Math.ceil(fillFuel)}</Col>
      </Row>
    </Card>
  );
};

export default ResultComponent;
