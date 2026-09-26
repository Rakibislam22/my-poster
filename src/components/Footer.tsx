import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, ShieldCheck, Printer, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">আমার পোস্টার</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              বাংলাদেশের রাজনৈতিক কর্মী, নেতৃবৃন্দ ও সামাজিক সংগঠকদের জন্য প্রথম স্বয়ংক্রিয় AI পোস্টার মেকার।
              বিজয় দিবস, শোক প্রস্তাব, নির্বাচনী প্রচারণা ও শুভেচ্ছা পোস্টার তৈরি করুন নিখুঁত বাংলা যুক্তাক্ষর ও প্রিন্ট-রেডি কোয়ালিটিতে।
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-medium">
                <Printer className="w-3 h-3" /> প্রিন্ট রেজ্যুলেশন (১২০০x১৬০০+)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-amber-400 font-medium">
                <Zap className="w-3 h-3" /> ৮২ মিলিসেকেন্ডে রেন্ডার
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-rose-400 font-medium">
                <ShieldCheck className="w-3 h-3" /> ১০০% নির্ভুল বাংলা ফন্ট
              </span>
            </div>
          </div>

          {/* Occasion Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              উপলক্ষসমূহ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/templates?occasion=victory_day" className="hover:text-emerald-400 transition">
                  মহান বিজয় দিবস
                </Link>
              </li>
              <li>
                <Link href="/templates?occasion=campaign" className="hover:text-emerald-400 transition">
                  নির্বাচনী প্রচারণা ও ভোট প্রার্থনা
                </Link>
              </li>
              <li>
                <Link href="/templates?occasion=condolence" className="hover:text-emerald-400 transition">
                  শোক প্রস্তাব ও বিনম্র শ্রদ্ধা
                </Link>
              </li>
              <li>
                <Link href="/templates?occasion=eid" className="hover:text-emerald-400 transition">
                  পবিত্র ঈদ মোবারক
                </Link>
              </li>
              <li>
                <Link href="/templates?occasion=greetings" className="hover:text-emerald-400 transition">
                  শুভেচ্ছা ও অভিনন্দন
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              কুইক লিংক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/create" className="hover:text-emerald-400 transition">
                  নতুন পোস্টার বানান
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-emerald-400 transition">
                  টেমপ্লেট সংগ্রহশালা
                </Link>
              </li>
              <li>
                <Link href="/my-posters" className="hover:text-emerald-400 transition">
                  সংরক্ষিত পোস্টার
                </Link>
              </li>
              <li>
                <span className="text-slate-500">গোপনীয়তা ও নীতি</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} আমার পোস্টার (AmarPoster). সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            তৈরি করা হয়েছে <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> দিয়ে, বাংলাদেশের জন্য।
          </p>
        </div>
      </div>
    </footer>
  );
};
