
import React from 'react';
import { Order, User } from '../types';

interface ProfileViewProps {
  orders: Order[];
  user: User;
}

const ProfileView: React.FC<ProfileViewProps> = ({ orders, user }) => {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 glass p-8 rounded-3xl border border-white/10">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl font-black">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">{user.role}</span>
              </div>
           </div>
           <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Email</span>
                <span className="text-white font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Member Since</span>
                <span className="text-white font-medium">Dec 2024</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Total Orders</span>
                <span className="text-white font-medium">{orders.length}</span>
              </div>
           </div>
        </div>

        <div className="w-full md:w-2/3">
           <h3 className="text-2xl font-black font-display text-white mb-6">ORDER HISTORY</h3>
           <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="glass p-12 text-center rounded-3xl border border-white/5">
                  <p className="text-gray-500 italic">No orders found.</p>
                </div>
              ) : (
                orders.map(o => (
                  <div key={o.id} className="glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-blue-400">{o.id}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            o.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                            o.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {o.status}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</span>
                     </div>
                     <div className="flex justify-between items-end">
                        <div className="text-sm text-gray-400">
                          {o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                          <div className="mt-1 text-xs text-gray-500 italic">Payment via: {o.paymentMethod}</div>
                        </div>
                        <div className="text-xl font-bold text-white">${o.total}</div>
                     </div>
                     {o.status === 'processing' && (
                       <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Awaiting Admin Verification
                       </div>
                     )}
                  </div>
                ))
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
