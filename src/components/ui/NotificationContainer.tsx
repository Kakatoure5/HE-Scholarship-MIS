import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { XIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
export const NotificationContainer: React.FC = () => {
  const {
    notifications,
    removeNotification
  } = useNotification();
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-400" />;
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-red-400" />;
      case 'info':
        return <div className="h-6 w-6 text-blue-400" />;
      case 'warning':
        return <div className="h-6 w-6 text-yellow-400" />;
      default:
        return null;
    }
  };
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'info':
        return 'bg-blue-50';
      case 'warning':
        return 'bg-yellow-50';
      default:
        return 'bg-white';
    }
  };
  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-400';
      case 'error':
        return 'border-red-400';
      case 'info':
        return 'border-blue-400';
      case 'warning':
        return 'border-yellow-400';
      default:
        return 'border-gray-200';
    }
  };
  if (notifications.length === 0) {
    return null;
  }
  return <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50 w-full max-w-sm">
      {notifications.map(notification => <div key={notification.id} className={`${getBackgroundColor(notification.type)} border ${getBorderColor(notification.type)} p-4 rounded-md shadow-lg transition-all duration-500 transform translate-x-0 opacity-100`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">{getIcon(notification.type)}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                {notification.message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => removeNotification(notification.id)}>
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>)}
    </div>;
};