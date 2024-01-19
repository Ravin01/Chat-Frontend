/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedPage = ({element}) => {
  if (
    sessionStorage.getItem("user") &&
    JSON.parse(sessionStorage.getItem("user"))
  ) {
    return element;
  }
  return <Navigate to={"/auth/login"} replace />;
};

export default ProtectedPage;
