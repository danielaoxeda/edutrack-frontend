import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {resolveDashboard} from "../../lib/routes.ts";

type ProtectedRouteProps = {
    children: React.ReactNode;
    allow?: string[];
};

function ProtectedRoute({ children, allow }: ProtectedRouteProps) {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    if (allow && allow.length > 0 && !allow.includes(user.rol)) {
        return <Navigate to={resolveDashboard(user.rol)} replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;