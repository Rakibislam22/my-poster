'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, Phone, Sparkles, User as UserIcon, X } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error('নাম প্রদান করুন');
        await register(name, identifier, password);
      } else {
        await login(identifier, password);
      }
    } catch (err: any) {
      setError(err.message || 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      // Demo auto register/login
      const demoEmail = 'user@posterbabu.bd';
      const demoPass = 'poster1234';
      try {
        await login(demoEmail, demoPass);
      } catch {
        await register('ডেমো ইউজার (রাকিব)', demoEmail, demoPass);
      }
    } catch (err: any) {
      setError(err.message || 'ডেমো লগইন ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 glass-panel rounded-2xl border border-slate-700/80 shadow-2xl">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-rose-600 text-white mb-3 shadow-lg shadow-emerald-900/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {isRegister ? 'নতুন অ্যাকাউন্ট খুলুন' : 'লগইন করুন'}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            আপনার সংরক্ষিত পোস্টার দেখতে ও এডিট করতে সাইন ইন করুন
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">পূর্ণ নাম</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ রাকিবুল হাসান"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              ইমেইল অথবা মোবাইল নম্বর
            </label>
            <div className="relative">
              {identifier.includes('@') ? (
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              ) : (
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              )}
              <input
                type="text"
                required
                placeholder="example@mail.com অথবা 017XXXXXXXX"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg shadow-lg shadow-emerald-700/30 transition duration-150 disabled:opacity-50 text-sm"
          >
            {loading ? 'প্রক্রিয়াকরণ হচ্ছে...' : isRegister ? 'অ্যাকাউন্ট তৈরি করুন' : 'সাইন ইন করুন'}
          </button>
        </form>

        {/* Dedicated 1-Click Demo Login Button */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="relative flex items-center justify-center mb-3">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              অথবা সরাসরি টেস্ট করতে
            </span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-amber-500/15 hover:bg-amber-500/25 active:scale-[0.99] text-amber-300 font-bold rounded-xl border border-amber-500/40 shadow-lg shadow-amber-950/30 transition flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>১-ক্লিকে ডেমো লগইন (1-Click Demo Login)</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs text-slate-400 hover:text-emerald-400 font-medium transition"
          >
            {isRegister ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? সাইন ইন করুন' : 'অ্যাকাউন্ট নেই? নতুন অ্যাকাউন্ট খুলুন'}
          </button>
        </div>
      </div>
    </div>
  );
};
