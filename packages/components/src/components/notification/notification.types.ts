export type NotificationType = 'error' | 'warning' | 'success' | 'info';

export type NotificationDismissDetail = {
  reason: 'close-button' | 'auto-dismiss';
};

export type ToastShowOptions = {
  type: NotificationType;
  title?: string;
  message: string;
  timestamp?: string;
  dismissible?: boolean;
  autoDismiss?: number;
  actionLabel?: string;
  onAction?: () => void;
};
