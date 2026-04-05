import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SpinnerGap } from "@phosphor-icons/react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole?: "USER" | "CLUB_ADMIN" | "SUPER_ADMIN";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { user, dbUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-void-black">
        <SpinnerGap className="text-neon-slime animate-spin" size={64} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && dbUser?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
