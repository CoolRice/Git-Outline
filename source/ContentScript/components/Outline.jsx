import React from 'react';

export default function Outline(props) {
  const isNotEmpty = props?.outlines?.length > 0;
  return <div className="outline-content">
    <div className="head">Outline
      <span onClick={props.onClose} className="close-btn">x</span>
    </div>
    {isNotEmpty && props.outlines.map((item, index) => {
      return <div className="line" key={index}>
        <a href={`${props.currentUrlWithoutHash}#L${item.line}`}>{item.type} {item.name}</a>
      </div>
    })}
    {!isNotEmpty && <div className="empty">Empty</div>}
  </div>
}

