"use client"
import axios from 'axios';
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiUrl from "../../../configurations/apiConfiguration.json";
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password length
  const validatePasswordLength = (password) => {
    return password.length > 0;
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
        title: "please specify the password."
      });
      return;
    }

    const axiosInstance = axios.create();
    const data = {
      "email": email,
      "password": password,
    }
    axiosInstance.post(apiUrl.baseUrl + "/login", data)
      .then(res => {
        console.log(res.data);
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
          icon: "success",
          title: "the login process completed sucessfully"
        });
        
        setTimeout(() => {
          router.push('/')
        }, 1300)
      }).catch(err => {
        console.log(err)
        let error = `email or password isn't correct`
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
          title:  error
        });
      });
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2  h-screen">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" style={{
              backgroundColor: "#2563eb"
            }}>
              Login
            </Button>

          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              sign up
            </Link>
          </div>
        </form>
      </div>
      <div className="h-screen hidden bg-muted lg:block">
        <Image
          src="/pexels-pixabay-414974.jpg"
          alt="Image"
          width="1920"
          height="100"
          className="w-full h-screen object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
