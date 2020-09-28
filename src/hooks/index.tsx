import React from 'react';

import { ToastProvider } from './toast';

const Toast: React.FC = ({ children }) => (
  <ToastProvider>{children}</ToastProvider>
);

export default Toast;
