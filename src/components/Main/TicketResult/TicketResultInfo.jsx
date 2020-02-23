import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import SearchForm from '../SearchForm';
import { FlexWrapper } from '../../styles';
import { HiddenHeader } from '../../styles';
import { Icon } from 'antd';
import DatePickerContainer from '../../../containers/DatePickerContainer';
import { connect } from 'react-redux';
import TicketInfoDetail from './TicketInfoDetail';
import { Popover, Button } from 'antd';
import StopFilter from './filter/StopFilter';
import TimeFilter from './filter/TimeFilter';
import DurationFilter from './filter/DurationFilter';
import CarrierFilter from './filter/CarrierFilter';
import AirportFilter from './filter/AirportFilter';

const TicketResultInfoWrapper = styled.div`
  width: calc(100% - 49.7rem);
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const SearchArea = styled.section`
  position: relative;
  min-height: 7.6rem;
  border-radius: 0 0 0.6rem 0.6rem;
  background-color: #042759;
  cursor: pointer;
`;

const SearchSummary = styled.div`
  padding: 0.6rem 1.2rem 1.2rem 0;
  color: #fff;
`;

const SearchButtonDiv = styled.div`
  position: absolute;
  margin: 0 1.2rem;
  width: 3.6rem;
  padding-top: 6px;
  height: 5.8rem;

  button {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 2.9rem;
    text-decoration: none;
    box-shadow: none;
    cursor: pointer;
    user-select: none;
    color: #fff;
    background-color: #00a698;

    &:hover {
      background-color: #00887d;
    }
  }
`;

const SearchIcon = styled(Icon)`
  width: 1.8rem;
  height: 1.8rem;
  color: #fff;
  font-size: 1.8rem;
`;

const SearchHeaderWrapper = styled(FlexWrapper)`
  margin-left: 60px;
  justify-content: space-between;
  align-items: center;
`;

const SearchTitle = styled.div`
  padding-top: 0.6rem;
  height: 3.4rem;
`;

const SearchDatePickerGroup = styled.nav`
  display: flex;
  ${({ tripType }) =>
    tripType === 'round' &&
    css`
      align-items: flex-end;
    `}
  height: 100%;
  font-size: 1.2rem;
`;

const SearchPassenger = styled.div`
  margin-left: 60px;
  height: 100%;
  font-size: 1.2rem;
`;

const AddOns = styled.div`
  width: 100%;
  margin: 1rem 0 1rem 0;
  line-height: 2.4rem;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
  span {
    color: #0770e3;
    font-size: 1.2rem;
  }
`;
const CalenderAndChart = styled.span`
  float: left;
`;
const AddLuggage = styled.span`
  float: right;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TicketFilterSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 26%;
`;

const TicketResultSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 72%;
  margin-left: 1.5rem;
`;

const ResultAndArrangeStandard = styled(FlexWrapper)`
  width: 100%;
  height: 3.6rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  span {
    font-size: 1.2rem;
  }
  label {
    font-weight: 700;
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  select {
    display: flex;
    align-items: flex-end;
    height: 3.6rem;
    border: 1px solid rgb(169, 169, 182);
    padding: 0.6rem 3rem 0.6rem 1.2rem;
    background: #fff
      url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4Ij48c3R5bGU+PC9zdHlsZT48cGF0aCBkPSJNMTkuNyAxMC4zTDEyIDE3LjRsLTcuNy03LjFjLS42LS42LS4yLTEuNy43LTEuN2gxNGMuOSAwIDEuMyAxLjEuNyAxLjd6IiBmaWxsPSIjNDQ0NTYwIi8+PC9zdmc+')
      no-repeat right 1.2rem center;
    -webkit-appearance: none;
  }
`;

const SelectArrageStandard = styled(FlexWrapper)`
  align-items: center;
`;
const ArrangeFilterButtonWapper = styled.div`
  margin-bottom: 1.2rem;
  height: 10rem;
  width: 100%;
  background: #fff;
  border-radius: 0.3rem 0.3rem;
`;

