# HTML5 Canvas

## Reference

- [MDN Canvas API](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API)
- [Canvas Handbook](https://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html)

## Tip

- ctx 라는 붓 하나를 가지고 모든걸 그린다고 생각하면 편합니다.
- path 를 그리는 모든 행위는 beginPath() 로 시작하고, closePath() 로 끝내는게 예상치 못한 결과를 방지할 수 있습니다. (path 는 이전경로와 새로운 경로가 연결되어 그려지기 때문)

## transformation (변형) 에 영향을 받는 요소들 

- strokeStyle: 선의 색상을 설정합니다.
- fillStyle: 채우기의 색상을 설정합니다.
- globalAlpha: 그리기의 전체적인 투명도를 설정합니다.
- lineWidth: 선의 두께를 설정합니다.
- lineCap: 선 끝 부분의 스타일을 설정합니다.
- lineJoin: 선의 연결 부분의 스타일을 설정합니다.
- miterLimit: 선의 모서리 부분의 최대 길이를 설정합니다.
- lineDashOffset: 선의 대시 패턴의 시작 위치를 설정합니다.
- shadowOffsetX: 그림자의 가로 위치 오프셋을 설정합니다.
- shadowOffsetY: 그림자의 세로 위치 오프셋을 설정합니다.
- shadowBlur: 그림자의 흐림 정도를 설정합니다.
- shadowColor: 그림자의 색상을 설정합니다.
- globalCompositeOperation: 캔버스에 그림을 그릴 때 색상을 합성하는 방법을 설정합니다.
- font: 텍스트의 글꼴, 크기, 스타일을 설정합니다.
- textAlign: 텍스트의 가로 정렬을 설정합니다.
- textBaseline: 텍스트의 세로 정렬을 설정합니다.
- direction: 텍스트의 방향을 설정합니다.
- imageSmoothingEnabled: 이미지를 부드럽게 표시할지 여부를 설정합니다.
