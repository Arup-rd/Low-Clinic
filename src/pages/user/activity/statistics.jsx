import React from "react";
import { Pie } from "react-chartjs-2";

export const ExamStatistics = props => {
  let subjectNameList = [];
  let subjectQuestionList = [];
  for (const subject of props.data) {
    subjectNameList.push(subject.folder_name);
    subjectQuestionList.push(subject.questions);
  }
  const dataPie = {
    labels: subjectNameList,
    datasets: [
      {
        data: subjectQuestionList,
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
          "#AC64AD",
          "#F7465A",
          "#46BFED",
          "#FDBA5C",
          "#9490B1",
          "#4DAA60",
          "#AC48AD"
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774",
          "#DA92DB",
          "#FF5CCE",
          "#5AD001",
          "#FF1170",
          "#A583C5",
          "#61E174",
          "#DA92AA"
        ]
      }
    ],
    isLoading: true
  };
  return (
    <div>
      <h4 className="h4 text-center">Subject wise your questions attempt</h4>
      <Pie data={dataPie} options={{ responsive: true }} />
    </div>
  );
};
