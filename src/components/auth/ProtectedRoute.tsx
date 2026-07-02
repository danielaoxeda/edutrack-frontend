import { Navigate } from "react-router-dom";
import { getAuthSession } from "../../lib/auth";

type ProtectedRouteProps = {
    children: React.ReactNode;
    allow?: string[];
};

function ProtectedRoute({ children, allow }: ProtectedRouteProps) {
    const session = getAuthSession();

    if (!session?.token) {
        return <Navigate to="/auth" replace />;
    }

    if (allow && allow.length > 0 && !allow.includes(session.role)) {
        if (session.role === "ADMIN") {
            return <Navigate to="/dashboard-admin" replace />;
        }

        if (session.role === "TEACHER") {
            return <Navigate to="/dashboard-docente" replace />;
        }

        return <Navigate to="/dashboard-estudiante" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;
