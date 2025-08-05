import React from 'react';
import Header from '../layout/Header';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals and small projects',
    features: [
      '3 projects',
      'Basic templates',
      'Community support',
      '500 AI credits/month'
    ],
    buttonText: 'Get Started'
  },
  {
    name: 'Pro',
    price: '$19',
    description: 'For professionals and growing teams',
    features: [
      'Unlimited projects',
      'All templates',
      'Priority support',
      '5,000 AI credits/month',
      'Custom domains',
      'Team collaboration'
    ],
    buttonText: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited everything',
      'Dedicated support',
      'Custom integrations',
      'Advanced security',
      'SLA guarantees',
      'On-premise options'
    ],
    buttonText: 'Contact Sales'
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-[46px] bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Choose the plan that's right for you and start building amazing projects with Create.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name}
                className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                  tier.highlighted 
                    ? 'ring-2 ring-zinc-800 relative' 
                    : 'border border-zinc-200'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 inset-x-0 transform translate-y-px">
                    <div className="flex justify-center transform -translate-y-1/2">
                      <span className="inline-flex rounded-full bg-zinc-800 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold">{tier.name}</h2>
                  <p className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="ml-1 text-xl text-zinc-500">/month</span>}
                  </p>
                  <p className="mt-2 text-zinc-600">{tier.description}</p>
                  
                  <ul className="mt-6 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <button 
                      className={`w-full py-3 px-4 rounded-md font-medium ${
                        tier.highlighted
                          ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                          : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                      } transition-colors`}
                    >
                      {tier.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto mt-8 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Can I switch plans later?</h3>
                <p className="text-zinc-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">What are AI credits?</h3>
                <p className="text-zinc-600">AI credits are used when you interact with our AI assistant to build projects. Different operations consume different amounts of credits.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Do you offer refunds?</h3>
                <p className="text-zinc-600">We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-zinc-600">We accept all major credit cards, PayPal, and for Enterprise customers, we can arrange invoicing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