const FilterPriceButton = styled.button`
  padding: 1.2rem 1.8rem;
  width: 33%;

  span {
    font-size: 2.4rem;
    color: #0770e3;
    font-weight: 700;
  }
  p {
    font-size: 1.2rem;
  }
  &:nth-child(2n) {
    border-right: 0.5px solid #ddddef;
    border-left: 0.5px solid #ddddef;
  }
`;

const MoreResultButton = styled.button`
  border-radius: 0.4rem;
  line-height: 2.4rem;
  margin: 0 auto;
  color: #0770e3;
  font-size: 1.9rem;
  width: 16.9rem;
  padding: 0.4rem 1.8rem;
  border: 2px solid rgb(216, 216, 225);
  background: #fff;
  font-weight: 700;
  &:hover {
    border: 2px solid #0770e3;
  }
`;
const LuggageMoreDetail = styled.div`
  font-size: 1.2rem;
  line-height: 2.4rem;
  display: block;
  text-align: left;
  padding-top: 1.2rem;
  b {
    font-weight: 700;
  }
  p {
    padding-bottom: 1.2rem;
  }
  a {
    color: #0770e3;
  }
`;

const PriceAlarm = styled.button`
  color: #0770e3;
  padding: 0.6rem 1.8rem;
  width: 24rem;
  border: 2px solid rgb(216, 216, 225);
  border-radius: 0.4rem;
  line-height: 1.9rem;
  vertical-align: middle;
  font-size: 1.9rem;
  font-weight: 700;
  svg {
    transform: translateY(2px);
    margin-right: 5px;
  }
  &:hover {
    border: 2px solid #0770e3;
  }
`;

