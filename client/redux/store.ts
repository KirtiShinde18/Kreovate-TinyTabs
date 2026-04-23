// srts 

import { configureStore } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { authApi } from "./apis/auth.api";



const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,

    },
    devTools: process.env.NEXT_PUBLIC_ENV !== "production",
    middleware: def => def().concat(authApi.middleware)
})

type RootType = ReturnType<typeof reduxStore.getState>
export const useAppSelector = useSelector.withTypes<RootType>()


export default reduxStore