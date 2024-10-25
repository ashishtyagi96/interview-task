import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Avatar } from '@mui/material';
import { ROUTE_CONSTANTS } from '../../utils/appConstants';
import './index.css';
import logo from '../../assets/sidebar/Preqin-logo.svg';
import house from '../../assets/sidebar/house.svg';

const Appbar: React.FC = () => {
  const navigate = useNavigate();

  const goToInvestors = () => {
    navigate(ROUTE_CONSTANTS.ROOT);
  };

  return (
    <div className="colapsed-sidebar">
      <div className="sidebar-container-top">
        <img src={logo} className="logo" onClick={goToInvestors} alt="Preqin Logo" />
        <div className="menu-items-icon">
          <div className="menu-items-1" id="icon-dashboard" onClick={goToInvestors}>
            <img alt="Dashboard" src={house} className="house" />
          </div>
        </div>
      </div>
      <div className="sidebar-container-bottom">
        <div className="profile-widget" id="icon-profile">
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            overlap="circular"
          >
            <Avatar>NA</Avatar>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
