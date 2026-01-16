import React, { useState } from 'react';
import StarField from './components/StarField';
import ScrollManager from './components/ScrollManager';
import BuilderModal from './components/BuilderModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StarField />
      <ScrollManager onOpenModal={() => setIsModalOpen(true)} />
      <BuilderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default App;