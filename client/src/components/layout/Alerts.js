// Imports
import { useContext } from "react";
import AlertContext from "../../contexts/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div
        key={alert.id}
        className={`alert alert-${alert.type}`}
        style={{
          position:"absolute",
          zIndex: "10000",
          top: "0",
          left: "0",
          margin: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;