import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutes = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const data = Cookies.get('%2515M%250');

    if (!data) {
      navigate('/login');
    }
  });

  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoutes;
