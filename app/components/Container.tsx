import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {children}
    </div>
  );
}

export default Container;