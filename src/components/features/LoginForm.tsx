import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'magic' | 'password'>('magic');
  const { login, loginWithMagicLink, loginWithOAuth, loginWithDemo, error, clearError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    
    try {
      if (loginMethod === 'magic') {
        await loginWithMagicLink(email);
        // Show success message - in a real app, the user would check their email
        alert(`Magic link sent to ${email}. Please check your email.`);
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'user') => {
    setIsLoading(true);
    clearError();
    
    try {
      loginWithDemo(role);
      navigate('/dashboard');
    } catch (err) {
      console.error('Demo login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    clearError();
    
    try {
      await loginWithOAuth(provider);
      navigate('/dashboard');
    } catch (err) {
      console.error(`${provider} login failed:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod(prev => prev === 'magic' ? 'password' : 'magic');
    clearError();
  };

  return (
    <form className="text-base box-border gap-x-10 flex flex-col h-full leading-6 gap-y-10 text-left w-full mt-[100px] mb-auto mx-auto md:text-lg md:leading-[27px] md:w-[500px]" onSubmit={handleSubmit}>
      <div className="text-zinc-900 text-base box-border gap-x-5 flex flex-col leading-6 gap-y-5 md:text-lg md:leading-[27px]">
        <p className="text-lg font-semibold box-border leading-[27px]">Log in</p>
        <h1 className="text-[32px] font-semibold box-border leading-[38.4px]">
          {loginMethod === 'magic' ? 'Request log in link' : 'Log in with password'}
        </h1>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}
      
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        
        {loginMethod === 'password' && (
          <div className="text-base items-start box-border flex flex-col justify-start leading-6 md:text-lg md:leading-[27px] mt-4">
            <label className="text-zinc-400 font-semibold box-border block w-full">
              Password
              <div className="relative">
                <input 
                  placeholder="Enter your password" 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  className="text-neutral-700 text-lg font-normal box-border leading-[27px] text-start w-full border border-zinc-200 pl-5 pr-10 py-3.5 rounded-md border-solid md:py-[9px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={loginMethod === 'password'}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
          </div>
        )}
        
        {loginMethod === 'magic' && (
          <p className="text-zinc-400 box-border">We'll email you a link for a password free sign in.</p>
        )}
        
        <button 
          type="button" 
          onClick={toggleLoginMethod}
          className="text-zinc-500 underline text-sm mt-2 self-start"
        >
          {loginMethod === 'magic' 
            ? 'Use password instead' 
            : 'Use magic link instead'}
        </button>
      </div>
      
      <div className="text-base items-center box-border gap-x-2.5 flex flex-col leading-6 gap-y-2.5 w-full md:text-lg md:leading-[27px]">
        <div className="text-base items-center box-border flex flex-col gap-4 leading-6 md:text-lg md:leading-[27px]">
          <button 
            type="submit" 
            disabled={isLoading} 
            className={`text-white items-center ${isLoading ? 'bg-zinc-300' : 'bg-zinc-400'} flex h-8 justify-center max-h-[55px] max-w-[139px] text-center w-[140px] px-8 py-[18px] rounded-[5px]`}
          >
            {isLoading ? 'Loading...' : loginMethod === 'magic' ? 'Send link' : 'Log in'}
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
          
          <div className="text-base box-border flex flex-col gap-3 justify-center leading-6 w-full md:text-lg md:leading-[27px]">
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              className="text-base items-center bg-white box-border gap-x-2.5 flex justify-center leading-6 gap-y-2.5 w-full border border-zinc-300 px-2.5 py-1.5 rounded-[10px] border-solid md:text-lg md:leading-[27px]"
            >
              <img alt="Google" src="https://c.animaapp.com/mdxy25kuCt1VfJ/assets/google.svg" className="text-transparent text-base aspect-[auto_40_/_40] box-border leading-6 max-w-full w-10 md:text-lg md:leading-[27px]" />
              <p className="text-zinc-900 text-base box-border leading-[22.4px] md:text-sm md:leading-[19.6px]">Sign in with Google</p>
            </button>
            
            <button
              type="button"
              onClick={() => handleOAuthLogin('github')}
              className="text-base items-center bg-[#24292e] text-white box-border gap-x-2.5 flex justify-center leading-6 gap-y-2.5 w-full border border-[#24292e] px-2.5 py-1.5 rounded-[10px] border-solid md:text-lg md:leading-[27px]"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="w-10 h-10 p-2">
                <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <p className="text-white text-base box-border leading-[22.4px] md:text-sm md:leading-[19.6px]">Sign in with GitHub</p>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