const FilterArea = styled.dl`
  button {
    width: 24rem;
    height: 3.6rem;
  }
`;
const TicketResultInfo = ({ tripType, passengerInfo, places }) => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState();

  const convertClass = useCallback(type => {
    const seatTypes = [
      { cabinClass: 'economy', name: '일반석' },
      { cabinClass: 'premiumeconomy', name: '프리미엄 일반석' },
      { cabinClass: 'business', name: '비지니스석' },
      { cabinClass: 'first', name: '일등석' },
    ];

    const [selectedSeat] = seatTypes.filter(s => type === s.cabinClass);

    return selectedSeat.name;
  }, []);

  const getTotalPassengers = () => {
    const { adults, children } = passengerInfo;
    return adults + children.length;
  };

  const content = (
    <div>
      <p>최저가 순 정렬</p>
    </div>
  );

  return (
    <TicketResultInfoWrapper>
      <SearchArea>
        <HiddenHeader>검색 영역</HiddenHeader>
        <SearchSummary onClick={() => setVisible(!visible)}>
          {' '}
          <SearchButtonDiv>
            <button type="button">
              <span>
                <SearchIcon type="search" />
              </span>
            </button>
          </SearchButtonDiv>
          <SearchHeaderWrapper>
            <SearchTitle>
              {places.inBoundName} - {places.outBoundName}
              {/* 서울 - 도쿄 */}
            </SearchTitle>
            <SearchDatePickerGroup tripType={tripType}>
              <DatePickerContainer type="inline-inbound" inMain={false} />
              {tripType === 'round' && (
                <DatePickerContainer type="inline-outbound" inMain={false} />
              )}
            </SearchDatePickerGroup>
          </SearchHeaderWrapper>
          <SearchPassenger>
            {getTotalPassengers() > 1
              ? `${getTotalPassengers()} 승객 | ${convertClass(
                  passengerInfo.cabinClass,
                )}`
              : `${getTotalPassengers()} 성인 | ${convertClass(
                  passengerInfo.cabinClass,
                )}`}
          </SearchPassenger>{' '}
        </SearchSummary>
        {visible && <SearchForm />}
      </SearchArea>
      <div>
        <AddOns>
          <CalenderAndChart>
            <a
              href="https://www.skyscanner.co.kr/transport/flights/icn/nyca?adultsv2=1&childrenv2=&cabinclass=economy&rtn=1&preferdirects=false&oym=2002&iym=2003&outboundaltsenabled=false&inboundaltsenabled=false"
              target="_blank"
              rel="noopener noreferrer"
            >
              달력/차트 보기
            </a>
          </CalenderAndChart>
          <AddLuggage>
            <a
              href="https://www.skyscanner.co.kr/airlinefees"
              target="_blank"
              rel="noopener noreferrer"
            >
              추가 수화물 요금이 부과될 수 있음
            </a>
          </AddLuggage>
        </AddOns>
        <SectionWrapper>
          <TicketFilterSection>
            <PriceAlarm>
              <svg viewBox="0 0 24 24 " width="18" height="18">
                <path
                  fill="#0770e3"
                  d="M18 13.2c.2 2.3 2 1.7 2 4 0 1.7-3.5 3.8-8 3.8s-8-2.1-8-3.8c0-2.3 1.8-1.7 2-4 .5-5.5 1-7.7 4.4-8.9C11.6 3.8 11 3 12 3s.4.8 1.6 1.3c3.5 1.2 3.9 3.4 4.4 8.9zM12 20c3.9 0 6.5-1.7 6.5-2.1 0-.7-2-2-6.5-1.9-4.5 0-6.5 1.4-6.5 2 0 .3 2.6 2 6.5 2zm-2.5-2.8c.7-.1 1.6-.2 2.5-.2s1.8.1 2.5.2c-.6 1.2-1.4 1.8-2.5 1.8s-2-.6-2.5-1.8z"
                ></path>
              </svg>
              가격 변동 알림 받기
            </PriceAlarm>
            <StopFilter></StopFilter>
            <TimeFilter></TimeFilter>
            <DurationFilter></DurationFilter>
            <CarrierFilter></CarrierFilter>
            <AirportFilter></AirportFilter>
          </TicketFilterSection>

          <TicketResultSection>
            <ResultAndArrangeStandard>
              <span>{123}결과</span>
              <SelectArrageStandard>
                <label htmlFor="arrangedStandard">정렬기준</label>
                <select id="arrangedStandard" onChange={() => {}}>
                  <option value="최저가순">최저가순</option>
                  <option value="최단여행시간순">최단여행시간순</option>
                  <option value="출국">출국: 출발시간</option>
                  <option value="귀국">귀국: 출발시간</option>
                </select>
              </SelectArrageStandard>
            </ResultAndArrangeStandard>

            <ArrangeFilterButtonWapper>
              <Popover content={content}>
                <FilterPriceButton>
                  <p>최저가순</p>
                  <span>₩가격</span>
                  <p> 14시간 13분(평군)</p>
                </FilterPriceButton>
              </Popover>
              <Popover content={content}>
                <FilterPriceButton>
                  <p>최저가순</p>
                  <span>₩가격</span>
                  <p> 14시간 13분(평군)</p>
                </FilterPriceButton>
              </Popover>
              <Popover content={content}>
                <FilterPriceButton>
                  <p>최저가순</p>
                  <span>₩ 가격</span>
                  <p> 14시간 13분(평군)</p>
                </FilterPriceButton>
              </Popover>
            </ArrangeFilterButtonWapper>

            <TicketInfoDetail />

            <MoreResultButton>더 많은 결과 표시</MoreResultButton>

            <LuggageMoreDetail>
              <p>
                <b>요금은 매일 갱신됩니다.</b> 예약 시기의 이용 가능 여부에 따라
                요금이 달라질 수 있습니다.
              </p>
              <p>
                <b>체크인 수화물이 있습니까?</b>
                <a
                  href="https://www.skyscanner.co.kr/airlinefees"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  추가 수화물 요금이 부과될 수 있음
                </a>
              </p>
            </LuggageMoreDetail>
          </TicketResultSection>
        </SectionWrapper>
      </div>
    </TicketResultInfoWrapper>
  );
};

const mapStateToProps = state => ({
  places: state.places,
  tripType: state.datepicker.tripType,
  passengerInfo: state.passenger,
});

export default connect(mapStateToProps)(TicketResultInfo);

// export default TicketResultInfo;
