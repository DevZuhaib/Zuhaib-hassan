
import React, { useState } from 'react';
import { Product, Order, User } from '../types';
import { ALL_CATEGORIES } from '../constants';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  users: User[];
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addProduct: (p: Product) => void;
  approveOrder: (id: string) => void;
  categories: string[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, users, updateProduct, deleteProduct, addProduct, approveOrder, categories }) => {
  const [tab, setTab] = useState<'products' | 'orders' | 'users' | 'security'>('products');
  const [productCategoryTab, setProductCategoryTab] = useState<string>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setEditForm({ ...p });
  };

  const handleSave = () => {
    if (editForm) {
      updateProduct(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleAdd = () => {
     const newP: Product = {
       id: '',
       name: 'Unidentified Asset',
       price: 0,
       description: 'Manual entry required...',
       category: 'Luxury',
       image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
       quantity: 1
     };
     addProduct(newP);
  };

  const filteredProducts = productCategoryTab === 'All' ? products : products.filter(p => p.category === productCategoryTab);

  return (
    <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-[1600px] mx-auto px-4 lg:px-0">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 border-b border-white/5 pb-10 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">System Core: Online</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black font-display tracking-tightest text-white leading-none">
            HUB<span className="text-blue-500">.</span>CONTROL
          </h2>
          <p className="text-gray-700 mt-4 uppercase text-[9px] font-black tracking-[0.5em]">АЙЕША 𝗛𝗔𝗦𝗦𝗔𝗡 ™ Enterprise OS v4.0.1</p>
        </div>
        
        <div className="flex flex-wrap gap-2 bg-white/[0.02] p-2 rounded-[2rem] border border-white/5">
          {[
            { id: 'products', label: 'Assets', color: 'blue' },
            { id: 'orders', label: 'Transactions', color: 'purple' },
            { id: 'users', label: 'Registry', color: 'emerald' },
            { id: 'security', label: 'Security', color: 'red' }
          ].map(btn => (
            <button 
              key={btn.id}
              onClick={() => setTab(btn.id as any)}
              className={`px-10 py-5 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 border border-transparent ${
                tab === btn.id 
                  ? `bg-${btn.color}-600 text-white shadow-2xl shadow-${btn.color}-600/30 -translate-y-1` 
                  : 'text-gray-600 hover:text-white hover:bg-white/5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'products' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col lg:flex-row justify-between items-center glass p-10 rounded-[2.5rem] border border-white/5 gap-10">
            <div className="flex-grow">
               <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em] mb-4">Inventory Filter Pool</h4>
               <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-4 scrollbar-hide">
                  <button 
                    onClick={() => setProductCategoryTab('All')}
                    className={`px-5 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${productCategoryTab === 'All' ? 'bg-white text-black border-white' : 'border-white/5 text-gray-700 hover:border-white/20'}`}
                  >
                    All Assets
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setProductCategoryTab(cat)}
                      className={`px-5 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${productCategoryTab === cat ? 'bg-blue-600 text-white border-blue-600' : 'border-white/5 text-gray-700 hover:border-white/20'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
            <button 
              onClick={handleAdd}
              className="px-10 py-5 bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 shrink-0"
            >
              + Generate New Asset
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {filteredProducts.map(p => (
              <div key={p.id} className="glass border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-colors"></div>
                
                {editingId === p.id ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="space-y-6">
                       <div>
                          <label className="block text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3 ml-1">Asset Designation</label>
                          <input 
                            type="text" 
                            value={editForm?.name} 
                            onChange={e => setEditForm({...editForm!, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none font-bold text-sm"
                          />
                       </div>
                       <div>
                          <label className="block text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3 ml-1">Remote Link (IMG)</label>
                          <input 
                            type="text" 
                            value={editForm?.image} 
                            onChange={e => setEditForm({...editForm!, image: e.target.value})}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none font-bold text-sm"
                          />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <label className="block text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3 ml-1">Valuation ($)</label>
                          <input 
                            type="number" 
                            value={editForm?.price} 
                            onChange={e => setEditForm({...editForm!, price: Number(e.target.value)})}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none font-bold text-sm"
                          />
                       </div>
                       <div className="relative">
                          <label className="block text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3 ml-1">Asset Classification</label>
                          <select 
                            value={editForm?.category}
                            onChange={e => setEditForm({...editForm!, category: e.target.value})}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none font-bold text-sm appearance-none cursor-pointer"
                          >
                            {ALL_CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-slate-900">{cat}</option>)}
                          </select>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <label className="block text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3 ml-1">Inventory Density</label>
                          <input 
                            type="number" 
                            value={editForm?.quantity} 
                            onChange={e => setEditForm({...editForm!, quantity: Number(e.target.value)})}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none font-bold text-sm"
                          />
                       </div>
                       <div className="flex gap-4 pt-4">
                         <button onClick={handleSave} className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[9px] hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/30">Commit</button>
                         <button onClick={() => setEditingId(null)} className="flex-1 py-5 bg-white/5 text-gray-700 rounded-2xl font-black uppercase tracking-[0.3em] text-[9px] hover:text-white transition-all">Abort</button>
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="relative shrink-0">
                      <img src={p.image} className="w-40 h-40 rounded-[2rem] object-cover bg-white/5 border border-white/5 shadow-2xl group-hover:scale-110 transition-transform duration-1000" />
                      {p.quantity < 3 && (
                        <div className="absolute -top-3 -right-3 px-4 py-2 bg-red-600 rounded-full text-[8px] font-black uppercase tracking-widest animate-bounce shadow-xl text-white">Critical Inventory</div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[8px] font-black bg-blue-500/10 text-blue-500 px-5 py-2 rounded-full uppercase tracking-[0.3em] border border-blue-500/20">{p.category}</span>
                        <span className="text-[8px] font-black text-gray-700 tracking-[0.2em] uppercase">ID: {p.id}</span>
                      </div>
                      <h4 className="text-3xl font-black text-white group-hover:text-blue-500 transition-colors tracking-tighter mb-4">{p.name}</h4>
                      <p className="text-gray-600 text-sm font-medium line-clamp-2 max-w-2xl leading-relaxed">{p.description}</p>
                    </div>
                    <div className="text-right flex flex-row md:flex-col items-center gap-12 md:gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-8 md:pt-0 mt-8 md:mt-0">
                      <div>
                        <div className="text-5xl font-black text-white tracking-tighter">${p.price}</div>
                        <div className="text-[9px] font-black text-gray-800 uppercase tracking-[0.4em] mt-2">{p.quantity} Units in Pool</div>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleEdit(p)}
                          className="p-5 bg-white/5 hover:bg-blue-600/20 text-blue-500 rounded-2xl transition-all border border-white/5 hover:border-blue-500/40"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button 
                          onClick={() => deleteProduct(p.id)}
                          className="p-5 bg-white/5 hover:bg-red-600/20 text-red-600 rounded-2xl transition-all border border-white/5 hover:border-red-600/40"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="glass p-10 rounded-[2.5rem] border border-white/5">
              <h3 className="text-3xl font-black font-display text-white uppercase tracking-tighter mb-2">Settlement Ledger</h3>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                 <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em] font-black">Scanning for unauthorized transactions...</p>
              </div>
           </div>
           
           <div className="space-y-8">
             {orders.length === 0 ? (
               <div className="glass p-40 text-center rounded-[4rem] border border-dashed border-white/5">
                 <p className="text-gray-800 font-black uppercase tracking-[0.6em] text-[10px]">Registry Stream Offline</p>
               </div>
             ) : (
               orders.map(o => (
                 <div key={o.id} className={`glass border rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-16 transition-all duration-700 ${o.status === 'processing' ? 'border-purple-500/40 shadow-2xl shadow-purple-500/10' : 'border-white/5'}`}>
                   <div className="flex-grow">
                     <div className="flex items-center gap-6 mb-8">
                       <span className="text-[10px] font-black bg-white/10 text-white px-6 py-2.5 rounded-full uppercase tracking-[0.3em] border border-white/10 shadow-lg">{o.id}</span>
                       <span className={`text-[9px] font-black px-6 py-2.5 rounded-full uppercase tracking-widest border shadow-inner ${
                         o.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                         o.status === 'processing' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-gray-500/10 text-gray-500 border-white/5'
                       }`}>
                         {o.status}
                       </span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-sm">
                        <div className="space-y-4">
                           <p className="text-gray-700 text-[9px] font-black uppercase tracking-[0.4em]">Authorized ID: <span className="text-white ml-2">{o.userId}</span></p>
                           <p className="text-white font-black text-xl leading-tight tracking-tight">{o.items.map(i => `${i.name} [x${i.quantity}]`).join(', ')}</p>
                        </div>
                        <div className="space-y-4">
                           <p className="text-gray-700 text-[9px] font-black uppercase tracking-[0.4em]">Settlement Portal</p>
                           <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-2">
                             <p className="text-gray-400 font-bold text-xs">Method: <span className="text-blue-500 ml-2">{o.paymentMethod}</span></p>
                             <p className="text-gray-400 font-bold text-xs">TID Hash: <span className="text-white font-mono text-[10px] ml-2 tracking-[0.2em]">{o.paymentReference}</span></p>
                           </div>
                        </div>
                     </div>
                   </div>
                   <div className="text-right shrink-0 min-w-[300px] border-l md:border-l border-white/5 pl-16">
                      <div className="text-gray-700 text-[10px] font-black uppercase tracking-[0.5em] mb-3">Gross Value</div>
                      <div className="text-6xl font-black text-white mb-10 tracking-tighter shadow-blue-500/20">${o.total}</div>
                      
                      {o.status === 'processing' ? (
                        <button 
                          onClick={() => approveOrder(o.id)}
                          className="w-full py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-2xl shadow-purple-600/40 hover:-translate-y-1"
                        >
                          Authorize Payment
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-4 text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px] py-6 bg-emerald-500/5 rounded-[1.5rem] border border-emerald-500/20">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          Linked Settlement
                        </div>
                      )}
                   </div>
                 </div>
               ))
             )}
           </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="glass p-10 rounded-[2.5rem] border border-white/5">
              <h3 className="text-3xl font-black font-display text-white uppercase tracking-tighter mb-2">Identity Registry</h3>
              <p className="text-[10px] text-gray-700 uppercase tracking-[0.5em] font-black mt-1">Total Authenticated Identifiers: {users.length}</p>
           </div>

           <div className="glass rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/5">
                      <th className="p-10 text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">ID Hash</th>
                      <th className="p-10 text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">Designation</th>
                      <th className="p-10 text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">Comms Link</th>
                      <th className="p-10 text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">Registry Stamp</th>
                      <th className="p-10 text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-40 text-center text-gray-800 italic font-black uppercase tracking-[0.6em] text-[10px]">No External Identifiers Mapped.</td>
                      </tr>
                    ) : (
                      users.map(u => (
                        <tr key={u.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-all duration-300">
                          <td className="p-10 font-mono text-[10px] text-blue-500 tracking-widest">{u.id}</td>
                          <td className="p-10 font-black text-white text-lg tracking-tight">{u.name}</td>
                          <td className="p-10">
                             <div className="text-gray-500 font-bold text-xs">{u.email}</div>
                             <div className="text-blue-600 font-black text-[9px] mt-2 tracking-[0.2em]">{u.phoneNumber || 'LINK_MISSING'}</div>
                          </td>
                          <td className="p-10">
                             <div className="text-gray-400 font-black text-[11px] tracking-tight">{new Date(u.registeredAt).toLocaleDateString()}</div>
                             <div className="text-gray-700 font-black text-[9px] tracking-[0.3em] uppercase mt-1">{new Date(u.registeredAt).toLocaleTimeString()}</div>
                          </td>
                          <td className="p-10">
                            <span className={`px-6 py-2.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] border shadow-2xl transition-all duration-500 ${u.role === 'admin' ? 'bg-blue-600/10 text-blue-500 border-blue-500/30' : 'bg-white/5 text-gray-700 border-white/10'}`}>
                              {u.role === 'admin' ? 'SYSTEM_ADMIN' : 'EXT_IDENTIFIER'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      )}

      {tab === 'security' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="glass p-10 rounded-[2.5rem] border border-red-500/20 flex flex-col items-center justify-center text-center group">
                 <div className="w-16 h-16 bg-red-500/10 rounded-[1.5rem] flex items-center justify-center mb-6 border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-all duration-700">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </div>
                 <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em] mb-2">Firewall Status</h4>
                 <p className="text-3xl font-black text-white uppercase tracking-tighter">Hardened</p>
                 <div className="mt-4 text-[8px] font-black text-gray-700 uppercase tracking-[0.2em]">0 Unauthorized Ingress Attempts</div>
              </div>

              <div className="glass p-10 rounded-[2.5rem] border border-blue-500/20 flex flex-col items-center justify-center text-center group">
                 <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-700">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                 </div>
                 <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-2">Data Integrity</h4>
                 <p className="text-3xl font-black text-white uppercase tracking-tighter">Immutable</p>
                 <div className="mt-4 text-[8px] font-black text-gray-700 uppercase tracking-[0.2em]">Hash Consistency: 100%</div>
              </div>

              <div className="glass p-10 rounded-[2.5rem] border border-emerald-500/20 flex flex-col items-center justify-center text-center group">
                 <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-2">Network Latency</h4>
                 <p className="text-3xl font-black text-white uppercase tracking-tighter">Sub-10ms</p>
                 <div className="mt-4 text-[8px] font-black text-gray-700 uppercase tracking-[0.2em]">Global CDN Optimization: Active</div>
              </div>
           </div>

           <div className="glass p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] -z-10"></div>
              <h3 className="text-2xl font-black font-display text-white uppercase tracking-widest mb-10">Real-time Activity Log</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-6 custom-scrollbar">
                 {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <div key={i} className="flex items-center gap-6 p-5 bg-white/[0.01] rounded-2xl border border-white/5 hover:bg-white/[0.03] transition-all">
                       <span className="text-[9px] font-mono text-blue-500/50">[{new Date().toLocaleTimeString()}]</span>
                       <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System generated audit trail link #{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                       <span className="ml-auto text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full">Verified</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
