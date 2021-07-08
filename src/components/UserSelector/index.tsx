import React from "react";
import styled from "styled-components";
import { User } from "../../types";
import { USERS } from "../../const";

type Props = {
  currentUser: User;
  setUser: (user: User) => void;
};

const Select = styled.select`
  width: 100%;
  padding: 0.375rem 0.75rem;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const Option = styled.option``;

const UserSelector = ({ currentUser, setUser }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value as User);
  };
  return (
    <Select onChange={handleChange}>
      {USERS.map((user) => (
        <Option key={user} selected={user === currentUser}>
          {user}
        </Option>
      ))}
    </Select>
  );
};

export default UserSelector;
