---
name: Component Feature Issue
about: 컴포넌트 개발
title: ''
labels: ''
assignees: chhw130

---

# UI 컴포넌트 개발 체크리스트

## 기능 및 API 설계
- [x] 상태 관리: 컴포넌트가 가져야 할 상태(예: 열림/닫힘, 활성화/비활성화)를 명확히 정의했나요?
- [x] 콜백 함수: 상태 변경 시점이나 특정 이벤트 발생 시점에 실행될 콜백 함수(예: onOpen, onClose, onChange)를 제공하나요?
- [x] 유연한 슬롯(Slot) 제공: 컴포넌트의 특정 영역을 사용자가 원하는 대로 커스터마이징할 수 있도록 children이나 render props 같은 패턴을 활용했나요? (예: ModalHeader, ModalBody 등)
- [x] Props 네이밍: props의 이름이 직관적이고 일관성이 있나요?

## 접근성 (Accessibility - a11y)
- [ ] 키보드 네비게이션: 마우스 없이 키보드만으로 컴포넌트의 모든 기능을 사용할 수 있나요? (Tab, Shift+Tab, Enter, Space, 방향키 등)
- [ ] WAI-ARIA 속성: 컴포넌트의 역할(role), 상태(state), 속성(property)을 스크린 리더가 이해할 수 있도록 적절한 ARIA 속성(예: role="dialog", aria-expanded, aria-selected, aria-hidden)을 사용했나요?
- [ ] 시맨틱 HTML: 의미에 맞는 HTML 태그(예: <button>, <nav>)를 사용했나요?
- [ ] 콘텐츠 가시성: 스크린 리더 사용자나 키보드 사용자가 시각적으로 가려진 콘텐츠에 접근할 수 없도록 처리했나요?

## 스타일링 및 테마
- [ ] 스타일 캡슐화: 컴포넌트의 스타일이 다른 컴포넌트나 전역 스타일에 영향을 주지 않도록 CSS Modules, Styled Components, Tailwind CSS 등과 같은 기법을 사용했나요?
- [ ] 커스터마이징 용이성: 사용자가 컴포넌트의 스타일(색상, 폰트, 크기 등)을 쉽게 변경하거나 확장할 수 있나요? (CSS 변수, className prop 전달 등)

## 사용자 경험 (UX) 및 성능
- [ ] 애니메이션/트랜지션: 컴포넌트가 열리고 닫히거나 상태가 변경될 때 부드러운 시각적 효과를 제공하나요?
- [ ] 직관적인 동작: 사용자가 예상하는 대로 동작하나요? (예: 모달 외부 클릭 시 닫힘, Esc 키로 닫힘)
- [ ] 불필요한 리렌더링 방지: 컴포넌트와 부모 컴포넌트가 불필요하게 다시 렌더링되지 않도록 React.memo, useCallback 등을 적절히 사용했나요?
- [ ] 콘텐츠 처리: 컴포넌트 내부에 들어가는 콘텐츠의 양이 매우 많거나 적을 때도 자연스럽게 보이나요?

## 문서화 및 테스트
- [ ] 문서화: 다른 개발자가 컴포넌트를 쉽게 사용할 수 있도록 Props 목록, 사용 예시 등을 명확하게 문서화했나요? (Storybook, Styleguidist 등)
- [ ] 단위/통합 테스트: 컴포넌트의 각 기능이 의도대로 동작하는지 확인하는 테스트 코드를 작성했나요? (Jest, React Testing Library 등)
