import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FlexWrapper } from '../../styles';
import PlacesContainer from '../../containers/PlacesContainer';
import CabinClassPessenger from '../Main/CabinClassPessenger';
import CheckBox from './CheckBox';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { Radio } from 'antd';
import CabinClassPessenger from './CabinClassPessenger/CabinPassengerContainer';

const SearchFormWrapper = styled(FlexWrapper)`
  height: 22.2rem;
  background: #02122c;
  padding: 2.4rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
`;

const SearchFormOption = styled(FlexWrapper)`
  justify-content: space-between;
  color: #fff;
  line-height: 1.5;

  a {
    color: inherit;
  }
`;

const SelectWayToGo = styled(Radio.Group)`
  color: #fff;
  label {
    font-size: 1.6rem;
    color: #fff;
  }
  .ant-radio {
    margin: 0 0 2px 0;
  }
`;

const SearchWrapper = styled(FlexWrapper)`
  padding-top: 1.3rem;
`;

const SearchFormSubmit = styled(FlexWrapper)`
  justify-content: space-between;
  color: #fff;
  button {
    padding: 0.6rem 2.4rem 0.3rem 2.4rem;
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 3rem;
    vertical-align: middle;
    background-color: rgb(0, 166, 152);
    border: none;
    border-radius: 0.4rem;
    span {
      vertical-align: middle;
      padding-left: 6px;
    }
  }
`;

const SelectSeatDateBox = styled(FlexWrapper)`
  width: 50%;
`;

const SearchSubmitButton = styled.button.attrs(props => ({
  ariaLabel: '항공권 검색',
}))`
  transform: translateY(-16px);
`;

function SearchForm() {
  const [wayType, setWayType] = useState('왕복');

  const selectWayToGo = useCallback(
    e => {
      setWayType(e.target.value);
    },
    [setWayType],
  );

  return (
    <SearchFormWrapper direction="column">
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <SearchFormOption>
          <SelectWayToGo onChange={selectWayToGo} value={wayType}>
            <Radio value={'왕복'}>왕복</Radio>
            <Radio value={'편도'}>편도</Radio>
            <Radio value={'다구간'}>다구간</Radio>
          </SelectWayToGo>
          <div>
            <a
              href="https://www.skyscanner.co.kr/inspire/map?outboundDate=2020-11-11&outboundPlace=&preferDirects=false"
              target="_blank"
              rel="noopener noreferrer"
            >
              지도로 검색하기
            </a>
          </div>
        </SearchFormOption>
        <SearchWrapper>
          <PlacesContainer />
          <SelectSeatDateBox>
            <DatePickerContainer type="inbound" inMain={true} />
            <DatePickerContainer type="outbound" inMain={true} />
            <CabinClassPessenger />
          </SelectSeatDateBox>
        </SearchWrapper>
        <SearchFormSubmit>
          <CheckBox>직항만</CheckBox>
          <SearchSubmitButton>
            항공권 검색
            <span>
              <svg width="24" height="24" fill="rgb(255, 255, 255)">
                <path d="M14.4 19.5l5.7-5.3c.4-.4.7-.9.8-1.5.1-.3.1-.5.1-.7s0-.4-.1-.6c-.1-.6-.4-1.1-.8-1.5l-5.7-5.3c-.8-.8-2.1-.7-2.8.1-.8.8-.7 2.1.1 2.8l2.7 2.5H5c-1.1 0-2 .9-2 2s.9 2 2 2h9.4l-2.7 2.5c-.5.4-.7 1-.7 1.5s.2 1 .5 1.4c.8.8 2.1.8 2.9.1z"></path>
              </svg>
            </span>
          </SearchSubmitButton>
        </SearchFormSubmit>
      </form>
    </SearchFormWrapper>
  );
}

export default SearchForm;
