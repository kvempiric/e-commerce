import React from "react";

const AlertMessage = (props) => {
  const { Alertpop } = props;
  return (
    <div
      className={`py-3 px-5 mb-4 bg-green-100 ${Alertpop.type === "success" ? "text-green-900" : "text-red-900"} text-sm rounded-md border border-green-200 text-center`}
      role="alert"
    >
      <strong className="text-lg">{Alertpop.message}</strong>
    </div>
  );
};

export default AlertMessage;
