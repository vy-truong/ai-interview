"use client"
import React, { useState } from 'react'


//validate input data 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod" 

// form 
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.email(), 
        password: z.string().min(6), 
    })
}

type FormType = "sign-in" | "sign-up"

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter;
    const [error, setError] = useState<string | null>(null);
    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        email: "",
        password: "",
        },
    })
 
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // This will be type-safe and validated.
        // console.log(values)
        try{
            if ( type === 'sign-up') {
                toast.success("Account created successfully. Please sign in")
                console.log('SIGN UP', values);
                throw new Error("email alr exist")
            }
            else {
                toast.success("Sign in successfully.")
                console.log('SIGN IN', values);
            }
            toast.success(`${isSignin ? "Signed in" : "Account created"} successfully!`)
        }catch (error: any) {
            const message = error?.message || "Something went wrong"
            setError(message)
            console.log(error)
            toast.error(message)
        }
    }

    const isSignin = type === 'sign-in'; 
    return (
        <div className="flex items-center justify-center min-h-screen blue-gradient-dark px-4 sm:px-8 md:px-12 lg:px-20">
          <div className="flex flex-col gap-2 card-border w-full max-w-md sm:max-w-lg lg:max-w-xl">
            <div className="card py-10 sm:py-14 md:py-16 lg:py-20 px-6 sm:px-10 md:px-14 lg:px-20 animate-fadeIn"> 
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-light-100">
                Practice job interview with AI
              </h3>
      
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6 mt-6 form"
                >
                  {!isSignin && (
                    <FormField
                      control={form.control}
                      name="name"
                      label="Name"
                      placeholder="Enter your name"
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    label="Password"
                    type='password'
                    
                    placeholder="Enter your password"
                  />
      
                  <Button className="btn" type="submit">
                    {isSignin ? "Sign in" : "Create an Account"}
                  </Button>
                </form>
              </Form>
      
              {/* Switch between 2 pages */}
              <p className="text-center text-sm sm:text-base md:text-lg text-light-100 mt-6">
                {isSignin ? "No account yet? " : "Have an account already? "}
                <Link
                  href={!isSignin ? "/sign-in" : "/sign-up"}
                  className="text-primary-200 hover:underline ml-1"
                >
                  {!isSignin ? "Sign in" : "Sign up"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
      
}

export default AuthForm