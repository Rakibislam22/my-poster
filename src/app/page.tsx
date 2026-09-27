'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  Download,
  FileCheck,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Palette,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'victory_day' | 'campaign' | 'condolence' | 'eid'>('victory_day');

  const occasions = [
    {
      id: 'victory_day' as const,
      title: 'মহান বিজয় দিবস',
      subtitle: '১৬ই ডিসেম্বর ও জাতীয় দিবস',
      desc: 'জাতীয় স্মৃতিসৌধ, লাল-সবুজ পতাকা ও রক্তস্নাত বীর শহীদদের প্রতি সর্বোচ্চ বিনম্র শ্রদ্ধার বিশেষ ব্যানার।',
      badge: 'জনপ্রিয়',
      color: 'from-emerald-950 via-slate-900 to-slate-950 border-emerald-600/40 hover:border-emerald-500',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      leaders: '৩ জন শীর্ষ নেতা স্লট',
      fontStyle: 'বোল্ড শ্রদ্ধাঞ্জলি ফন্ট',
      sampleHeadline: 'মহান বিজয় দিবসে বীর শহীদদের স্মরণে বিনম্র শ্রদ্ধাঞ্জলি',
    },
    {
      id: 'campaign' as const,
      title: 'নির্বাচনী প্রচারণা ও দোয়া',
      subtitle: 'সংসদ, উপজেলা, পৌরসভা ও ওয়ার্ড',
      desc: 'মার্কা, শীর্ষ ৩ জাতীয় নেতার বৃত্তাকার ছবি এবং প্রার্থীর মর্যাদাপূর্ণ প্রতিকৃতি সংবলিত নির্বাচনী ব্যানার।',
      badge: 'সর্বোচ্চ ব্যবহৃত',
      color: 'from-slate-900 via-emerald-950/40 to-slate-950 border-slate-700/60 hover:border-emerald-500/60',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      leaders: '৩ জন শীর্ষ নেতৃত্ব + মার্কা',
      fontStyle: 'ধারালো নির্বাচনী স্লোগান',
      sampleHeadline: 'এলাকার সামগ্রিক উন্নয়ন ও শান্তি প্রতিষ্ঠায় আপনার মূল্যবান ভোট ও দোয়া প্রার্থী',
    },
    {
      id: 'condolence' as const,
      title: 'শোক প্রস্তাব ও স্মৃতিচারণ',
      subtitle: 'প্রিয়জন ও জাতীয় ব্যক্তিত্ব',
      desc: 'মরহুমের স্মরণে গম্ভীর ও মার্জিত মনোক্রোম ডিজাইনে তৈরি স্মরণিকা, শ্রদ্ধাঞ্জলি ও দোয়া কামনার পোস্টার।',
      badge: 'মর্যাদাপূর্ণ',
      color: 'from-neutral-950 via-slate-900 to-slate-950 border-neutral-700/60 hover:border-slate-500',
      badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
      leaders: '৩ জন শ্রদ্ধাভাজন ব্যক্তি',
      fontStyle: 'মার্জিত শোকবাণী ফন্ট',
      sampleHeadline: 'মরহুমের আত্মার মাগফিরাত কামনায় শোক প্রস্তাব ও বিনম্র শ্রদ্ধাঞ্জলি',
    },
    {
      id: 'eid' as const,
      title: 'পবিত্র ঈদ ও উৎসব শুভেচ্ছা',
      subtitle: 'ঈদুল ফিতর ও ঈদুল আজহা',
      desc: 'ঐতিহ্যবাহী ইসলামিক মোটিফ, গম্বুজ, চাঁদ ও তারকার আবহে প্রিয় এলাকাবাসীকে শুভেচ্ছা জানানোর পোস্টার।',
      badge: 'উৎসবমুখর',
      color: 'from-teal-950 via-slate-900 to-slate-950 border-teal-700/60 hover:border-teal-400',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      leaders: '৩ জন কেন্দ্রীয় নেতা',
      fontStyle: 'উৎসব মোবারকবাদ ফন্ট',
      sampleHeadline: 'পবিত্র ঈদুল ফিতরের আনন্দ ছড়িয়ে পড়ুক সবার মাঝে — ঈদ মোবারক',
    },
  ];

  const steps = [
    {
      number: '০১',
      title: 'উপলক্ষ ও টেমপ্লেট নির্বাচন',
      desc: 'বিজয় দিবস, নির্বাচনী প্রচার, শোকবাণী বা ঈদ মোবারক—আপনার প্রয়োজন অনুযায়ী নিখুঁত বাংলাদেশি লেআউট পছন্দ করুন।',
      icon: Layers,
    },
    {
      number: '০২',
      title: 'তথ্য ও ছবি আপলোড',
      desc: 'প্রার্থীর ছবি এবং শীর্ষ ৩ জন নেতার ফটো যুক্ত করুন। আমাদের Gemini AI স্বয়ংক্রিয়ভাবে আকর্ষণীয় ছন্দময় স্লোগান লিখে দেবে।',
      icon: Users,
    },
    {
      number: '০৩',
      title: '১-ক্লিকে সরাসরি ডাউনলোড',
      desc: 'কোনো ওয়াটারমার্ক ছাড়াই ১২০০×১৬০০ হাই-রেজ্যুলেশন প্রিন্ট কপি (PNG) সরাসরি আপনার কম্পিউটারে ডাউনলোড করুন।',
      icon: Download,
    },
  ];

  const features = [
    {
      title: '১০০% সঠিক যুক্তাক্ষর (হিন্দু শিলিগুড়ি)',
      desc: 'AI ইমেজ জেনারেটরের বিকৃত বা ভুল বানান ভুলে যান। সার্ভার ক্যানভাস বিশুদ্ধ ফন্টে প্রতিটি যুক্তাক্ষর নিখুঁতভাবে ফুটিয়ে তোলে।',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Google Gemini AI স্লোগান পলিশার',
      desc: 'একটি ছোট খসড়া বা বিষয় লিখে এক ক্লিকেই পেয়ে যান রাজনৈতিক দল ও উপলক্ষ অনুযায়ী পরিশীলিত ও ছন্দময় স্লোগান।',
      icon: Sparkles,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'প্রেস ও ফ্লেক্স প্রিন্ট রেডি (HD)',
      desc: '১২০০×১৬০০ পিক্সেলের উচ্চ রেজ্যুলেশন। সোশ্যাল মিডিয়ায় পোস্ট করার পাশাপাশি সরাসরি প্রেসে প্রিন্ট করার উপযোগী।',
      icon: Printer,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'শীর্ষ নেতা ও প্রার্থী স্লট স্বয়ংক্রিয় অবস্থান',
      desc: 'বাংলাদেশের প্রথা অনুযায়ী উপরে শীর্ষ নেতাদের বৃত্তাকার ফ্রেম ও মাঝে প্রার্থীর প্রতিকৃতি স্বয়ংক্রিয়ভাবে পজিশন ও কাটআউট হয়।',
      icon: Palette,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    },
    {
      title: '৮২ms আল্ট্রা-ফাস্ট রেন্ডারিং ইঞ্জিন',
      desc: 'ভারী ফটোশপের প্রয়োজন নেই। ক্লাউড ক্যানভাস সেকেন্ডের ভগ্নাংশে পুরো লেআউট কম্পোজ করে রেজাল্ট প্রদান করে।',
      icon: Zap,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      title: '১০০% ফ্রি ও তাৎক্ষণিক ডাউনলোড',
      desc: 'কোনো ওয়াটারমার্ক বা হিডেন চার্জ নেই। তৈরি শেষে ডাউনলোড বাটনে চাপলেই সরাসরি ডিভাইসে ফাইল সংরক্ষিত হবে।',
      icon: Download,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
  ];

  const comparisonRows = [
    {
      feature: 'তৈরি হতে সময়',
      designer: '২ থেকে ৩ দিন ডিজাইনারের অপেক্ষায়',
      ourPlatform: 'মাত্র ২ মিনিটে স্বয়ংক্রিয়ভাবে তৈরি',
    },
    {
      feature: 'খরচ',
      designer: 'প্রতি ডিজাইনে ৫০০ - ১,৫০০ টাকা',
      ourPlatform: 'সম্পূর্ণ বিনামূল্যে (১০০% ফ্রি)',
    },
    {
      feature: 'বাংলা ফন্টের শুদ্ধতা',
      designer: 'ফটোশপে অনেক সময় যুক্তাক্ষর ভেঙে যায়',
      ourPlatform: '১০০% খাঁটি হিন্দু শিলিগুড়ি বাংলা ফন্ট',
    },
    {
      feature: 'স্লোগান ও টেক্সট লেখা',
      designer: 'নিজে লিখে দিতে হয় বা কপি-পেস্ট',
      ourPlatform: 'Gemini AI দিয়ে মুহূর্তেই আকর্ষণীয় স্লোগান',
    },
    {
      feature: 'পরিমার্জন ও রি-জেনারেট',
      designer: 'ডিজাইনারকে বারবার ফোন দিতে হয়',
      ourPlatform: 'লাইভ প্রিভিউ দেখে আনলিমিটেড এডিট ও ডাউনলোড',
    },
  ];

  const testimonials = [
    {
      name: 'তানভীর আহমেদ',
      role: 'যুগ্ম আহ্বায়ক, ছাত্রদল',
      area: 'ঢাকা বিশ্ববিদ্যালয়',
      quote: 'বিজয় দিবসে রাতের বেলা পোস্টার দরকার ছিল, কোনো ডিজাইনারকে পাওয়া যায়নি। এই ওয়েবসাইটে ছবি ও নাম দিয়ে ২ মিনিটেই নিখুঁত পোস্টার পেয়ে গেছি!',
      stars: 5,
    },
    {
      name: 'মোঃ সাখাওয়াত হোসেন',
      role: 'ইউপি সদস্য পদপ্রার্থী',
      area: 'কুমিল্লা সদর',
      quote: 'মার্কা ও নেতাদের ছবিগুলো ফ্রেমের ভেতর চমৎকার বসেছে। হিন্দু শিলিগুড়ি ফন্টে পোস্টারটি সরাসরি প্রেসে প্রিন্ট করিয়েছি, কোনো কোয়ালিটি লস হয়নি।',
      stars: 5,
    },
    {
      name: 'ব্যারিস্টার ফারহান কবির',
      role: 'সামাজিক সংগঠক',
      area: 'ধানমন্ডি, ঢাকা',
      quote: 'মরহুম নেতার স্মরণে শোক ব্যানার তৈরি করেছিলাম। Gemini AI এর পরিশীলিত শোকবাণী আমাকে মুগ্ধ করেছে। অসাধারণ উদ্যোগ!',
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: 'পোস্টারটি কি সরাসরি প্রেসে প্রিন্ট করা যাবে?',
      a: 'হ্যাঁ, প্রতিটি পোস্টার ১২০০×১৬০০ পিক্সেল এবং হাই ডেনসিটি কালার স্কেলে রেন্ডার হয়। আপনি ডিজিটাল ব্যানার, সোশ্যাল মিডিয়া ও ফ্লেক্স প্রিন্ট—উভয় ক্ষেত্রেই অনায়াসে ব্যবহার করতে পারবেন।',
    },
    {
      q: 'পোস্টারের বাংলা যুক্তাক্ষর কি ভেঙে যাওয়ার কোনো সম্ভাবনা আছে?',
      a: 'একদমই না। আমরা ক্লাউড ক্যানভাসে অনুমোদিত খাঁটি হিন্দু শিলিগুড়ি (Hind Siliguri) ফন্ট ইঞ্জিন ব্যবহার করি, ফলে যেকোনো যুক্তাক্ষর ১০০% নির্ভুলভাবে ফুটে ওঠে।',
    },
    {
      q: 'পোস্টার তৈরি করতে কোনো টাকা বা চার্জ দিতে হবে কি?',
      a: 'না, "আমার পোস্টার" সম্পূর্ণ ফ্রি প্ল্যাটফর্ম। কোনো ওয়াটারমার্ক ছাড়া যে কেউ ফ্রিতে পোস্টার তৈরি ও সরাসরি ডাউনলোড করতে পারেন।',
    },
    {
      q: 'স্লোগান নিজে লিখতে না পারলে কি কোনো উপায় আছে?',
      a: 'অবশ্যই! আমাদের সিস্টেমে Google Gemini AI যুক্ত আছে। আপনি শুধু বিষয়ের দু-একটি শব্দ লিখে "AI দিয়ে পলিশ করুন" চাপলেই আকর্ষণীয় রাজনৈতিক ও সামাজিক স্লোগান তৈরি হয়ে যাবে।',
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-rose-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>বাংলাদেশের প্রথম স্বয়ংক্রিয় রাজনৈতিক ও সামাজিক পোস্টার স্টুডিও</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18]">
                মাত্র ২ মিনিটে তৈরি করুন{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-rose-400">
                  প্রেস-রেডি পোস্টার
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                বিজয় দিবস, নির্বাচনী প্রচারণা, শোক প্রস্তাব কিংবা উৎসবের শুভেচ্ছা — নাম, পদবি ও ছবি আপলোড করলেই প্রস্তুত হয়ে যাবে প্রিন্ট-রেডি হাই-রেজ্যুলেশন পোস্টার। কোনো ফটোশপ বা ডিজাইনারের অপেক্ষার প্রয়োজন নেই।
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/templates"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white font-extrabold text-base shadow-xl shadow-emerald-950/60 transition duration-200 hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>টেমপ্লেট বাছাই করে শুরু করুন</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>

                <Link
                  href="/templates"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-base transition duration-150"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>টেমপ্লেট গ্যালারি দেখুন</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>১০০% খাঁটি বাংলা ফন্ট</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>১২০০×১৬০০ HD প্রিন্ট ফাইল</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Google Gemini AI চালিত</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Mockup Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Interactive Tabs */}
              <div className="w-full max-w-[380px] mb-3 p-1 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-1 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('victory_day')}
                  className={`flex-1 py-1.5 rounded-lg transition ${activeTab === 'victory_day' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  বিজয় দিবস
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('campaign')}
                  className={`flex-1 py-1.5 rounded-lg transition ${activeTab === 'campaign' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  নির্বাচনী
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('condolence')}
                  className={`flex-1 py-1.5 rounded-lg transition ${activeTab === 'condolence' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  শোকবাণী
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('eid')}
                  className={`flex-1 py-1.5 rounded-lg transition ${activeTab === 'eid' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  ঈদ মোবারক
                </button>
              </div>

              {/* Showcase Poster Card */}
              <div className="relative group w-full max-w-[380px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-rose-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300" />

                <div className="relative p-4 glass-panel rounded-2xl border border-slate-700 shadow-2xl overflow-hidden space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      লাইভ স্যাম্পল আউটপুট
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">১২০০×১৬০০ px (HD)</span>
                  </div>

                  {/* Render Mockup based on Active Tab */}
                  <div
                    className={`relative rounded-xl overflow-hidden shadow-inner border flex flex-col items-center justify-between p-4 min-h-[460px] text-center transition-all duration-300 ${activeTab === 'victory_day'
                      ? 'bg-gradient-to-b from-[#005A36] via-[#004225] to-[#0a2216] border-emerald-500/30'
                      : activeTab === 'campaign'
                        ? 'bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364] border-cyan-500/30'
                        : activeTab === 'condolence'
                          ? 'bg-gradient-to-b from-[#171923] via-[#11131a] to-[#0b0c10] border-slate-700'
                          : 'bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#022c22] border-teal-500/30'
                      }`}
                  >
                    {/* Top leader slots */}
                    <div className="w-full flex items-center justify-between px-2 pt-1">
                      <div className="w-13 h-13 rounded-full border-2 border-amber-400 bg-slate-900/80 shadow-md flex items-center justify-center text-slate-400">
                        <Users className="w-5 h-5 text-amber-300" />
                      </div>
                      <div className="w-16 h-16 rounded-full bg-rose-600/90 shadow-lg flex items-center justify-center border-2 border-white/20">
                        <span className="text-[10px] text-white font-bold leading-tight">
                          {activeTab === 'victory_day'
                            ? '১৬ই ডিসেম্বর'
                            : activeTab === 'campaign'
                              ? 'ধানের শীষ'
                              : activeTab === 'condolence'
                                ? 'স্মরণিকা'
                                : 'ঈদ মোবারক'}
                        </span>
                      </div>
                      <div className="w-13 h-13 rounded-full border-2 border-amber-400 bg-slate-900/80 shadow-md flex items-center justify-center text-slate-400">
                        <Users className="w-5 h-5 text-amber-300" />
                      </div>
                    </div>

                    {/* Headline Banner */}
                    <div className="my-2.5 px-3 py-1.5 rounded-lg bg-rose-600/95 text-white font-bold text-xs shadow-md border border-amber-400/80 leading-relaxed">
                      {occasions.find((o) => o.id === activeTab)?.sampleHeadline}
                    </div>

                    {/* Candidate Photo Frame */}
                    <div className="w-32 h-40 rounded-xl border border-white/25 bg-slate-950/70 shadow-lg flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="w-8 h-8 mb-1 text-slate-500" />
                      <span className="text-[10px] font-medium text-slate-300">প্রার্থীর মূল ছবি</span>
                    </div>

                    {/* Candidate Typography */}
                    <div className="space-y-0.5 mt-1">
                      <div className="text-lg font-bold text-amber-300 drop-shadow">
                        মোঃ রাকিবুল হাসান
                      </div>
                      <div className="text-xs text-white font-medium">
                        {activeTab === 'campaign' ? 'সাধারণ সম্পাদক পদপ্রার্থী' : 'শুভেচ্ছান্তে ও দোয়াপ্রার্থী'}
                      </div>
                      <div className="text-[10px] text-slate-300">ঢাকা মহানগর উত্তর</div>
                    </div>

                    {/* Footer bar */}
                    <div className="w-full mt-2 py-1 bg-black/60 backdrop-blur-sm border-t border-amber-400/40 text-[9px] text-white/90 font-medium">
                      প্রচারে: এলাকাবাসী ও সর্বস্তরের দেশপ্রেমিক কর্মীসমাজ
                    </div>
                  </div>

                  <Link
                    href={`/create?occasion=${activeTab}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow cursor-pointer"
                  >
                    <span>এই ডিজাইনে পোস্টার তৈরি করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Statistics Bar */}
      <section className="border-y border-slate-800 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 font-mono">১৫,০০০+</div>
            <div className="text-xs text-slate-400 font-medium">সফলভাবে প্রস্তুত পোস্টার</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-teal-400 font-mono">৮২ms</div>
            <div className="text-xs text-slate-400 font-medium">আল্ট্রা-ফাস্ট ক্যানভাস রেন্ডার</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-400 font-mono">১০০%</div>
            <div className="text-xs text-slate-400 font-medium">নিখুঁত বাংলা যুক্তাক্ষর</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-rose-400 font-mono">৪.৯ / ৫</div>
            <div className="text-xs text-slate-400 font-medium">সন্তুষ্ট নেতাকর্মী ও ইউজার</div>
          </div>
        </div>
      </section>

      {/* Occasion Categories Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            টেমপ্লেট ক্যাটাগরি
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            যে কোনো রাজনৈতিক ও সামাজিক অনুষ্ঠানের পোস্টার
          </h2>
          <p className="text-sm text-slate-400">
            বাংলাদেশের ঐতিহ্যবাহী পোস্টার কালচার ও রাজনৈতিক মানদণ্ড অনুযায়ী তৈরি রেডিমেড লেআউট
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <div
              key={occ.id}
              className={`p-6 rounded-2xl bg-gradient-to-b ${occ.color} border transition duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${occ.badgeColor}`}>
                    {occ.badge}
                  </span>
                  <span className="text-[11px] text-slate-400">{occ.subtitle}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{occ.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{occ.desc}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{occ.leaders}</span>
                  <span className="text-emerald-400 font-semibold">{occ.fontStyle}</span>
                </div>

                <Link
                  href={`/create?occasion=${occ.id}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs border border-slate-700 hover:border-emerald-500 flex items-center justify-center gap-1.5 transition cursor-pointer shadow"
                >
                  <span>তৈরি শুরু করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Procedure */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              কীভাবে কাজ করে
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              সহজ ৩টি ধাপে তৈরি করুন আপনার পোস্টার
            </h2>
            <p className="text-sm text-slate-400">
              কোনো জটিল ফটোশপ সফটওয়্যার বা গ্রাফিক্স ডিজাইনিং জানার প্রয়োজন নেই
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, i) => {
              const IconComponent = st.icon;
              return (
                <div
                  key={i}
                  className="relative p-6 glass-panel rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-800 font-mono">
                      {st.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{st.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            অনন্য বৈশিষ্ট্য
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            কেন "আমার পোস্টার" অন্যদের চেয়ে এগিয়ে?
          </h2>
          <p className="text-sm text-slate-400">
            এটি কোনো সাধারণ জেনারেটর নয়—বাংলাদেশি রাজনৈতিক কন্টেন্ট ও কালচারের জন্য বিশেষভাবে অপ্টিমাইজড
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const IconComp = feat.icon;
            return (
              <div
                key={i}
                className="p-6 glass-card rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${feat.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison: Traditional Designer vs Our Platform */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              সুস্পষ্ট তুলনা
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              সাধারণ ডিজাইনার বনাম "আমার পোস্টার"
            </h2>
            <p className="text-sm text-slate-400">
              সময় এবং টাকা বাঁচিয়ে আরও উন্নত ও নির্ভুল পোস্টার পাওয়ার আধুনিক সমাধান
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/80 text-slate-300 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4 sm:p-5">বিষয়</th>
                  <th className="p-4 sm:p-5 text-rose-400">গ্রাফিক্স ডিজাইনারের কাছে</th>
                  <th className="p-4 sm:p-5 text-emerald-400 bg-emerald-500/10">আমার পোস্টার (AI 2.0)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition">
                    <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.designer}</td>
                    <td className="p-4 sm:p-5 font-semibold text-emerald-300 bg-emerald-500/5 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{row.ourPlatform}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            ব্যবহারকারীদের মতামত
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            মাঠপর্যায়ের নেতাকর্মীদের অভিজ্ঞতা
          </h2>
          <p className="text-sm text-slate-400">
            হাজারো নেতাকর্মী ও সামাজিক ব্যক্তিত্ব নিয়মিত "আমার পোস্টার" ব্যবহার করছেন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 glass-panel rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400">{t.role}, {t.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              প্রশ্নোত্তর (FAQ)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              সাধারণ কিছু প্রশ্নের উত্তর
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 border border-emerald-500/30 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              আপনার রাজনৈতিক ও সামাজিক পোস্টার তৈরি শুরু করুন আজই
            </h2>
            <p className="text-sm text-emerald-200">
              ফ্রি অ্যাকাউন্ট খুলুন অথবা ১-ক্লিক ডেমো দিয়ে এখনই সরাসরি প্রেস-রেডি পোস্টার ডিজাইন করে ডাউনলোড করে নিন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/templates"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-emerald-950 font-extrabold text-sm shadow-xl transition cursor-pointer"
            >
              টেমপ্লেট বাছাই করুন
            </Link>
            <Link
              href="/create"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 font-bold text-sm transition cursor-pointer"
            >
              সরাসরি পোস্টার মেকার স্টুডিও
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
