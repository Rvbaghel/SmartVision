import React, { useState, useEffect } from 'react';
import { 
  Settings, Database, Play, AlertCircle, Loader2, 
  Music, History, Users, Activity, ShieldCheck, 
  Terminal, Trash2, Edit3, Key, BarChart, Plus
} from 'lucide-react';
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { API_BASE_URL } from "../config/api";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<any>(null);

  // States for PIN Management
  const [testEmail, setTestEmail] = useState("");
  const [testPin, setTestPin] = useState("");
  
  // States for Poem Management
  const [poemId, setPoemId] = useState("");
  const [poemTitle, setPoemTitle] = useState("");
  const [poemLink, setPoemLink] = useState("");
  const [poemImage, setPoemImage] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const isAdmin = user?.email === "vishalbaghel9872@gmail.com";

  const runApi = async (endpoint: string, method: string, body?: any) => {
    setResponse(">> ACCESSING DATA KERNEL...");
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "CONNECTION_REFUSED: Backend is offline." });
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a]">
      <Loader2 size={60} className="text-emerald-500 animate-spin mb-4" />
      <p className="text-emerald-500 font-mono animate-pulse uppercase tracking-widest">Loading Admin Protocols...</p>
    </div>
  );

  if (!isAdmin) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white p-10 text-center">
      <ShieldCheck size={80} className="text-red-500 mb-6 animate-bounce" />
      <h1 className="text-4xl font-black uppercase italic">Access Denied</h1>
      <p className="text-slate-400 mt-2 font-mono">ID: {user?.email || "UNKNOWN_ENTITY"}</p>
      <button onClick={() => window.location.href = "/"} className="mt-8 bg-indigo-500 px-8 py-3 rounded-xl font-bold">RETURN TO BASE</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-10 font-sans">
      
      {/* --- HEADER --- */}
      <header className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-800 pb-8 gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
            <Activity className="text-emerald-500" size={36} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Command<span className="text-emerald-500">Center</span></h1>
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Active Operator: Vishal Baghel</p>
          </div>
        </div>
        <button onClick={() => window.location.href = "/"} className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-2xl text-sm font-bold border border-slate-700 transition-all">EXIT CONSOLE</button>
      </header>

      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- LEFT: OPERATIONS --- */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* 1. PIN MODULE */}
          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] backdrop-blur-xl">
            <h2 className="flex items-center gap-3 text-emerald-400 font-black uppercase tracking-widest mb-8">
              <Key size={24} /> Parental Security Protocols
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input onChange={(e) => setTestEmail(e.target.value)} placeholder="TARGET_EMAIL" className="bg-black/40 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-mono text-sm" />
              <input onChange={(e) => setTestPin(e.target.value)} maxLength={4} placeholder="NEW_4_DIGIT_PIN" className="bg-black/40 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-mono text-sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button onClick={() => runApi("/api/set-pin", "POST", { user_email: testEmail, pin: testPin })} className="bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 p-4 rounded-2xl font-bold hover:bg-emerald-600/30 transition-all flex items-center justify-center gap-2"><Plus size={18}/> CREATE</button>
              <button onClick={() => runApi(`/api/delete-pin/${testEmail}`, "DELETE")} className="bg-red-600/20 text-red-400 border border-red-600/30 p-4 rounded-2xl font-bold hover:bg-red-600/30 transition-all flex items-center justify-center gap-2"><Trash2 size={18}/> DELETE</button>
              <button onClick={() => runApi("/api/get-all-pins", "GET")} className="bg-slate-800 text-white p-4 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2"><Database size={18}/> VIEW ALL</button>
            </div>
            <button 
              onClick={() => { if(!testEmail) { alert("Enter email first"); return; } runApi(`/api/get-progress/${testEmail}`, "GET"); }}
              className="w-full mt-4 bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 p-4 rounded-2xl font-bold hover:bg-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <BarChart size={18}/> INSPECT CHILD PERFORMANCE (BY EMAIL)
            </button>
          </section>

          {/* 2. POEM MODULE */}
          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] backdrop-blur-xl">
            <h2 className="flex items-center gap-3 text-pink-400 font-black uppercase tracking-widest mb-8">
              <Music size={24} /> Library Content Override
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input onChange={(e) => setPoemId(e.target.value)} placeholder="POEM_ID (FOR UPDATE)" className="bg-black/40 border border-slate-700 p-4 rounded-2xl outline-none focus:border-pink-500 transition-all font-mono text-sm" />
              <input onChange={(e) => setPoemTitle(e.target.value)} placeholder="POEM_TITLE" className="bg-black/40 border border-slate-700 p-4 rounded-2xl outline-none focus:border-pink-500 transition-all font-mono text-sm" />
              <input onChange={(e) => setPoemLink(e.target.value)} placeholder="YOUTUBE_URL" className="bg-black/40 border border-slate-700 p-4 rounded-2xl outline-none focus:border-pink-500 transition-all font-mono text-sm" />
              <input onChange={(e) => setPoemImage(e.target.value)} placeholder="IMAGE_NAME.png" className="bg-black/40 border border-slate-700 p-4 rounded-2xl outline-none focus:border-pink-500 transition-all font-mono text-sm" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <button onClick={() => runApi("/api/poems", "GET")} className="bg-slate-800 text-white p-4 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2">FETCH</button>
              <button onClick={() => runApi("/api/admin/add-poem", "POST", { id: 0, title: poemTitle, youtube_link: poemLink, image_name: poemImage })} className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 p-4 rounded-2xl font-bold hover:bg-emerald-600/30 transition-all flex items-center justify-center gap-2">ADD</button>
              <button onClick={() => runApi(`/api/admin/update-poem/${poemId}`, "PUT", { id: parseInt(poemId), title: poemTitle, youtube_link: poemLink, image_name: poemImage })} className="bg-amber-600/20 text-amber-400 border border-amber-500/30 p-4 rounded-2xl font-bold hover:bg-amber-600/30 transition-all flex items-center justify-center gap-2">UPDATE</button>
              <button onClick={() => runApi(`/api/admin/delete-poem/${poemTitle}`, "DELETE")} className="bg-red-600/20 text-red-400 border border-red-500/30 p-4 rounded-2xl font-bold hover:bg-red-600/30 transition-all flex items-center justify-center gap-2">DELETE</button>
            </div>
          </section>
        </div>

        {/* --- RIGHT: THE MATRIX (CONSOLE) --- */}
        <div className="lg:col-span-5 flex flex-col h-[850px]">
          <div className="bg-black border border-slate-800 rounded-[3rem] flex-1 flex flex-col overflow-hidden shadow-2xl relative">
            <div className="bg-slate-800/80 p-6 flex justify-between items-center border-b border-slate-700">
              <div className="flex items-center gap-3">
                <Terminal size={20} className="text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-tighter text-slate-300">Live_Kernel_Buffer</span>
              </div>
              <button onClick={() => setResponse(null)} className="text-slate-500 hover:text-white transition-colors"><Trash2 size={18} /></button>
            </div>
            <div className="flex-1 overflow-auto p-8 font-mono text-sm leading-relaxed scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div key={JSON.stringify(response)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400">
                  {response ? (
                    <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-30 gap-4 mt-40">
                      <Database size={60} />
                      <p className="font-black animate-pulse uppercase tracking-[0.3em]">Awaiting Instruction...</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <Settings size={300} className="absolute bottom-[-100px] right-[-100px] text-emerald-500/5 rotate-12 pointer-events-none" />
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;