import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './index.css';
import { Commitment, Investor } from '../../types';
import { formatCommitment } from '../../utils/formatCommitment';
import CommitmentFilter from '../CommitmentFilter';
import Appbar from '../Appbar';
import { BACKEND_URL } from '../../utils/config';

const InvestorCommitments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(20);
  const [filter, setFilter] = useState<string>('All');
  useEffect(() => {
    const fetchCommitments = async () => {
      try {
        const response = await axios.get<Commitment[]>(`${BACKEND_URL}/investors/${id}/commitments`,{ params: { asset_class: filter } });
        setCommitments(response.data);
      } catch (err) {
        console.error('Failed to fetch commitments');
      }
    };

    const fetchInvestor = async () => {
      try {
        const response = await axios.get<Investor>(`${BACKEND_URL}/investors/${id}`);
        setInvestor(response.data);
      } catch (err) {
        console.error('Failed to fetch investor details');
      }
    };

    fetchCommitments();
    fetchInvestor();
  }, [id,filter]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    setCurrentPage(0);
  }

  const offset = currentPage * itemsPerPage;
  const currentPageData = commitments.slice(offset, offset + itemsPerPage);
  console.log(currentPage);
  return (
    <div>
      <Appbar/>
      <div className='commitment-container'>
        <h2 className='commitment-header'>
          <div>Commitments</div><div>{investor ? investor.name : 'Loading...'}</div>
        </h2>
        <CommitmentFilter id={Number(id)} filter={filter} setFilter={handleFilterChange} />
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Asset Class</th>
              <th>Amount</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((commitment) => (
              <tr key={commitment.id} className='table-row'>
                <td>{commitment.id}</td>
                <td>{commitment.asset_class}</td>
                <td>{formatCommitment(commitment.amount)}</td>
                <td>{commitment.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(commitments.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default InvestorCommitments;