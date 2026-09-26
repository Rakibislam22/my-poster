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
    _id: '670000000000000000000001',
    title: 'মহান বিজয় দিবস - লাল-সবুজ শ্রদ্ধাঞ্জলি',
    occasionType: 'victory_day',
    thumbnailUrl: '/templates/victory-day-bg.jpg',
    canvasDimensions: { width: 1200, height: 800 },
    layoutConfig: {
      backgroundColor: '#005A36',
      primaryColor: '#F42A41',
      secondaryColor: '#FFD700',
      leaderSlots: [
        { id: '1', label: 'শীর্ষ নেতা ১', x: 647, y: 145, width: 184, height: 184, shape: 'circle' },
        { id: '2', label: 'শীর্ষ নেতা ২', x: 841, y: 145, width: 184, height: 184, shape: 'circle' },
        { id: '3', label: 'শীর্ষ নেতা ৩', x: 1050, y: 145, width: 184, height: 184, shape: 'circle' },
      ],
      candidateSlot: { x: 285, y: 345, width: 440, height: 440 },
      textSlots: {
        headline: { label: 'শিরোনাম', fontFamily: 'Hind Siliguri', fontSize: 48, color: '#FFFFFF', y: 280 },
        candidateName: { label: 'নাম', fontFamily: 'Hind Siliguri', fontSize: 36, color: '#FFFFFF', y: 600 },
        designation: { label: 'পদবি', fontFamily: 'Hind Siliguri', fontSize: 22, color: '#FFD700', y: 645 },
        party: { label: 'দল', fontFamily: 'Hind Siliguri', fontSize: 20, color: '#E2E8F0', y: 700 },
        footerCredit: { label: 'প্রচারে', fontFamily: 'Hind Siliguri', fontSize: 20, color: '#FFFFFF', y: 785 },
      },
    },
    isActive: true,
  },
  {
    _id: '670000000000000000000002',
    title: 'নির্বাচনী প্রচারণা ও দোয়া প্রার্থী',
    occasionType: 'campaign',
    thumbnailUrl: '/templates/campaign-bg.jpg',
    canvasDimensions: { width: 1200, height: 800 },
    layoutConfig: {
      backgroundColor: '#0F2027',
      primaryColor: '#203A43',
      secondaryColor: '#FFCC00',
      leaderSlots: [
        { id: '1', label: 'নেতা ১', x: 654, y: 145, width: 184, height: 184, shape: 'circle' },
        { id: '2', label: 'নেতা ২', x: 844, y: 145, width: 184, height: 184, shape: 'circle' },
        { id: '3', label: 'নেতা ৩', x: 1063, y: 145, width: 184, height: 184, shape: 'circle' },
      ],
      candidateSlot: { x: 293, y: 364, width: 450, height: 450 },
      textSlots: {
        headline: { label: 'স্লোগান', fontFamily: 'Hind Siliguri', fontSize: 48, color: '#FFFFFF', y: 280 },
        candidateName: { label: 'নাম', fontFamily: 'Hind Siliguri', fontSize: 36, color: '#FFFFFF', y: 585 },
        designation: { label: 'পদবি', fontFamily: 'Hind Siliguri', fontSize: 22, color: '#FFD700', y: 630 },
        party: { label: 'দল', fontFamily: 'Hind Siliguri', fontSize: 20, color: '#A0AEC0', y: 700 },
        footerCredit: { label: 'প্রচারে', fontFamily: 'Hind Siliguri', fontSize: 20, color: '#FFFFFF', y: 785 },
      },
    },
    isActive: true,
  },
  {
    _id: '670000000000000000000003',
    title: 'পবিত্র ঈদ-উল-ফিতর ও ঈদ মোবারক',
    occasionType: 'eid',
    thumbnailUrl: '/templates/eid-bg.jpg',
    canvasDimensions: { width: 1200, height: 800 },
    layoutConfig: {
      backgroundColor: '#064E3B',
      primaryColor: '#047857',
      secondaryColor: '#F59E0B',
      leaderSlots: [
        { id: '1', label: 'নেতৃত্ব ১', x: 635, y: 150, width: 184, height: 184, shape: 'circle' },
        { id: '2', label: 'নেতৃত্ব ২', x: 842, y: 150, width: 184, height: 184, shape: 'circle' },
        { id: '3', label: 'নেতৃত্ব ৩', x: 1060, y: 150, width: 184, height: 184, shape: 'circle' },
      ],
      candidateSlot: { x: 300, y: 360, width: 450, height: 450 },
      textSlots: {
        headline: { label: 'ঈদ শুভেচ্ছা', fontFamily: 'Hind Siliguri', fontSize: 48, color: '#FFFFFF', y: 280 },
        candidateName: { label: 'নাম', fontFamily: 'Hind Siliguri', fontSize: 36, color: '#FFFFFF', y: 625 },
        designation: { label: 'পদবি', fontFamily: 'Hind Siliguri', fontSize: 22, color: '#FFD700', y: 670 },
        party: { label: 'সংগঠন', fontFamily: 'Hind Siliguri', fontSize: 20, color: '#E2E8F0', y: 700 },
        footerCredit: { label: 'প্রচারে', fontFamily: 'Hind Siliguri', fontSize: 20, color: '#FFFFFF', y: 785 },
      },
    },
    isActive: true,
  },
  {
    _id: '670000000000000000000004',
    title: 'শোক প্রস্তাব ও বিনম্র শ্রদ্ধাঞ্জলি',
    occasionType: 'condolence',
    thumbnailUrl: '/templates/condolence-bg.jpg',
    canvasDimensions: { width: 1200, height: 800 },
    layoutConfig: {
      backgroundColor: '#171923',
      primaryColor: '#2D3748',
      secondaryColor: '#CBD5E0',
      leaderSlots: [
        { id: '1', label: 'শ্রদ্ধাভাজন ব্যক্তিত্ব ১', x: 630, y: 155, width: 190, height: 190, shape: 'circle' },
        { id: '2', label: 'শ্রদ্ধাভাজন ব্যক্তিত্ব ২', x: 840, y: 155, width: 190, height: 190, shape: 'circle' },
        { id: '3', label: 'শ্রদ্ধাভাজন ব্যক্তিত্ব ৩', x: 1055, y: 155, width: 190, height: 190, shape: 'circle' },
      ],
      candidateSlot: { x: 295, y: 350, width: 456, height: 456 },
      textSlots: {
        headline: { label: 'শোক বাণী', fontFamily: 'Hind Siliguri', fontSize: 48, color: '#FFFFFF', y: 280 },
        candidateName: { label: 'নাম', fontFamily: 'Hind Siliguri', fontSize: 36, color: '#FFFFFF', y: 620 },
        designation: { label: 'পদবি', fontFamily: 'Hind Siliguri', fontSize: 22, color: '#FFD700', y: 665 },
        party: { label: 'দল', fontFamily: 'Hind Siliguri', fontSize: 20, color: '#A0AEC0', y: 700 },
        footerCredit: { label: 'শোক প্রকাশে', fontFamily: 'Hind Siliguri', fontSize: 20, color: '#FFFFFF', y: 785 },
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

  // Sync form defaults with selected template theme
  const applyTemplateDefaults = (tpl: Template) => {
    setSelectedTemplate(tpl);
    if (tpl.occasionType === 'victory_day') {
      setHeadlineBangla('১৬ই ডিসেম্বর মহান বিজয় দিবস উপলক্ষে বীর শহীদদের প্রতি বিনম্র শ্রদ্ধা');
      setDesignation('সাধারণ সম্পাদক পদপ্রার্থী');
      setFooterCredit('প্রচারে: এলাকাবাসী ও সর্বস্তরের দেশপ্রেমিক কর্মীসমাজ');
    } else if (tpl.occasionType === 'campaign') {
      setHeadlineBangla('আসন্ন জাতীয় সংসদ নির্বাচনে মনোনীত প্রার্থী');
      setDesignation('ধানের শীষ মার্কায় ভোট দিন');
      setArea('রামপুরা, ঢাকা');
      setFooterCredit('প্রচারে: সর্বস্তরের সচেতন ভোটার ও এলাকাবাসী');
    } else if (tpl.occasionType === 'eid') {
      setHeadlineBangla('পবিত্র ঈদ-উল-ফিতর উপলক্ষে সবাইকে জানাই আন্তরিক শুভেচ্ছা');
      setDesignation('সাধারণ সম্পাদক পদপ্রার্থী');
      setFooterCredit('শুভেচ্ছান্তে: সর্বস্তরের জনগণ ও শুভানুধ্যায়ী');
    } else if (tpl.occasionType === 'condolence') {
      setHeadlineBangla('১৫ আগস্ট জাতীয় শোক দিবস - বিনম্র শ্রদ্ধাঞ্জলি');
      setDesignation('মরহুমের বিদেহী আত্মার মাগফিরাত কামনায়');
      setFooterCredit('শোক প্রকাশে: সর্বস্তরের সহযোদ্ধা ও শুভাকাঙ্ক্ষী');
    }
  };

  // Load Templates from Backend
  useEffect(() => {
    api
      .getTemplates()
      .then((res) => {
        if (res.templates && res.templates.length > 0) {
          setTemplates(res.templates);
          // Pick requested template or victory_day/first
          if (initialTemplateId) {
            const matched = res.templates.find((t) => t._id === initialTemplateId);
            if (matched) applyTemplateDefaults(matched);
          } else if (initialOccasion) {
            const matched = res.templates.find((t) => t.occasionType === initialOccasion);
            if (matched) applyTemplateDefaults(matched);
          } else {
            // Default to victory_day if available, or first
            const defaultTpl = res.templates.find((t) => t.occasionType === 'victory_day') || res.templates[0];
            applyTemplateDefaults(defaultTpl);
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {templates.map((tpl) => (
                  <button
                    key={tpl._id}
                    type="button"
                    onClick={() => applyTemplateDefaults(tpl)}
                    className={`p-3 rounded-xl border text-left text-xs transition duration-150 flex flex-col justify-between h-20 ${selectedTemplate._id === tpl._id
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
              <span className="text-[11px] text-slate-400 font-mono">
                {selectedTemplate.canvasDimensions?.width || 1200}×{selectedTemplate.canvasDimensions?.height || 800} px (HD)
              </span>
            </div>

            {/* Poster Canvas Preview Area */}
            <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex flex-col items-center justify-center shadow-2xl">
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
                  className="relative w-full h-full select-none bg-cover bg-center overflow-hidden"
                  style={{
                    backgroundImage: `url(${selectedTemplate.thumbnailUrl})`,
                    backgroundColor: selectedTemplate.layoutConfig?.backgroundColor || '#005A36',
                  }}
                >
                  {/* Dynamic Candidate Photo on Left */}
                  <div className="absolute left-[8%] top-[22%] w-[28%] aspect-square rounded-full border-2 border-amber-400 overflow-hidden shadow-lg bg-black/40 flex items-center justify-center">
                    {candidatePhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={candidatePhotoUrl}
                        alt="Candidate Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-white/70">
                        <UserIcon className="w-6 h-6 mb-0.5 text-amber-400" />
                        <span className="text-[9px]">প্রার্থীর ছবি</span>
                      </div>
                    )}
                  </div>

                  {/* Candidate Name in Left Brush Banner */}
                  <div className="absolute left-[4%] top-[74%] w-[36%] text-center px-1">
                    <div className="text-xs md:text-sm font-bold text-white truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {candidateName || 'প্রার্থীর নাম'}
                    </div>
                    <div className="text-[10px] font-semibold text-amber-400 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {designation || (selectedTemplate.occasionType === 'campaign' ? 'ধানের শীষ মার্কায় ভোট দিন' : 'সহ-সভাপতি পদপ্রার্থী')}
                    </div>
                  </div>

                  {/* 3 Top Leaders Preview at Top Right */}
                  <div className="absolute right-[4%] top-[12%] flex items-center gap-2">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/80 bg-black/40 shadow flex items-center justify-center text-[8px] text-white overflow-hidden"
                      >
                        {leaderPhotoUrls[idx] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={leaderPhotoUrls[idx]}
                            alt={`নেতা ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="opacity-70">নেতা {idx + 1}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer Line */}
                  <div className="absolute bottom-1 w-full text-center text-[9px] text-white/90 font-medium drop-shadow">
                    {footerCredit || 'প্রচারে: সর্বস্তরের দেশপ্রেমিক ও সচেতন এলাকাবাসী'}
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
