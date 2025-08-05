import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'billing'>('profile');
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    notifications: {
      email: true,
      push: false,
      marketing: true
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    alert('Settings saved!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs - Sidebar */}
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
            <nav className="flex flex-col">
              <button 
                className={`text-left px-4 py-3 border-l-2 ${
                  activeTab === 'profile' 
                    ? 'border-zinc-800 bg-zinc-50 font-medium' 
                    : 'border-transparent hover:bg-zinc-50'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button 
                className={`text-left px-4 py-3 border-l-2 ${
                  activeTab === 'account' 
                    ? 'border-zinc-800 bg-zinc-50 font-medium' 
                    : 'border-transparent hover:bg-zinc-50'
                }`}
                onClick={() => setActiveTab('account')}
              >
                Account
              </button>
              <button 
                className={`text-left px-4 py-3 border-l-2 ${
                  activeTab === 'notifications' 
                    ? 'border-zinc-800 bg-zinc-50 font-medium' 
                    : 'border-transparent hover:bg-zinc-50'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
              <button 
                className={`text-left px-4 py-3 border-l-2 ${
                  activeTab === 'billing' 
                    ? 'border-zinc-800 bg-zinc-50 font-medium' 
                    : 'border-transparent hover:bg-zinc-50'
                }`}
                onClick={() => setActiveTab('billing')}
              >
                Billing
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-zinc-200 p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-medium mb-4">Profile Settings</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            )}
            
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-medium mb-4">Account Settings</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Account Type</h3>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user?.role === 'admin' ? 'Admin Account' : 'Standard Account'}</p>
                        <p className="text-sm text-zinc-500">Current plan features</p>
                      </div>
                      <button className="text-zinc-800 underline">Upgrade</button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Password</h3>
                  <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors">
                    Change Password
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Danger Zone</h3>
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-800 mb-2">Delete your account</p>
                    <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-medium mb-4">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email"
                      name="email"
                      checked={formData.notifications.email}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-zinc-800 focus:ring-zinc-500 border-zinc-300 rounded"
                    />
                    <label htmlFor="email" className="ml-2 block text-sm text-zinc-700">
                      Email notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="push"
                      name="push"
                      checked={formData.notifications.push}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-zinc-800 focus:ring-zinc-500 border-zinc-300 rounded"
                    />
                    <label htmlFor="push" className="ml-2 block text-sm text-zinc-700">
                      Push notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketing"
                      name="marketing"
                      checked={formData.notifications.marketing}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-zinc-800 focus:ring-zinc-500 border-zinc-300 rounded"
                    />
                    <label htmlFor="marketing" className="ml-2 block text-sm text-zinc-700">
                      Marketing emails
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
            
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-xl font-medium mb-4">Billing Information</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Current Plan</h3>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Free Plan</p>
                        <p className="text-sm text-zinc-500">Basic features included</p>
                      </div>
                      <button className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                  <p className="text-zinc-500 mb-2">No payment method added</p>
                  <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors">
                    Add Payment Method
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Billing History</h3>
                  <p className="text-zinc-500">No billing history available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
