<img width="651" alt="filter" src="https://user-images.githubusercontent.com/31315644/76090338-bb7bb500-5ffe-11ea-8d8e-028dc68b749a.png">

---------

# Filter 영역

> SkyPrinter Ticket Result Filter Area 

## 목차

1. [Filter 폴더 구조](#b1)
2. [Filter API 알아보기 -  Poll Session Result -](#b2)
3. [Filter 방식 파악하기](#b3)
4. [Redux Module 파악하기](#b4)
   - [session module](#b5)
     - [오리지널 데이터 스토어](#b6)
     - [UI용 데이터 스토어](#b7)
     - [Fiter 옵션 데이터 스토어](#b8)
5. [Saga 함수 작성](#b9)
   - [postSession](#b10)
   - [getSession](#b11)
6. [filter 옵션](#b12)
   - [stop filter](#b13)
   - [Time filter](#b14)
   - [Carrier filter](#b15)

----------

### Filter 폴더 구조 <a id="b1"></a>

/src/components/Main/TicketResult/filter

```jsx
// /src/components/Main/TicketResult/TicketResultInfo.jsx
<StopFilter />
<TimeFilter />
<DurationFilter />
<CarrierFilter />
```

- /CarrierFilter.jsx
- /DurationFilter.jsx
- /TimeFilter.jsx
- /StopFilter.jsx

<br/>

### Filter API 알아보기 -  Poll Session Results -<a id="b2"></a>

`session`을 만들고 얻은 `session key`를 이용하여 `Poll`을 할 때 파라미터를 통해 필터조건을 줄 수 있습니다.

**예제 : 경유 - 직항 / 아시아나 항공 제외**

```jsx
import axios from 'axios';
import axios from 'axios';

// 2. Poll Session
(async () => {
  try {
    const SESSION_KEY = '6aa0be06-8526-4d52-a5d6-f70e5670046a';
    const POLL_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${SESSION_KEY}`;
    
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'RAPID_API_KEY'
    };

    // 필터 예 , 경유 : 직항 , 항공기 : 아시아나 제외
    const params = {
      stops: '0',
      excludeCarriers: 'OZ;KE',
    };

    const { data } = await axios.get(POLL_URL, { 
      params,   
      headers 
    });

    console.dir(data);
  } catch (e) {
    console.error(e);
  }
})();
```

![img](https://user-images.githubusercontent.com/32444914/74079428-b4eb3380-4a7a-11ea-8059-1bfca77820f3.PNG)

<br/>

### Filter 방식 파악하기 <a id="b3"></a>

 실제 스카이 스캐너에서는 Poll 데이터가 'UpdatesComplete' 상태가 아닌 경우에도 필터링이 가능합니다. 즉, 프로그레스바가 진행 중일 때도 경유, 항공사, 출발지 - 도착지 시간대 설정이 모두 가능합니다. 

![ProgressBar](https://user-images.githubusercontent.com/31315644/76087540-b5370a00-5ff9-11ea-8a1c-06ae79291a87.jpeg)

따라서, `session`은 1개만 만들어지지만 실제로 `poll`은 2개로 나뉘어서 해야합니다. 그리고 Redux Store에 프로그레스바와 실제 데이터를 담아둘 오리지널 데이터용 `Store`를 하나 만들고, 나머지 하나는 실제로 보여질 UI 데이터용 `Store` 하나를 생성합니다. 추가로 각 필터옵션들은 한번 체크 해두면 해제하기 전까지 다른 필터조건과 같이 작용해야만 합니다. 그러므로 필터옵션들도 `Redux Store`로 관리를 하도록합니다.

즉, 정리하면 다음과 같이 3개의 스토어를 생성해야만 합니다.

1. 프로그레스바, 실제 데이터를 담아둘 변하지 않은 오리지널 데이터 스토어
2. 실제 필터를 적용해 화면에 보여질 UI 데이터 스토어
3. Filter 옵션들을 저장할 스토어

<br/>

### Redux Module 파악하기 <a id="b4"></a>

위에서 필요한 스토어들을 정리해봅니다.

- 오리지널 데이터 스토어
- UI용 데이터 스토어
- Filter 옵션 데이터 스토어

#### session module <a id="b5"></a>

##### 오리지널 데이터 스토어 <a id="b6"></a>

```jsx
export const SET_ALL_RESULT = 'skyprinter/session/SET_ALL_RESULT';

export const setAllResult = allResult => ({
  type: SET_ALL_RESULT,
  allResult
});

export const setAllResult = allResult => ({
  type: SET_ALL_RESULT,
  allResult
});
```

<br/>

##### UI용 데이터 스토어 <a id="b7"></a>

````jsx
export const SET_POLL_RESULT = 'skyprinter/session/SET_POLL_RESULT';

export const setPollResult = data => ({
  type: SET_POLL_RESULT,
  pollResult: data
});

case SET_POLL_RESULT:
....

return {
	...state,
	pollResult: {
		...action.pollResult,
		Itineraries: sortedItineraries
	},
	minDurationItinerary,
	earliestOutboundItinerary,
	cheapestItinerary
};
````

<br/>

##### Fiter 옵션 데이터 스토어 <a id="b8"></a>

```jsx
export const SET_FILTER_OPTION = 'skyprinter/session/SET_FILTER_OPTION';

export const setFilterOption = filterOption => ({
  type: SET_FILTER_OPTION,
  filterOption
});

case SET_FILTER_OPTION:
	return {
  	...state,
  	isDirect: false,
  	filterOption: action.filterOption
};
```

<br/>

### Saga 함수 작성 <a id="b9"></a>

#### postSession <a id="b10"></a>

세션을 만들고 처음 poll을 보낼떄 사용되는 Saga함수입니다.

지속적으로 XHR(비동기) 요청을 해야하기 때문에 Saga함수를 이용하였습니다.

위에서 정의한 `setAllResult` 와 `setPollResult`를 사용합니다.

먼저 세션키를 만듦가 동시에 첫 poll을 할 때에는`setAllResult` 와 `setPollResult` 모두 스토어에 값을 담아줍니다.

```jsx
export function* postSession({ allInfo }) {
  const { culture, places, passenger, datepicker } = allInfo;
  const { country, currency, locale } = culture;
  const { inBoundId, outBoundId } = places;
  // children, infants
  const { adults } = passenger;
  const { outboundDate, inboundDate } = datepicker;

  const params = {
    locale,
    country,
    currency,
    originPlace: inBoundId + '-sky',
    destinationPlace: outBoundId + '-sky',
    outboundDate: TicketService.convertDateToString(outboundDate),
    adults
  };

  if (inboundDate)
    params.inboundDate = TicketService.convertDateToString(inboundDate);

  try {
    // 1. 초기화
    yield put(resetResult());

    // 2. 세션 생성
    const { headers } = yield call(SessionService.createSession, params);
    const locationToArr = headers.location.split('/');
    const sessionKey = locationToArr[locationToArr.length - 1];
    yield put(setSessionKey(sessionKey));

    // 3. 2에서 생성한 Session의 상태가 complete될 때까지 poll
    const filterOption = yield select(({ session }) => session.filterOption);

    while (true) {
      const { data } = yield call(
        SessionService.pollSession,
        sessionKey,
        filterOption
      );

      // 프로그래스바 계산
      const { Agents } = data;
      const AllAgents = Agents.length;
      const PendingAgents = Agents.filter(
        Agent => Agent.Status === 'UpdatesComplete'
      ).length;

      const progressNum = (PendingAgents / AllAgents) * 100;
      yield put({
        type: SET_PROGRESS_RESULT,
        progress: Math.floor(progressNum)
      });

      // 4. 세션 로딩시 표시할 티켓 생성
      // all data는 계속 업데이트 해준다
      yield put(setAllResult(data));

      // 4. 세션 로딩이 complete되면 원본을 allResult에 저장한 뒤
      // 5. UI에 표시할 티켓을 가장 최근 적용된 필터로 poll해온다.
      if (data.Status === 'UpdatesComplete') {
        const pollResult = yield select(({ session }) => session.pollResult);
        // status가 complete인데 pollResult의 결과가 없다면
        if (
          !pollResult ||
          !pollResult.Itineraries ||
          !pollResult.Itineraries.length
        ) {
          const allResult = yield select(({ session }) => session.allResult);
          // allResult는 있는 경우
          if (allResult.Itineraries && allResult.Itineraries.length) {
            yield put(setPollResult(allResult));
            yield put({ type: SET_TICKETS });
          }
          yield put(setFilterOption({ sortType: 'price', sortOrder: 'asc' }));
        } else {
          yield put({ type: POLL_SESSION });
        }
        break;
      } else {
        const isPolling = yield select(({ session }) => session.isPolling);
        if (!isPolling) yield put({ type: POLL_SESSION });
      }
      yield delay(1500);
    }
  } catch (error) {
    console.dir(error);
    if (error.response.status === 400) {
      yield put(push(`/error`));
    }
    console.log(error);
  }
}
```

<br/>

#### getSession  <a id="b11"></a>

`getSession`은 특정 필터링, sorting때 poll데이터(UI용 데이터)를 변경하기 위한 Saga함수입니다.

역시 XHR(비동기) 요청을 해야하기 때문에 Saga함수를 이용하였습니다. 리덕스 스토어에 저장된 필터 조건을 이용하여 필터링된 새로운 response를 poll 스토어에 저장합니다.

```jsx
export function* getSession(action) {
  yield put({ type: TOGGLE_POLL_STATUS });
  if (action.loader) yield put(toggleFliterLoader());
  const sessionKey = yield select(({ session }) => session.sessionKey);
  const filterOption = yield select(({ session }) => session.filterOption);
  const isDirect = yield select(({ session }) => session.isDirect);

  let newFilter = {
    ...filterOption
  };
  if (isDirect) {
    newFilter.stops = 0;
  }

  try {
    const { data } = yield call(
      SessionService.pollSession,
      sessionKey,
      newFilter
    );

    if (action.loader) yield put(toggleFliterLoader());
    yield put(setPollResult(data));
    yield put({ type: SET_TICKETS });
    yield put({ type: TOGGLE_POLL_STATUS });
  } catch (error) {
    console.error(error);
  }
}
```

<br/>

### filter 옵션  <a id="b12"></a>

#### stop filter  <a id="b13"></a>

![stops](https://user-images.githubusercontent.com/31315644/76090696-5bd1d980-5fff-11ea-8d46-afff41cedc4a.jpeg)

- 지역 상태를 만들고 리덕스의 상태에 따라 업데이트 하도록 설계하였습니다.
- 기존의 스카이스캐너에서는 직항, 1회경유, 2회경유 이상을 제공했지만 Rapid Api에서는 조건을 다르게 제공해서 Radio버튼식으로 구현하였습니다.
- 편도일 경우, 티켓 한장의 경유에 대한 최저가를 표시하였습니다.
- 왕복일 경우, 티켓 한장 중 출국,귀국에 대해서 직항이면 출귀국 모두 직항인 최저가를, 1회경유라면 출귀국 모두 1회경유인 최저가를 표시하였습니다.
- 경유가 모두일 때에는 직항, 최대 1회경유중 가장 적은 금액을 표시하였습니다.
- 최저가의 값은 소수점은 버린 후 1000원단위로 콤마를 찍어서 표시하였습니다.

```jsx
const StopFilter = React.memo(({ session, setFilter }) => {
  const [drop, setDrop] = useState(true);
  const [stopLists, setStopLists] = useState([]);

  const getStops = useCallback(
    ({ Itineraries, Legs, Segments }) => {
      const DirectStopList = [];
      const OneOverStopList = [];
      for (let i = 0; i < Itineraries.length; i++) {
        ticketLists(Itineraries[i]);
        if (DirectStopList.length && OneOverStopList.length) break;
      }

      function ticketLists(itinerary) {
        const { PricingOptions, OutboundLegId, InboundLegId } = itinerary;

        // get Outbound Leg
        let OutboundLeg;
        Legs.forEach(leg => {
          if (leg.Directionality === 'Outbound' && leg.Id === OutboundLegId) {
            OutboundLeg = { ...leg };
          }
        });

        // get Outbound segments
        const OutboundSegments = [];
        OutboundLeg.SegmentIds.forEach(id => {
          OutboundSegments.push({ ...Segments[id] });
        });

        OutboundLeg.Segments = OutboundSegments;

        const ticket = {
          PricingOptions,
          OutboundLeg
        };

        // get Inbound Leg (왕복이라면)
        if (InboundLegId) {
          let InboundLeg;
          Legs.forEach(leg => {
            if (leg.Directionality === 'Inbound' && leg.Id === InboundLegId) {
              InboundLeg = { ...leg };
            }
          });

          const InboundSegments = [];
          InboundLeg.SegmentIds.forEach(id => {
            InboundSegments.push({ ...Segments[id] });
          });
          InboundLeg.Segments = InboundSegments;

          ticket.InboundLeg = InboundLeg;

          if (
            ticket.OutboundLeg.Stops.length === ticket.InboundLeg.Stops.length
          ) {
            if (ticket.OutboundLeg.Stops.length === 0) {
              if (DirectStopList.length === 0) DirectStopList.push(ticket);
            }
            if (ticket.OutboundLeg.Stops.length === 1) {
              if (OneOverStopList.length === 0) OneOverStopList.push(ticket);
            }
          }
        } else {
          if (ticket.OutboundLeg.Stops.length === 0) {
            if (DirectStopList.length === 0) DirectStopList.push(ticket);
          }
          if (ticket.OutboundLeg.Stops.length === 1) {
            if (OneOverStopList.length === 0) OneOverStopList.push(ticket);
          }
        }
      }

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      function allStopPrice() {
        if (DirectStopList.length > 0 && OneOverStopList.length > 0) {
          const OneOverPrice = OneOverStopList[0].PricingOptions[0].Price;
          const DirectPrice = DirectStopList[0].PricingOptions[0].Price;
          return OneOverPrice < DirectPrice
            ? `₩ ${numberWithCommas(Math.floor(OneOverPrice))}`
            : `₩ ${numberWithCommas(Math.floor(DirectPrice))}`;
        }
        if (DirectStopList.length > 0 && OneOverStopList.length === 0) {
          const DirectPrice = DirectStopList[0].PricingOptions[0].Price;
          return `₩ ${numberWithCommas(Math.floor(DirectPrice))}`;
        }
        if (DirectStopList.length === 0 && OneOverStopList.length > 0) {
          const OneOverPrice = OneOverStopList[0].PricingOptions[0].Price;
          return `₩ ${numberWithCommas(Math.floor(OneOverPrice))}`;
        }
        if (DirectStopList.length === 0 && OneOverStopList.length === 0) {
          if (Itineraries.length === 0) {
            return '없음';
          } else {
            return `₩ ${numberWithCommas(
              Math.floor(Itineraries[0].PricingOptions[0].Price)
            )}`;
          }
        }
        return '없음';
      }

      const stops = [
        {
          id: '직항',
          checked: session.filterOption.stops === 0 ? true : false,
          price:
            DirectStopList.length >= 1
              ? `₩ ${numberWithCommas(
                  Math.floor(DirectStopList[0].PricingOptions[0].Price)
                )}`
              : '없음',
          disabled: DirectStopList.length === 0 ? true : false
        },
        {
          id: '최대 1회 경유',
          checked: session.filterOption.stops === 1 ? true : false,
          price:
            OneOverStopList.length >= 1
              ? `₩ ${numberWithCommas(
                  Math.floor(OneOverStopList[0].PricingOptions[0].Price)
                )}`
              : '없음',
          disabled: OneOverStopList.length === 0 ? true : false
        },
        {
          id: '모두',
          checked: session.filterOption.stops === undefined ? true : false,
          price: allStopPrice(),
          disabled: false
        }
      ];

      return stops;
    },
    [session.filterOption.stops]
  );

  useEffect(() => {
    setStopLists(getStops(session.allResult));
  }, [getStops, session.allResult]);

  const onChange = stopList => {
    if (stopList.id === '직항') {
      setFilter({ ...session.filterOption, stops: 0 });
    }

    if (stopList.id === '최대 1회 경유') {
      setFilter({ ...session.filterOption, stops: 1 });
    }

    if (stopList.id === '모두') {
      const { stops, ...filterOption } = session.filterOption;
      setFilter({ ...filterOption });
    }
  };

  const switchDrop = () => {
    setDrop(!drop);
  };

  return (
		...
        <FilterWrapperDd>
          <FilterDropDiv drop={drop}>
            {stopLists.map(stopList => (
              <OptionHeader key={uuid.v4()} zero={stopList.disabled}>
                <StyleCheckBox
                  onChange={() => {
                    if (stopList.checked) return;
                    onChange(stopList);
                  }}
                  checked={stopList.checked}
                  disabled={stopList.disabled ? true : false}
                >
                  {stopList.id}
                </StyleCheckBox>
                <OptionContent zero={stopList.disabled}>
                  {stopList.price}
                </OptionContent>
              </OptionHeader>
            ))}
          </FilterDropDiv>
        </FilterWrapperDd>
    ...
  );
});

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  setFilter: filterOption => {
    dispatch(setFilterOption(filterOption));
    dispatch(pollSession(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StopFilter);
```

<br/>

#### Time filter  <a id="b14"></a>

![time](https://user-images.githubusercontent.com/31315644/76090698-5bd1d980-5fff-11ea-8875-e445cc14ec39.jpeg)

- 가는날 오는날 전부 초기상태가 오전 12시 ~ 오후 11시 59분으로 맞춰져 있습니다.
- 슬라이더 status를 기준으로 2%당 시간 30분으로 잡았고 최대는 100%가 아닌 98%로 놓음으로서 총 24시간을 구현하였습니다.
- 절반 상태인 12시가 될 경우 오전 -> 오후로 바뀌게끔 설정하였습니다.
- 그리고 제일 끝인 오후12시는 11시 59분으로 맨 앞은 오전 12시로 설정하였습니다.
- 한자리 숫자(0)으로 표기 되는 경유 강제로 '00'으로 붙게끔 조건을 두었습니다.

```jsx
const TimeFilter = ({ session, setFilterOption }) => {
  const [drop, setDrop] = useState(true);
  const [outBoundMinTime, setOutBoundMinTime] = useState('오전 12:00');
  const [outBoundMaxTime, setOutBoundMaxTime] = useState('오후 11:59');

  const [inBoundMinTime, setInBoundMinTime] = useState('오전 12:00');
  const [inBoundMaxTime, setInBoundMaxTime] = useState('오후 11:59');

  const getTime = (persent, day) => {
    if (day) {
      const time = persent * 15;
      let date = '';
      let hour = '0';
      let minute = '';
      if (time >= 750) {
        date = '오후';
      } else {
        date = '오전';
      }
      if (time >= 60) {
        hour = Math.floor(time / 60);
        minute = time % 60;
      } else {
        minute = time;
      }
      const answer = `${date} ${persent > 48 ? (hour = hour - 12) : hour}:${
        minute === 0 ? '00' : minute
      }`;
      if (persent === 48) {
        return '오후 12:00';
      }
      if (answer === '오전 0:00') {
        return '오전 12:00';
      } else {
        return answer;
      }
    } else {
      const time = persent * 15;
      let date = '';
      let hour = '';
      let minute = '';
      if (time < 750) {
        date = '오전';
      } else {
        date = '오후';
      }
      if (time >= 60) {
        hour = Math.floor(time / 60);
        minute = time % 60;
      } else {
        minute = time;
      }
      const answer = `${date} ${persent < 48 ? hour : hour - 12}:${
        minute === 0 ? '00' : minute
      }`;
      if (persent === 48) {
        return '오후 12:00';
      }
      if (answer === '오후 12:00') {
        return '오후 11:59';
      } else {
        return answer;
      }
    }
  };

  const parseString = data => {
    if (`${data}`.length === 1) {
      return `0${data}`;
    } else {
      return `${data}`;
    }
  };
  
  const slideAfterOutBoundChange = () => {
    const minHour = +(outBoundMinTime.substring(3, 5)[1] === ':'
      ? outBoundMinTime.substring(3, 4)
      : outBoundMinTime.substring(3, 5));
    const minMinute = outBoundMinTime.slice(-2);
    const maxHour = +(outBoundMaxTime.substring(3, 5)[1] === ':'
      ? outBoundMaxTime.substring(3, 4)
      : outBoundMaxTime.substring(3, 5));
    const maxMinute = outBoundMaxTime.slice(-2);
    const newFilterOption = {
      ...session.filterOption,
      outboundDepartStartTime:
        outBoundMinTime.substring(0, 2) === '오후'
          ? `${minHour + 12}:${minMinute}`
          : `${parseString(minHour)}:${minMinute}`,
      outboundDepartEndTime:
        outBoundMaxTime.substring(0, 2) === '오후'
          ? `${maxHour + 12}:${maxMinute}`
          : `${parseString(maxHour)}:${maxMinute}`
    };

    setFilterOption(newFilterOption);
  };

  const slideOutBoundChange = e => {
    setOutBoundMinTime(getTime(e[0], true));
    setOutBoundMaxTime(getTime(e[1], false));
  };

  const slideAfterInBoundChange = () => {
    const minHour = +(inBoundMinTime.substring(3, 5)[1] === ':'
      ? inBoundMinTime.substring(3, 4)
      : inBoundMinTime.substring(3, 5));
    const minMinute = inBoundMinTime.slice(-2);
    const maxHour = +(inBoundMaxTime.substring(3, 5)[1] === ':'
      ? inBoundMaxTime.substring(3, 4)
      : inBoundMinTime.substring(3, 5));
    const maxMinute = inBoundMaxTime.slice(-2);
    const newFilterOption = {
      ...session.filterOption,
      inboundDepartStartTime:
        inBoundMinTime.substring(0, 2) === '오후'
          ? `${minHour + 12 === 24 ? 23 : minHour + 12}:${minMinute}`
          : `${parseString(minHour)}:${minMinute}`,
      inboundDepartEndTime:
        inBoundMaxTime.substring(0, 2) === '오후'
          ? `${maxHour + 12 === 24 ? 23 : maxHour + 12}:${maxMinute}`
          : `${parseString(maxHour)}:${maxMinute}`
    };

    setFilterOption(newFilterOption);
  };

  const slideInBoundChange = e => {
    setInBoundMinTime(getTime(e[0], true));
    setInBoundMaxTime(getTime(e[1], false));
  };

  const switchDrop = () => {
    setDrop(!drop);
  };

  return (
    ...
          <FilterDropDiv drop={drop}>
            <OutBoundTimeDiv>
              <TimeHeader>가는날 출발 시간</TimeHeader>
              <TimeContent>{`${outBoundMinTime} - ${outBoundMaxTime}`}</TimeContent>
              <StyleSliderWrapper>
                <StyleSlider
                  onAfterChange={slideAfterOutBoundChange}
                  onChange={slideOutBoundChange}
                  range
                  step={2}
                  min={0}
                  max={96}
                  tooltipVisible={false}
                  defaultValue={[0, 100]}
                />
              </StyleSliderWrapper>
            </OutBoundTimeDiv>
            <InBoundTimeDiv>
              <TimeHeader>오는날 출발 시간</TimeHeader>
              <TimeContent>{`${inBoundMinTime} - ${inBoundMaxTime}`}</TimeContent>
              <StyleSliderWrapper>
                <StyleSlider
                  onAfterChange={slideAfterInBoundChange}
                  onChange={slideInBoundChange}
                  range
                  step={2}
                  min={0}
                  max={96}
                  tooltipVisible={false}
                  defaultValue={[0, 100]}
                />
              </StyleSliderWrapper>
            </InBoundTimeDiv>
          </FilterDropDiv>
      ...
  );
};

const maptStateToProps = state => ({
  session: state.session
});
const mapDispatchToProps = dispatch => ({
  setFilterOption: filterOption => {
    dispatch(setFilterOption(filterOption));
    dispatch(pollSession(true));
  }
});
export default connect(maptStateToProps, mapDispatchToProps)(TimeFilter);
```

<br/>

#### Carrier filter  <a id="b15"></a>

![carrier](https://user-images.githubusercontent.com/31315644/76090682-570d2580-5fff-11ea-9575-a11852da9d81.png)

- Carrier 리스트와 해당 Carrier에 맞는 최저가 Price를 구하는 로직을 구현하였습니다.
- 지역 상태를 두어 Redux의 filter옵션에 따라 지역상태가 바뀌게끔 설계하였습니다.
- 항공사 조합을 따로 만들지 않고 그냥 모든 항공사를 보여주도록 표기하였고 코드는 달라도 중복된 이름의 항공사의 경우 최저가가 낮은 항공사의 코드만 표시하였습니다.
- exClude 옵션을 이용하여 사용자가 선택 해제한 항공사는 exClude 리스트에 추가됩니다.
- 만약 모두 지우기를 선택하면 모든 항공사가 exClude리스트에 추가되고, 모두 선택을 누르면 모든 exClude리스트가 완전히 삭제됩니다.
- exClude는 문자열 형태로 코드와 코드 사이에 ';'을 넣어 구분합니다.
- exClude 처리는 정규표현식을 이용하여 해결하였습니다.
- 항공기별 최저가는 티켓의 가장 최저가 첫번째에서 선별해왔고 소수점은 버린 후 1000원단위로 콤마를 찍어서 표시하였습니다.
- 모두 선택인 상태일 경우, 모두 선택을 비활성화 / 모두 해제인 상태일 경우, 모두 지우기 비활성화 

```jsx
const CarrierFilter = React.memo(({ session, setFilter }) => {
  const [drop, setDrop] = useState(true);
  const [carrierLists, setCarrierLists] = useState([]);

  const getCarriers = useCallback(
    ({ Carriers, Itineraries, Legs, Segments }) => {
      const CarrierList = [];
      for (let i = 0; i < Itineraries.length; i++) {
        CarrierList.push(ticketLists(Itineraries[i]));
      }

      function getUniqueObjectArray(array) {
        return array.filter((item, i) => {
          return (
            array.findIndex((item2, j) => {
              return item.CarrierId === item2.CarrierId;
            }) === i
          );
        });
      }

      function predicate(key, value) {
        // key와 value를 기억하는 클로저를 반환
        return item => item[key] === value;
      }

      function ticketLists(itinerary) {
        const carrierPriceList = [];
        const { PricingOptions, OutboundLegId, InboundLegId } = itinerary;

        // get Outbound Leg
        let OutboundLeg;
        Legs.forEach(leg => {
          if (leg.Directionality === 'Outbound' && leg.Id === OutboundLegId) {
            OutboundLeg = { ...leg };
          }
        });

        // get Outbound segments
        const OutboundSegments = [];
        OutboundLeg.SegmentIds.forEach(id => {
          OutboundSegments.push({ ...Segments[id] });
        });

        OutboundLeg.Segments = OutboundSegments;

        const ticket = {
          PricingOptions,
          OutboundLeg,
        };

        // get Inbound Leg (왕복이라면)
        if (InboundLegId) {
          let InboundLeg;
          Legs.forEach(leg => {
            if (leg.Directionality === 'Inbound' && leg.Id === InboundLegId) {
              InboundLeg = { ...leg };
            }
          });

          const InboundSegments = [];
          InboundLeg.SegmentIds.forEach(id => {
            InboundSegments.push({ ...Segments[id] });
          });
          InboundLeg.Segments = InboundSegments;

          ticket.InboundLeg = InboundLeg;

          if (
            ticket.InboundLeg.Carriers[0] === ticket.OutboundLeg.Carriers[0]
          ) {
            carrierPriceList.push({
              Price: ticket.PricingOptions[0].Price,
              CarrierId: ticket.OutboundLeg.Carriers[0],
            });
            return carrierPriceList[0];
          }
        }
        carrierPriceList.push({
          Price: ticket.PricingOptions[0].Price,
          CarrierId: ticket.OutboundLeg.Carriers[0],
        });
        return carrierPriceList[0];
      }

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      const _carriers = getUniqueObjectArray(CarrierList);

      function inspectChecked(Carrier) {
        if (session.filterOption.excludeCarriers) {
          return session.filterOption.excludeCarriers.includes(Carrier.Code)
            ? false
            : true;
        } else {
          return true;
        }
      }

      const carriers = Carriers.map(Carrier => ({
        id: Carrier.Id,
        code: Carrier.Code,
        name: Carrier.Name,
        price:
          _carriers.findIndex(predicate('CarrierId', Carrier.Id)) !== -1 &&
          numberWithCommas(
            Math.floor(
              _carriers[_carriers.findIndex(predicate('CarrierId', Carrier.Id))]
                .Price,
            ),
          ),
        checked: inspectChecked(Carrier),
      }))
        .sort((a, b) => {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        })
        .filter(carrier => carrier.price !== false);

      return carriers;
    },
    [session.filterOption.excludeCarriers],
  );

  useEffect(() => {
    setCarrierLists(getCarriers(session.allResult));
  }, [getCarriers, session.allResult]);

  const onChange = carrierList => {
    if (carrierList.checked) {
      // true -> false 상황,
      setFilter({
        ...session.filterOption,
        excludeCarriers: session.filterOption.excludeCarriers
          ? `${session.filterOption.excludeCarriers};${carrierList.code}`
          : `${carrierList.code}`,
      });
    } else {
      // false -> true 상황,
      const reg = new RegExp(carrierList.code, 'g');
      const excludeCarrierList = session.filterOption.excludeCarriers
        .replace(reg, '') // 1. 해당 캐리어 코드를 exclude에서 제거한다.
        .replace(/[;]/g, '') // 2. 모든 특수문자를 제거한다.
        .replace(/(.{2})/g, '$1;');//3.2글자단위로 세미콜론을 찍어준다. 단, 마지막에도 ';'가 포함됨.

      if (excludeCarrierList.length <= 2) {
        const { excludeCarriers, ...filterOption } = session.filterOption;
        setFilter({
          ...filterOption,
        });
      } else {
        setFilter({
          ...session.filterOption,
          excludeCarriers: excludeCarrierList.substr(
            0,
            excludeCarrierList.length - 1,
          ), // 4. 마지막의 ';'을 제거
        });
      }
    }
  };

  const switchDrop = () => {
    setDrop(!drop);
  };

  const allSelect = () => {
    const { excludeCarriers, ...filterOption } = session.filterOption;
    setFilter({
      ...filterOption,
    });
  };

  const allRemove = () => {
    let allExcludeCarrier = '';
    carrierLists.forEach(
      carrierList =>
        (allExcludeCarrier = allExcludeCarrier + carrierList.code + ';'),
    );

    setFilter({
      ...session.filterOption,
      excludeCarriers: allExcludeCarrier.substr(
        0,
        allExcludeCarrier.length - 1,
      ),
    });
  };

  return (
    ...
          <FilterDropDiv drop={drop} allView={true}>
            <AllSelectOrRemoveDiv>
              <AllSelectBtn
                onClick={allSelect}
                disabled={
                  !carrierLists.some(
                    carrierList => carrierList.checked !== true,
                  )
                }
              >
                모두 선택
              </AllSelectBtn>
              |
              <AllRemoveBtn
                onClick={allRemove}
                disabled={
                  !carrierLists.some(
                    carrierList => carrierList.checked !== false,
                  )
                }
              >
                모두 지우기
              </AllRemoveBtn>
            </AllSelectOrRemoveDiv>
            {carrierLists.map(carrierList => (
              <OptionHeader key={uuid.v4()}>
                <StyleCheckBox
                  onChange={() => onChange(carrierList)}
                  checked={carrierList.checked}
                >
                  {carrierList.name}
                </StyleCheckBox>
                {console.log('test', carrierList.price)}
                <OptionContent> {`₩ ${carrierList.price}`} </OptionContent>
              </OptionHeader>
            ))}
          </FilterDropDiv>
          ...
  );
});

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  setFilter: filterOption => {
    dispatch(setFilterOption(filterOption));
    dispatch(pollSession(true));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CarrierFilter);
```

