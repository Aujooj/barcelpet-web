import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageNotFound from '../components/PageNotFound';

const NotFoundPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col mt-20'>
      <Header />
        <PageNotFound />
      <Footer />
    </div>
  );
};
export default NotFoundPage;