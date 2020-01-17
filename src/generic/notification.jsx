import React from "react";
import { MDBNotification } from "mdbreact";

function Notify(props) {
  return (
    <MDBNotification
      show
      fade
      iconClassName="text-primary"
      title={props.title}
      message={props.message}
      style={{
        position: "fixed",
        top: "5px",
        right: "10px",
        zIndex: 9999
      }}
    />
  );
}

export { Notify };
