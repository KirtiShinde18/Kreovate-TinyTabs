// srtapi 

import { APP_URL } from "@/constants/config"
import { REGISTER_EMPLOYEE_REQUEST, REGISTER_EMPLOYEE_RESPONSE, SEND_OTP_REQUEST, SEND_OTP_RESPONSE, SIGNIN_REQUEST, SIGNIN_RESPONSE } from "@/types/Auth"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${APP_URL}/api/auth`,
        credentials: "include"
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            // 🌸 signin → let me in, bestie 💖✨
            signin: builder.mutation<SIGNIN_RESPONSE, SIGNIN_REQUEST>({
                query: userData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            
            // 🎀 signout → bye bye cutie, see you soon 💕👋
            signout: builder.mutation({
                query: userData => {
                    return {
                        url: "/signout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),

            // 🌸 register employee → adding a new cutie to the team 💼💖
            registerEmployee: builder.mutation<REGISTER_EMPLOYEE_RESPONSE, REGISTER_EMPLOYEE_REQUEST>({
                query: userData => {
                    return {
                        url: "/register-employee",
                        method: "POST",
                        body: userData
                    }
                },
            }),

            // 💌 send OTP → sending a tiny magic code your way ✨🔐
            sendOtp: builder.mutation<SEND_OTP_RESPONSE, SEND_OTP_REQUEST>({
                query: userData => {
                    return {
                        url: "/send-otp",
                        method: "POST",
                        body: userData
                    }
                },
            }),

            
        
        }
    }
})

export const { 
    useSigninMutation,
    useSignoutMutation,

    useRegisterEmployeeMutation
} = authApi
