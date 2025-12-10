import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner';

const ManagerRoute = ({ children }) => {
  const { loading } = useAuth();
  const { roleLoading, role } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== 'manager') {
    return (
      <div>
        <h2 className="text-3xl">Forbidden</h2>
      </div>
    );
  }

  return children;
};

export default ManagerRoute;
