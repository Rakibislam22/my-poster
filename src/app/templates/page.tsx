'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, Template } from '@/lib/api';
import {
  ArrowRight,
  Filter,
  Layers,
  Palette,
  Sparkles,
  Users,
  CheckCircle,
} from 'lucide-react';

const fallbackTemplates: Template[] = [
  {
    _id: 'seed-victory-day',
    title: 'মহান বিজয় দিবস - লাল-সবুজ শ্রদ্ধাঞ্জলি',
    occasionType: 'victory_day',
    thumbnailUrl: '',
    canvasDimensions: { width: 1200, height: 1600 },
    layoutConfig: {
      backgroundColor: '#005A36',
      primaryColor: '#F42A41',
      secondaryColor: '#FFD700',
      leaderSlots: [
        { id: '1', label: 'শীর্ষ নেতা ১', x: 220, y: 180, width: 220, height: 220, shape: 'circle' },
        { id: '2', label: 'শীর্ষ নেতা ২', x: 980, y: 180, width: 220, height: 220, shape: 'circle' },
      ],
      candidateSlot: { x: 600, y: 820, width: 650, height: 850 },
      textSlots: {
        headline: { label: 'শিরোনাম', fontFamily: 'Hind Siliguri', fontSize: 64, color: '#FFFFFF', y: 420 },
        candidateName: { label: 'নাম', fontFamily: 'Hind Siliguri', fontSize: 72, color: '#FFD700', y: 1320 },
        designation: { label: 'পদবি', fontFamily: 'Hind Siliguri', fontSize: 38, color: '#FFFFFF', y: 1400 },
        party: { label: 'দল', fontFamily: 'Hind Siliguri', fontSize: 32, color: '#E2E8F0', y: 1460 },
        footerCredit: { label: 'প্রচারে', fontFamily: 'Hind Siliguri', fontSize: 30, color: '#FFFFFF', y: 1540 },
      },
    },
    isActive: true,
  },
  {
    _id: 'seed-campaign',
    title: 'নির্বাচনী প্রচারণা ও দোয়া প্রার্থী',
    occasionType: 'campaign',
    thumbnailUrl: '',
    canvasDimensions: { width: 1200, height: 1600 },
    layoutConfig: {
      backgroundColor: '#0F2027',
      primaryColor: '#203A43',
      secondaryColor: '#FFCC00',
      leaderSlots: [
        { id: '1', label: 'নেতা ১', x: 200, y: 150, width: 180, height: 180, shape: 'circle' },
        { id: '2', label: 'নেতা ২', x: 600, y: 130, width: 220, height: 220, shape: 'circle' },
        { id: '3', label: 'নেতা ৩', x: 1000, y: 150, width: 180, height: 180, shape: 'circle' },
      ],
      candidateSlot: { x: 600, y: 800, width: 700, height: 900 },
      textSlots: {
        headline: { label: 'স্লোগান', fontFamily: 'Hind Siliguri', fontSize: 56, color: '#FFFFFF', y: 380 },
        candidateName: { label: 'নাম', fontFamily: 'Hind Siliguri', fontSize: 76, color: '#FFD700', y: 1310 },
        designation: { label: 'পদবি', fontFamily: 'Hind Siliguri', fontSize: 42, color: '#FFFFFF', y: 1395 },
        party: { label: 'দল', fontFamily: 'Hind Siliguri', fontSize: 34, color: '#A0AEC0', y: 1455 },
        footerCredit: { label: 'প্রচারে', fontFamily: 'Hind Siliguri', fontSize: 32, color: '#FFFFFF', y: 1540 },
      },
    },
    isActive: true,
  },
  {
    _id: 'seed-condolence',
    title: 'শোক প্রস্তাব ও বিনম্র শ্রদ্ধাঞ্জলি',
    occasionType: 'condolence',
    thumbnailUrl: '',
    canvasDimensions: { width: 1200, height: 1600 },
    layoutConfig: {
      backgroundColor: '#171923',
      primaryColor: '#2D3748',
      secondaryColor: '#CBD5E0',
      leaderSlots: [
        { id: '1', label: 'শীর্ষ নেতৃত্ব', x: 600, y: 140, width: 190, height: 190, shape: 'circle' },
      ],
      candidateSlot: { x: 600, y: 680, width: 550, height: 650 },
      textSlots: {
        headline: { label: 'শোক বাণী', fontFamily: 'Hind Siliguri', fontSize: 60, color: '#E2E8F0', y: 320 },
        candidateName: { label: 'নাম', fontFamily: 'Hind Siliguri', fontSize: 70, color: '#FFFFFF', y: 1120 },
        designation: { label: 'পদবি', fontFamily: 'Hind Siliguri', fontSize: 36, color: '#CBD5E0', y: 1210 },
        party: { label: 'দল', fontFamily: 'Hind Siliguri', fontSize: 32, color: '#A0AEC0', y: 1270 },
        footerCredit: { label: 'শোক প্রকাশে', fontFamily: 'Hind Siliguri', fontSize: 32, color: '#FFFFFF', y: 1540 },
      },
    },
    isActive: true,
  },
];

