# 원티드 **프리온보딩 프론트엔드 인턴십 사전 과제**

Wanted에서 진행하는 프리온보딩 프론트엔드 인턴십 사전 과제

---

## 배포 링크

https://wanted-pre-onboarding-frontend-jonghun0209.vercel.app/

---

## 프로젝트 실행 방법

레파지토리 클론

```bash
$ git clone https://github.com/JunJongHun/wanted-pre-onboarding-frontend.git
```

패키지 설치

```bash
$ npm install
```

애플리케이션 실행

```bash
$ npm start
```

---

## 구현 사항

### JWT 토큰을 사용 로그인, 회원가입 구현

 - 회원가입, 로그인 폼 작성 시 유효성 검사
   - **유효성 검사 : custom hook 구현**
 - 유효성 검사에 따른 버튼 활성화/비활성화
 - 로그인 여부에 따른 페이지 리다이렉트 처리
 - 에러 알림 처리

### TODO 기능 개발

- todo **컴포넌트 분리하여 재사용성 높임**

- memo, useCallback 훅을 사용, **불필요한 렌더링을 방지 -> 성능 최적화 구현**

- todo 추가, 삭제, 수정, 취소 시, **깜빡임 없게 구현 -> 사용자 경험 개선**
  - API 요청 후, 다시 리스트 API요청해서 업데이트 X -> 프론트 상태 업데이트 후, API 요청만 보내기 -> 새로고침 했을 때, 리스트 API요청 후 반영
  
### 회원 Todo List 렌더링 구현
- Todo 생성
  - 추가 버튼 눌렀을 때, todo 추가 구현
  
  - **빈 문자열 여부에 따른 추가 버튼 활성화/비활성화**
  
- TODO 수정
  - input형태로 변경하여 수정 및 취소 기능 구현
  
  - 수정 버튼 눌렀을 때, **input창에 focus 기능 추가**
  
  - 취소 버튼 눌렀을 때, 내용 초기화 및 수정모드 비활성화
  
- TODO 삭제
  - 삭제 버튼 눌었을 때, todo 삭제 기능 구현
  
- 체크박스 클릭 시, todo 완료 여부 구현

- todo 목록 눌렀을 시, 체크박스 체크 구현

### 기타
- **이미지 Layout Shift 방지 -> 사용자 경험 개선**

- 정적 타입 언어 Typescript을 사용
  - 컴파일 단계 에러 확인
  - 코드 자동완성

---

## Tech Stack

- React
- typescript
- axios
- react-router-dom
- tailwind

---

## 과제 링크

[https://github.com/walking-sunset/selection-task](https://github.com/walking-sunset/selection-task)

## API

[https://github.com/walking-sunset/selection-task#api](https://github.com/walking-sunset/selection-task#api)


