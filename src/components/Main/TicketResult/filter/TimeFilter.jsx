import React from 'react';
import {
  FilterWrapperDl,
  FilterWrapperButton,
  StyleSlider,
  TimeHeader,
  TimeContent,
  InBoundTimeDiv,
  OutBoundTimeDiv,
} from '../../../styles/Filter.style';

const TimeFilter = props => {
  return (
    <FilterWrapperDl>
      <div>
        <dt>
          <FilterWrapperButton>
            <span>출발 시간대 설정</span>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M12 17.5l-7.2-6.4c-.6-.5-.7-1.5-.1-2.1.5-.6 1.5-.7 2.1-.1l5.2 4.6 5.2-4.6c.6-.6 1.6-.5 2.1.1s.5 1.6-.1 2.1L12 17.5z"></path>
            </svg>
          </FilterWrapperButton>
        </dt>
        <dd>
          <div>
            <OutBoundTimeDiv>
              <TimeHeader>가는날 출발 시간</TimeHeader>
              <TimeContent>오전 12:00 - 오후 11:59</TimeContent>
              <div>
                <StyleSlider range defaultValue={[20, 50]} />
              </div>
            </OutBoundTimeDiv>
            <InBoundTimeDiv>
              <TimeHeader>오는날 출발 시간</TimeHeader>
              <TimeContent>오전 12:00 - 오후 11:59</TimeContent>
              <div>
                <StyleSlider range defaultValue={[20, 50]} />
              </div>
            </InBoundTimeDiv>
          </div>
        </dd>
      </div>
    </FilterWrapperDl>
  );
};

export default TimeFilter;
