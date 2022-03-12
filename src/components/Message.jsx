import React from "react";

export const Message = (props) => {
  const { message } = props;
  return (
    <div className="message-area">
      {message}
    </div>
  )
};
