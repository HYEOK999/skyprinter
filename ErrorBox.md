![empty](https://user-images.githubusercontent.com/31315644/76080869-3a66f280-5feb-11ea-991e-7cca1f548216.jpg)

---------

# ErrorBox 영역 

> 유효성 검사 기능

<br/>

### [SkyPrinter 바로가기](https://github.com/HYEOK999/skyprinter)

<br/>

## 목차

1. [ErrorBox 가 열리는 조건](#a1)
   1. [출발지와 도착지가 같을 경우 & 출발지와 도착지가 비워있을 경우](#a2)
   2. [출발지 혹은 도착지에 국가단위의 나라명이 입력될 경우.](#a3)
   3. [좌석 등급 및 승객에서 유소아의 나이를 미 입력할 경우 & 성인수 보다 0~1살의 유소아가 더 많을 경우](#a4)
   4. [재검색 시 의존성 검사](#a5)
2. [유효성 검사 구현 위치](#a6)
3. [SearchButton.jsx](#a7)
4. [redux modules](#a8)
   - [places.js](#a9)
   - [passenger.js](#a10)

----------

### ErrorBox 가 열리는 조건 <a id="a1"></a>

실제 스카이 스캐너측에서도 `항공권 검색` 버튼을 클릭할 경우 빨간색 ErrorBox가 생겼습니다. 그전에는 출발지와 도착지를 같게 고르던 좌석등급 및 승객을 마구잡이로 조작하던 전혀 문제가 없었습니다. 

즉, 검색 버튼을 클릭함에 따라 유효성검사를 하여 에러유무를 판단하고 에러가 1개라도 있다면 ErrorBox가 열리게 됩니다.

조건은 다음과 같습니다.

#### 1. 출발지와 도착지가 같을 경우 & 출발지와 도착지가 비워있을 경우 <a id="a2"></a>

![empty](https://user-images.githubusercontent.com/31315644/76080869-3a66f280-5feb-11ea-991e-7cca1f548216.jpg)

<br/>

#### 2. 출발지 혹은 도착지에 국가단위의 나라명이 입력될 경우. (Browse Search를 구현한다면 제거해야함) <a id="a3"></a>

![country](https://user-images.githubusercontent.com/31315644/76080874-3f2ba680-5feb-11ea-8b72-e8b4f3ed34c7.jpg)

<br/>

#### 3. 좌석 등급 및 승객에서 유소아의 나이를 미 입력할 경우 & 성인수 보다 0~1살의 유소아가 더 많을 경우 <a id="a4"></a>

![normal](https://user-images.githubusercontent.com/31315644/76080875-405cd380-5feb-11ea-9f0f-b0faf5b1edf0.jpg)

<br/>

#### 4. 재검색 시 의존성 검사 <a id="a5"></a>

>  재검색할 때도 모든 에러를 표시할 수 있습니다.

![reSearchPage](https://user-images.githubusercontent.com/31315644/76080881-43f05a80-5feb-11ea-8735-91bb254cd655.jpeg)

<br/>

### 유효성 검사 구현 위치 <a id="a6"></a>

​	모든 유효성 검사는 항공권검색 버튼을 눌렀을 때, 즉,` SearchButton` 컴포넌트에서 1번, 각 `redux module`에서 1번 이렇게 총 2번을 검사합니다. 모든 에러는 Redux Store에 저장이 되고 2번 검사를 하는 이유는 `Errorbox`가 화면에 렌더링 후부터는 반응형으로 항공권검색을 누르지 않아도 에러에 해당되는 사항들을 해결할 수록 에러가 즉시 제거되기 때문입니다.

 따라서 

- `SearchButton` 컴포넌트 
- `redux module`

 에서 유효성 검사를 진행합니다.

첫 시작은 항상 `SearchButton` 컴포넌트 에서 이뤄어지고 여기서 유효성 검사를 통해 에러의 유무에 따라 `Errorbox`가 화면에 렌더링할 안할지 판단하며 에러가 존재한다면 `session`은 생성되지 않습니다. 

`redux module` 에서는 `Errorbox` 가 화면에 렌더링 되어있다면 에러에 대한 문제를 해결 즉시 에러가 필터링 되어 삭제되고 화면에 렌더링 됩니다.

<br/>

### SearchButton.jsx <a id="a7"></a>

위치 : src/components/Main/SearchButton.jsx

```jsx
...
function SearchButton({ children, allInfo, createSession, setError }) {
  // 에러 id를 순차적으로 증가해주는 함수
  const generatedId = useCallback(errorLists => {
    return Math.max(0, ...errorLists.map(errorList => errorList.id)) + 1;
  }, []);

	// 세션 생성 함수
  const create = () => {
    const errorLists = [];
    // 유효성 검사 : 출발지 혹은 도착지가 비워있을 경우 
    if (!allInfo.places.inBoundId || !allInfo.places.outBoundId) {
      errorLists.push({
        id: generatedId(errorLists),
        type: 'Incorrect places',
        message: '출발지 혹은 도착지를 입력해주세요.'
      });
    }

    // 유효성 검사 : 출발지 혹은 도착지가 같을 경우
    if (allInfo.places.inBoundId === allInfo.places.outBoundId) {
      errorLists.push({
        id: generatedId(errorLists),
        type: 'PlaceId is same',
        message: '출발지와 도착지가 같으면 검색이 불가능합니다.'
      });
    }

    // 유효성 검사 : 유/소아의 나이를 입력하지 않을 경우
    if (
      allInfo.passenger.children.filter(child => child.type === undefined)
        .length >= 1
    ) {
      errorLists.push({
        id: generatedId(errorLists),
        type: 'Age not selected',
        message: '모든 유/소아의 나이를 입력해주세요.'
      });
    }

		// 유효성 검사 : 0~1세의 유/소아의 수가 성인의 수 보다 많을 경우
    if (allInfo.passenger.children.filter(child => child.age < 2).length >= 2) {
      if (
        allInfo.passenger.adults <
        allInfo.passenger.children.filter(child => child.age < 2).length
      ) {
        errorLists.push({
          id: generatedId(errorLists),
          type: 'No matching adult',
          message: '성인 한 사람당 유/소아 1명(만 0 - 2세)만 허용됩니다.'
        });
      }
    }

		// 유효성 검사 : 출발지 혹은 도착지에 국가단위를 선택했을 경우
    if (
      allInfo.places.inBoundId.length === 2 ||
      allInfo.places.outBoundId.length === 2
    ) 
      errorLists.push({
        id: generatedId(errorLists),
        type: 'No Country',
        message: '실시간 항공권 검색은 도시 단위까지만 가능합니다.'
      });
    }

    if (errorLists.length >= 1) {
      setError(errorLists);
    } else {
      clearError();
      createSession(allInfo);
    }
  };

  return <button onClick={create}>{children}</button>;
}
....
```

<br/>

### redux modules <a id="a8"></a>

`SearchButton.jsx`에서 유효성 검사를 통해 에러가 발생이 되었다면 `Redux Store`의 에러 객체가 존재 할 것입니다. 에러가 존재한다면 화면에 errorbox가 렌더링 되었을 것이고 각 리덕스 모듈(places, passenger)에서는 `Redux Store`의 에러가 존재하므로 재차 유효성검사를 하여 문제가 해결될 시 비동기적으로 Redux Store의 에러를 필터할 것입니다. 따라서 Redux Saga를 이용해 미들웨어로 처리하여 UI의 상태를 반응형으로 처리하도록 설계하였습니다.

<br/>

#### places.js <a id="a9"></a>

위치 : src/redux/modules/places.js

```jsx
...

export function* fetchPlaces(action) {
  const error = yield select(state => state.error);

  try {
    yield put({
      type: FETCH_PLACE,
      places: action.places
    });

    if (error.errorOccurred) {
      const places = yield select(state => state.places);
      let newErrors = error.errors;
      // 리덕스 스토어에 에러가 존재할 경우
      if (newErrors !== null) {
        // 유효성 검사 : 출발지 혹은 도착지가 비워있을 경우 
        if (places.inBoundId && places.outBoundId) {
          newErrors = newErrors.filter(e => e.type !== 'Incorrect places');
        }
		    // 유효성 검사 : 출발지 혹은 도착지가 같을 경우
        if (places.inBoundId !== places.outBoundId) {
          newErrors = newErrors.filter(e => e.type !== 'PlaceId is same');
        }
        // 유효성 검사 : 출발지 혹은 도착지에 국가단위를 선택했을 경우
        if (places.inBoundId.length !== 2 && places.outBoundId.length !== 2) {
          newErrors = newErrors.filter(e => e.type !== 'No Country');
        }
        newErrors.length === 0 || newErrors === null
          ? yield put({ type: SET_ERROR, errors: null })
          : yield put({ type: SET_ERROR, errors: newErrors });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
...
```

<br/>

#### passenger.js <a id="a10"></a>

위치 : src/redux/modules/passenger.js

```jsx
...

export function* fetchChildAge(action) {
  try {
    yield put({
      type: FETCH_CHILD_AGE,
      id: action.id,
      age: action.age
    });
    const error = yield select(state => state.error);

    if (error.errorOccurred) {
      const passengerInfo = yield select(state => state.passenger);
      let newErrors = error.errors;
      if (newErrors !== null) {
        // 유효성 검사 : 0~1세의 유/소아의 수가 성인의 수 보다 많을 경우
        if (
          passengerInfo.children.filter(child => child.type === undefined)
            .length === 0
        ) {
          newErrors = newErrors.filter(e => e.type !== 'Age not selected');
        }
				// 유효성 검사 : 유/소아의 나이를 입력하지 않을 경우
        if (
          passengerInfo.adults >=
          passengerInfo.children.filter(child => child.age < 2).length
        ) {
          newErrors = newErrors.filter(e => e.type !== 'No matching adult');
        }

        newErrors.length === 0 || newErrors === null
          ? yield put({ type: SET_ERROR, errors: null })
          : yield put({ type: SET_ERROR, errors: newErrors });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchChildren(action) {
  try {
    yield put({
      type: FETCH_CHILDREN,
      mode: action.mode
    });
    const error = yield select(state => state.error);
		// 유효성 검사 : 유/소아의 나이를 입력하지 않을 경우, 유소아 탭에서 입력하지않고 그냥 탭을 닫아버릴 경우
    if (error.errorOccurred) {
      const passengerInfo = yield select(state => state.passenger);
      let newErrors = error.errors;
      if (
        passengerInfo.children.filter(child => child.type === undefined)
          .length === 0
      ) {
        newErrors = newErrors.filter(e => e.type !== 'Age not selected');
      } else if (passengerInfo.children.length === 0) {
        newErrors = newErrors.filter(e => e.type !== 'Age not selected');
      }
      newErrors.length === 0 || newErrors === null
        ? yield put({ type: SET_ERROR, errors: null })
        : yield put({ type: SET_ERROR, errors: newErrors });
    }
  } catch (error) {
    console.log(error);
  }
}

...
```

<br/>

