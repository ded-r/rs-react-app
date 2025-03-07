import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className="not-found flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
