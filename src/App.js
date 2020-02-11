import React, { useState } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { Icon } from 'antd';
import logo from './images/sky-pringer-logo.png';
import './App.scss';
import {
  Header,
  HiddenHeader,
  Image,
  FlexWrapper,
  FlexList,
  SubMenuButton,
  LoginButton,
  MainMenuButton,
  BgWrapper,
  SearchArea,
  SearchAreaTitle,
  SearchFormWrapper,
  CultureHeader,
  CultureTitle,
  ExitButton,
  CultureItem,
  FlexLabel,
  Description,
  CultureSelect,
  CultureButton,
  CultureBody,
  Culture,
  CultureWrapper,
  Flag,
  Currency,
  BgTailWrapper,
  BgTail,
} from './styled-components';

import TripIdea from './TripIdea';
import MonthSpecialProduct from './MonthSpecialProduct';
import RecommendProduct from './RecommendProduct';
import Slogan from './Slogan';
import Tripplan from './Tripplan';
import Footer from './Footer';

function App() {
  const [selectCountry, setSelectCountry] = useState(false);

  function displaySelectCountry() {
    setSelectCountry(true);
  }

  function hideSelectCountry() {
    setSelectCountry(false);
  }

  function configCulture() {
    setSelectCountry(false);
    // set configuration
  }

  return (
    <BrowserRouter>
      <Header>
        <FlexWrapper justify="space-between" align="center" height="78">
          <h1>
            <Link to="/">
              <Image src={logo} alt="스카이프린터 로고" width="176" />
            </Link>
          </h1>
          <nav>
            <HiddenHeader>언어 설정 및 로그인 메뉴</HiddenHeader>
            <FlexList
              fontSize="1.2"
              width="353"
              justify="space-around"
              align="center"
            >
              <li>
                <a
                  className="help"
                  href="https://help.skyscanner.net/hc/ko?skyCurrency=currency_krw&skyLanguage=lang_ko&skyMarket=kr_skyscanner&_mp=16ff4c302b1108-0342ccc764089b-b383f66-144000-16ff4c302b28f7_1581145007784&preferences=f3fa260e084e455dab664acd265c9a67&traveller_context=f3fa260e-084e-455d-ab66-4acd265c9a67&_ga=2.91829530.163945663.1581136578-799128569.1580359418"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  도움말
                </a>
              </li>
              <li>
                <SubMenuButton onClick={displaySelectCountry} width="195">
                  <FlexWrapper justify="space-around" align="center">
                    <span className="locale">한국어</span>
                    <Flag
                      src={`https://images.skyscnr.com/images/country/flag/header/${'kr'}.png`}
                      alt="국기"
                    />
                    <span className="market">{'대한민국'}</span>
                    <Currency>{'₩ KRW'}</Currency>
                  </FlexWrapper>
                </SubMenuButton>
              </li>
              <li>
                <LoginButton width="94">로그인</LoginButton>
              </li>
            </FlexList>
          </nav>
        </FlexWrapper>
        <nav>
          <HiddenHeader>검색 메뉴</HiddenHeader>
          <FlexList
            justify="space-between"
            align="center"
            width="283"
            height="36"
          >
            <li>
              <MainMenuButton active>
                <FlexWrapper justify="space-around" align="center">
                  <svg className="logo" viewBox="0 0 24 24">
                    <path d="M3.455 8.78a.775.775 0 0 1 .952.224l1.472 1.91 1.816-.267a2.852 2.852 0 0 1 .536-.051h9.862a5.099 5.099 0 0 1 2.438.62.944.944 0 0 1-.072 1.67l-.046.021a5.1 5.1 0 0 1-2.194.497h-4.314l-3.663 5.867A1.546 1.546 0 0 1 8.93 20H7.78l2.007-5.858v-.738h-1.53a2.865 2.865 0 0 1-.589-.062l-1.765-.288-1.509 1.958a.775.775 0 0 1-.929.237.786.786 0 0 1-.419-.984L3.862 12 3.06 9.749a.785.785 0 0 1 .395-.97zM8.929 4a1.545 1.545 0 0 1 1.312.729l3.19 4.985H9.749L7.778 4z" />
                  </svg>
                  <span>항공권</span>
                </FlexWrapper>
              </MainMenuButton>
            </li>
            <li>
              <MainMenuButton disabled>
                <FlexWrapper justify="space-around" align="center">
                  <svg className="logo" viewBox="0 0 24 24">
                    <path d="M3.827 6.65c.428 0 .81.15.855.342l.005.04v3.196a2.356 2.356 0 0 0 2.16 2.438l.11.004 13.878.02c.371 0 0 4.59 0 4.971a.67.67 0 0 1-1.32.184l-.014-.07-.32-1.948H4.687l-.352 1.949a.67.67 0 0 1-1.331-.045L3 17.661V7.031c0-.21.37-.381.827-.381zm14.674 2.228a1.887 1.887 0 0 1 1.936 1.834v.087a.891.891 0 0 1-.914.865h-8.859a.891.891 0 0 1-.914-.865v-.087a1.887 1.887 0 0 1 1.936-1.834zM7.5 7.764a1.672 1.672 0 1 1 0 3.343 1.672 1.672 0 1 1 0-3.343z" />
                  </svg>
                  <span>호텔</span>
                </FlexWrapper>
              </MainMenuButton>
            </li>
            <li>
              <MainMenuButton disabled>
                <FlexWrapper justify="space-around" align="center">
                  <svg className="logo" viewBox="0 0 24 24">
                    <path d="M6 14a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 6 14zm12 0a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 18 14zM9.854 7.5a8.552 8.552 0 0 1 2.872.45 15.534 15.534 0 0 1 3.602 2.466 13.077 13.077 0 0 1 4.842 1.1c.54.28.691 1.294.816 2.14.14.946-.812 1.406-1.466 1.638l-.037.017A2.5 2.5 0 1 0 15.54 16H8.45a2.5 2.5 0 1 0-4.95-.5q0 .09.006.183c-.161-.043-.249-.076-.293-.09a1.815 1.815 0 0 1-1.185-2.101v-.003l.503-2.868h10.923c.601 0 .842-.595.271-.981a5.71 5.71 0 0 0-1.326-.72 7.612 7.612 0 0 0-2.546-.394 13.162 13.162 0 0 0-2.681.3c-1.157.243-2.692.69-3.658 1.002a.457.457 0 0 1-.552-.24l-.022-.054-.004-.01a.478.478 0 0 1 .277-.608 27.517 27.517 0 0 1 3.76-1.095 14.094 14.094 0 0 1 2.88-.32z" />
                  </svg>
                  <span>렌터카</span>
                </FlexWrapper>
              </MainMenuButton>
            </li>
          </FlexList>
        </nav>
      </Header>
      <main>
        <BgWrapper direction="column">
          <SearchArea direction="column" justify="space-evenly" minHeight="55">
            <HiddenHeader>검색 영역</HiddenHeader>
            <SearchAreaTitle>어디로 떠나볼까요?</SearchAreaTitle>
            <SearchFormWrapper></SearchFormWrapper>
          </SearchArea>
          <BgTailWrapper>
            <BgTail>
              <svg viewBox="0 0 14832 55">
                <path d="M7501.307 8.517l-68.043 39.341c-10.632 6.185-23.795 6.185-34.528 0l-68.144-39.34c-8.91-5.173-18.988-8.215-29.316-8.518H0v55h14832V0H7530.671a63.604 63.604 0 0 0-29.364 8.517z" />
              </svg>
            </BgTail>
          </BgTailWrapper>
        </BgWrapper>
        <div className="product-wrapper">
          <HiddenHeader>상품 영역</HiddenHeader>
          <RecommendProduct />
          <TripIdea />
          <MonthSpecialProduct />
        </div>
        <Slogan />
        <Tripplan />
      </main>
      <Footer />
      <div className="wrapper">
        <section className="global-link">
          <h3 className="global-title">전세계 사이트</h3>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.net/?market=UK&locale=en-GB&_ga=2.167051646.1988065219.1581153801-355577210.1580269878&_gac=1.87664106.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'uk'}.png`}
                  alt="국기"
                />
                <span>Cheap flight</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.com.au/?market=AU&locale=en-GB&_ga=2.167051646.1988065219.1581153801-355577210.1580269878&_gac=1.87664106.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'au'}.png`}
                  alt="국기"
                />
                <span>Australia - Cheap flights</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.tianxun.com/?market=CN&locale=zh-CN&_ga=2.192824938.1988065219.1581153801-355577210.1580269878&_gac=1.89418345.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'cn'}.png`}
                  alt="국기"
                />
                <span>中国 - 机票</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.com.hk/?market=HK&locale=zh-TW&_ga=2.192824938.1988065219.1581153801-355577210.1580269878&_gac=1.89418345.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'hk'}.png`}
                  alt="국기"
                />
                <span>香港 - 機票</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.in/?market=IN&locale=en-GB&_ga=2.192824938.1988065219.1581153801-355577210.1580269878&_gac=1.89418345.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'in'}.png`}
                  alt="국기"
                />
                <span>India - Flight tickets</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.id/?market=ID&locale=id-ID&_ga=2.192824938.1988065219.1581153801-355577210.1580269878&_gac=1.89418345.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'id'}.png`}
                  alt="국기"
                />
                <span>Indonesia - Tiket Pesawat</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.jp/?market=JP&locale=ja-JP&_ga=2.192824938.1988065219.1581153801-355577210.1580269878&_gac=1.89418345.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'jp'}.png`}
                  alt="국기"
                />
                <span>日本 - 航空券</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.com.my/?market=MY&locale=en-GB&_ga=2.192824938.1988065219.1581153801-355577210.1580269878&_gac=1.89418345.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'my'}.png`}
                  alt="국기"
                />
                <span>Malaysia - flights</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.espanol.skyscanner.com/?market=MX&locale=es-MX&_ga=2.174344674.1988065219.1581153801-355577210.1580269878&_gac=1.158100168.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'mx'}.png`}
                  alt="국기"
                />
                <span>México - vuelos</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.nz/?market=NZ&locale=en-GB&_ga=2.174344674.1988065219.1581153801-355577210.1580269878&_gac=1.158100168.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'nz'}.png`}
                  alt="국기"
                />
                <span>New Zealand - Cheap flights</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.com.ph/?market=PH&locale=en-GB&_ga=2.174344674.1988065219.1581153801-355577210.1580269878&_gac=1.158100168.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'ph'}.png`}
                  alt="국기"
                />
                <span>Philippines - flights</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.ru/?market=RU&locale=ru-RU&_ga=2.174344674.1988065219.1581153801-355577210.1580269878&_gac=1.158100168.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'ru'}.png`}
                  alt="국기"
                />
                <span>Россия - авиабилеты</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.com.sg/?market=SG&locale=en-GB&_ga=2.174344674.1988065219.1581153801-355577210.1580269878&_gac=1.158100168.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'sg'}.png`}
                  alt="국기"
                />
                <span>Singapore - flights</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.kr/?market=KR&locale=ko-KR"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'kr'}.png`}
                  alt="국기"
                />
                <span>대한민국 - 항공권</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.com.tw/?market=TW&locale=zh-TW&_ga=2.140264819.1988065219.1581153801-355577210.1580269878&_gac=1.159098440.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwEl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'tw'}.png`}
                  alt="국기"
                />
                <span>台灣 - 機票</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.co.th/?market=TH&locale=th-TH&_ga=2.140264819.1988065219.1581153801-355577210.1580269878&_gac=1.159098440.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'th'}.png`}
                  alt="국기"
                />
                <span>ไทย - ตั๋วเครื่องบิน</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.com/?market=US&locale=en-US&_ga=2.140264819.1988065219.1581153801-355577210.1580269878&_gac=1.159098440.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'us'}.png`}
                  alt="국기"
                />
                <span>USA - flights</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.com.vn/?market=VN&locale=vi-VN&_ga=2.140264819.1988065219.1581153801-355577210.1580269878&_gac=1.159098440.1580290199.CjwKCAiA1L_xBRA2EiwAgcLKA4fZLEZo8DwHXIXFET0po5ngK0sO6agxY75MZeyPqvsnHK3Hj7EbohoCfmkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://images.skyscnr.com/images/country/flag/header/${'vn'}.png`}
                  alt="국기"
                />
                <span>Việt Nam - các chuyến bay</span>
              </a>
            </li>
          </ul>
          <div>
            가격비교를 통해 최저가 항공권을 예약하고 즐거운 해외여행을
            떠나보세요
          </div>
          <small> &copy; Skyscanner Ltd 2002-2020</small>
        </section>
      </div>

      {selectCountry && (
        <CultureWrapper>
          <Culture>
            <CultureHeader justify="space-between">
              <CultureTitle>국가 설정</CultureTitle>
              <ExitButton onClick={hideSelectCountry}>
                <Icon type="close" />
              </ExitButton>
            </CultureHeader>
            <CultureBody direction="column" justify="space-around">
              <CultureItem direction="column">
                <FlexLabel htmlFor="locale" align="center">
                  <svg>
                    <path d="M21 5c-.2-.3-.6-.4-.6-.4-.8-.4-4.6-.6-8.5-.6s-7.7.2-8.5.6c0 0-.4.1-.6.4-.6.6-.9 3-.9 5.5s.3 4.9.9 5.5c.2.3.6.4.6.4.5.2 1.8.4 3.6.5v2.6c0 .3.3.6.7.5 1-.3 2.7-1.2 4-3h.3c3.9 0 7.7-.2 8.5-.6 0 0 .4-.1.6-.4.6-.6.9-3.1.9-5.5s-.4-4.9-1-5.5zM6.4 12c-.8 0-1.5-.7-1.5-1.5S5.6 9 6.4 9s1.5.7 1.5 1.5S7.3 12 6.4 12zm6.6-.4c-.3.3-.6.4-1.1.4-.8 0-1.5-.7-1.5-1.5 0-.6.4-1.1.9-1.3.2-.1.4-.2.6-.2.8 0 1.5.7 1.5 1.5 0 .4-.1.8-.4 1.1zm4.4.4c-.8 0-1.5-.7-1.5-1.5S16.5 9 17.4 9s1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"></path>
                  </svg>
                  언어
                </FlexLabel>
                <CultureSelect id="locale">
                  <option>한국어 (대한민국)</option>
                </CultureSelect>
              </CultureItem>
              <CultureItem direction="column">
                <FlexLabel htmlFor="market" align="center">
                  <svg>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm6.9 5.9h-2.3c-.3-1.2-.6-2.2-1.1-3.1 1.4.7 2.6 1.8 3.4 3.1zM15 12c0 .7 0 1.4-.1 2H9.1c-.1-.6-.1-1.3-.1-2s0-1.4.1-2.1h5.8c.1.7.1 1.4.1 2.1zm-3 8c-.7 0-1.9-1.5-2.5-4h5.1c-.7 2.5-1.9 4-2.6 4zM9.5 7.9C10.1 5.4 11.3 4 12 4s1.9 1.4 2.5 3.9h-5zm-1-3.1c-.4.9-.8 1.9-1.1 3.1H5.1c.8-1.3 2-2.4 3.4-3.1zM4.3 9.9h2.8C7 10.6 7 11.3 7 12s0 1.3.1 2H4.3c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2.1zm.8 6.1h2.3c.3 1.2.6 2.3 1.1 3.2-1.4-.7-2.6-1.8-3.4-3.2zm10.4 3.2c.5-.9.8-2 1.1-3.2h2.3c-.8 1.4-2 2.5-3.4 3.2zm4.2-5.2h-2.8c.1-.6.1-1.3.1-2s0-1.4-.1-2.1h2.8c.2.7.3 1.4.3 2.1 0 .7-.1 1.4-.3 2z"></path>
                  </svg>
                  국가/지역
                </FlexLabel>
                <Description fontSize="1.2">
                  국가를 선택하면 지역별 특가 상품 및 정보를 받아보실 수
                  있습니다.
                </Description>
                <CultureSelect id="market">
                  {/* get list of markets */}
                  <option>대한민국</option>
                </CultureSelect>
              </CultureItem>
              <CultureItem direction="column">
                <FlexLabel htmlFor="currency" align="center">
                  <svg>
                    <path d="M17 9.3v.2c0 .7-.1 1.3-.3 1.9 1.3.7 2.3 2 2.3 3.6 0 2.2-1.8 4-4 4-1.6 0-2.9-.9-3.6-2.3-.6.2-1.3.3-1.9.3h-.2c.8 2.3 3 4 5.7 4 3.3 0 6-2.7 6-6 0-2.6-1.7-4.8-4-5.7zm-1 .2C16 5.9 13.1 3 9.5 3S3 5.9 3 9.5 5.9 16 9.5 16 16 13.1 16 9.5zm-9.4 2.6l.9-1.2c.7.4 1.2.6 1.7.6.6 0 .9-.2.9-.6 0-.8-3.2-1-3.2-2.8 0-1.1.7-1.8 1.9-2V5h1.4v1.1c.8.1 1.4.4 1.9.9L11 8c-.4-.3-.8-.5-1.3-.5s-.8.1-.8.5c0 .8 3.2.8 3.2 2.7 0 1-.6 1.8-1.9 2.1V14H8.8v-1c-.7-.1-1.6-.4-2.2-.9z"></path>
                  </svg>
                  통화
                </FlexLabel>
                <CultureSelect id="currency">
                  {/* get list of currencies */}
                  <option>KRW - ₩</option>
                </CultureSelect>
              </CultureItem>
              <CultureItem direction="column">
                <CultureButton onClick={configCulture}>저장</CultureButton>
                <CultureButton onClick={hideSelectCountry}>취소</CultureButton>
              </CultureItem>
            </CultureBody>
          </Culture>
        </CultureWrapper>
      )}
    </BrowserRouter>
  );
}

export default App;
