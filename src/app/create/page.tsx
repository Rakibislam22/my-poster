'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, Poster, Template } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  Eye,
  ImageIcon,
  Maximize2,
  RefreshCw,
  Sparkles,
  Upload,
  User as UserIcon,
  Users,
  X,
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

function CreatePosterContent() {
  const searchParams = useSearchParams();
  const initialTemplateId = searchParams.get('templateId');
  const initialOccasion = searchParams.get('occasion');

  const { user, openAuthModal, login, register } = useAuth();

  const [templates, setTemplates] = useState<Template[]>(fallbackTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(fallbackTemplates[0]);

  // Form Fields
  const [candidateName, setCandidateName] = useState('মোঃ রাকিবুল হাসান');
  const [designation, setDesignation] = useState('সাধারণ সম্পাদক পদপ্রার্থী');
  const [party, setParty] = useState('বাংলাদেশ জাতীয়তাবাদী দল');
  const [area, setArea] = useState('রামপুরা, ঢাকা');
  const [headlineBangla, setHeadlineBangla] = useState(
    '১৬ই ডিসেম্বর মহান বিজয় দিবস উপলক্ষে বীর শহীদদের প্রতি বিনম্র শ্রদ্ধা'
  );
  const [footerCredit, setFooterCredit] = useState(
    'প্রচারে: এলাকাবাসী ও সর্বস্তরের দেশপ্রেমিক কর্মীসমাজ'
  );
  const [useAiSlogans, setUseAiSlogans] = useState(true);

  // Photos
  const [candidatePhotoUrl, setCandidatePhotoUrl] = useState<string>('');
  const [candidatePhotoFile, setCandidatePhotoFile] = useState<File | null>(null);
  const [leaderPhotoUrls, setLeaderPhotoUrls] = useState<string[]>([]);
  const [leaderFiles, setLeaderFiles] = useState<File[]>([]);

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStage, setProgressStage] = useState('');
  const [generatedPoster, setGeneratedPoster] = useState<Poster | null>(null);
  const [error, setError] = useState<string>('');
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  // Load Templates from Backend
  useEffect(() => {
    api
      .getTemplates()
      .then((res) => {
        if (res.templates && res.templates.length > 0) {
          setTemplates(res.templates);
          // Pick requested template or first
          if (initialTemplateId) {
            const matched = res.templates.find((t) => t._id === initialTemplateId);
            if (matched) setSelectedTemplate(matched);
          } else if (initialOccasion) {
            const matched = res.templates.find((t) => t.occasionType === initialOccasion);
            if (matched) setSelectedTemplate(matched);
          } else {
            setSelectedTemplate(res.templates[0]);
          }
        }
      })
      .catch(() => {
        // Fallback already set
      });
  }, [initialTemplateId, initialOccasion]);

  // Handle Photo selection
  const handleCandidatePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCandidatePhotoFile(file);
      setCandidatePhotoUrl(URL.createObjectURL(file));
    }
  };

  const handleLeaderPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 3);
      setLeaderFiles(filesArray);
      setLeaderPhotoUrls(filesArray.map((f) => URL.createObjectURL(f)));
    }
  };

  // Submit & Generate Poster
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!candidateName.trim()) {
      setError('অনুগ্রহ করে প্রার্থীর নাম প্রদান করুন');
      return;
    }

    setIsGenerating(true);
    setProgressStage('পোস্টার তথ্য যাচাই করা হচ্ছে...');

    try {
      // Auto demo-login if user is not authenticated yet so generation works seamlessly!
      if (!user) {
        setProgressStage('অটোমেটিক সেশন তৈরি করা হচ্ছে...');
        try {
          await login('user@posterbabu.bd', 'poster1234');
        } catch {
          await register('ডেমো ইউজার', 'user@posterbabu.bd', 'poster1234');
        }
      }

      // 1. Upload candidate photo if selected
      let uploadedCandidateUrl: string | undefined = undefined;
      if (candidatePhotoFile) {
        setProgressStage('প্রার্থীর ছবি আপলোড হচ্ছে...');
        try {
          const res = await api.uploadSingle(candidatePhotoFile, 'candidates');
          uploadedCandidateUrl = res.url;
        } catch (uploadErr) {
          console.warn('Candidate photo upload notice:', uploadErr);
        }
      }

      // 2. Upload leader photos if selected
      const uploadedLeaderUrls: string[] = [];
      if (leaderFiles.length > 0) {
        setProgressStage('শীর্ষ নেতাদের ছবি আপলোড হচ্ছে...');
        try {
          const res = await api.uploadMultiple(leaderFiles, 'leaders');
          uploadedLeaderUrls.push(...res.files.map((f) => f.url));
        } catch (uploadErr) {
          console.warn('Leader photo upload notice:', uploadErr);
        }
      }

      // 3. Trigger Poster Generation
      setProgressStage('Gemini AI এবং ক্যানভাসে পোস্টার রেন্ডার হচ্ছে...');
      const poster = await api.createPoster({
        templateId: selectedTemplate._id,
        candidateName,
        designation,
        party,
        area,
        headlineBangla,
        footerCredit,
        uploadedPhotos: {
          candidatePhoto: uploadedCandidateUrl,
          leaderPhotos: uploadedLeaderUrls,
        },
        useAiSlogans,
      });

      setGeneratedPoster(poster);
      setProgressStage('');
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'পোস্টার তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            পোস্টার ক্রিয়েটর স্টুডিও
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              HD Print 1200x1600
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            তথ্য ও ছবি প্রদান করুন, সার্ভার-সাইড ক্যানভাস মুহূর্তে প্রিন্ট-রেডি ফাইল তৈরি করবে।
          </p>
        </div>

        {/* Selected Template Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400">নির্বাচিত টেমপ্লেট:</span>
          <span className="font-semibold text-emerald-400">{selectedTemplate.title}</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* 1. Template Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                ১. টেমপ্লেট নির্বাচন করুন
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {templates.map((tpl) => (
                  <button
                    key={tpl._id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl)}
                    className={`p-3 rounded-xl border text-left text-xs transition duration-150 flex flex-col justify-between h-20 ${
                      selectedTemplate._id === tpl._id
                        ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-md'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="font-bold line-clamp-2">{tpl.title}</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                      {selectedTemplate._id === tpl._id && <Check className="w-3 h-3" />}
                      {tpl.occasionType}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Candidate Information */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                ২. প্রার্থীর বিবরণ
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    প্রার্থীর পূর্ণ নাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="যেমন: মোঃ রাকিবুল হাসান"
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">পদবি / প্রার্থিতা পদ</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="যেমন: সাধারণ সম্পাদক পদপ্রার্থী"
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">রাজনৈতিক দল / সংগঠন</label>
                  <input
                    type="text"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    placeholder="যেমন: বাংলাদেশ জাতীয়তাবাদী দল"
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">এলাকা / নির্বাচনী আসন</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="যেমন: রামপুরা, ঢাকা"
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* 3. Photo Uploads */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                ৩. ছবি আপলোড (প্রার্থী ও শীর্ষ নেতা)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Candidate Photo */}
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">প্রার্থীর মূল ছবি</span>
                    {candidatePhotoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setCandidatePhotoUrl('');
                          setCandidatePhotoFile(null);
                        }}
                        className="text-rose-400 hover:underline text-[11px]"
                      >
                        মুছে ফেলুন
                      </button>
                    )}
                  </div>

                  {candidatePhotoUrl ? (
                    <div className="relative h-28 w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={candidatePhotoUrl}
                        alt="Candidate"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-900/30 transition">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-[11px] text-slate-400">প্রার্থীর ছবি আপলোড করুন</span>
                      <span className="text-[9px] text-slate-500">JPG, PNG (সর্বোচ্চ ১০MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCandidatePhotoChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Leader Photos (up to 3) */}
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">শীর্ষ নেতাদের ছবি (১-৩টি)</span>
                    {leaderPhotoUrls.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setLeaderPhotoUrls([]);
                          setLeaderFiles([]);
                        }}
                        className="text-rose-400 hover:underline text-[11px]"
                      >
                        মুছে ফেলুন
                      </button>
                    )}
                  </div>

                  {leaderPhotoUrls.length > 0 ? (
                    <div className="flex items-center justify-center gap-2 h-28 rounded-lg border border-slate-700 bg-slate-950 p-2">
                      {leaderPhotoUrls.map((url, i) => (
                        <div
                          key={i}
                          className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-900 flex-shrink-0"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`Leader ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-900/30 transition">
                      <Users className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-[11px] text-slate-400">নেতাদের ছবি সিলেক্ট করুন</span>
                      <span className="text-[9px] text-slate-500">১ থেকে ৩টি ছবি (ঐচ্ছিক)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleLeaderPhotosChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Slogan & Headline Customization */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  ৪. স্লোগান ও শিরোনাম
                </label>
                <label className="flex items-center gap-1.5 text-xs text-amber-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAiSlogans}
                    onChange={(e) => setUseAiSlogans(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gemini AI স্লোগান অপ্টিমাইজার চালু</span>
                </label>
              </div>

              <div>
                <textarea
                  rows={2}
                  value={headlineBangla}
                  onChange={(e) => setHeadlineBangla(e.target.value)}
                  placeholder="ব্যানারের প্রধান স্লোগান বা শিরোনাম..."
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">প্রচারের লাইন (ফুটার)</label>
                <input
                  type="text"
                  value={footerCredit}
                  onChange={(e) => setFooterCredit(e.target.value)}
                  placeholder="যেমন: প্রচারে: এলাবাসী ও সর্বস্তরের দেশপ্রেমিক কর্মীসমাজ"
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white font-extrabold text-base shadow-xl shadow-emerald-950/60 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{progressStage || 'পোস্টার তৈরি হচ্ছে...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>পোস্টার তৈরি করুন (Generate Print-Ready Poster)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Live Poster Output & Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>পোস্টার প্রিভিউ</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">1200×1600 px (HD)</span>
            </div>

            {/* Poster Canvas Preview Area */}
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex flex-col items-center justify-center shadow-2xl">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 animate-pulse">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <RefreshCw className="w-7 h-7 animate-spin" />
                  </div>
                  <h4 className="text-base font-bold text-white">পোস্টার প্রসেসিং চলছে...</h4>
                  <p className="text-xs text-emerald-300 max-w-xs">{progressStage}</p>
                </div>
              ) : generatedPoster?.generatedImageUrl ? (
                <div className="relative w-full h-full group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={generatedPoster.generatedImageUrl}
                    alt="Generated Poster"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => setZoomModalOpen(true)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 hover:bg-black text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition shadow"
                    title="ফুলস্ক্রিন জুম করুন"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Static Live Template Layout Preview */
                <div
                  className="w-full h-full p-4 flex flex-col justify-between items-center text-center select-none"
                  style={{ backgroundColor: selectedTemplate.layoutConfig?.backgroundColor || '#005A36' }}
                >
                  <div className="w-full flex items-center justify-between px-2 pt-2">
                    <div className="w-12 h-12 rounded-full border-2 border-amber-400 bg-slate-900 flex items-center justify-center text-[10px] text-white">
                      নেতা ১
                    </div>
                    <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center text-[10px] text-white font-bold">
                      বাংলাদেশ
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-amber-400 bg-slate-900 flex items-center justify-center text-[10px] text-white">
                      নেতা ২
                    </div>
                  </div>

                  <div className="my-2 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs max-w-[240px] shadow border border-amber-400 line-clamp-2">
                    {headlineBangla || 'প্রধান স্লোগান / বার্তা'}
                  </div>

                  <div className="w-32 h-40 rounded-xl border border-white/20 bg-slate-900/70 flex flex-col items-center justify-center text-slate-400">
                    {candidatePhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={candidatePhotoUrl}
                        alt="Candidate Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <>
                        <UserIcon className="w-8 h-8 text-slate-500 mb-1" />
                        <span className="text-[10px]">প্রার্থীর ছবি</span>
                      </>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-lg font-bold text-amber-400 drop-shadow">
                      {candidateName || 'প্রার্থীর নাম'}
                    </div>
                    <div className="text-[11px] text-white font-medium">{designation}</div>
                    <div className="text-[10px] text-slate-300">
                      {[party, area].filter(Boolean).join(' • ')}
                    </div>
                  </div>

                  <div className="w-full py-1.5 bg-emerald-950/90 border-t-2 border-amber-400 text-[10px] text-white font-semibold">
                    {footerCredit}
                  </div>
                </div>
              )}
            </div>

            {/* Post-generation Download & Actions */}
            {generatedPoster?.generatedImageUrl && (
              <div className="space-y-3 pt-2">
                <a
                  href={generatedPoster.generatedImageUrl}
                  download={`poster-${candidateName.replace(/\s+/g, '_')}.png`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>হাই-রেজ্যুলেশন PNG ডাউনলোড করুন</span>
                </a>

                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    প্রিন্ট-রেডি কোয়ালিটি প্রস্তুত
                  </span>
                  <button
                    onClick={() => setZoomModalOpen(true)}
                    className="hover:text-white flex items-center gap-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    পূর্ণ আকারে দেখুন
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomModalOpen && generatedPoster?.generatedImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setZoomModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={generatedPoster.generatedImageUrl}
              alt="Full Size Poster"
              className="max-h-[85vh] w-auto rounded-xl shadow-2xl object-contain border border-slate-700"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreatePosterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">লোড হচ্ছে...</div>}>
      <CreatePosterContent />
    </Suspense>
  );
}
