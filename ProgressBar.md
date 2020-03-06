![ProgressBar](https://user-images.githubusercontent.com/31315644/76087540-b5370a00-5ff9-11ea-8a1c-06ae79291a87.jpeg)

---------

# 프로그레스 바 - 검색 진행 상황 알림

> session의 상태를 UI로 표시

## 목차

1. ProgressBar 구현 로직
2. ProgressBar 퍼블리싱

-------------

### ProgressBar 구현 로직

프로그레스바는 poll한 데이터에 담겨져있는 `Agent`객체에 `UpdatesComplete`가 전부 됬는지를 판단합니다. (Poll 자체가 아닌 Agent 객체의 상태 입니다.)

Agent가 모두  `UpdatesComplete`상태라면 progressBar는 화면에서 제거 될 것이고, 아니라면 백분율 퍼센트로 계산하여 화면에 렌더링합니다.

프로그레스 퍼센트 비율을 Redux Store에 저장하여 어디서든 참조 가능하도록 합니다.

```jsx
// /src/redux/modules/session.js
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
```

<br/>

### ProgressBar 퍼블리싱

```jsx
<ProgressDiv>
	<Progress percent={session.progress} showInfo={false} /> 
</ProgressDiv>
```

`percent`속성에 위 로직에서 계산한 퍼센트를 대입합니다.

`Progress` 자체는 `antd`의 progress를 사용했기 때문에 실제 skyscanner처럼 보여지기 위해 커스텀 합니다.

```scss
export const ProgressDiv = styled.div.attrs({})`
  position: absolute;
  top: 3rem;
  width: 680px;

  .ant-progress-inner {
    background-color: rgb(215, 215, 225);
  }

  .ant-progress-bg {
    background-color: rgb(1, 102, 218);
    height: 6px !important;
  }
`;
```

