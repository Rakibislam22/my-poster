'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, Poster } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  Calendar,
  CheckCircle2,
  Download,
  FolderArchive,
  Maximize2,
  PlusCircle,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';

export default function MyPostersPage() {
  const { user, openAuthModal } = useAuth();
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeZoomUrl, setActiveZoomUrl] = useState<string | null>(null);

  const fetchPosters = async () => {
    setLoading(true);
    try {
      const res = await api.getUserPosters();
      setPosters(res.posters || []);
    } catch (err) {
      console.warn('Could not fetch user posters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosters();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই পোস্টারটি মুছে ফেলতে চান?')) return;
    try {
      await api.deletePoster(id);
      setPosters(posters.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.message || 'পোস্টার মোছা যায়নি');
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <FolderArchive className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white">আপনার সংরক্ষিত পোস্টার দেখতে লগইন করুন</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            আপনার অ্যাকাউন্টে পূর্বে তৈরি করা সকল পোস্টার সংরক্ষিত থাকে। যেকোনো সময় পুনরায় ডাউনলোড ও এডিট করতে সাইন ইন করুন।
          </p>
        </div>
        <button
          onClick={openAuthModal}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 transition"
        >
          লগইন বা সাইন আপ করুন
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            সংরক্ষিত পোস্টার গ্যালারি
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
              {posters.length} টি পোস্টার
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            আপনার অ্যাকাউন্ট থেকে পূর্বে তৈরি করা সকল প্রিন্ট-রেডি পোস্টার
          </p>
        </div>

        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন পোস্টার তৈরি করুন</span>
        </Link>
      </div>

      {/* Posters Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800 overflow-hidden flex flex-col"
            >
              <div className="w-full aspect-[3/2] bg-slate-800/50" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-800 rounded w-2/3" />
                <div className="h-3 bg-slate-800/60 rounded w-1/2" />
                <div className="h-8 bg-slate-800/40 rounded w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : posters.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-panel border border-slate-800 space-y-4 max-w-md mx-auto">
          <Sparkles className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">এখনও কোনো পোস্টার তৈরি করা হয়নি</h3>
          <p className="text-xs text-slate-400">
            পোস্টার ক্রিয়েটরে গিয়ে আপনার প্রথম বিজয় দিবস বা নির্বাচনী পোস্টার তৈরি করুন।
          </p>
          <Link
            href="/create"
            className="inline-block px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
          >
            পোস্টার তৈরি করুন
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posters.map((poster) => {
            const formattedDate = new Date(poster.createdAt).toLocaleDateString('bn-BD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            const occasionBadges: Record<string, { label: string; color: string }> = {
              campaign: { label: 'নির্বাচনী প্রচার', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
              victory_day: { label: 'বিজয় দিবস', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
              condolence: { label: 'শোক প্রস্তাব', color: 'bg-slate-700/60 text-slate-200 border-slate-600/50' },
              eid: { label: 'ঈদ মোবারক', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
            };

            const occasion = poster.formData?.occasionType || 'campaign';
            const badge = occasionBadges[occasion] || { label: 'পোস্টার', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };

            return (
              <div
                key={poster._id}
                className="group flex flex-col justify-between glass-panel rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Poster Image: 100% matched to 3:2 landscape canvas (1200x800) */}
                <div className="relative aspect-[3/2] w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                  {poster.generatedImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={poster.generatedImageUrl}
                      alt={poster.formData?.candidateName || 'Poster'}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-slate-500">
                      ছবি পাওয়া যায়নি
                    </div>
                  )}

                  {/* Occasion Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-sm ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Quick Zoom Button */}
                  {poster.generatedImageUrl && (
                    <button
                      onClick={() => setActiveZoomUrl(poster.generatedImageUrl || null)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-black/75 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition shadow backdrop-blur-sm cursor-pointer"
                      title="জুম করুন"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Info & Actions */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">
                      {poster.formData?.candidateName || 'প্রার্থীর নাম'}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {poster.formData?.designation || poster.formData?.headlineBangla || 'নির্বাচনী পোস্টার'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      প্রিন্ট-রেডি (HD)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {poster.generatedImageUrl && (
                      <a
                        href={poster.generatedImageUrl}
                        download={`poster-${poster.formData?.candidateName || 'download'}.png`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ডাউনলোড</span>
                      </a>
                    )}

                    <button
                      onClick={() => handleDelete(poster._id)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>মুছে ফেলুন</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Zoom Modal */}
      {activeZoomUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setActiveZoomUrl(null)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeZoomUrl}
              alt="Zoomed Poster"
              className="max-h-[85vh] w-auto rounded-xl shadow-2xl object-contain border border-slate-700"
            />
          </div>
        </div>
      )}
    </div>
  );
}
