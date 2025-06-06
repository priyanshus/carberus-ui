'use client'
import { useState } from "react";
import { SignupRequestDto, SignupResponseDto } from "../dto/signup.dto";
import Link from "next/link";
import clientFetch from "@/lib/http/client/clientHttpClient";

export default function SignupPage() {
    const [isSignupSuccess, setSignupSuccess] = useState(false);
    const [signupStatus, setSignupStatus] = useState("");

    const [formData, setFormData] = useState<SignupRequestDto>({
        email: "",
        password: "",
        confirmPassword: "",
        roles: ["Student"]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSignupStatus("");

        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setSignupStatus("Passwords do not match.");
            return;
        }
        try {
            const { status, data } = await clientFetch<SignupResponseDto, SignupRequestDto>("/signup", {
                body: formData,
                method: 'POST',
                auth: false
            });
            if (status != 201 || !data) {
                setSignupStatus("Signup failed, please try again");
                return;
            }
            setFormData({ email: "", password: "", confirmPassword: "", roles: []});
            setSignupSuccess(true);
            setSignupStatus(`Successfully registerd ${data.email}`);
        } catch (e) {
            setSignupStatus("Signup failed, please try again");
            console.error(e);
        }

    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center"> Carberus Signup </h1>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <input required className="w-full mb-4 p-2 border rounded" type="email" name="email" placeholder="Email"
                            value={formData.email}
                            onChange={handleChange} />
                        <input required className="w-full mb-4 p-2 border rounded" type="password" name="password" placeholder="Password"
                            value={formData.password}
                            onChange={handleChange} />
                        <input required className="w-full mb-4 p-2 border rounded" type="password" name="confirmPassword" placeholder="Confirm Your Password"
                            value={formData.confirmPassword}
                            onChange={handleChange} />
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">Submit</button>
                    </div>
                </form>
                <p className="p-2 text-center transition-opacity duration-300 ease-in opacity-100">Aleady have an account? <Link href={'/login'} className="text-blue-500 underline font-bold">Login</Link></p>
                {signupStatus && (
                    <p className={`${ isSignupSuccess ? "text-green-800" : "text-red-800"} p-2 text-center transition-opacity duration-300 ease-in opacity-100`}>
                        {signupStatus}
                    </p>
                )}
            </div>
        </div>
    );
}