"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiUrl from "../../../configurations/apiConfiguration.json";
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter()
  useEffect(()=>{
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      width:"650px",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      title: `Password Requirements:
          📌 Must include at least one lowercase letter (a-z)
          📌 Must include at least one uppercase letter (A-Z)
          📌 Must include at least one numeric digit (0-9)
          📌 Must include at least one special character (e.g., !@#$%^&*)
          📌 Must be longer than 8 characters`
    });
  },[])
  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password length
  const validatePasswordLength = (password) => {
    return password.length > 8;
  };

  // Validate at least one lowercase letter
  const validateLowercase = (password) => {
    const lowercaseRegex = /[a-z]/;
    return lowercaseRegex.test(password);
  };

  // Validate at least one uppercase letter
  const validateUppercase = (password) => {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
  };

  // Validate at least one number
  const validateNumber = (password) => {
    const numberRegex = /\d/;
    return numberRegex.test(password);
  };

  // Validate at least one special character
  const validateSpecialChar = (password) => {
    const specialCharRegex = /[@$!%*?&.]/;
    return specialCharRegex.test(password);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email
    if (!validateEmail(email)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width:"450px",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Please enter a valid email address."
      });
      return;
    }
    // Validate password length
    if (!validatePasswordLength(password)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width:"550px",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Password must be more than 8 characters long."
      });
      return;
    }
    // Validate at least one lowercase letter
    if (!validateLowercase(password)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width:"600px",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: 'Password must contain at least one lowercase letter.'
      });
      return;
    }
    // Validate at least one uppercase letter
    if (!validateUppercase(password)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width:"600px",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Password must contain at least one uppercase letter."
      });

      return;
    }
    // Validate at least one number
    if (!validateNumber(password)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width:"550px",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Password must contain at least one number."
      });
      return;
    }
    // Validate at least one special character
    if (!validateSpecialChar(password)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width:"600px",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Password must contain at least one special character."
      });
      return;
    }
    if (confirmPassword != password) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width:"650px",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "the password does\'nt match the confirm password"
      });
      return;
    }
    const axiosInstance = axios.create();
    const data = {
      "email": email,
      "password": password,
    }
    axiosInstance.post(apiUrl.baseUrl + "/register", data)
      .then(res => {
        console.log(res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          width:"800px",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "the account created successfully, please login with your new account credentials"
        });
        router.push('/auth/login')
      }).catch(err => {
        console.log(err)
        let error = `error ocuured sorry`
        try{
          error = err.response.data.errors.DuplicateUserName[0]
        }catch(e){
          console.log(e);
        }
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          width:"600px",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: error
        });
      });
  }


  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create a new account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>

              </div>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            I already have an account! {" "} {" "} {" "}
            <Link href="/auth/login" className="underline">
              sign in
            </Link>
          </div>
        </form>
      </div>
      <div className="h-screen hidden bg-muted lg:block">
        <Image
          src="/pexels-divinetechygirl-1181395.jpg"
          alt="Image"
          width="1920"
          height="100"
          className="w-full h-screen object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
