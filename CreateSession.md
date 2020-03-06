<img width="684" alt="CreateSession" src="https://user-images.githubusercontent.com/31315644/76084299-e95afc80-5ff2-11ea-9157-afd2cf2fd548.png" style="zoom:67%;" >

---------

# CreateSession 및  URL PATH 영역 

> 유효성 검사를 통과하면 티켓 데이터를 가져오기 위해 Session을 만듭니다.

## 목차

1. [Session의 필요성](#a1)

2. [Session 생성 및 티켓 발급 로직 ](#a2)

3. [항공권 검색 버튼 클릭](#a3)

4. [URL 변경 -> URL의 파라미터와 쿼리데이터를 이용해 Redux Store 초기화 -> dispatch](#a4)

   - [/src/pages/TicketResult.jsx](#a5)

   - [withPath - HOC(High Order Component)](#a6)

5. [Session 생성 -> Poll -> 티켓 발급](#a7)

----------

### Session의 필요성 <a id="a1"></a>

처음 skyscanner를 단순히 생각으로만 클론하려 했을 때는 버튼 클릭시 바로 티켓 페이지를 보여주는 것으로 생각했습니다. API 조사를 통해 이런식으로 바로 티켓을 보여주면 안되는 여러 이유를 알게되었습니다. 

1. 과도한 API요청을 막을 수 있습니다. 한번 생성된 세션은 10~15분정도 유지됩니다. 이는 재 검색할 때 세션을 또 만들 필요를 줄이고 Poll만 게속하면 되기 때문에 과도한 API요청을 막을 수 있습니다.
2. 세션을 만드는 즉시 서버측에서는 해당 API를 지속적으로 업데이트 하면서 데이터를 로드해옵니다. 그 동안 만들어진 세션에 대해서 `UpdatesComplete`가 될 때 까지 게속 poll을 해주어야만 합니다. 여기서 `UpdatesPending`일 때 사용자가 미리 티켓이나 항공편등을 볼 수 있는 편의성을 제공해줍니다.

<br/>

### Session 생성 및 티켓 발급 로직 <a id="a2"></a>

1. 항공권 검색 버튼 클릭 
2. URL 변경 -> URL의 파라미터와 쿼리데이터를 이용해 Redux Store 초기화 -> dispatch
3. Session 생성 -> Poll -> 티켓 발급

<br/>

### 항공권 검색 버튼 클릭  <a id="a3"></a>

```jsx
function SearchButton({ children, allInfo, createSession, setError }) {
  ...
  const create = () => {
  		...
    // 유효성 검사 이후 에러가 존재하지 않는다면 URL 이동
    if (errorLists.length >= 1) {
      setError(errorLists);
    } else {
      clearError();
      createSession(allInfo);
    }
  };

  return <button onClick={create}>{children}</button>;
}

...

const mapDispatchToProps = dispatch => ({
  createSession: allInfo => {
  	// 모든 에러를 지움.
    dispatch(clearError());
    // URL 생성하기 위한 변수들을 각각 정의 (값은 Redux Store를 통해 가져옴.)
    const originPlace = allInfo.places.inBoundId.toLowerCase();
    const originPlaceName = allInfo.places.inBoundName;
    const destinationPlace = allInfo.places.outBoundId.toLowerCase();
    const destinationPlaceName = allInfo.places.outBoundName;
    const tripType = allInfo.datepicker.tripType;
    const outboundDate = TicketService.convertDateToString(
      allInfo.datepicker.outboundDate
    );
    const inboundDate =
      allInfo.datepicker.inboundDate &&
      TicketService.convertDateToString(allInfo.datepicker.inboundDate);
    const adults = allInfo.passenger.adults;
    const children = allInfo.passenger.children.length;
    const childrenAge = allInfo.passenger.children.map(c => c.age).join('|');
    const infants = allInfo.passenger.children.filter(c => c.type === 'infant')
      .length;
    const cabinclass = allInfo.passenger.cabinClass;

    dispatch(
      push(
        `/transport/flights/${originPlace}/${destinationPlace}/${outboundDate}?inboundDate=${inboundDate}&tripType=${tripType}&adults=${adults}&children=${children}&childrenAge=${childrenAge}&infants=${infants}&cabinclass=${cabinclass}&originPlaceName=${originPlaceName}&destinationPlaceName=${destinationPlaceName}`
      )
    );

....
```

<br/>

### URL 변경 -> URL의 파라미터와 쿼리데이터를 이용해 Redux Store 초기화 -> dispatch <a id="a4"></a>

URL이 변경되면 App.js를 통해 라우팅이 됩니다. (TicketResult.jsx)

```jsx
// App.js
<Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path="/transport/flights/:originId/:destinationId/:outboundDate"
            component={TicketResult}
          />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
</Provider>
```

<br/>

#### /src/pages/TicketResult.jsx <a id="a5"></a>

TickrResult 페이지는 **withPath(HOC)**를 통해 관리되고 있습니다. 

```jsx
const TicketResult = () => (
  <>
    <HeaderContainer width="144rem" />
    <Main />
    <Footer />
    <Copyright />
  </>
);

export default withPath(TicketResult);
```

<br/>

#### withPath - HOC(High Order Component) <a id="a6"></a>

`withPath`에서는 URL을 통해 TicketResult 페이지에 접근시 ReduxStore가 비워져있다면 ReduxStore을 URL파라미터와 쿼리의 값을 이용하여 초기화하고 안비워져있다면 그대로 이용하기 위함으로 설계하였습니다. withPath에서 redux에게 dispatch를 여기서 하여 `session`을 만들어 줍니다.

```jsx
function withPath(Component) {
  function WrappedComponent(props) {
    const storePlaces = useSelector(state => state.places);
    const culture = useSelector(state => state.culture);
    const dispatch = useDispatch();

    useEffect(() => {
      const urlQuery = qs.parse(props.location.search);
      const places = {
        inBoundId: props.match.params.originId,
        inBoundName: urlQuery.originPlaceName,
        outBoundId: props.match.params.destinationId,
        outBoundName: urlQuery.destinationPlaceName
      };

      const datepicker = {
        tripType: urlQuery.tripType,
        outboundDate: new Date(props.match.params.outboundDate),
        inboundDate: urlQuery.inboundDate
          ? new Date(urlQuery.inboundDate)
          : null,
        prevInboundDate: null
      };

      const children = +urlQuery.children
        ? urlQuery.childrenAge.split('|').map((c, i) => ({
            id: i,
            age: c,
            type: c >= 2 ? 'child' : 'infant'
          }))
        : [];

      const passenger = {
        cabinClass: urlQuery.cabinclass,
        adults: +urlQuery.adults,
        children
      };
      // Query String
      const allInfo = {
        culture: culture,
        places: places,
        passenger: passenger,
        datepicker: datepicker
      };

      // createSession
      dispatch(createSession(allInfo));

      // reset ReduxStore
      if (storePlaces && storePlaces.inBoundId.length === 0) {
        dispatch(
          setPlace({
            PlaceId: places.inBoundId,
            PlaceName: places.inBoundName,
            type: 'inBound'
          })
        );
        dispatch(
          setPlace({
            PlaceId: places.outBoundId,
            PlaceName: places.outBoundName,
            type: 'outBound'
          })
        );
        dispatch(resetDate({ ...datepicker }));
        dispatch(resetPassenger({ ...passenger }));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match, props.location]);

    return <Component {...props} />;
  }

  WrappedComponent.displayName = `withPath(${Component.name})`;

  return WrappedComponent;
}

export default withPath;
```

<br/>

###  Session 생성 -> Poll -> 티켓 발급 <a id="a7"></a>

- `session`을 생성하자마자 `UpdatesComplete`가 날 때 까지 Poll을 해야만 합니다. 
-  while 반복문을 이용하여 `UpdatesComplete`가 날 때까지 만들어진 `session`의 `key`를 이용해 게속해서 요청을 합니다. 
- 요청을 게속해서 해야하기 때문에 Redux Saga 미들웨어로 비동기 처리를 하였습니다. 
- 업데이트가 꼬일 확률을 대비해 delay를 1500 설정하였습니다.

````jsx
// /src/redux/modules/session.js
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

     ....
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
````

