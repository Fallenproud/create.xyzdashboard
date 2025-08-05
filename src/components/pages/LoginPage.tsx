import React from 'react';
import Header from '../layout/Header';
import LoginForm from '../features/LoginForm';

export default function LoginPage() {
  return (
    <div className="text-black text-base not-italic normal-nums font-normal accent-auto box-border block h-full tracking-[normal] leading-6 list-outside list-disc text-start indent-[0px] normal-case visible w-full border-separate font-inter">
      <next-route-announcer className="absolute box-border block"></next-route-announcer>
      <div className="box-border flex flex-col min-h-full">
        <div className="box-border flex flex-col min-h-[1000px]">
          <div className="box-border h-[46px] z-10">
            <Header />
          </div>
          <div className="box-border min-h-full">
            <div className="text-gray-100 bg-white box-border flex flex-col h-[950px] w-full md:h-[930px]">
              <div className="text-base box-border flex flex-col h-full leading-6 max-w-[1232px] mx-[33px] font-inter md:text-lg md:leading-[27px] md:mx-auto">
                <a href="/signup" className="text-gray-700 text-lg box-border block leading-[27px] min-h-[auto] min-w-[auto] text-right mt-[17px] md:hidden md:min-h-0 md:min-w-0">Sign up</a>
                <div className="text-base box-border h-fit leading-6 text-center w-auto md:text-lg md:leading-[27px] md:w-[576px]">
                  <LoginForm />
                </div>
                <div className="text-base box-border gap-x-[13px] hidden flex-col leading-6 min-h-0 min-w-0 gap-y-[13px] text-center mt-8 mx-auto pb-8 md:text-lg md:flex md:leading-[27px] md:min-h-[auto] md:min-w-[auto]">
                  <p className="text-neutral-500 box-border min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]">New to Create?</p>
                  <a href="/signup" className="text-gray-700 text-lg box-border inline leading-[27px] min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto]">Sign up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed box-border h-0 w-0 z-[2147483001] font-intercom_font"></div>
      <div className="fixed box-border h-0 w-0 z-[2147483001] font-intercom_font"></div>
    </div>
  );
}
