import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CommitmentFilters } from '../../types';
import { formatCommitment } from '../../utils/formatCommitment';
import './index.css';
import { BACKEND_URL } from '../../utils/config';

interface CommitmentFilterProps {
  id: number;
  filter: string;
  setFilter: (filter: string) => void;
}
const CommitmentFilter: React.FC<CommitmentFilterProps> = ({ id , filter = 'All', setFilter }) => {

  const [filters, setFilters] = useState<CommitmentFilters[]>([]);


  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get<CommitmentFilters[]>(`${BACKEND_URL}/investors/${id}/commitments/filters`);
        setFilters(response.data);
      } catch (err) {
        console.log('Failed to fetch commitments');
      }
    };
    fetchFilters();
  }, [id]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  }

  return (
    <div style={{display:'flex'}}>
        {filters.map((commitmentFilter, index) => (
          <div className={filter === commitmentFilter.asset_class ? "selected-filter-box" : "filter-box"} key={`filter-${index}`} onClick={()=>handleFilterChange(commitmentFilter.asset_class)}>
            <div>{commitmentFilter.asset_class}</div>
            <div>£{formatCommitment(commitmentFilter.amount)}</div>
          </div>
        ))}
    </div>
  );
};

export default CommitmentFilter;
