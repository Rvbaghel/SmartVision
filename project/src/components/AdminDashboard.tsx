import React, { useState, useEffect } from 'react';
import { Settings, Trash2, Key, Database, Play, AlertCircle, Loader2 } from 'lucide-react';
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { API_BASE_URL } from "../config/api";

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [testEmail, setTestEmail] = useState("");
  const [testPin, setTestPin] = useState("");
  const [response, setResponse] = useState<any>(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const isAdmin = user?.email === "vishalbaghel9872@gmail.com";

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <Loader2 size={48} className="text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-10">
        <AlertCircle size={80} className="text-red-500 mb-4 animate-bounce" />
        <h1 className="text-4xl font-black">Access Denied</h1>
        <p className="text-slate-400 mt-2">Only Vishal can see this page!</p>
        <button onClick={() => window.location.href = "/"} className="mt-6 bg-indigo-500 px-6 py-2 rounded-full">Go Back</button>
      </div>
    );
  }

  const runApi = async (endpoint: string, method: string, body?: any) => {
    try {
      // Note: Remember to upda
      // te this URL when your backend is live (e.g. on Render/AWS)

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "Failed to connect to FastAPI server." });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="flex items-center gap-4 mb-10 border-b pb-6">
        <div className="p-3 bg-indigo-600 rounded-2xl text-white">
          <Settings size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase">Super Admin Console</h1>
          <p className="text-slate-500 font-bold">Welcome, Vishal ({user?.email})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          
          {/* SECTION 1: PIN MANAGEMENT */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-slate-100">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-700">
              <Key className="text-indigo-500"/> PIN Management
            </h2>
            <div className="space-y-4">
              <input 
                placeholder="User Email" 
                className="w-full p-4 rounded-xl border-2 focus:border-indigo-500 outline-none transition-all"
                onChange={(e) => setTestEmail(e.target.value)}
              />
              <input 
                placeholder="4-Digit PIN" 
                maxLength={4}
                className="w-full p-4 rounded-xl border-2 focus:border-indigo-500 outline-none transition-all"
                onChange={(e) => setTestPin(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => runApi("/api/set-pin", "POST", { user_email: testEmail, pin: testPin })} className="flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-all shadow-md active:scale-95"><Play size={18}/> CREATE PIN</button>
                <button onClick={() => runApi(`/api/delete-pin/${testEmail}`, "DELETE")} className="flex items-center justify-center gap-2 bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600 transition-all shadow-md active:scale-95"><Trash2 size={18}/> DELETE PIN</button>
                <button onClick={() => runApi("/api/get-all-pins", "GET")} className="col-span-2 flex items-center justify-center gap-2 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-black transition-all shadow-md active:scale-95"><Database size={18}/> FETCH ALL PARENT RECORDS</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: LIVE CONSOLE */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-emerald-500 font-black uppercase tracking-widest text-sm">Live Data Console</h2>
            <button onClick={() => setResponse(null)} className="text-slate-500 text-xs hover:text-white uppercase font-bold tracking-tighter">Clear</button>
          </div>
          <div className="flex-1 overflow-auto rounded-xl bg-black/30 p-4 border border-slate-800">
            <pre className="font-mono text-sm text-emerald-400">
              {response ? JSON.stringify(response, null, 2) : "// Select an action to view data..."}
            </pre>
          </div>
          <div className="absolute bottom-[-40px] right-[-40px] opacity-5 rotate-12 text-white">
            <Settings size={280} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;  