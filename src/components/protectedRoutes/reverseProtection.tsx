import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ReverseProtectedRoutes = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const data = Cookies.get('%2515M%250');

    if (data) {
      navigate('/');
    }
  });

  return (
    <>
      <Component />
    </>
  );
};

export default ReverseProtectedRoutes;
