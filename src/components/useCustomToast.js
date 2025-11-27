import eventBus from '../utils/eventBus';

export function useCustomToast() {
  const showToast = (type, message) => {
    eventBus.emit('show-toast', { 
      type, 
      message,
      position: 'top-right',
      zIndex: 99999,
      toastClassName: 'global-toast',
      containerClassName: 'toast-super-container'
    });
  };

  const success = (message) => showToast('success', message);
  const warning = (message) => showToast('warning', message);
  const error = (message) => showToast('error', message);
  const info = (message) => showToast('info', message);

  return { success, warning, error, info };
}