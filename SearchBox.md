![SearchBoxImg](https://user-images.githubusercontent.com/31315644/74633709-9507ee00-51a5-11ea-9ba8-95acd1c1e0e3.jpeg)

---------

# SearchBox 항공권(국가, 도시, 지역) 검색영역

> SkyPrinter 검색 영역 

## 목차

1. [SearchBox 폴더구조](#b1)

2. [Search API 알아보기 - List Places - ](#b2)

3. [Redux Module 파악하기](#b3)

   - [places module](#b4)

   - [PlacesContainer](#b5)

4. [SearchBox 컴포넌트 파악하기](#b6)

   - [상태 정리](#b7)

5. [결과](#b8)

   - [검색 리스트 불러오기 및 하이라이팅 처리](#b9)
   - [국가, 도시, 공항 기준 이미지 및 CSS 적용하기](#b10)

----------

### SearchBox 폴더 구조 <a id="b1"></a>

- index.jsx
- BoundSearchBox.jsx
- RenderPlaceList.jsx
- ParseWord.jsx
- BoundChangeBox.jsx
- CheckBox.jsx

<br/>

### Search API 알아보기 - List Places -<a id="b2"></a>

사용자 입력한 검색어를 통해 API를 호출하여 출발지와 도착지의 리스트를 보여줍니다. 

`country : 국가`
`language: 언어`
`area : 입력한 장소`
`isDestination : 출발지 도착지 여부`

```jsx
import axios from 'axios';

const SELECT_AREA_API_URL =
  'https://www.skyscanner.co.kr/g/autosuggest-flights';

export default class SearchService {
  static async SelectArea(country, language, area, isDestination) {
    return await axios.get(
      `${SELECT_AREA_API_URL}/${country}/${language}/${area}`,
      {
        isDestination: isDestination, // 출발지 도착지 여부
        enable_general_search_v2: true,
      },
    );
  }
}
```

![img](https://user-images.githubusercontent.com/32444914/74079428-b4eb3380-4a7a-11ea-8059-1bfca77820f3.PNG)

<br/>

### Redux Module 파악하기 <a id="b3"></a>

> 비동기 처리(유효성 검사)가 필요한 부분은 미들웨어(Redux Saga)로 처리를 하였습니다.

#### places module <a id="b4"></a>

```jsx
// src/redux/modules/places.jsx
import { takeEvery, put, select } from 'redux-saga/effects';
import { SET_ERROR } from './error';

// ACTIONS
export const SET_PLACE = 'skyprinter/places/SET_PLACE';
export const FETCH_PLACE = 'skyprinter/places/FETCH_PLACE';
export const SWITCH_PLACES = 'skyprinter/places/SWITCH_PLACES';
export const INITIALIZE_PLACES = 'skyprinter/places/INITIALIZE_PLACES';

// ACTION CREATORS
export const initializePlaces = () => ({
  type: INITIALIZE_PLACES
});
export const setPlace = places => ({ type: SET_PLACE, places });
export const switchPlaces = () => ({ type: SWITCH_PLACES });

export function* fetchPlaces(action) {
  const error = yield select(state => state.error);

  try {
    yield put({
      type: FETCH_PLACE,
      places: action.places
    });

    // 유효성 검사
    if (error.errorOccurred) {
      const places = yield select(state => state.places);
      let newErrors = error.errors;
      if (newErrors !== null) {
        if (places.inBoundId && places.outBoundId) {
          newErrors = newErrors.filter(e => e.type !== 'Incorrect places');
        }
        if (places.inBoundId !== places.outBoundId) {
          newErrors = newErrors.filter(e => e.type !== 'PlaceId is same');
        }
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

// ROOT SAGA
export function* placesSaga() {
  yield takeEvery(SET_PLACE, fetchPlaces);
}

// INIITIAL STATE
const initialState = {
  inBoundId: '',
  inBoundName: '',
  outBoundId: '',
  outBoundName: ''
};

// REDUCER
export default function places(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PLACES:
      return initialState;

    case FETCH_PLACE:
      const { places } = action;
      if (places.type === 'inBound') {
        return {
          inBoundId: places.PlaceId,
          inBoundName: places.PlaceName,
          outBoundId: state.outBoundId,
          outBoundName: state.outBoundName
        };
      } else {
        return {
          inBoundId: state.inBoundId,
          inBoundName: state.inBoundName,
          outBoundId: places.PlaceId,
          outBoundName: places.PlaceName
        };
      }
    case SWITCH_PLACES:
      return {
        inBoundId: state.outBoundId,
        inBoundName: state.outBoundName,
        outBoundId: state.inBoundId,
        outBoundName: state.inBoundName
      };
    default:
      return state;
  }
}
```

<br/>

#### PlacesContainer <a id="b5"></a>

> 컨테이너를 두어 리덕스의 상태와 액션들을 실제로 사용할 컴포넌트에게 전달해줍니다.

```jsx
// src/containers/PlacesContainer.jsx
import { connect } from 'react-redux';
import { switchPlaces, setPlace } from '../redux/modules/places';

import SearchBox from '../components/Main/SearchBox';

const mapStateToProps = state => {
  return {
    places: state.places,
  };
};

const mapDispatchToProps = dispatch => ({
  setPlace: places => {
    dispatch(setPlace(places));
  },
  switchPlaces: () => {
    dispatch(switchPlaces());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
```

<br/>

### SearchBox 컴포넌트 파악하기 <a id="b6"></a>

- [index.jsx](#a1)
  - [BoundSearchBox.jsx - 출발지](#a2)
    - [RenderPlaceList.jsx](#a3)
      - [ParsePlaceList.jsx](#a4)
  - [BoundChangeBox.jsx](#a5)
  - BoundSearchBox.jsx - 도착지 (출발지와 동일)
    - RenderPlaceList.jsx
      - ParseWord.jsx
    - CheckBox.jsx

#### 상태 정리 <a id="b7"></a>

##### index.jsx <a id="a1"></a>

- 선언한 상태

  ➤ **bound** → BoundSearchBox.jsx

  - 초기값 : 리덕스에는 Name, Id를 모두 저장합니다. Name만 지역 상태로 만든 이유는 `switch`한 결과를 props를 통해 내려주고  BoundSearchBox에서 라이브러리가 확인할 수 있게 하기 위함입니다.

    ```jsx
    const [bound, setBound] = useState({
      inBoundName: places.inBoundName,
      outBoundName: places.outBoundName,
    });
    ```
    
  - 상태 변경 함수 : **selectBound** → BoundSearchBox.jsx

    ```jsx
    const selectBound = (PlaceId, PlaceName, type) => {
        setPlace({ PlaceId, PlaceName, type }); // 컨테이너에서 전달받은 액션
      };
    ```
    
  - 상태 변경 함수 : **changeBound** → BoundChangeBox.jsx
  
    ```jsx
      const changeBound = () => {
        setBound({ // 컨테이너에서 전달받은 액션
          inBoundName: places.outBoundName,
          outBoundName: places.inBoundName,
        });
        switchPlaces(); // boundName을 서로 교환해줍니다.
      };
    ```

<br/>

##### BoundSearchBox (출발지/도착지)  <a id="a2"></a>

- 선언한 상태

  ➤ **suggestions** → RenderPlaceList.jsx

  - 초기값

    ```
    []
    ```

  - 상태 변경 함수 : **searchPlace** → BoundSearchBox.jsx

    ```jsx
    const searchPlace = async value => {
      try {
        const { data } = await SearchService.SelectArea(
          'KR',
          'ko-KR',
          value,
          isDestination,
        );
        setSuggestions(data);
      } catch (e) {
        console.error(e);
      }
    };
    ```

    <br/>

- 물려받은 상태 및 물려받은 상태 변경 함수

  ➤ index.jsx : **bound** , Fn: **selectBound** 

  <br/>

- 사용 서비스

  ➤ **SearchService**
  
- 사용 라이브러리

  ➤ **AutoSuggest**

- 키보드 접근성 엔터키 추가하기

  ```jsx
  const pressEnter = (e, type) => {
    if (e.keyCode === 13 && e.target.nodeName === 'INPUT') {
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      type === 'inBound'
        ? form.elements[index + 3].focus()
        : form.elements[index + 2].focus();
      e.preventDefault();
    }
  };
  ```

<br/>

##### RenderPlaceList  <a id="a3"></a>

- 선언한 상태

  없음

  <br/>

- 물려받은 상태 및 물려받은 상태 변경 함수

  ➤ BoundSearchBox.jsx : **suggestions** 
  
- 사용 라이브러리

  ➤ **dompurify** : 검색어 하이라이팅을 적용하기 위해서 사용하였습니다. 

  처음에는 for문을 반복해서 하이라이팅의 배열에 적혀있는 문자열을 파싱해오고 그 결과를 따로 저장해서 화면에 뿌려주는 방식을 채택했으나 비정상적으로 많은 반복문을 돌게 되면서 프로그램의 성능저하가 우려되 `dompurify`를 이용하여 `innerHTML`을 채택하는 방식을 사용했습니다. XSS스크립트 공격을 방지하면서 `dangerouslySetInnerHTML` 속성을 이용할 수 있습니다.

  ```jsx
  const sanitizer = dompurify.sanitize;
  const Result = ParsePlaceList(place, suggestion);
  ...
  <span
    dangerouslySetInnerHTML={{
    	__html: sanitizer(Result.CountryName),
  	}}
  />
  ```

<br/>

#### ParsePlaceList.jsx   <a id="a4"></a>

> `RenderPlaceList`에서 가져온 장소명을 하이라이팅 처리해주는 함수입니다
>
> 하이라이팅 처리가된 배열에게 `<strong></strong>` 태그를 앞 뒤로 삽입합니다.

```jsx
const ParsePlaceList = (place, suggestion) => {
  const Result = {};
  const insertTag = (highlightings, str) => {
    const starts = [];
    const ends = [];

    highlightings.forEach(highlighting => {
      starts.push(highlighting[0]);
      ends.push(highlighting[1]);
    });

    return str
      .split('')
      .map((chr, pos) => {
        if (starts.indexOf(pos) !== -1) chr = '<strong>' + chr;
        if (ends.indexOf(pos) !== -1) chr = '</strong>' + chr;
        return chr;
      })
      .join('');
  };

  const WordArray = insertTag(
    suggestion.Highlighting,
    suggestion.ResultingPhrase,
  );

  if (place === 'Country') {
    Result.CountryName = WordArray.split('|');
  } else {
    const ResultingArray = WordArray.split('|');
    Result.PlaceName = ResultingArray[0].includes(',')
      ? ResultingArray[0].split(',')[0].split('(')[0]
      : ResultingArray[0];
    Result.CountryName = ResultingArray[ResultingArray.length - 1];
  }

  return Result;
};

export default ParsePlaceList;
const ParsePlaceList = (place, suggestion) => {
  const Result = {};
  const insertTag = (highlightings, str) => {
    const starts = [];
    const ends = [];

    highlightings.forEach(highlighting => {
      starts.push(highlighting[0]);
      ends.push(highlighting[1]);
    });

    return str
      .split('')
      .map((chr, pos) => {
        if (starts.indexOf(pos) !== -1) chr = '<strong>' + chr;
        if (ends.indexOf(pos) !== -1) chr = '</strong>' + chr;
        return chr;
      })
      .join('');
  };

  const WordArray = insertTag(
    suggestion.Highlighting,
    suggestion.ResultingPhrase,
  );

  if (place === 'Country') {
    Result.CountryName = WordArray.split('|');
  } else {
    const ResultingArray = WordArray.split('|');
    Result.PlaceName = ResultingArray[0].includes(',')
      ? ResultingArray[0].split(',')[0].split('(')[0]
      : ResultingArray[0];
    Result.CountryName = ResultingArray[ResultingArray.length - 1];
  }

  return Result;
};

export default ParsePlaceList;

```

<br/>

##### BoundChangeBox.jsx  <a id="a5"></a>

- 선언한 상태 

  없음

  <br/>

-  물려받은 상태 및 물려받은 상태 변경 함수

  ➤ index.jsx : Fn: **changeBound** 

  ```jsx
  const changeBound = () => {
    if (!(bound.inBoundName || bound.outBoundName)) return;\
    setBound({
      inBoundId: bound.outBoundId,
      outBoundId: bound.inBoundId,
      inBoundName: bound.outBoundName,
      outBoundName: bound.inBoundName,
    });
  };
  ```

<br/>

### 결과 <a id="b8"></a>

#### 검색 리스트 불러오기 및 하이라이팅 처리 <a id="b9"></a>

- 입력한 내용에 따라 자동으로 리스트를 불러오기
- 입력한 내용에 맞춰 글자가 굵어지는 하이라이팅 처리
- 키보드 접근성 준수(화살표 방향키, Tab키, 엔터키)

![SearchList](https://user-images.githubusercontent.com/31315644/74634836-0f397200-51a8-11ea-80d2-6a7437d13bf3.jpeg)

<br/>

#### 국가, 도시, 공항 기준 이미지 및 CSS 적용하기 <a id="b10"></a>

- 국가는 깃발모양, 도시는 건물모양, 공항역은 비행기모양의 svg 이미지가 각각 렌더링 됩니다.

![SeparateCountry](https://user-images.githubusercontent.com/31315644/74635032-7fe08e80-51a8-11ea-95eb-ef8ad80502e1.jpeg)

```jsx
// src/components/Main/SearchBox/BoundSearchBox.jsx
// 도시 예
...
const CityName = useRef(null);
...
return (
   <RenderPlaceList
      place="AirStation"
      suggestion={suggestion}
      hasCity={suggestion.CityId === CityName.current}
   />
);
...
```

```jsx
// src/components/Main/SearchBox/RenderPlaceList.jsx

  switch (place) {
    case 'Country': {
      return (
        <ListSection>
					...
        </ListSection>
      );
    }
    case 'City': {
      return (
        <ListSection>
					...
        </ListSection>
      );
    }
    default: { // AirPort
      return (
        <ListSection hasCity={hasCity}>
 					...
        </ListSection>
      );
    }
  }
});

```

