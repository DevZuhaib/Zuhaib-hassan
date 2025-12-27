
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Product, Order, AppView, UserRole } from './types';
import { INITIAL_PRODUCTS, ADMIN_CREDENTIALS, ALL_CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AdminDashboard from './components/AdminDashboard';
import CartView from './components/CartView';
import AuthModal from './components/AuthModal';
import ProfileView from './components/ProfileView';
import ContactView from './components/ContactView';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<AppView>('store');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('luxe3d_products');
    const savedOrders = localStorage.getItem('luxe3d_orders');
    const savedUser = localStorage.getItem('luxe3d_user');
    const savedRegistry = localStorage.getItem('luxe3d_registry');
    
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    else setProducts(INITIAL_PRODUCTS);

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedRegistry) setRegisteredUsers(JSON.parse(savedRegistry));
  }, []);

  useEffect(() => {
    localStorage.setItem('luxe3d_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('luxe3d_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('luxe3d_registry', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const categories = useMemo(() => {
    // Return the full 50+ list if needed, or derived from current products
    const cats = products.map(p => p.category);
    return Array.from(new Set([...ALL_CATEGORIES, ...cats]));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { productId, quantity: 1 }];
    });
    showToast("Added to cart!");
  };

  const login = (email: string, pass: string): boolean => {
    if (email === ADMIN_CREDENTIALS.email && pass === ADMIN_CREDENTIALS.password) {
      const admin: User = {
        id: 'ADMIN-CORE-001',
        email,
        role: 'admin',
        name: 'Root Administrator',
        registeredAt: Date.now()
      };
      setCurrentUser(admin);
      localStorage.setItem('luxe3d_user', JSON.stringify(admin));
      setShowAuth(false);
      showToast(`Link Established: Administrator`, "success");
      setView('admin');
      return true;
    }

    const user = registeredUsers.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('luxe3d_user', JSON.stringify(user));
      setShowAuth(false);
      showToast(`Welcome back, ${user.name}`);
      setView('store');
      return true;
    }

    showToast("Credential Mismatch Detected", "error");
    return false;
  };

  const signup = (name: string, email: string, pass: string, phone: string): boolean => {
    if (registeredUsers.find(u => u.email === email)) {
      showToast("Email identifier active", "error");
      return false;
    }

    const newUser: User = {
      id: `USR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name,
      email,
      password: pass,
      phoneNumber: `+92 ${phone}`,
      role: 'user',
      registeredAt: Date.now()
    };

    setRegisteredUsers([...registeredUsers, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('luxe3d_user', JSON.stringify(newUser));
    setShowAuth(false);
    showToast("Identity Registered Successfully!");
    setView('store');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('luxe3d_user');
    setView('store');
    showToast("Link Terminated");
  };

  const placeOrder = (paymentMethod: 'EasyPaisa' | 'Bank Transfer', reference: string) => {
    if (!currentUser) return;
    
    const orderItems = cart.map(c => {
      const p = products.find(prod => prod.id === c.productId)!;
      return { productId: p.id, quantity: c.quantity, price: p.price, name: p.name };
    });

    const total = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).toUpperCase().substr(2, 6)}`,
      userId: currentUser.id,
      items: orderItems,
      total,
      status: 'processing',
      paymentMethod,
      paymentReference: reference,
      createdAt: Date.now()
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setView('profile');
    showToast("payment payment", "success");
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showToast("Asset DB Updated");
  };

  const approveOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'completed' } : o));
    showToast("Transaction Settlement Verified");
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("Asset Purged", "error");
  };

  const addProduct = (p: Product) => {
    setProducts([...products, { ...p, id: Date.now().toString() }]);
    showToast("New Asset Initialized");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar 
        user={currentUser} 
        setView={setView} 
        currentView={view}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        onAuthClick={() => setShowAuth(true)}
        onLogout={logout}
      />

      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-[80vh]">
        {view === 'store' && (
          <>
            <Hero />
            <div className="mt-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-black font-display text-white tracking-tighter uppercase leading-none">Global Collection</h2>
                  <p className="text-gray-700 mt-2 text-[9px] font-black uppercase tracking-[0.5em]">АЙЕША 𝗛𝗔𝗦𝗦𝗔𝗡 ™ Selected Inventory</p>
                </div>
                <div className="flex flex-wrap gap-2 max-w-2xl justify-end">
                   <button 
                    onClick={() => setSelectedCategory('All')}
                    className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${selectedCategory === 'All' ? 'bg-white text-black border-white' : 'glass text-gray-700 hover:text-white hover:border-white/20'}`}
                   >
                    All
                   </button>
                   {ALL_CATEGORIES.slice(0, 8).map(cat => (
                     <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${selectedCategory === cat ? 'bg-blue-500 text-white border-blue-500' : 'glass text-gray-700 hover:text-white hover:border-white/20'}`}
                     >
                      {cat}
                     </button>
                   ))}
                </div>
              </div>
              <ProductGrid products={filteredProducts} addToCart={addToCart} />
            </div>
          </>
        )}

        {view === 'live' && (
          <div className="py-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="relative inline-block mb-12">
                <div className="w-32 h-32 bg-red-500/10 rounded-full blur-[60px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse"></div>
                <div className="w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-red-600/30 animate-float">
                   <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
                </div>
             </div>
             <h2 className="text-6xl font-black font-display text-white mb-4 tracking-tighter">LIVE BROADCAST</h2>
             <p className="text-gray-700 font-black text-xs uppercase tracking-[0.5em] mb-12">Coming Soon: Interactive 3D Shopping Streams</p>
             <div className="glass max-w-4xl mx-auto rounded-[3rem] aspect-video border border-white/5 flex items-center justify-center">
                <p className="text-gray-800 font-black uppercase tracking-[0.8em]">Signal Offline</p>
             </div>
          </div>
        )}

        {view === 'services' && (
          <div className="py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="text-center mb-20">
                <h2 className="text-7xl font-black font-display text-white mb-6 tracking-tightest">PREMIUM SERVICES</h2>
                <p className="text-gray-700 font-black text-xs uppercase tracking-[0.5em]">Tailored Digital Solutions & Consultation</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { title: "Asset Sourcing", icon: "💎", desc: "We track down the world's most exclusive luxury items specifically for your portfolio." },
                  { title: "VIP Expediting", icon: "⚡", desc: "Priority fulfillment and white-glove delivery for our high-tier registry members." },
                  { title: "Custom Design", icon: "🎨", desc: "Bespoke 3D model customization and digital asset creation for elite collectors." }
                ].map(s => (
                  <div key={s.title} className="glass p-12 rounded-[3rem] border border-white/5 hover:border-blue-500/20 transition-all group">
                     <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500 inline-block">{s.icon}</div>
                     <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{s.title}</h3>
                     <p className="text-gray-600 font-medium leading-relaxed">{s.desc}</p>
                     <button className="mt-8 text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] hover:text-white transition-colors">Inquire Link &rarr;</button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {view === 'other' && (
          <div className="py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="glass p-20 rounded-[4rem] border border-white/5 text-center max-w-4xl mx-auto relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/5 blur-[100px] -z-10"></div>
                <h2 className="text-4xl font-black font-display text-white mb-8 tracking-tighter">EXTENDED MODULES</h2>
                <div className="grid grid-cols-2 gap-8">
                   <div className="p-10 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/[0.08] cursor-pointer transition-all">
                      <div className="text-3xl mb-4">📈</div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Marketplace Stats</span>
                   </div>
                   <div className="p-10 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/[0.08] cursor-pointer transition-all">
                      <div className="text-3xl mb-4">🌐</div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Global Hubs</span>
                   </div>
                   <div className="p-10 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/[0.08] cursor-pointer transition-all">
                      <div className="text-3xl mb-4">📂</div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Public Ledger</span>
                   </div>
                   <div className="p-10 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/[0.08] cursor-pointer transition-all">
                      <div className="text-3xl mb-4">🏆</div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Member Rewards</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {view === 'contact' && <ContactView />}

        {view === 'admin' && currentUser?.role === 'admin' && (
          <AdminDashboard 
            products={products} 
            orders={orders} 
            users={registeredUsers}
            updateProduct={updateProduct} 
            deleteProduct={deleteProduct}
            addProduct={addProduct}
            approveOrder={approveOrder}
            categories={categories}
          />
        )}

        {view === 'cart' && (
          <CartView 
            cart={cart} 
            setCart={setCart}
            products={products} 
            placeOrder={placeOrder}
            isLoggedIn={!!currentUser}
            onAuthClick={() => setShowAuth(true)}
          />
        )}

        {view === 'profile' && currentUser && (
          <ProfileView orders={orders.filter(o => o.userId === currentUser.id)} user={currentUser} />
        )}
      </main>

      {showAuth && (
        <AuthModal 
          onLogin={login} 
          onSignup={signup} 
          onClose={() => setShowAuth(false)} 
        />
      )}

      {toast && (
        <div className={`fixed bottom-12 right-12 px-8 py-5 rounded-[1.5rem] glass shadow-2xl z-[100] border-l-4 ${toast.type === 'success' ? 'border-blue-500' : 'border-red-600'} animate-in slide-in-from-right-10 duration-500`}>
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-blue-500' : 'bg-red-500'} animate-ping`}></div>
            <div>
               <span className="font-black uppercase tracking-[0.3em] text-[8px] text-gray-700 block mb-1">Link Notification</span>
               <p className="font-bold text-sm text-white">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <footer className="py-20 glass border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl">A</div>
            <span className="text-3xl font-black font-display tracking-tightest">АЙЕША 𝗛𝗔𝗦𝗦𝗔𝗡 ™</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10">
             <button onClick={() => setView('store')} className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-700 hover:text-white">Home</button>
             <button onClick={() => setView('services')} className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-700 hover:text-white">Services</button>
             <button onClick={() => setView('contact')} className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-700 hover:text-white">Support</button>
             <button 
              onClick={() => {
                if(currentUser?.role === 'admin') setView('admin');
                else setShowAuth(true);
              }}
              className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-900 hover:text-blue-500 transition-colors"
             >
              Access Hub Console
             </button>
          </div>

          <p className="text-gray-800 text-[9px] font-black uppercase tracking-[0.5em] text-center max-w-xl leading-relaxed">
            All digital assets and commerce protocols encrypted via АЙЕША 𝗛𝗔𝗦𝗦𝗔𝗡 ™ Core 2024. Unauthorized access is recorded and reported to internal security.
          </p>

          <div className="flex gap-8">
             <a href="#" className="text-gray-700 hover:text-blue-400 transition-colors uppercase text-[10px] font-black tracking-widest">Twitter</a>
             <a href="#" className="text-gray-700 hover:text-purple-400 transition-colors uppercase text-[10px] font-black tracking-widest">Instagram</a>
             <a href="https://wa.me/923255540480" className="text-gray-700 hover:text-emerald-400 transition-colors uppercase text-[10px] font-black tracking-widest">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
