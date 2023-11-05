import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CustomButton = styled(Link)<{ to?: string }>`
  font-family: 'Montserrat, sans-serif';
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
  background-color: #E78121;
  color: #FFFFFF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: none;
  border-radius: 24px;
  cursor: pointer;
  width: 180px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #C56E18;
  }

  &:active {
    background-color: #A34711;
  }
`;

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  disabled?: boolean; 
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, onClick, children }) => {
  if (to) {
    return (
      <CustomButton to={to}>
        {children}
      </CustomButton>
    );
  }

  return (
    <CustomButton onClick={onClick}>
      {children}
    </CustomButton>
  );
};

export default Button;