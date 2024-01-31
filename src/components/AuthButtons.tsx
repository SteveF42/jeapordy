"use client";

import Image from "next/image";
import discordLogo from '../../public/discordlogo.png'
import { signIn } from "next-auth/react";

export function DiscordSignInButton() {
  const handleClick = async (e: any) => {
    e.preventDefault();
    signIn("discord", { callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-purple-700 text-black rounded-lg focus:shadow-outline hover:bg-indigo-100"
    >
      <Image src={discordLogo} alt="Discord Logo" className="w-auto h-auto" width={18} height={18} />
      <span className="ml-4">Continue with Discord</span>
    </button>
  );
}


export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
      <span className="ml-4">Continue with Email</span>
    </button>
  );
}