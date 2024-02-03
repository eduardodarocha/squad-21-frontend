import React, { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";


const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token) {
            navigate('/');
        }
    }, [auth.token, navigate]);

    return auth.token ? <>{children}</> : null;

}

export default ProtectedRoutes;