import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

type RequireAuthProps = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const currentUser = getCurrentUser();

  if (!currentUser)
    return <Navigate to="/sign-in" state={{ from: location }} replace />;

  if (!currentUser.isAdmin) return <Navigate to="/not-found" replace />;

  return children;
};

export default AdminRoute;
