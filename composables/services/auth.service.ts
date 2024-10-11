import { AuthData } from "@/models/user.model";
import { ObjectToForm } from "./base.service";
import axiosClient from "../axios.client";
import config from "@/config/config";
import { ForgotPassword, Login, Logout, RefreshToken, Register, ResetPassword, VerifyEmail } from "@/models/auth.model";

const baseUrl = `${config.backend.end_point}/v1`;
const prefix = 'auth'

interface IAuthService {
    SignIn(model: Login): Promise<AuthData>
    SignUp(model: Register): Promise<AuthData>
    SignOut(model: Logout): Promise<object>
    RefreshToken(model: RefreshToken): Promise<AuthData>
    ForgotPassword(model: ForgotPassword): Promise<object>
    ResetPassword(model: ResetPassword): Promise<object>
    VerifyEmail(model: VerifyEmail): Promise <object>
    SendVerificationEmail(): Promise<object>
}

const AuthService: IAuthService = {
    SignIn: async (model: Login): Promise<AuthData> => {
        const formData = ObjectToForm(model);
        const result = await axiosClient.post(`${baseUrl}/${prefix}/login`, formData);
        return result.data;
    },
    SignUp: async (model: Register): Promise<AuthData> => {
        const formData = ObjectToForm(model);
        const result = await axiosClient.post(`${baseUrl}/${prefix}/register`, formData);
        return result.data;
    },
    SignOut: async (model: Logout): Promise<object> => {
        const formData = ObjectToForm(model);
        const result = await axiosClient.post(`${baseUrl}/${prefix}/logout`, formData);
        return result.data;    
    },
    RefreshToken: async (model: RefreshToken): Promise<AuthData> => {
        const formData = ObjectToForm(model);
        const result = await axiosClient.post(`${baseUrl}/${prefix}/refresh-token`, formData);
        return result.data;
    },
    ForgotPassword: async (model: ForgotPassword): Promise<object> => {
        const formData = ObjectToForm(model);
        const result = await axiosClient.post(`${baseUrl}/${prefix}/forgot-password`, formData);
        return result.data;
    },
    ResetPassword: async (model: ResetPassword): Promise<object> => {
        const formData = ObjectToForm(model);
        const result = await axiosClient.post(`${baseUrl}/${prefix}/reset-password`, formData);
        return result.data;
    },
    VerifyEmail: async (model: VerifyEmail): Promise<object> => {
        const formData = ObjectToForm(model);
        const result = await axiosClient.post(`${baseUrl}/${prefix}/verify-email`, formData);
        return result.data;
    },
    SendVerificationEmail: async (): Promise<object> => {
        const result = await axiosClient.post(`${baseUrl}/${prefix}/send-verification-email`);
        return result.data;
    },
}

export default AuthService