import React from 'react';

export default function StartButton(props) {

  return <div
    onClick={props.onBtnClick}
    className="start-btn" >
      <div className="triangle-down" />
      Git-Outline
  </div>;
}