import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utility/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isRegistered, setisRegistered] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name:'',
        email:'',
        password:'',
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:'',
    });

    useEffect(()=>{
        const localUser = localStorage.getItem('User');
        setUser(JSON.parse(localUser));
        console.log('From UseEffect',user);
    },[]);

    
    const updateRegisterInfo = useCallback((info) => {setRegisterInfo(info)},[]);
    const updateLoginInfo = useCallback((info) => {setLoginInfo(info)},[]);

    const registerUser = useCallback(async(e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(
            `${baseUrl}/user/register`,
            JSON.stringify(registerInfo)
        );
        
        setIsRegisterLoading(false);
        if(response.error)
            return setRegisterError(response);

        // localStorage.setItem("User",JSON.stringify(response));
        setisRegistered(true);

    },[registerInfo]);
    

    const loginUser = useCallback(async(e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(
            `${baseUrl}/user/login`,
            JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false);

        if(response.error)
            return setLoginError(response);

        localStorage.setItem("User",JSON.stringify(response));
        console.log('Response',response);
        // setisRegistered(false);
        setUser(response);
        
    },[loginInfo]);

    const logOut = useCallback(()=>{
        localStorage.removeItem('User');
        setisRegistered(false);
        setUser(null);
        setLoginInfo({ email:'', password:'',});
    },[]);
    const userData = { user, isRegistered, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, logOut,
                             loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading   
        };
    
    return <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
}