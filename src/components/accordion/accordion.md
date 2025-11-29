# Accordion

## 1. 설명 (Description)

아코디언은 콘텐츠 섹션을 접거나 펼쳐서 보여줄 수 있는 컴포넌트입니다. 많은 양의 정보를 간결하게 표시해야 할 때 유용하게 사용할 수 있습니다.

## 2. 구성 (Composition)

아코디언 컴포넌트는 다음과 같은 하위 컴포넌트들로 구성됩니다.

- `Accordion`: 아코디언의 전체를 감싸는 루트 컨테이너입니다.
- `Accordion.Item`: 아코디언 내의 개별 섹션입니다. `Header`와 `Content`를 포함합니다.
- `Accordion.Header`: 클릭 가능한 영역으로, 콘텐츠의 가시성을 토글합니다.
- `Accordion.Content`: 펼쳐지거나 숨겨지는 콘텐츠 영역입니다.

## 3. Props

### Accordion

| Prop            | Type                              | Description                                                  |
| --------------- | --------------------------------- | ------------------------------------------------------------ |
| `children`      | `ReactNode`                       | `Accordion.Item` 컴포넌트들을 자식으로 가집니다. (필수)      |
| `onValueChange` | `(openIndexes: string[]) => void` | 열려있는 아이템이 변경될 때 호출되는 콜백 함수입니다. (선택) |
| `defaultValue`  | `string[]`                        | 기본적으로 열려있을 아이템들의 `value` 배열입니다. (선택)    |

### Accordion.Item

| Prop       | Type        | Description                                                            |
| ---------- | ----------- | ---------------------------------------------------------------------- |
| `children` | `ReactNode` | `Accordion.Header`와 `Accordion.Content`를 자식으로 가집니다. (필수)   |
| `value`    | `string`    | 아이템을 식별하는 고유한 값입니다. (필수)                              |
| `disabled` | `boolean`   | `true`로 설정하면 아이템이 비활성화되어 상호작용할 수 없습니다. (선택) |

### Accordion.Header

| Prop       | Type        | Description                        |
| ---------- | ----------- | ---------------------------------- |
| `children` | `ReactNode` | 헤더에 표시될 콘텐츠입니다. (필수) |

### Accordion.Content

| Prop       | Type        | Description                             |
| ---------- | ----------- | --------------------------------------- |
| `children` | `ReactNode` | 펼쳐졌을 때 보여질 콘텐츠입니다. (필수) |

## 4. 사용 예시 (Usage Example)

```tsx
import { Accordion } from './Accordion'

const MyAccordion = () => (
  <Accordion
    defaultValue={['item-1']}
    onValueChange={(values) => console.log(values)}
  >
    <Accordion.Item value="item-1">
      <Accordion.Header>이 컴포넌트는 접근성을 준수하나요?</Accordion.Header>
      <Accordion.Content>
        네. WAI-ARIA 디자인 패턴을 따르고 있으며, 시맨틱한 HTML 태그를 사용하여
        스크린 리더 사용자를 지원합니다.
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-2" disabled>
      <Accordion.Header>스타일은 어떻게 적용되어 있나요?</Accordion.Header>
      <Accordion.Content>
        CSS Modules를 사용하여 컴포넌트 스코프의 스타일을 적용하고 있습니다.
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-3">
      <Accordion.Header>애니메이션이 적용되어 있나요?</Accordion.Header>
      <Accordion.Content>
        네, 콘텐츠가 열리고 닫힐 때 부드러운 애니메이션 효과가 적용됩니다.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
)
```
