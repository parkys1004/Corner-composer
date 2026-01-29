
import React from 'react';
import StarField from './components/StarField';
import ScrollManager from './components/ScrollManager';
import PromotionPopup from './components/PromotionPopup';

const App: React.FC = () => {
  return (
    <>
      <StarField />
      <ScrollManager />
      <PromotionPopup />
    </>
  );
};

export default App;
    