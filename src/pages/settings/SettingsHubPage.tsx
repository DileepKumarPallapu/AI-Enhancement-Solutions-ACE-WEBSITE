import React from 'react';
import { Navigate } from 'react-router-dom';

export const SettingsHubPage: React.FC = () => {
  return <Navigate to="/settings/profile" replace />;
};
