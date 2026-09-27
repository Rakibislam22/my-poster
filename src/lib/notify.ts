import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

export const notify = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      ...defaultOptions,
      className: '!bg-slate-900 !border !border-emerald-500/30 !text-slate-100 !rounded-xl !shadow-xl !font-sans',
      progressClassName: '!bg-emerald-500',
      ...options,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      ...defaultOptions,
      className: '!bg-slate-900 !border !border-rose-500/30 !text-slate-100 !rounded-xl !shadow-xl !font-sans',
      progressClassName: '!bg-rose-500',
      ...options,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      ...defaultOptions,
      className: '!bg-slate-900 !border !border-cyan-500/30 !text-slate-100 !rounded-xl !shadow-xl !font-sans',
      progressClassName: '!bg-cyan-500',
      ...options,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      ...defaultOptions,
      className: '!bg-slate-900 !border !border-amber-500/30 !text-slate-100 !rounded-xl !shadow-xl !font-sans',
      progressClassName: '!bg-amber-500',
      ...options,
    });
  },
};
