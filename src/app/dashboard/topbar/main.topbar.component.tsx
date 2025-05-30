'use client';
import { redirect } from "next/navigation";



export default function MainTopBarComponent() {


  function redirectToLogin() {
    localStorage.clear();
    redirect('/login');
  }

  return (
    <div className="flex h-1/15 bg-white overflow-auto border-b border-gray-200">
      <div className="flex flex-row justify-start w-full place-items-end">
        <div className="ml-4 self-center ">
          <p className="font-bold text-lg">Hello, Priyanshu!</p>
        </div>
        
      </div>
      <div className="flex justify-end mr-8">
        <div className="self-center">
          <button onClick={redirectToLogin} className="text-lg font-bold hover:text-red-400">Logout</button>
        </div>
      </div>
    </div>
  );
}