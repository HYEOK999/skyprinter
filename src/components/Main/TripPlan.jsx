import React from 'react';
import styled from 'styled-components';
import { FlexSection } from '../../styles';

const TripPlanSection = styled(FlexSection)`
  width: 1048px;
  margin: 0 auto;
  line-height: 1.5;
  margin-top: 7.2rem;
  margin-bottom: 9.6rem;
`;

const HeadingName = styled.h3`
  margin-bottom: 1.2rem;
  font-size: 2.4rem;
  font-weight: 700;
`;

const CityName = styled.h4`
  font-size: 2.4rem;
  font-weight: 700;
  padding-top: 1.6rem;
  padding-bottom: 0.8rem;
`;

const PlanP = styled.p`
  font-size: 1.6rem;
  margin-bottom: 2.4rem;
`;

const PlanWrapper = styled.div`
  display: flex;
  justify-content: column;
  flex-wrap: wrap;
`;

const CityWapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-right: ${props => props.right || '1.8rem'};
  margin-bottom: 1.8rem;
`;

const CityImg = styled.img`
  width: 10rem;
  height: 10rem;
  border: none;
  border-radius: 0.375rem 0 0 0.375rem;
`;

const CityPlan = styled.div`
  width: 23.7rem;
  height: 10rem;
  background: rgb(241, 242, 248);
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  border-radius: 0 0.375rem 0.375rem 0;

  ul {
    display: flex;
    color: #ff7b59;
    font-weight: 700;

    li {
      &:nth-child(n + 2):before {
        content: '·';
        margin: 0.6rem;
        font-size: 1.2rem;
      }
      a:hover {
        color: #ff7b59;
      }
      span {
        font-size: 1.2rem;
      }
    }
  }
`;

const TripPlan = () => (
  <TripPlanSection direction="column" boxSize="border-box">
    <div className="plan-header">
      <HeadingName>나만의 완벽한 여행을 계획하세요</HeadingName>
      <PlanP>
        스카이스캐너에서 가장 인기 있는 여행지의 항공편, 호텔, 렌터카를 검색해
        보세요.
      </PlanP>
    </div>
    <PlanWrapper>
      <CityWapper>
        <CityImg
          src="https://content.skyscnr.com/17aa2e2dc4eb4bc182a0a65957007fa3/GettyImages-106535239.jpg?crop=100px:100px&amp;quality=90"
          alt="오사카"
        />
        <CityPlan>
          <CityName>오사카</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/osaa/cheap-flights-to-osaka.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/japan/osaka-hotels/ci-27542908"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-osaka/27542908.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>
      <CityWapper>
        <CityImg
          src="https://content.skyscnr.com/99b6d376df86c55006e1ca90a18c5902/GettyImages-479490111.jpg?crop=100px:100px&amp;quality=90"
          alt="도쿄"
        />
        <CityPlan>
          <CityName>도쿄</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/tyoa/cheap-flights-to-tokyo.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/japan/tokyo-hotels/ci-27542089"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-tokyo/27542089.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>
      <CityWapper right="0">
        <CityImg
          src="https://content.skyscnr.com/bc42cc80dd1447615ee441e2020cbe2c/GettyImages-126509194.jpg?crop=100px:100px&amp;quality=90"
          alt="후쿠오카"
        />
        <CityPlan>
          <CityName>후쿠오카</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/fuk/cheap-flights-to-fukuoka-airport.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/japan/fukuoka-hotels/ci-27541740"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-fukuoka/27541740.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>

      <CityWapper>
        <CityImg
          src="https://content.skyscnr.com/05accaec28ad48ea37b4c5e13bbbfa7b/GettyImages-166140632.jpg?crop=100px:100px&amp;quality=90"
          alt="타이페이"
        />
        <CityPlan>
          <CityName>타이페이</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/tpet/cheap-flights-to-taipei.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/taiwan/taipei-hotels/ci-27547236"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-taipei/27547236.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>
      <CityWapper>
        <CityImg
          src="https://content.skyscnr.com/48a389f8137372a0eb0394896b8cd140/cjua_488471333.jpg?crop=100px:100px&amp;quality=90"
          alt="제주"
        />
        <CityPlan>
          <CityName>제주</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/cju/cheap-flights-to-jeju-airport.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/south-korea/jeju-hotels/ci-39499832"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-jeju/39499832.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>
      <CityWapper right="0">
        <CityImg
          src="https://content.skyscnr.com/246fa4ebad55ce0c252a19705e17514b/hongkong-0304.jpg?crop=100px:100px&amp;quality=90"
          alt="홍콩"
        />
        <CityPlan>
          <CityName>홍콩</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/hkga/cheap-flights-to-hong-kong.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/china/hong-kong-hotels/ci-27542065"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-hong-kong/27542065.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>
      <CityWapper>
        <CityImg
          src="https://content.skyscnr.com/76322ef5ee6ebe445aa45448c323959b/thailand-bangkok-6238.jpg?crop=100px:100px&amp;quality=90"
          alt="방콕"
        />
        <CityPlan>
          <CityName>방콕</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/bkkt/cheap-flights-to-bangkok.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/thailand/bangkok-hotels/ci-27536671"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-bangkok/27536671.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>
      <CityWapper>
        <CityImg
          src="https://content.skyscnr.com/9a3f94c9b8309bc333cc948f7296bae4/GettyImages-595946128.jpg?crop=100px:100px&amp;quality=90"
          alt="오키나와"
        />
        <CityPlan>
          <CityName>오키나와</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/oka/cheap-flights-to-okinawa-naha-airport.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/japan/okinawa-hotels/ci-27540768"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-okinawa/27540768.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>
      <CityWapper right="0">
        <CityImg
          src="https://content.skyscnr.com/c10d466e9ded52fcd9d103fa6e7b4e92/stock-photo-shanghai-in-blue-32506683.jpg?crop=100px:100px&amp;quality=90"
          alt="상하이"
        />
        <CityPlan>
          <CityName>상하이</CityName>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.co.kr/flights-to/csha/cheap-flights-to-shanghai.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>항공권</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/hotels/china/shanghai-hotels/ci-27546079"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>호텔</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.skyscanner.co.kr/car-hire-in/car-hire-in-shanghai/27546079.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>렌터카</span>
              </a>
            </li>
          </ul>
        </CityPlan>
      </CityWapper>
    </PlanWrapper>
  </TripPlanSection>
);

export default TripPlan;
