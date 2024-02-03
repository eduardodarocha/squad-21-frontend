import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider/useAuth";
import { Link, useNavigate } from "react-router-dom";


const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const [teste, setTeste] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth.token) {

        setTeste(true);
    }

    {teste && <Link to={"/"}>Ir para o login</Link>}
    return children;
}

export default ProtectedRoutes;