"use client";

import { useRegisterEmployeeMutation, useSigninMutation } from "@/redux/apis/auth.api";
import { REGISTER_EMPLOYEE_REQUEST, SIGNIN_REQUEST } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";


export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  const [signin, { isLoading: loginLoading } ] = useSigninMutation()
  const [ registerEmployee , { isLoading: resgisterLoading } ] = useRegisterEmployeeMutation()
  const router = useRouter()

  // 🌸 Login Schema
  const loginSchema = z.object({
    email: z.string().min(1, "Email required").email("Invalid Email"),
    password: z.string().min(1, "Password Required")
  }) satisfies z.ZodType<SIGNIN_REQUEST>

  // 🎀 Register Schema
  const registerSchema = z.object({
    name : z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email required").email("Invalid Email").lowercase().trim(),
    password: z.string().min(1),
    mobile: z.string().min(10)
  }) satisfies z.ZodType<REGISTER_EMPLOYEE_REQUEST>

  // =========================
  // LOGIN FORM
  // =========================

  const loginForm = useForm<SIGNIN_REQUEST>({
    defaultValues: {
      email: "kittushinde10@gmail.com",
      password: "kirti@1006",
    },
    resolver: zodResolver(loginSchema)
  });

  const {
    handleSubmit: handleLoginSubmit,
    register: loginRegister,
    reset: loginReset,
    formState: {
      errors: loginErrors,
      touchedFields: loginTouched,
    },
  } = loginForm;

  // =========================
  // REGISTER FORM
  // =========================
  const registerForm = useForm<REGISTER_EMPLOYEE_REQUEST>({
    defaultValues: {
      name: "Kirti Shinde",
      email: "kirtishnde3520@gmail.com",
      password: "kirti@123",
      mobile: "9209123023"

    },
    resolver: zodResolver(registerSchema)
  });

  const { 
    handleSubmit : handleRegisterSubmit, 
    register: registerRegister, 
    reset : registerReset, 
    formState: 
      {
        errors: registerErrors, 
        touchedFields: registerTouched
      },
    } = registerForm

  const handleLogin = async (data: SIGNIN_REQUEST) => {
    // console.log("form Data: ", data);
    try {
      const { result } = await signin(data).unwrap()

       // 🎉 yayyy login success!! welcome back  ✨
      // toast.success("Login successful ✨ Welcome back!")
      loginReset() // 🧹 clearing form like a tidy queen

      if(result.role === "admin"){
        router.push("/admin")
        router.refresh()
        toast.success("Welcome Queen 👑 Let's rule the dashboard 🔥!")
      }else {
        // 💼 employee mode ON
        router.push("/home")
        router.refresh()
        toast.success("Login successful ✨ Welcome back!")

      }
    } catch (error) {
      // 💔 login failed... maybe wrong creds or server being dramatic
      console.log(error);
      toast.error("Login failed 😢 Please check details & try again")
    }
    
  }

  const handleRegister = async (data: REGISTER_EMPLOYEE_REQUEST) => {
  try {
    // console.log("Register Data :",data);

    // 💥 call backend API
    const result = await registerEmployee(data).unwrap()
    console.log("register success: ", result);
    
    // 🎀 success toast
    toast.success("Employee registered 🎉 Welcome to the team!");
    
    // 🧹 reset ONLY register form
    registerReset();
  } catch (error) {
    toast.error("Signup failed 💔");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center  overflow-hidden">

       {/* <div className="relative w-[900px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden">  */}
       <div className="relative w-[900px] h-[550px] rounded-3xl overflow-hidden
          bg-black/50 backdrop-blur-[10px]
          border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        >

        {/* 🌸 Forms Section */}
        <div
          className={`absolute top-0 h-full w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out ${
            isSignup ? "left-0" : "left-1/2"
          }`}
        >
          {/* SIGN IN */}
          {!isSignup && (
            <form className="w-[80%] flex flex-col gap-4" onSubmit={handleLoginSubmit(handleLogin)}>
              <h2 className="text-3xl font-bold text-pink-500 text-center">
                🌸 Sign in
              </h2>

              <input
                {...loginRegister("email")}
                type="text"
                placeholder="👤 Username"
                className="p-3 rounded-full bg-pink-50 focus:outline-none text-black"
              />

              <input
                {...loginRegister("password")}
                type="password"
                placeholder="🔐 Password"
                className="p-3 rounded-full bg-pink-50 focus:outline-none text-black"
              />

              <button className="bg-gradient-to-r from-pink-400 to-rose-300 text-black py-2 rounded-full font-semibold hover:scale-105 transition">
                💖 Let me in ✨
              </button>
            </form>
          )}

          {/* SIGN UP */}
          {isSignup && (
            <form className="w-[80%] flex flex-col gap-4" onSubmit={handleRegisterSubmit(handleRegister)}>
              <h2 className="text-3xl font-bold text-pink-500 text-center">
                🌷 Sign up
              </h2>

              <input
                {...registerRegister("name")}
                type="text"
                placeholder="👤 Username"
                className="p-3 rounded-full bg-pink-50 text-black"
              />

              <input
                {...registerRegister("email")}
                type="email"
                placeholder="💌 Email"
                className="p-3 rounded-full bg-pink-50 text-black"
              />

              <input
                {...registerRegister("mobile")}
                type="phone"
                placeholder=" 📞 Mobile"
                className="p-3 rounded-full bg-pink-50 text-black"
              />

              <input
                {...registerRegister("password")}
                type="password"
                placeholder="🔐 Password"
                className="p-3 rounded-full bg-pink-50 text-black"
              />

              <button className="bg-gradient-to-r from-pink-400 to-rose-300 text-black py-2 rounded-full font-semibold hover:scale-105 transition">
                🎀 Join the magic ✨
              </button>
            </form>
          )}
        </div>

        {/* 🌊 Wavy Pink Panel */}
        <div
          className={`absolute top-0 h-full w-1/2 flex flex-col items-center justify-center text-center p-10 transition-all duration-700 ease-in-out
          ${isSignup ? "left-1/2" : "left-0"}
          bg-black/25 backdrop-blur-[50px]
          border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]`}
          style={{
            borderTopLeftRadius: isSignup ? "60% 40%" : "0%",
            borderBottomLeftRadius: isSignup ? "60% 40%" : "0%",
            borderTopRightRadius: isSignup ? "0%" : "60% 40%",
            borderBottomRightRadius: isSignup ? "0%" : "60% 40%",
          }}
        >
          {!isSignup ? (
            <>
              <h3 className="text-2xl font-bold">New here? 🌸</h3>
              <p className="text-sm mt-2">
                Join us and make your world pretty ✨
              </p>
              <button
                onClick={() => setIsSignup(true)}
                className="mt-5 px-6 py-2 border  border-white rounded-full hover:bg-white hover:text-pink-500 transition"
              >
                Sign up 💖
              </button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold">One of us? 💕</h3>
              <p className="text-sm mt-2">Welcome back cutie ✨</p>
              <button
                onClick={() => setIsSignup(false)}
                className="mt-5 px-6 py-2 border  border-white rounded-full hover:bg-white hover:text-pink-500 transition"
              >
                Sign in 🌷
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}