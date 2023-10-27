import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../redux/hooks";


export const ProtectedRouter = () => {
    const token = localStorage.getItem("token");
    let location = useLocation();


    return token ? <Outlet/> : <Navigate to={"/sign-in"} state={{from: location}} />;
};

export default ProtectedRouter;