export default function TemplatesPage() {
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [templates, setTemplates] = useState<Template[]>(fallbackTemplates);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'সকল টেমপ্লেট' },
    { id: 'victory_day', label: 'মহান বিজয় দিবস' },
    { id: 'campaign', label: 'নির্বাচনী প্রচার' },
    { id: 'condolence', label: 'শোক ও শ্রদ্ধা' },
    { id: 'eid', label: 'পবিত্র ঈদ ও উৎসব' },
  ];

  useEffect(() => {
    setLoading(true);
    api
      .getTemplates(selectedOccasion)
      .then((res) => {
        if (res.templates && res.templates.length > 0) {
          setTemplates(res.templates);
        } else {
          // Filter fallback
          setTemplates(
            selectedOccasion === 'all'
              ? fallbackTemplates
              : fallbackTemplates.filter((t) => t.occasionType === selectedOccasion)
          );
        }
      })
      .catch(() => {
        setTemplates(
          selectedOccasion === 'all'
            ? fallbackTemplates
            : fallbackTemplates.filter((t) => t.occasionType === selectedOccasion)
        );
      })
      .finally(() => setLoading(false));
  }, [selectedOccasion]);

  const getOccasionLabel = (type: string) => {
    switch (type) {
      case 'victory_day':
        return 'বিজয় দিবস';
      case 'campaign':
        return 'নির্বাচনী প্রচার';
      case 'condolence':
        return 'শোক ও স্মৃতিচারণ';
      case 'eid':
        return 'ঈদ উৎসব';
      default:
        return 'সাধারণ শুভেচ্ছা';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>কিউরেটেড কালেকশন</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          পোস্টার টেমপ্লেট সংগ্রহশালা
        </h1>
        <p className="text-sm text-slate-400">
          আপনার পছন্দমতো যেকোনো টেমপ্লেট নির্বাচন করুন এবং কয়েক সেকেন্ডে সম্পূর্ণ কাস্টমাইজড পোস্টার তৈরি করুন।
        </p>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedOccasion(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition duration-150 ${
              selectedOccasion === cat.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 font-semibold'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-96 rounded-2xl bg-slate-900/50 animate-pulse border border-slate-800"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl) => {
            const leaderCount = tpl.layoutConfig?.leaderSlots?.length || 0;
            const bgHex = tpl.layoutConfig?.backgroundColor || '#005A36';

            return (
              <div
                key={tpl._id}
                className="group relative flex flex-col justify-between glass-panel rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Visual Preview Box */}
                <div
                  className="relative h-64 w-full flex flex-col items-center justify-between p-4 overflow-hidden border-b border-slate-800"
                  style={{ backgroundColor: bgHex }}
                >
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Top Badge */}
                  <div className="relative z-10 w-full flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10">
                      {getOccasionLabel(tpl.occasionType)}
                    </span>
                    <span className="text-[10px] text-white/70 font-mono">
                      {tpl.canvasDimensions?.width} × {tpl.canvasDimensions?.height} px
                    </span>
                  </div>

                  {/* Mock Visual Content */}
                  <div className="relative z-10 text-center space-y-2 max-w-[260px]">
                    <div className="px-3 py-1 rounded-md bg-rose-600 text-[11px] font-bold text-white shadow">
                      {tpl.title}
                    </div>
                    <div className="w-16 h-20 mx-auto rounded-lg border border-white/20 bg-black/40 flex items-center justify-center text-[10px] text-white/60">
                      প্রার্থী
                    </div>
                  </div>

                  <div className="relative z-10 w-full text-center py-1 bg-black/40 rounded text-[9px] text-white/80">
                    {leaderCount} জন শীর্ষ নেতা স্লট + প্রার্থী ফ্রেম
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                      {tpl.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      প্রিন্ট-রেডি কালার গ্রেডিয়েন্ট, ফ্লোরাল ও ন্যাশনাল মোটিফ সংবলিত ডিজাইন
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{leaderCount} জন শীর্ষ নেতার বৃত্তাকার ছবি স্লট</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Gemini AI স্লোগান অপ্টিমাইজার সাপোর্টেড</span>
                    </div>
                  </div>

                  <Link
                    href={`/create?templateId=${tpl._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-900/30 transition"
                  >
                    <span>এই টেমপ্লেট দিয়ে তৈরি করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
