import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { formatCommitment } from '../../utils/formatCommitment';
import { Investor } from '../../types';
import './index.css';
import Appbar from '../Appbar';
import { BACKEND_URL } from '../../utils/config';

const InvestorList: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get<Investor[]>(`${BACKEND_URL}/investors`);
        setInvestors(response.data);
      } catch (err) {
        console.error('Failed to fetch investors');
      }
    };

    fetchInvestors();
  }, []);

  const handleRowClick = (investorId: number) => {
    navigate(`/investors/${investorId}/commitments`);
  };

  return (
    <div>
    <Appbar/>
    <div className='investor-container'>
      <h2>Investors</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Date Added</th>
            <th>Total Commitment</th>
          </tr>
        </thead>
        <tbody>
          {investors.map((investor) => (
            <tr key={investor.id} onClick={() => handleRowClick(investor.id)} className='table-row'>
              <td>{investor.id}</td>
              <td>{investor.name}</td>
              <td>{investor.type}</td>
              <td>{format(new Date(investor.date_added), "MMMM do, yyyy")}</td>
              <td>{formatCommitment(investor.total_commitment)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default InvestorList;