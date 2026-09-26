'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Image as ImageIcon,
  Layers,
  Palette,
  Printer,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const occasions = [
    {
      id: 'victory_day',
      title: 'মহান বিজয় দিবস',
      desc: 'লাল-সবুজ জাতীয় পতাকা, স্মৃতিসৌধ ও শহীদদের স্মরণে বিশেষ পোস্টার',
      badge: 'জনপ্রিয়',
      color: 'from-emerald-950 to-emerald-900 border-emerald-700/50',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'campaign',
      title: 'নির্বাচনী প্রচারণা ও দোয়া',
      desc: 'ইউনিয়ন, পৌরসভা বা সংসদীয় আসনে প্রার্থী ও শীর্ষ নেতাদের ছবি সংবলিত পোস্টার',
      badge: 'প্রয়োজনীয়',
      color: 'from-slate-900 to-slate-800 border-slate-700/50',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'condolence',
      title: 'শোক প্রস্তাব ও শ্রদ্ধাঞ্জলি',
      desc: 'মরহুম নেতা ও প্রিয়জনদের স্মরণে মার্জিত সাদা-কালো শ্রদ্ধাপত্র ও ব্যানার',
      badge: 'মর্যাদাপূর্ণ',
      color: 'from-neutral-950 to-neutral-900 border-neutral-700/50',
      badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    },
    {
      id: 'eid',
      title: 'পবিত্র ঈদ ও উৎসব',
      desc: 'ঈদুল ফিতর ও ঈদুল আজহার মোবারকবাদ জানিয়ে শুভেচ্ছা ব্যানার',
      badge: 'উৎসবমুখর',
      color: 'from-teal-950 to-emerald-950 border-teal-700/50',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    },
  ];

  const steps = [
    {
      number: '০১',
      title: 'উপলক্ষ ও টেমপ্লেট বেছে নিন',
      desc: 'বিজয় দিবস, নির্বাচন কিংবা শোক প্রস্তাবের জন্য তৈরি নিখুঁত বাংলাদেশি লেআউট থেকে পছন্দ করুন।',
      icon: Layers,
    },
    {
      number: '০২',
      title: 'নাম, পদবি ও ছবি দিন',
      desc: 'প্রার্থীর ছবি এবং শীর্ষ নেতাদের ফটো আপলোড করুন। প্রয়োজনে Gemini AI দিয়ে ছন্দময় স্লোগান জেনারেট করুন।',
      icon: Users,
    },
    {
      number: '০৩',
      title: 'প্রিন্ট-রেডি ফাইল ডাউনলোড করুন',
      desc: 'মাত্র কয়েক সেকেন্ডে ১২০০×১৬০০ হাই-রেজ্যুলেশন প্রিন্ট কপি (PNG) ডাউনলোড করুন সরাসরি।',
      icon: Download,
    },
  ];

  const features = [
    {
      title: '১০০% সঠিক বাংলা যুক্তাক্ষর',
      desc: 'AI ইমেজ জেনারেটরের ভুল বানান ভুলে যান। আমাদের ক্যানভাস ইঞ্জিন খাঁটি হিন্দু শিলিগুড়ি ফন্টে প্রতিটি অক্ষর স্পষ্ট রাখে।',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      title: 'Gemini AI স্লোগান ক্রিয়েটর',
      desc: 'উপলক্ষ ও দলীয় প্রেক্ষাপট অনুযায়ী স্বয়ংক্রিয়ভাবে তৈরি হয় ধারালো ও রাজনৈতিক স্লোগান ও শিরোনাম।',
      icon: Sparkles,
      color: 'text-amber-400 bg-amber-500/10',
    },
    {
      title: 'প্রেস প্রিন্ট কোয়ালিটি',
      desc: 'ডিজিটাল ডিসপ্লের পাশাপাশি ফ্লেক্স প্রিন্ট বা প্রেস ছাপার উপযোগী উচ্চ ঘনত্বের গ্রাফিক্স তৈরি হয়।',
      icon: Printer,
      color: 'text-sky-400 bg-sky-500/10',
    },
    {
      title: 'আল্ট্রা-ফাস্ট ৮২ms রেন্ডারিং',
      desc: 'সার্ভার-সাইড নেটিভ কম্পোজিটর সেকেন্ডের ভগ্নাংশে পুরো পোস্টার অ্যাসেম্বল ও এক্সপোর্ট করে দেয়।',
      icon: Zap,
      color: 'text-rose-400 bg-rose-500/10',
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>বাংলাদেশের প্রথম স্বয়ংক্রিয় রাজনৈতিক পোস্টার প্ল্যাটফর্ম</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                মাত্র ২ মিনিটে তৈরি করুন{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-rose-400">
                  দৃষ্টিনন্দন পোস্টার
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                বিজয় দিবস, শোক প্রস্তাব কিংবা নির্বাচনী প্রচারণা — নাম, পদবি ও ছবি আপলোড করলেই প্রস্তুত হয়ে যাবে প্রিন্ট-রেডি হাই-রেজ্যুলেশন পোস্টার। কোনো ফটোশপ বা গ্রাফিক্স ডিজাইনারের ঝামেলা নেই।
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base shadow-xl shadow-emerald-900/40 transition duration-150"
                >
                  <span>পোস্টার তৈরি শুরু করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/templates"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-base transition duration-150"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>টেমপ্লেট গ্যালারি</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>১০০% নির্ভুল বাংলা ফন্ট</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>১২০০×১৬০০ প্রিন্ট কোয়ালিটি</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Google Gemini AI চালিত</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Poster Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-rose-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300" />
                
                <div className="relative w-[320px] sm:w-[380px] p-4 glass-panel rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      লাইভ স্যাম্পল আউটপুট
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">১২০০×১৬০০ px</span>
                  </div>

                  {/* Sample Mockup Visual Container */}
                  <div className="relative rounded-xl overflow-hidden shadow-inner border border-emerald-500/20 bg-emerald-950 flex flex-col items-center justify-between p-4 min-h-[460px] text-center">
                    {/* Top flag motif & leader placeholders */}
                    <div className="w-full flex items-center justify-between px-2">
                      <div className="w-14 h-14 rounded-full border-2 border-amber-400 bg-slate-800 shadow-md flex items-center justify-center">
                        <Users className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="w-20 h-20 rounded-full bg-rose-600/90 shadow-lg flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">১৬ই ডিসেম্বর</span>
                      </div>
                      <div className="w-14 h-14 rounded-full border-2 border-amber-400 bg-slate-800 shadow-md flex items-center justify-center">
                        <Users className="w-6 h-6 text-slate-400" />
                      </div>
                    </div>

                    {/* Headline Banner */}
                    <div className="my-3 px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-sm shadow-lg border border-amber-400">
                      মহান বিজয় দিবস উপলক্ষে বীর শহীদদের প্রতি বিনম্র শ্রদ্ধা
                    </div>

                    {/* Candidate Photo Frame */}
                    <div className="w-36 h-44 rounded-xl border border-white/20 bg-slate-900/80 flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="w-8 h-8 mb-1 text-slate-500" />
                      <span className="text-[11px]">প্রার্থীর ছবি</span>
                    </div>

                    {/* Candidate Typography */}
                    <div className="space-y-0.5 mt-2">
                      <div className="text-xl font-bold text-amber-400 drop-shadow">
                        মোঃ রাকিবুল হাসান
                      </div>
                      <div className="text-xs text-white font-medium">সাধারণ সম্পাদক পদপ্রার্থী</div>
                      <div className="text-[10px] text-slate-300">ঢাকা মহানগর উত্তর</div>
                    </div>

                    {/* Footer bar */}
                    <div className="w-full mt-3 py-1.5 bg-emerald-900/90 border-t-2 border-amber-400 text-[10px] text-white font-semibold">
                      প্রচারে: এলাকাবাসী ও সর্বস্তরের জাতীয়তাবাদী কর্মীসমাজ
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400">৮২ms-এ তৈরি সম্পন্ন</span>
                    <Link
                      href="/create"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      <span>নিজে তৈরি করুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasion Categories Showcase */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              যে কোনো অনুষ্ঠানের জন্য উপযুক্ত টেমপ্লেট
            </h2>
            <p className="text-sm text-slate-400">
              বাংলাদেশের রাজনৈতিক সংস্কৃতি ও উপলক্ষের ঐতিহ্যবাহী ডিজাইন অনুযায়ী তৈরি প্রস্তুত লেআউট
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((occ) => (
              <Link
                key={occ.id}
                href={`/create?occasion=${occ.id}`}
                className={`group p-5 rounded-2xl bg-gradient-to-b ${occ.color} border transition duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${occ.badgeColor}`}
                    >
                      {occ.badge}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-emerald-400 flex items-center gap-1 transition">
                      তৈরি করুন <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{occ.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{occ.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>শীর্ষ নেতা + প্রার্থী স্লট</span>
                  <span className="text-emerald-400 font-semibold">ফ্রি টেমপ্লেট</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Procedure */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            কীভাবে কাজ করে
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            সহজ ৩টি ধাপে তৈরি করুন আপনার পোস্টার
          </h2>
          <p className="text-sm text-slate-400">
            কোনো জটিল সফটওয়্যার বা গ্রাফিক্স জ্ঞানের প্রয়োজন নেই
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
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              কেন "আমার পোস্টার" অন্যান্য টুলসের চেয়ে সেরা?
            </h2>
            <p className="text-sm text-slate-400">
              আমরা সাধারণ ইমেজ জেনারেটর নই, এটি সম্পূর্ণ বাংলাদেশি পোস্টার কাঠামোর জন্য কাস্টমাইজড
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 glass-card rounded-2xl border border-slate-800 space-y-3"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feat.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 border border-emerald-500/30 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              আপনার দল ও সংগঠনের জন্য এখনই পোস্টার তৈরি করুন
            </h2>
            <p className="text-sm text-emerald-200">
              ফ্রি অ্যাকাউন্ট খুলুন, তথ্য পূরণ করুন এবং সরাসরি প্রেস-রেডি পোস্টার ডাউনলোড করে নিন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-emerald-900 font-bold text-sm shadow-xl transition"
            >
              বিনামূল্যে পোস্টার তৈরি করুন
            </Link>
            <Link
              href="/templates"
              className="px-8 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-950 text-white border border-emerald-600/50 font-semibold text-sm transition"
            >
              টেমপ্লেটগুলো দেখুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
