import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      login(email);
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleDemoLogin = (role: 'admin' | 'user') => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      loginWithDemo(role);
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form className="text-base box-border gap-x-10 flex flex-col h-full leading-6 gap-y-10 text-left w-full mt-[100px] mb-auto mx-auto md:text-lg md:leading-[27px] md:w-[500px]" onSubmit={handleSubmit}>
      <div className="text-zinc-900 text-base box-border gap-x-5 flex flex-col leading-6 gap-y-5 md:text-lg md:leading-[27px]">
        <p className="text-lg font-semibold box-border leading-[27px]">Log in</p>
        <h1 className="text-[32px] font-semibold box-border leading-[38.4px]">Request log in link</h1>
      </div>
      <div className="text-base box-border gap-x-2.5 flex flex-col leading-6 gap-y-2.5 md:text-lg md:leading-[27px]">
        <div className="text-base items-start box-border flex flex-col justify-start leading-6 md:text-lg md:leading-[27px]">
          <label className="text-zinc-400 font-semibold box-border block w-full">
            Email
            <input 
              placeholder="name@yourcompany.com" 
              type="email" 
              name="email" 
              className="text-neutral-700 text-lg font-normal box-border leading-[27px] text-start w-full border border-zinc-200 pl-5 pr-0 py-3.5 rounded-md border-solid md:py-[9px]"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
        </div>
        <p className="text-zinc-400 box-border">We'll email you a link for a password free sign in.</p>
      </div>
      <div className="text-base items-center box-border gap-x-2.5 flex flex-col leading-6 gap-y-2.5 w-full md:text-lg md:leading-[27px]">
        <div className="text-base items-center box-border flex flex-col gap-4 leading-6 md:text-lg md:leading-[27px]">
          <button 
            type="submit" 
            disabled={isLoading} 
            className={`text-white items-center ${isLoading ? 'bg-zinc-300' : 'bg-zinc-400'} flex h-8 justify-center max-h-[55px] max-w-[139px] text-center w-[140px] px-8 py-[18px] rounded-[5px]`}
          >
            {isLoading ? 'Loading...' : 'Send link'}
          </button>
          
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={() => handleDemoLogin('user')}
              disabled={isLoading}
              className="text-white items-center bg-zinc-800 flex h-8 justify-center max-h-[55px] text-center px-4 py-[18px] rounded-[5px] hover:bg-zinc-700 transition-colors text-sm"
            >
              Demo User
            </button>
            <button 
              type="button" 
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
              className="text-white items-center bg-zinc-600 flex h-8 justify-center max-h-[55px] text-center px-4 py-[18px] rounded-[5px] hover:bg-zinc-500 transition-colors text-sm"
            >
              Demo Admin
            </button>
          </div>
        </div>
        <div className="text-base items-center box-border flex flex-col leading-6 w-full md:text-lg md:leading-[27px]">
          <div className="text-base items-center box-border flex basis-[0%] grow leading-6 w-full md:text-lg md:leading-[27px]">
            <div className="text-base box-border grow leading-6 w-full border-zinc-100 border-t border-solid md:text-lg md:leading-[27px]"></div>
            <p className="text-neutral-500 text-xs box-border leading-[16.32px] text-center px-[5px] py-2.5">Or</p>
            <div className="text-base box-border grow leading-6 w-full border-zinc-100 border-t border-solid md:text-lg md:leading-[27px]"></div>
          </div>
          <div className="text-base box-border flex justify-center leading-6 w-full md:text-lg md:leading-[27px]">
            <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=363335102258-5j6rle6ep8ktiftp6celptbpmd3uurr9.apps.googleusercontent.com&redirect_uri=https%253A%252F%252Fcreate.xyz%252Fapi%252Foauth%252Fgoogle&response_type=code&scope=openid+profile+email&access_type=offline&prompt=consent" className="text-base items-center bg-white box-border gap-x-2.5 flex justify-center leading-6 gap-y-2.5 w-full border border-zinc-300 px-2.5 py-1.5 rounded-[10px] border-solid md:text-lg md:leading-[27px]">
              <img alt="Google" src="https://c.animaapp.com/mdxy25kuCt1VfJ/assets/google.svg" className="text-transparent text-base aspect-[auto_40_/_40] box-border leading-6 max-w-full w-10 md:text-lg md:leading-[27px]" />
              <p className="text-zinc-900 text-base box-border leading-[22.4px] md:text-sm md:leading-[19.6px]">Sign in with Google</p>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
