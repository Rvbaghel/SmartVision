import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, AlertCircle, Calendar, Gamepad2, Loader2, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { API_BASE_URL } from '../config/api';
import Navbar from '../Components/Navbar';

interface GameSession {
  id: number;
  game_name: string;
  wrong_count: number;
  created_at: string;
}

const ChildProgress: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.email) return;
      try {
        const response = await fetch(`${API_BASE_URL}/api/get-progress/${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  // Calculate Stats
  const totalStars = sessions.length * 10;
  const totalMistakes = sessions.reduce((acc, curr) => acc + curr.wrong_count, 0);
  const bestGame = sessions.length > 0 
    ? [...sessions].sort((a, b) => a.wrong_count - b.wrong_count)[0].game_name 
    : "None yet";

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-purple-50">
        <Loader2 size={48} className="text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 font-sans pb-20">
      <Navbar />

      <div className="pt-28 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => navigate("/")} 
            className="bg-white p-3 rounded-2xl shadow-md text-purple-600 hover:scale-110 transition-all border-b-4 border-purple-100"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Mission Reports</h1>
          <div className="w-12"></div> {/* Spacer */}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2.5rem] shadow-xl border-b-8 border-yellow-100 flex flex-col items-center">
            <div className="bg-yellow-100 p-4 rounded-full mb-4">
              <Star className="text-yellow-500 fill-yellow-500" size={32} />
            </div>
            <span className="text-4xl font-black text-slate-800">{totalStars}</span>
            <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Stars Earned</span>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2.5rem] shadow-xl border-b-8 border-rose-100 flex flex-col items-center">
            <div className="bg-rose-100 p-4 rounded-full mb-4">
              <TrendingDown className="text-rose-500" size={32} />
            </div>
            <span className="text-4xl font-black text-slate-800">{totalMistakes}</span>
            <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Mistakes</span>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2.5rem] shadow-xl border-b-8 border-emerald-100 flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <Trophy className="text-emerald-500" size={32} />
            </div>
            <span className="text-xl font-black text-slate-800 uppercase">{bestGame}</span>
            <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Best Performance</span>
          </motion.div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white rounded-[3rem] shadow-2xl border-b-[12px] border-slate-100 overflow-hidden">
          <div className="p-8 border-b-2 border-slate-50 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-xl font-black text-slate-700 flex items-center gap-2">
              <Gamepad2 className="text-purple-500" /> Recent Learning Missions
            </h2>
          </div>

          <div className="divide-y-2 divide-slate-50">
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <div key={session.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="bg-purple-100 p-4 rounded-2xl text-purple-600">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800">{session.game_name}</h3>
                      <p className="text-slate-400 font-bold text-sm">
                        {new Date(session.created_at).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-rose-500 font-black text-lg">
                      <AlertCircle size={18} />
                      {session.wrong_count} Mistakes
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm uppercase">
                      <Star size={14} className="fill-emerald-500" />
                      10 Stars Earned
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-400">No missions completed yet!</h3>
                <p className="text-slate-400">Start playing games to see your progress here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildProgress;