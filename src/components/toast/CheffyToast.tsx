/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { toast, Toast } from 'react-hot-toast';
import { FiCheck, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface CustomToastProps {
  type?: ToastType;
  title?: string;
  message?: string;
  t: Toast;
  duration?: number;
}

const CustomToast: React.FC<CustomToastProps> & {
  success: (title: string, message?: string, options?: any) => string;
  error: (title: string, message?: string, options?: any) => string;
  info: (title: string, message?: string, options?: any) => string;
  warning: (title: string, message?: string, options?: any) => string;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} = ({ type = 'info', title, message, t, duration = 5000 }) => {
  const toastConfig = {
    success: {
      icon: <FiCheck className="text-green-500" size={20} />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
    },
    error: {
      icon: <FiAlertTriangle className="text-red-500" size={20} />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800'
    },
    info: {
      icon: <FiInfo className="text-blue-500" size={20} />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    },
    warning: {
      icon: <FiAlertTriangle className="text-yellow-500" size={20} />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800'
    }
  };

  const { icon, bgColor, borderColor, textColor } = toastConfig[type] || toastConfig.info;

  return (
    <div
      className={`${bgColor} ${borderColor} ${textColor} border-l-4 p-4 rounded shadow-lg max-w-md w-full relative`}
      style={{ animation: t.visible ? 'fadeIn 0.3s ease' : 'fadeOut 0.3s ease' }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          {icon}
        </div>
        <div className="ml-3 w-0 flex-1">
          {title && <h3 className="font-medium">{title}</h3>}
          {message && <p className="mt-1 text-sm">{message}</p>}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Fechar notificação"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

CustomToast.success = (title: string, message?: string, options?: any) => {
  return toast.custom(
    (t) => <CustomToast type="success" title={title} message={message} t={t} />,
    options
  );
};

CustomToast.error = (title: string, message?: string, options?: any) => {
  return toast.custom(
    (t) => <CustomToast type="error" title={title} message={message} t={t} />,
    options
  );
};

CustomToast.info = (title: string, message?: string, options?: any) => {
  return toast.custom(
    (t) => <CustomToast type="info" title={title} message={message} t={t} />,
    options
  );
};

CustomToast.warning = (title: string, message?: string, options?: any) => {
  return toast.custom(
    (t) => <CustomToast type="warning" title={title} message={message} t={t} />,
    options
  );
};

export default CustomToast;