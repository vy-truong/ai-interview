"use client"
import React from 'react'


//validate input data 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod" 

// form 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'


const formSchema = z.object({
  username: z.string().min(2).max(50),
})

// type FormType = "sign-in" | "sign-up"

const AuthForm = ({ type }: { type: FormType }) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username: "",
        },
    })
 
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // This will be type-safe and validated.
        console.log(values)
    }


    const isSignin = type === 'sign-in'; 
    

  return (
    <div className='card-border lg:min-w-[566px]'>
        <div className='flex flex-col gap-6 card py-14 px-50 '>
            <h3>Practice job interview with AI</h3>
        
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className="w-full space-y-6 mt-4 form">

                    
                    {!isSignin && <p>Name</p>}
                    {/* <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                            <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                            This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    /> */}
                <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div> 
    </div>
  )
}

export default AuthForm