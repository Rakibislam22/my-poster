'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  api,
  Poster,
  Template,
  AdminOverview,
} from '@/lib/api';
import { notify } from '@/lib/notify';
import { confirmDeletePoster } from '@/lib/alert';
import { downloadPosterImage } from '@/lib/download';
import Swal from 'sweetalert2';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trash2,
  RefreshCw,
  Search,
  Eye,
  Layers,
  ChevronLeft,
  ChevronRight,
  Clock,
  LayoutGrid,
  X,
  Sliders,
  Check,
  Download,
  Maximize2,
  Users,
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, loginAdmin, openAuthModal } = useAuth();

  // Tab State: 'moderation' | 'templates'
  const [activeTab, setActiveTab] = useState<'moderation' | 'templates'>('moderation');
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);

  // Overview stats
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [isOverviewLoading, setIsOverviewLoading] = useState(true);

  // Moderation Queue State
  const [posters, setPosters] = useState<Poster[]>([]);
  const [moderationCounts, setModerationCounts] = useState({
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    flagged: 0,
  });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isQueueLoading, setIsQueueLoading] = useState(false);

  // Template Management State
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isTemplatesLoading, setIsTemplatesLoading] = useState(false);
  const [isReseeding, setIsReseeding] = useState(false);

  // Download & Preview Modal State
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [previewPoster, setPreviewPoster] = useState<Poster | null>(null);

  // 1. Fetch Overview Stats
  const loadOverview = useCallback(async () => {
    try {
      setIsOverviewLoading(true);
      const res = await api.getAdminOverview();
      setOverview(res);
    } catch (err: any) {
      console.error('Failed to load overview:', err);
    } finally {
      setIsOverviewLoading(false);
    }
  }, []);

  // 2. Fetch Moderation Queue
  const loadModerationQueue = useCallback(async () => {
    try {
      setIsQueueLoading(true);
      const res = await api.getModerationQueue({
        page,
        limit: 12,
        status: selectedStatus,
        search: searchQuery,
      });
      setPosters(res.posters || []);
      setModerationCounts(res.counts || { all: 0, pending: 0, approved: 0, rejected: 0, flagged: 0 });
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (err: any) {
      notify.error(err.message || 'মডারেশন কিউ লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setIsQueueLoading(false);
    }
  }, [page, selectedStatus, searchQuery]);

  // 3. Fetch Templates
  const loadTemplates = useCallback(async () => {
    try {
      setIsTemplatesLoading(true);
      const res = await api.getTemplates();
      setTemplates(res.templates || []);
    } catch (err: any) {
      notify.error(err.message || 'টেমপ্লেট তালিকা লোড করা যায়নি');
    } finally {
      setIsTemplatesLoading(false);
    }
  }, []);

  // Preload all tabs concurrently on mount for instant zero-lag switching
  useEffect(() => {
    if (user?.role === 'admin') {
      Promise.all([
        loadOverview(),
        loadModerationQueue(),
        loadTemplates(),
      ]).finally(() => {
        setHasInitialLoaded(true);
      });
    }
  }, [user, loadOverview, loadModerationQueue, loadTemplates]);

  // Refetch moderation queue only when page, status, or search query changes
  useEffect(() => {
    if (user?.role === 'admin' && hasInitialLoaded) {
      loadModerationQueue();
    }
  }, [page, selectedStatus, searchQuery, hasInitialLoaded, loadModerationQueue]);

  // Download Poster
  const handleDownload = async (poster: Poster) => {
    if (!poster.generatedImageUrl) return;
    setDownloadingId(poster._id);
    try {
      const candidateName = poster.formData?.candidateName || 'poster';
      await downloadPosterImage(
        poster.generatedImageUrl,
        `poster-${candidateName.replace(/\s+/g, '_')}.png`,
        poster._id
      );
      notify.success('পোস্টার ডাউনলোড শুরু হয়েছে');
    } catch (err: any) {
      notify.error(err.message || 'ডাউনলোড ব্যর্থ হয়েছে');
    } finally {
      setDownloadingId(null);
    }
  };

  // Quick action: Approve Poster
  const handleApprove = async (posterId: string) => {
    try {
      await api.updatePosterModeration(posterId, { status: 'approved' });
      notify.success('পোস্টারটি সফলভাবে অনুমোদন করা হয়েছে');
      setPosters((prev) =>
        prev.map((p) => (p._id === posterId ? { ...p, moderationStatus: 'approved' } : p))
      );
      loadOverview();
      loadModerationQueue();
    } catch (err: any) {
      notify.error(err.message || 'অনুমোদন ব্যর্থ হয়েছে');
    }
  };

  // Quick action: Reject Poster with prompt for reason
  const handleRejectPrompt = async (posterId: string) => {
    const { value: reason, isConfirmed } = await Swal.fire({
      title: 'পোস্টারটি বাতিল করার কারণ লিখুন',
      input: 'textarea',
      inputPlaceholder: 'যেমন: অননুমোদিত ছবি, অনুপযুক্ত ভাষা, ভুল তথ্য...',
      showCancelButton: true,
      confirmButtonText: 'বাতিল নিশ্চিত করুন',
      cancelButtonText: 'পিছনে যান',
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#334155',
      background: '#090d16',
      color: '#f8fafc',
      customClass: {
        popup: 'border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl',
        input: 'bg-slate-900 border-slate-700 text-slate-100 rounded-xl text-sm focus:border-rose-500',
      },
    });

    if (isConfirmed) {
      try {
        await api.updatePosterModeration(posterId, {
          status: 'rejected',
          moderationNotes: reason || 'অ্যাডমিন কর্তৃক বাতিল করা হয়েছে',
        });
        notify.warning('পোস্টারটি বাতিল তালিকায় যুক্ত করা হয়েছে');
        setPosters((prev) =>
          prev.map((p) =>
            p._id === posterId
              ? { ...p, moderationStatus: 'rejected', moderationNotes: reason }
              : p
          )
        );
        loadOverview();
        loadModerationQueue();
      } catch (err: any) {
        notify.error(err.message || 'বাতিলকরণ ব্যর্থ হয়েছে');
      }
    }
  };

  // Quick action: Flag Poster
  const handleFlagPrompt = async (posterId: string) => {
    const { value: reason, isConfirmed } = await Swal.fire({
      title: 'ফ্ল্যাগ করার কারণ লিখুন',
      input: 'text',
      inputPlaceholder: 'যেমন: রাজনৈতিক তথ্য যাচাই প্রয়োজন, কপিরাইট সমস্যা...',
      showCancelButton: true,
      confirmButtonText: 'ফ্ল্যাগ করুন',
      cancelButtonText: 'পিছনে যান',
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#334155',
      background: '#090d16',
      color: '#f8fafc',
      customClass: {
        popup: 'border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl',
        input: 'bg-slate-900 border-slate-700 text-slate-100 rounded-xl text-sm focus:border-amber-500',
      },
    });

    if (isConfirmed) {
      try {
        await api.updatePosterModeration(posterId, {
          status: 'flagged',
          flaggedReason: reason || 'বিশেষ পর্যালোচনার জন্য ফ্ল্যাগ করা হয়েছে',
        });
        notify.info('পোস্টারটি ফ্ল্যাগ করা হয়েছে');
        setPosters((prev) =>
          prev.map((p) =>
            p._id === posterId
              ? { ...p, moderationStatus: 'flagged', flaggedReason: reason }
              : p
          )
        );
        loadOverview();
        loadModerationQueue();
      } catch (err: any) {
        notify.error(err.message || 'ফ্ল্যাগ করতে ব্যর্থ হয়েছে');
      }
    }
  };

  // Quick action: Delete Poster permanently
  const handleDeletePoster = async (posterId: string) => {
    const confirmed = await confirmDeletePoster('পোস্টারটি স্থায়ীভাবে মুছে ফেলতে চান? ডাটাবেজ থেকে পোস্টারটি চিরতরে মুছে যাবে।');
    if (confirmed) {
      try {
        await api.deletePosterByAdmin(posterId);
        notify.success('পোস্টারটি সফলভাবে মুছে ফেলা হয়েছে');
        setPosters((prev) => prev.filter((p) => p._id !== posterId));
        if (previewPoster?._id === posterId) setPreviewPoster(null);
        loadOverview();
        loadModerationQueue();
      } catch (err: any) {
        notify.error(err.message || 'পোস্টার মুছতে ব্যর্থ হয়েছে');
      }
    }
  };

  // Re-seed Templates Trigger
  const handleReseedTemplates = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'ডিফল্ট টেমপ্লেট রি-সিড করবেন?',
      text: 'এটি সিড স্ক্রিপ্ট থেকে সমস্ত ক্যালিব্রেটেড টেমপ্লেট লেআউট (বিজয় দিবস, শোক দিবস, নির্বাচনী প্রচার, ঈদ ইত্যাদি) ডাটাবেজে রিসেট ও সিঙ্ক করবে।',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'হ্যাঁ, রি-সিড করুন',
      cancelButtonText: 'বাতিল',
      confirmButtonColor: '#059669',
      cancelButtonColor: '#334155',
      background: '#090d16',
      color: '#f8fafc',
      customClass: {
        popup: 'border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl',
      },
    });

    if (isConfirmed) {
      try {
        setIsReseeding(true);
        const res = await api.reseedTemplates();
        setTemplates(res.templates || []);
        notify.success(`${res.count || 'সবগুলো'} টি টেমপ্লেট সফলভাবে রি-সিড করা হয়েছে!`);
        loadOverview();
      } catch (err: any) {
        notify.error(err.message || 'টেমপ্লেট রি-সিড ব্যর্থ হয়েছে');
      } finally {
        setIsReseeding(false);
      }
    }
  };

  // Toggle Template Active/Inactive
  const handleToggleTemplate = async (templateId: string, currentTitle: string) => {
    try {
      const updated = await api.toggleTemplateStatus(templateId);
      setTemplates((prev) =>
        prev.map((t) => (t._id === templateId ? { ...t, isActive: updated.isActive } : t))
      );
      notify.success(`"${currentTitle}" স্ট্যাটাস পরিবর্তন করা হয়েছে`);
      loadOverview();
    } catch (err: any) {
      notify.error(err.message || 'টেমপ্লেট স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে');
    }
  };

  // =========================================================================
  // 1. FULL DASHBOARD SKELETON ON RELOAD / INITIAL AUTH VERIFICATION
  // Prevents the UI from collapsing into a small circle on page refresh
  // =========================================================================
  if (isAuthLoading || (!hasInitialLoaded && user?.role === 'admin')) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        {/* Skeleton Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 animate-pulse">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-800" />
              <div className="h-7 w-52 bg-slate-800 rounded-lg" />
              <div className="h-5 w-24 bg-slate-800/80 rounded-full" />
            </div>
            <div className="h-4 w-72 bg-slate-800/60 rounded" />
          </div>
          <div className="h-10 w-44 bg-slate-800 rounded-xl" />
        </div>

        {/* Skeleton 6 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-3 w-16 bg-slate-800 rounded" />
                <div className="w-4 h-4 bg-slate-800 rounded-full" />
              </div>
              <div className="h-7 w-12 bg-slate-800 rounded" />
              <div className="h-2.5 w-20 bg-slate-800/60 rounded" />
            </div>
          ))}
        </div>

        {/* Skeleton Tabs Bar */}
        <div className="flex border-b border-slate-800 gap-2 animate-pulse">
          <div className="pb-3 px-4 flex items-center gap-2 border-b-2 border-emerald-500">
            <div className="w-4 h-4 bg-emerald-500/40 rounded" />
            <div className="h-4 w-32 bg-slate-800 rounded" />
          </div>
          <div className="pb-3 px-4 flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-800 rounded" />
            <div className="h-4 w-36 bg-slate-800 rounded" />
          </div>
        </div>

        {/* Skeleton Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-16 bg-slate-800 rounded-xl" />
            ))}
          </div>
          <div className="h-9 w-64 bg-slate-800 rounded-xl" />
        </div>

        {/* Skeleton Cards Grid - Exactly matching 3-column aspect 3:2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse min-h-[500px]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden space-y-3">
              <div className="aspect-[3/2] w-full bg-slate-800/40" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-800 rounded w-2/3" />
                <div className="h-3 bg-slate-800/60 rounded w-1/2" />
                <div className="h-10 bg-slate-800/30 rounded-xl w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. ACCESS DENIED SCREEN (ONLY WHEN NOT ADMIN & AUTH LOAD FINISHED)
  // =========================================================================
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto my-20 p-8 glass-panel rounded-2xl border border-rose-500/30 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">অ্যাডমিন এক্সেস সংরক্ষিত</h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          এই পৃষ্ঠাটি শুধুমাত্র সিস্টেম অ্যাডমিনিস্ট্রেটরদের জন্য নির্ধারিত। আপনি যদি অ্যাডমিন হন, তবে অ্যাডমিন অ্যাকাউন্ট দিয়ে লগইন করুন।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={async () => {
              try {
                await loginAdmin();
                notify.success('সুপার অ্যাডমিন হিসেবে সফলভাবে লগইন হয়েছে!');
              } catch (err: any) {
                notify.error(err.message || 'অ্যাডমিন লগইন ব্যর্থ হয়েছে');
              }
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-sm shadow-lg shadow-rose-950/40 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>১-ক্লিকে অ্যাডমিন হিসেবে লগইন করুন</span>
          </button>
          <button
            onClick={openAuthModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm border border-slate-700 transition cursor-pointer"
          >
            সাধারণ লগইন
          </button>
        </div>
      </div>
    );
  }

  const stats = overview?.stats || {
    totalPosters: 0,
    pendingModeration: moderationCounts.pending,
    approvedPosters: moderationCounts.approved,
    rejectedPosters: moderationCounts.rejected,
    flaggedPosters: moderationCounts.flagged,
    totalTemplates: templates.length || 4,
    activeTemplates: templates.filter((t) => t.isActive).length || 4,
    totalUsers: 1,
  };

  const occasionBadges: Record<string, { label: string; color: string }> = {
    campaign: { label: 'নির্বাচনী প্রচার', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    victory_day: { label: 'বিজয় দিবস', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    condolence: { label: 'শোক প্রস্তাব', color: 'bg-slate-700/80 text-slate-200 border-slate-600/60' },
    eid: { label: 'ঈদ মোবারক', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    greetings: { label: 'শুভেচ্ছা', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-600 to-emerald-600 text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              অ্যাডমিন প্যানেল
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              সুপার অ্যাডমিন
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            পোস্টার কন্টেন্ট মডারেশন কিউ এবং ক্যালিব্রেটেড টেমপ্লেট ব্যবস্থাপনা
          </p>
        </div>

        {/* Global Action: Reseed */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReseedTemplates}
            disabled={isReseeding}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-950/40 border border-emerald-500/50 transition cursor-pointer disabled:opacity-60"
            title="ক্যালিব্রেটেড সিড স্ক্রিপ্ট চালিয়ে ডাটাবেজে টেমপ্লেটগুলো সিঙ্ক ও রিসেট করুন"
          >
            <RefreshCw className={`w-4 h-4 ${isReseeding ? 'animate-spin' : ''}`} />
            <span>{isReseeding ? 'রি-সিড হচ্ছে...' : 'টেমপ্লেট রি-সিড করুন (Seed Script)'}</span>
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards - Interactive & Stable Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 ">
        {/* Total Posters */}
        <button
          onClick={() => {
            setActiveTab('moderation');
            setSelectedStatus('all');
            setPage(1);
          }}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer hover:border-slate-600 ${activeTab === 'moderation' && selectedStatus === 'all'
            ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
            : 'bg-slate-900/80 border-slate-800'
            }`}
        >
          <div className="text-xs font-medium text-slate-400 mb-1 flex items-center justify-between">
            <span>মোট পোস্টার</span>
            <Layers className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {isOverviewLoading ? '...' : stats.totalPosters}
          </div>
          <span className="text-[11px] text-slate-500">ইউজারদের তৈরি</span>
        </button>

        {/* Pending Moderation */}
        <button
          onClick={() => {
            setActiveTab('moderation');
            setSelectedStatus('pending');
            setPage(1);
          }}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer hover:border-amber-500/60 ${activeTab === 'moderation' && selectedStatus === 'pending'
            ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-950/30'
            : 'bg-amber-500/10 border-amber-500/30'
            }`}
        >
          <div className="text-xs font-semibold text-amber-300 mb-1 flex items-center justify-between">
            <span>অপেক্ষমান কিউ</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">
            {isOverviewLoading ? '...' : stats.pendingModeration}
          </div>
          <span className="text-[11px] text-amber-300/70">পর্যালোচনা প্রয়োজন</span>
        </button>

        {/* Approved Posters */}
        <button
          onClick={() => {
            setActiveTab('moderation');
            setSelectedStatus('approved');
            setPage(1);
          }}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer hover:border-emerald-500/60 ${activeTab === 'moderation' && selectedStatus === 'approved'
            ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-950/30'
            : 'bg-emerald-500/10 border-emerald-500/30'
            }`}
        >
          <div className="text-xs font-semibold text-emerald-300 mb-1 flex items-center justify-between">
            <span>অনুমোদিত</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {isOverviewLoading ? '...' : stats.approvedPosters}
          </div>
          <span className="text-[11px] text-emerald-400/70">পাবলিকলি নিরাপদ</span>
        </button>

        {/* Rejected Posters */}
        <button
          onClick={() => {
            setActiveTab('moderation');
            setSelectedStatus('rejected');
            setPage(1);
          }}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer hover:border-rose-500/60 ${activeTab === 'moderation' && selectedStatus === 'rejected'
            ? 'bg-rose-500/20 border-rose-500 shadow-lg shadow-rose-950/30'
            : 'bg-rose-500/10 border-rose-500/30'
            }`}
        >
          <div className="text-xs font-semibold text-rose-300 mb-1 flex items-center justify-between">
            <span>বাতিলকৃত</span>
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400">
            {isOverviewLoading ? '...' : stats.rejectedPosters}
          </div>
          <span className="text-[11px] text-rose-400/70">অননুমোদিত</span>
        </button>

        {/* Active Templates */}
        <button
          onClick={() => setActiveTab('templates')}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer hover:border-indigo-500/60 ${activeTab === 'templates'
            ? 'bg-indigo-500/20 border-indigo-500 shadow-lg shadow-indigo-950/30'
            : 'bg-indigo-500/10 border-indigo-500/30'
            }`}
        >
          <div className="text-xs font-semibold text-indigo-300 mb-1 flex items-center justify-between">
            <span>সক্রিয় টেমপ্লেট</span>
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-300">
            {isOverviewLoading ? '...' : `${stats.activeTemplates} / ${stats.totalTemplates}`}
          </div>
          <span className="text-[11px] text-indigo-400/70">ক্যালিব্রেটেড ডিজাইন</span>
        </button>

        {/* Registered Users */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-medium text-slate-400 mb-1 flex items-center justify-between">
            <span>ব্যবহারকারী</span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {isOverviewLoading ? '...' : stats.totalUsers}
          </div>
          <span className="text-[11px] text-slate-500">নিবন্ধিত অ্যাকাউন্ট</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`pb-3 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition cursor-pointer ${activeTab === 'moderation'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>কন্টেন্ট মডারেশন কিউ</span>
          {stats.pendingModeration > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950">
              {stats.pendingModeration}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-3 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition cursor-pointer ${activeTab === 'templates'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>টেমপ্লেট ব্যবস্থাপনা (Seed Engine)</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300">
            {stats.totalTemplates}
          </span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: CONTENT MODERATION QUEUE (PERSISTENT IN DOM - ZERO FLICKER)
          ========================================================================= */}
      <div className={`space-y-6 min-h-[900px] transition-all duration-300 ${activeTab === 'moderation' ? 'block' : 'hidden'}`}>
        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          {/* Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'সব', count: moderationCounts.all },
              { id: 'pending', label: 'অপেক্ষমান', count: moderationCounts.pending },
              { id: 'approved', label: 'অনুমোদিত', count: moderationCounts.approved },
              { id: 'rejected', label: 'বাতিলকৃত', count: moderationCounts.rejected },
              { id: 'flagged', label: 'ফ্ল্যাগড', count: moderationCounts.flagged },
            ].map((tab) => {
              const isSelected = selectedStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedStatus(tab.id);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${isSelected
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] max-w-md w-full md:w-auto">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="প্রার্থীর নাম, দল, স্লোগান দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Posters Container with in-place Loading Overlay (Zero UI shrinkage) */}
        <div className="relative flex flex-col transition-all duration-300">
          {isQueueLoading && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-10 rounded-2xl flex items-center justify-center transition animate-in fade-in duration-150">
              <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl flex items-center gap-2.5">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-slate-200">পোস্টার তালিকা আপডেট হচ্ছে...</span>
              </div>
            </div>
          )}

          {posters.length === 0 && !isQueueLoading ? (
            <div className="flex-1 w-full h-full flex flex-col items-center justify-center py-16 px-6 glass-panel rounded-2xl border border-slate-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-950/40">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">কোন পোস্টার পাওয়া যায়নি</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
                {selectedStatus === 'pending'
                  ? 'এই মুহূর্তে কোনো অপেক্ষমান পোস্টার পর্যালোচনার বাকি নেই! সব পোস্টার ইতিমধ্যে পর্যালোচনা করা হয়েছে।'
                  : selectedStatus === 'rejected'
                    ? 'এই মুহূর্তে কোনো বাতিলকৃত পোস্টার তালিকায় নেই।'
                    : selectedStatus === 'flagged'
                      ? 'এই মুহূর্তে কোনো ফ্ল্যাগড পোস্টার তালিকায় নেই।'
                      : searchQuery
                        ? `"${searchQuery}" অনুসন্ধানে কোনো পোস্টার পাওয়া যায়নি।`
                        : 'বর্তমান ফিল্টারে কোনো পোস্টার পাওয়া যায়নি।'}
              </p>
              {(selectedStatus !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedStatus('all');
                    setSearchQuery('');
                    setPage(1);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>সব পোস্টার দেখুন</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posters.map((poster) => {
                const userObj =
                  typeof poster.userId === 'object' && poster.userId !== null
                    ? poster.userId
                    : null;
                const tmplObj =
                  typeof poster.templateId === 'object' && poster.templateId !== null
                    ? (poster.templateId as Template)
                    : null;
                const status = poster.moderationStatus || 'pending';
                const occasion = tmplObj?.occasionType || poster.formData?.occasionType || 'campaign';
                const badge = occasionBadges[occasion] || {
                  label: 'পোস্টার',
                  color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                };

                return (
                  <div
                    key={poster._id}
                    className="glass-panel rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition duration-200 shadow-xl"
                  >
                    <div>
                      {/* Poster Image Container: 3:2 matched to 1200x800 canvas with object-contain */}
                      <div className="relative aspect-[3/2] w-full bg-slate-950/90 overflow-hidden group border-b border-slate-800 flex items-center justify-center">
                        {poster.generatedImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={poster.generatedImageUrl}
                            alt={poster.formData?.candidateName || 'Poster'}
                            className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                            <Layers className="w-8 h-8 mb-2 opacity-50" />
                            <span className="text-xs">ছবি উপলব্ধ নেই</span>
                          </div>
                        )}

                        {/* Occasion Badge (Top-Left) */}
                        <div className="absolute top-2.5 left-2.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-sm ${badge.color}`}>
                            {badge.label}
                          </span>
                        </div>

                        {/* Candidate Original Photo Badge (Top-Right) */}
                        {poster.uploadedPhotos?.candidatePhoto && (
                          <div
                            className="absolute top-2.5 right-2.5 p-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 shadow-md group/avatar"
                            title="ব্যবহারকারীর আপলোড করা প্রার্থীর আসল ছবি"
                          >
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={poster.uploadedPhotos.candidatePhoto}
                                alt="Original candidate"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* Quick Action Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition backdrop-blur-xs">
                          <button
                            onClick={() => setPreviewPoster(poster)}
                            className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium text-xs flex items-center gap-1.5 border border-white/30 backdrop-blur-md transition cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>বড় করে দেখুন</span>
                          </button>
                          {poster.generatedImageUrl && (
                            <button
                              onClick={() => handleDownload(poster)}
                              disabled={downloadingId === poster._id}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-medium text-xs flex items-center gap-1.5 border border-emerald-400/40 backdrop-blur-md transition cursor-pointer disabled:opacity-50"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{downloadingId === poster._id ? 'ডাউনলোড...' : 'ডাউনলোড'}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Poster Details Body */}
                      <div className="p-4 space-y-3">
                        {/* Candidate Name, Party & Area */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-white truncate" title={poster.formData?.candidateName}>
                              {poster.formData?.candidateName || 'প্রার্থীর নামহীন'}
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium truncate mt-0.5">
                              {poster.formData?.designation && <span>{poster.formData.designation}</span>}
                              {poster.formData?.designation && poster.formData?.area && <span className="text-slate-600">•</span>}
                              {poster.formData?.area && <span className="text-slate-300">{poster.formData.area}</span>}
                            </div>
                          </div>
                          {poster.formData?.party && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium whitespace-nowrap border border-slate-700/60 max-w-[130px] truncate"
                              title={poster.formData.party}
                            >
                              {poster.formData.party}
                            </span>
                          )}
                        </div>

                        {/* Bengali Headline / Slogan Quote Box */}
                        {poster.formData?.headlineBangla && (
                          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                            <span className="text-emerald-400 font-semibold mr-1">স্লোগান:</span>
                            &quot;{poster.formData.headlineBangla}&quot;
                          </div>
                        )}

                        {/* Moderation Notes or Flagged Reason */}
                        {poster.moderationNotes && (
                          <div className="mt-2 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300 flex items-start gap-1.5">
                            <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold mr-1">বাতিল নোট:</span>
                              {poster.moderationNotes}
                            </div>
                          </div>
                        )}
                        {poster.flaggedReason && (
                          <div className="mt-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold mr-1">ফ্ল্যাগ কারণ:</span>
                              {poster.flaggedReason}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Metadata & Actions */}
                    <div className="p-4 pt-0 space-y-3">
                      {/* Creator Info & Moderation Status Badge */}
                      <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5 truncate max-w-[160px]">
                          <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-emerald-400 font-bold shrink-0">
                            {userObj?.name ? userObj.name.charAt(0) : 'U'}
                          </div>
                          <span className="truncate">{userObj?.name || 'অজ্ঞাত ইউজার'}</span>
                        </div>

                        {/* Status Indicator */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${status === 'approved'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : status === 'rejected'
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                              : status === 'flagged'
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                            }`}
                        >
                          {status === 'approved' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>অনুমোদিত</span>
                            </>
                          ) : status === 'rejected' ? (
                            <>
                              <XCircle className="w-3 h-3 text-rose-400" />
                              <span>বাতিলকৃত</span>
                            </>
                          ) : status === 'flagged' ? (
                            <>
                              <AlertTriangle className="w-3 h-3 text-amber-400" />
                              <span>ফ্ল্যাগড</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>অপেক্ষমান</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Clean 2-Tier Action Bar */}
                      <div className="space-y-2">
                        {/* Tier 1: Moderation Decision Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(poster._id)}
                            disabled={status === 'approved'}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${status === 'approved'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default opacity-85'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40'
                              }`}
                            title={status === 'approved' ? 'পোস্টারটি ইতিমধ্যে অনুমোদিত' : 'অনুমোদন করুন'}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{status === 'approved' ? 'অনুমোদিত' : 'অনুমোদন'}</span>
                          </button>

                          <button
                            onClick={() => handleRejectPrompt(poster._id)}
                            className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition cursor-pointer border ${status === 'rejected'
                              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                              : 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/25 text-rose-300'
                              }`}
                            title="বাতিল করুন"
                          >
                            <XCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span>বাতিল</span>
                          </button>

                          <button
                            onClick={() => handleFlagPrompt(poster._id)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition cursor-pointer border ${status === 'flagged'
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                              : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/25 text-amber-300'
                              }`}
                            title="ফ্ল্যাগ করুন"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <span>ফ্ল্যাগ</span>
                          </button>
                        </div>

                        {/* Tier 2: Utility Buttons (Preview, Download, Delete) */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setPreviewPoster(poster)}
                            className="flex-1 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 border border-slate-800 transition cursor-pointer"
                            title="বড় করে প্রিভিউ দেখুন"
                          >
                            <Eye className="w-3 h-3 text-slate-400" />
                            <span>প্রিভিউ</span>
                          </button>

                          {poster.generatedImageUrl && (
                            <button
                              onClick={() => handleDownload(poster)}
                              disabled={downloadingId === poster._id}
                              className="flex-1 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 border border-slate-800 transition cursor-pointer disabled:opacity-50"
                              title="সরাসরি ডাউনলোড করুন"
                            >
                              <Download className="w-3 h-3 text-emerald-400" />
                              <span>{downloadingId === poster._id ? '...' : 'ডাউনলোড'}</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleDeletePoster(poster._id)}
                            className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 text-xs font-medium flex items-center justify-center gap-1 border border-slate-800 transition cursor-pointer"
                            title="পোস্টারটি চিরতরে মুছে ফেলুন"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>মুছুন</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              পৃষ্ঠা {page} / {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          TAB 2: TEMPLATE MANAGEMENT (PERSISTENT IN DOM - ZERO FLICKER)
          ========================================================================= */}
      <div className={`space-y-6 min-h-[900px] transition-all duration-300 ${activeTab === 'templates' ? 'block' : 'hidden'}`}>
        {/* Info Banner about Seed Script Approach */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">
                ক্যালিব্রেটেড টেমপ্লেট কনফিগারেশন ইঞ্জিন
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                পোস্টারের ক্যানভাস ডাইমেনশন ($1200 \times 800$), স্লট কোঅর্ডিনেট, লিডার ছবির ফ্রেম এবং ব্লেন্ডিং প্যারামিটার ব্যাকএন্ডের ক্যালিব্রেটেড সিড স্ক্রিপ্ট দ্বারা সম্পূর্ণ নিয়ন্ত্রিত।
              </p>
            </div>
          </div>

          <button
            onClick={handleReseedTemplates}
            disabled={isReseeding}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isReseeding ? 'animate-spin' : ''}`} />
            <span>ডিফল্ট টেমপ্লেট রি-সিড করুন</span>
          </button>
        </div>

        {/* Templates Grid with in-place Loading Overlay */}
        <div className="relative min-h-[760px] flex flex-col transition-all duration-300">
          {isTemplatesLoading && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-10 rounded-2xl flex items-center justify-center transition animate-in fade-in duration-150">
              <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl flex items-center gap-2.5">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-slate-200">টেমপ্লেট তালিকা লোড হচ্ছে...</span>
              </div>
            </div>
          )}

          {templates.length === 0 && !isTemplatesLoading ? (
            <div className="flex-1 w-full h-full flex flex-col items-center justify-center py-16 px-6 glass-panel rounded-2xl border border-slate-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <LayoutGrid className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ডাটাবেজে কোনো টেমপ্লেট পাওয়া যায়নি</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
                ক্যালিব্রেটেড লেআউট কনফিগারেশন এবং স্লট কোঅর্ডিনেট সহ ডিফল্ট টেমপ্লেটগুলো সিড করুন।
              </p>
              <button
                onClick={handleReseedTemplates}
                disabled={isReseeding}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
              >
                <RefreshCw className={`w-4 h-4 ${isReseeding ? 'animate-spin' : ''}`} />
                <span>টেমপ্লেট সিড করুন (Seed Script)</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {templates.map((tmpl) => {
                const leaderSlotsCount = tmpl.layoutConfig?.leaderSlots?.length || 0;
                const candidateSlot = tmpl.layoutConfig?.candidateSlot;
                const occasion = tmpl.occasionType || 'campaign';
                const badge = occasionBadges[occasion] || {
                  label: 'পোস্টার',
                  color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                };

                return (
                  <div
                    key={tmpl._id}
                    className="glass-panel rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
                  >
                    <div>
                      {/* Thumbnail preview with 3:2 aspect ratio */}
                      <div className="relative aspect-[3/2] w-full bg-slate-950 overflow-hidden border-b border-slate-800 flex items-center justify-center">
                        {tmpl.thumbnailUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={tmpl.thumbnailUrl}
                            alt={tmpl.title}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-xs text-slate-600">
                            ছবি নেই
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-sm ${badge.color}`}>
                            {badge.label}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tmpl.isActive
                              ? 'bg-emerald-500/80 text-white'
                              : 'bg-slate-800/90 text-slate-300'
                              }`}
                          >
                            {tmpl.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </span>
                        </div>
                      </div>

                      {/* Template details */}
                      <div className="p-4 space-y-2.5">
                        <h4 className="font-bold text-sm text-white line-clamp-1" title={tmpl.title}>
                          {tmpl.title}
                        </h4>
                        <div className="text-[11px] text-slate-400 space-y-1">
                          <p>ক্যানভাস: <span className="text-slate-200 font-semibold">{tmpl.canvasDimensions?.width || 1200} x {tmpl.canvasDimensions?.height || 800} px</span></p>
                          <p>লিডার ফ্রেম: <span className="text-slate-200 font-semibold">{leaderSlotsCount} টি</span></p>
                          <p>
                            প্রার্থীর স্লট: <span className="text-slate-200 font-semibold">{candidateSlot ? `${candidateSlot.width}x${candidateSlot.height}px` : 'ক্যালিব্রেটেড'}</span>
                          </p>
                          {candidateSlot?.blendBottom && (
                            <p className="text-emerald-400">✓ বটম ব্লেন্ডিং সক্রিয়</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Active/Inactive Toggle Action */}
                    <div className="p-4 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => handleToggleTemplate(tmpl._id, tmpl.title)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${tmpl.isActive
                          ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
                          }`}
                      >
                        {tmpl.isActive ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>সক্রিয় রয়েছে (Active)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>নিষ্ক্রিয় (Inactive)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* FULL PREVIEW MODAL */}
      {previewPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative max-w-3xl w-full glass-panel rounded-2xl border border-slate-700 p-5 shadow-2xl flex flex-col max-h-[90vh]">
            <button
              onClick={() => setPreviewPoster(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-base">
                {previewPoster.formData?.candidateName || 'পোস্টার প্রিভিউ'}
              </h3>
            </div>

            <div className="relative flex-1 min-h-[350px] sm:min-h-[450px] bg-slate-950 rounded-xl overflow-hidden mb-4 border border-slate-800 flex items-center justify-center">
              {previewPoster.generatedImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewPoster.generatedImageUrl}
                  alt="Poster Full Preview"
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400 truncate max-w-md">
                {previewPoster.formData?.headlineBangla}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {previewPoster.generatedImageUrl && (
                  <button
                    onClick={() => handleDownload(previewPoster)}
                    disabled={downloadingId === previewPoster._id}
                    className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ডাউনলোড</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    handleApprove(previewPoster._id);
                    setPreviewPoster(null);
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                >
                  অনুমোদন করুন
                </button>
                <button
                  onClick={() => {
                    handleRejectPrompt(previewPoster._id);
                    setPreviewPoster(null);
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer"
                >
                  বাতিল করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
