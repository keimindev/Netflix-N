import {axiosInstance} from "../config";
import { loginStart, loginSuccess, loginFailure } from './AuthAction'

export const login = async ( user, dispatch ) => {
    dispatch(loginStart());
    
    try{
        const res = await axiosInstance.post("auth/login", user);
        dispatch(loginSuccess(res.data));

    }catch(err){
        console.log(err)
        dispatch(loginFailure());
    }
}