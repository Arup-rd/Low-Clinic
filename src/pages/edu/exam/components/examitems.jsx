import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Button } from "../../../../generic/widgets/button";
import { ACTION_EXAM_START, ACTION_EXAM_REPORT } from "./actions";

export const Statistics = props => {
  let statistics = JSON.parse(props.data);
  let subjects = [];
  let questions = [];

  statistics.forEach(item => {
    subjects.push(item.folder_name);
    questions.push(item.questions);
  });

  const dataDoughnut = {
    labels: subjects,
    datasets: [
      {
        data: questions,
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#F74666",
          "#46BF22",
          "#FDB45C",
          "#FEE64A",
          "#AA464A"
        ],
        hoverBackgroundColor: [
          "#FF5A11",
          "#5AD322",
          "#F22870",
          "#F44A5E",
          "#5CC3D1",
          "#FDD870",
          "#FAAA5E",
          "#F00A5E"
        ]
      }
    ]
  };
  return (
    <div>
      <Doughnut data={dataDoughnut} options={{ responsive: true }} />
      <h6 className="mt-1 mb-1 font-weight-bolder text-center">
        Subject Statistics
      </h6>
    </div>
  );
};

export const ExamDetails = props => {
  let actionButton = <span></span>;
  if (!props.data.mcqreport) {
    if (props.data.userAccount.id === props.data.source.createdBy.id) {
      if (!props.isRunning) {
        actionButton = (
          <Button
            className="btn-primary"
            onClick={props.onAction(ACTION_EXAM_START)}
          >
            Start Exam
          </Button>
        );
      }
    }
  } else if (props.onAction) {
    actionButton = (
      <Button
        className="btn-primary"
        onClick={props.onAction(ACTION_EXAM_REPORT)}
      >
        Report
      </Button>
    );
  }

  return (
    <div>
      <h4 align="center">{props.data.name}</h4>
      <div
        className="text-center mb-2"
        style={{ borderBottom: "1px solid #DDDDDD", paddingBottom: "5px" }}
      ></div>
      <div className="text-center">
        <p className="d-inline-block mr-2 ml-2">
          <b>Owner</b>: {props.data.source.createdBy.name}
        </p>
        <p className="d-inline-block mr-2 ml-2">
          <b>Total MCQ: </b> {props.data.source.totalMcq}
        </p>
        <p className="d-inline-block mr-2 ml-2">
          <b>Duration: </b>: {props.data.source.duration} min
        </p>
        <p className="d-inline-block mr-2 ml-2">
          <b>Created on: </b>
          {new Date(props.data.source.dateTime).toLocaleString()}
        </p>
      </div>
      <br />
      <div className="flex-center">{actionButton}</div>
    </div>
  );
};

export const ReportDetails = props => {
  return (
    <div>
      <div className="mt-1 text-center">
        <p className="d-inline-block mr-1 ml-1">
          <b>Name</b>: {props.data.createdBy}
        </p>
        <p className="d-inline-block mr-1 ml-1">
          <b>Questions</b>: {props.data.totalMCQ}
        </p>
        <br />
        <p className="d-inline-block mr-1 ml-1">
          <b>Marks</b>: {props.data.totalMCQ}
        </p>
        <p className="d-inline-block mr-1 ml-1">
          <b>Blank</b>: {props.data.totalBlank}
        </p>
        <p className="d-inline-block mr-1 ml-1">
          <b>Total Wrong</b>: {props.data.totalWrong}
        </p>
        <p className="d-inline-block mr-1 ml-1">
          <b className="text-success">Result: {props.data.result} points </b>
        </p>
        <br />
        <p className="d-inline-block mr-1 ml-1">
          <b>Duration: </b>: {props.data.duration} min
        </p>
        <p className="d-inline-block mr-1 ml-1">
          <b>Submitted on: </b>
          {new Date(props.data.dateTime).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
