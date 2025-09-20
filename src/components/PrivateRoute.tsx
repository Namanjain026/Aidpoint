// components/PrivateRoute.tsx
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!allowedRoles.includes(user.user_metadata.role)) {
      // redirect to their own dashboard if role mismatch
      if (user.user_metadata.role === "patient") navigate("/patient-dashboard");
      else if (user.user_metadata.role === "hospital") navigate("/hospital-dashboard");
      else navigate("/");
    }
  }, [user, navigate, allowedRoles]);

  if (!user || !allowedRoles.includes(user.user_metadata.role)) {
    return null; // or a loading spinner while redirecting
  }

  return <>{children}</>;
};

export default PrivateRoute;
