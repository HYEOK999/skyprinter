![Thumbnail](https://user-images.githubusercontent.com/31315644/74083056-1f17ce80-4aa3-11ea-950a-371118f8f12a.png)

---

# Sky Printer

### **[Sky Scanner](https://www.skyscanner.co.kr/) 클론**

<br/>

### 1. 팀 소개

- 팀명 : **Skyprinter**
  - 팀원 : 김진현, 김재헌, 김준혁,

<br/>

### 2. 팀 주제

- [Sky Scanner](https://www.skyscanner.co.kr/) 메인페이지 및 검색 결과 페이지 클론

<br/>

### 3. 주제 선정 이유

- **Front :**

  [Sky Scanner ](https://www.skyscanner.com/)페이지 자체가 React로 구성되어 있고 적은 페이지에 선택한 조건에 따른 상호작용성이 높고, 반응형 페이지이기 때문에 HTML, CSS 적인 관점도 중요하지만 JavaScript, React등의 개발적인 요소를 활용하기에 매우 적합하다고 생각되었습니다.

- **Back :**

  현재 프로젝트를 진행함에 있어 팀원들이 Front-End 개발을 지향하고 있기 때문에 Back-End를 동시에 공부하기에는 어려울것 같다는 생각이 들었습니다. 따라서 공개 API를 이용하여 Back-End를 구축할 시간을 최대한 적게 줄이고자 하였습니다. Sky Scanner Api의 항공권에 대한 내용은 개발 학습에 있어 복잡성이 뛰어나고 요청 또한 무제한이기 때문에 결정하게 되었습니다.

<br/>

### 4. 프로젝트 요구 사항

- W3C에서 제공한 MarkUp Validation Service 에서 이상이 없을 것.
- 최대한 시멘틱 하게 작성.
- 여러 라이브러리 경험.
- Git flow를 사용하여 협업을 할 것.
- Git Convention을 최대한 지킬 것.
- SkyPrinter API 사용.
- 리액트 컴포넌트 간의 최적화.

<br/>

### 5. MVP

1. 실시간 항공권 검색 기능
3. 항공권 필터 기능
3. URL 공유 기능
4. 실제 티켓 구매 리다이렉트 

<br/>

### 6. API 및 문서 정리

1. [RapidAPISkyscanner-API-Documentation](./RapidAPISkyscanner-API-Documentation.md)
2. [Mainpage-Documentation & Use cases](./Mainpage-Use-cases-Documentation.md)
3. [SearchBox](./SearchBox.md)
4. [ErrorBox](./ErrorBox.md)
5. [CreateSession](./CreateSession.md)
6. [ProgressBar](./ProgressBar.md)
7. [FilterArea](./FilterArea.md)

<br/>

### 7. Flow Chart

![SkyPrinter_FlowChart](https://lh6.googleusercontent.com/ipfJkBFAPz8fCGGbsg0xHKXCzrO4xEWqSZ6q6Xfv5hHVmasoDh8pdb-Av8nr323ppoZKtkmyo2W1EVXhVAesH5FUVQh_tYlqBoOHih2n0-iq9n0l0dSynmkVRzZ_b5IzhDLLJr8I)

<br/>

### 8. Wire Frame

[**![SkyPrinter_WireFrame](https://lh3.googleusercontent.com/WRH_SsstNuVq0TJl6OMe13MTXtUQOZUwFEaLLlTDv3ZJWnkuACWxSNpo9Yi1AqaOWIk47pxJ1CJzSnEaOqYHiKtTaRabIWdJpbIm6r1lyqe7QF69Rt5lg4ogBi_Offd0fDMp03BN)**](https://ovenapp.io/view/oSsbyScwAhgp8XeIrhNJRkSI91XFCe1a/)

<br/>

### 9. 구현 일정

2020년 2월 1일 ~ 2020년 2월 28일 

![skyprinter-calendar](https://user-images.githubusercontent.com/31315644/75995588-01257880-5f40-11ea-8a1a-94afddb40337.jpeg)

`+` 2020년 2월 29일 ~ 2020년 3월 6일 : 추가작업 - URL Selec, Bug fix 등등

<br/>

### 10. 프로젝트 구현 영상 

[![skyprinter](https://user-images.githubusercontent.com/31315644/76073722-6bd8c180-5fdd-11ea-9bd4-cb3f959dbd92.jpeg)](https://youtu.be/V2R8Wd3nfpo)

**( 이미지 클릭 시 유튜브로 이동됩니다. )**

<br/>

### 11. 구현 사이트 바로가기

**해당 사이트는 AWS의 S3 버킷을 통해 배포되고 있습니다.** 

[<img width="800" alt="aws-skyprinter" src="https://user-images.githubusercontent.com/31315644/76089857-cda92380-5ffd-11ea-9bc7-f9776bdd909e.png">](http://hyeok999-skyprinter.s3-website.ap-northeast-2.amazonaws.com/)

**( 이미지 클릭 시 구현 사이트로 이동됩니다. )**

<br/>

-----------

### 맡은 구현 목록 

<img src="https://user-images.githubusercontent.com/31315644/76074111-308ac280-5fde-11ea-90e1-020fe0acbb22.jpeg" alt="picture" style="zoom:50%;" />

#### 김준혁

- 메인 페이지 전체적인 레이아웃 및 퍼블리싱
- 검색 영역 및 재검색 영역 퍼블리싱 및 기능 구현(재검색 기능 포함) ([SearchBox](./SearchBox.md) 참조)
- 검색 영역 페이지 에러 박스 퍼블리싱 및 검색에 대한 유효성 검사 기능 구현  ([ErrorBox](./ErrorBox.md) 참조)
- `session` 생성 기능, URL 공유 기능 ([CreateSession](./CreateSession.md) 참조)
- 프로그레스바 퍼블리싱 및 기능 구현  ([ProgressBar](./ProgressBar.md) 참조)
- 티켓 검색 결과 페이지 필터 영역 퍼블리싱 및 기능 구현  ([FilterArea](./FilterArea.md) 참조)

<br/>

#### 느낀점

- 실제로 사용되는 API 답게 복잡성이 높은 것을 느꼈습니다. 
- 사전조사(API, 실제 운영사이트의 퍼블리싱 및 기능)의 중요성을 크게 깨닫게 되었습니다.
- 사전조사 때는 구현방법이 전혀 생각이 안났지만 구현 해보면서 "어떻게 구현하지? "라는 의문점이 풀리기도 하였습니다.
- 검색 영역을 개발하면서 사용자의 경험(키보드접근성)이나 속도 측면을 크게 고려하면서, 개발도 중요하지만 최적화도 얼마나 중요한지 깨닫게 되었습니다.
- 변수, 함수 등등 모든 네이밍을 지을 때 생각하는 어려움이 있었습니다. 이유는 팀원은 3명이고 각자 이름짓는 컨벤션이 달랐기 때문이다.
- 위와 같은 이유로 개발 직전에 초기셋팅을 확실히 해두어야함을 느꼈습니다.(깃 컨벤션, 폴더구조 셋팅, 네이밍 컨벤션)
- 일정 조율을 확실히 하여 시간을 나누는 것에 대한 필요성을 느꼈습니다.
- 재사용성을 고려한 함수를 많이 만들어둘 경우 차후 개발이 훨씬 편리해짐을 크게 깨닫게 되었습니다.
- Redux Saga를 통한 비동기 처리에 대한 편리함을 크게 깨달았습니다.
- HOC를 통해 컴포넌트에 조건을 주어 내려줄 prop등을 결정하는 방법을 알게 되었습니다.
- React에 대해 자신감이 생겼습니다. React를 이용하여 반응형 페이지를 구축하는 방법을 알게되었습니다.
- React.memo 또는 useCallback을 이용한 최적화 방법을 알게되었습니다.