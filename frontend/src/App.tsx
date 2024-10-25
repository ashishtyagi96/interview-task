import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvestorList from './components/InvestorList';
import InvestorCommitments from './components/InvestorCommitments';
import { ROUTE_CONSTANTS } from './utils/appConstants';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_CONSTANTS.ROOT} element={<InvestorList />} />
        <Route path={ROUTE_CONSTANTS.INVESTORS} element={<InvestorList />} />
        <Route path={ROUTE_CONSTANTS.INVESTORS_COMMITMENTS} element={<InvestorCommitments />} />
      </Routes>
    </Router>
  );
};

export default App;