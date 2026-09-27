import Swal from 'sweetalert2';

/**
 * Custom SweetAlert2 themed instance matching the platform's
 * Slate-950, Emerald, and Rose dark design palette.
 */
export const darkSwal = Swal.mixin({
  background: '#090d16',
  color: '#f8fafc',
  confirmButtonColor: '#059669', // emerald-600
  cancelButtonColor: '#1e293b',  // slate-800
  customClass: {
    popup: 'border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl',
    title: 'text-lg font-bold text-white',
    htmlContainer: 'text-xs text-slate-300',
    confirmButton: 'px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg cursor-pointer transition mx-1.5',
    cancelButton: 'px-5 py-2.5 rounded-xl font-semibold text-xs border border-slate-700 hover:bg-slate-800 cursor-pointer transition mx-1.5',
  },
  buttonsStyling: true,
});

/**
 * SweetAlert2 confirmation dialog for Logout
 */
export async function confirmLogout(): Promise<boolean> {
  const result = await darkSwal.fire({
    title: 'লগআউট করতে চান?',
    text: 'আপনার বর্তমান সেশনটি সমাপ্ত হবে। পরবর্তীতে আপনার পোস্টার দেখতে পুনরায় লগইন করতে হবে।',
    icon: 'question',
    iconColor: '#10b981', // emerald-500
    showCancelButton: true,
    confirmButtonText: 'হ্যাঁ, লগআউট করুন',
    cancelButtonText: 'বাতিল',
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
}

/**
 * SweetAlert2 confirmation dialog for deleting a poster
 */
export async function confirmDeletePoster(posterName?: string): Promise<boolean> {
  const result = await darkSwal.fire({
    title: 'পোস্টারটি মুছে ফেলতে চান?',
    text: posterName
      ? `"${posterName}" পোস্টারটি স্থায়ীভাবে মুছে যাবে এবং এটি আর পুনরুদ্ধার করা যাবে না।`
      : 'এই পোস্টারটি স্থায়ীভাবে মুছে যাবে এবং এটি আর পুনরুদ্ধার করা যাবে না।',
    icon: 'warning',
    iconColor: '#f43f5e', // rose-500
    showCancelButton: true,
    confirmButtonText: 'হ্যাঁ, মুছে ফেলুন',
    confirmButtonColor: '#e11d48', // rose-600
    cancelButtonText: 'না, রেখে দিন',
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
}
