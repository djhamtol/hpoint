# [H.Point](https://djhamtol.github.io/hpoint/)

>H.Point 웹사이트를 참고하여 제작한 클론 코딩 프로젝트입니다.<br>
언어 데이터를 담은 JSON을 jQuery 환경의 i18next와 연동해 일부 다국어를 지원했습니다.<br>
GSAP ScrollTrigger를 활용한 페이지별 인터랙션 구현에 집중했습니다.

## 🐹 담당

- 퍼블리싱 100%
- 쌓기 페이지

## 🛠️ 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat&logo=swiper&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=black)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat&logo=i18next&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=flat&logo=json&logoColor=white)

## ✨ 주요 포인트

- 반응형 웹 페이지 구현
- Swiper를 활용한 무한 루프 슬라이드 구현
- GSAP ScrollTrigger를 활용한 페이지별 인터랙션 구현
- i18next + jQuery + JSON 연동으로 다국어 지원

## 🔍 원본과 다른 점

| 구분 | 원본 | 클론 |
|---|---|---|
| 정렬 | `inline-block`, `float` 사용 | `flex` 지향 |
| 반응형 구현 순서 | PC 퍼스트 | 모바일 퍼스트 |
| 다국어 지원 | 언어마다 UI가 다른 새로운 뷰를 서버에서 불러오는 방식 | i18next + jQuery + JSON 연동<br>UI 구조가 동일한 부분만 언어 변경이 가능하도록 처리<br>(`.pcUtil`, `.mbUtil`, `.mbMenuArea` 부분) |
| 다국어 지원 - 모바일 메뉴 | 언어마다 UI가 다른 새로운 뷰를 서버에서 불러오는 방식 | 언어마다 메뉴 개수가 달라 i18next.t()로 JSON 메뉴 데이터를 조회<br>JavaScript에서 메뉴 요소를 동적으로 생성하여 렌더링 |
| `.part2~.part7`<br>스크롤 & 애니메이션 & JS | **스크롤**: `$(window).scrollTop()`, `offset().top` 사용<br>**애니메이션**: CSS `transition`, `transform`, `animation` 사용<br>**JS**: `for`, `eq()` 사용 | **스크롤**: GSAP ScrollTrigger 사용<br>**애니메이션**: `gsap.to()`, `gsap.timeline()` 사용<br>**JS**: `each()`, `switch`문 사용 |

## 🔍 문제 발생 및 해결

- **Swiper slide loop 버그 해결**
```js
slidesPerView: 'auto',
centeredSlides: true,
loop: true
```
위 세 가지 옵션을 함께 사용할 때 <mark>일부 카드가 표시되지 않거나 autoplay가 동작하지 않는 등의 문제가 발생했습니다.</mark>

처음에는 문제 해결에만 급급하여  loopAdditionalSlides 옵션 값 변경, observer 옵션, update() 등을 적용해보았지만 다른 버그를 발생 시킬 뿐 근본적인 문제는 해결되지 않았습니다.

그러다가 기능의 작동 원리를 파악해야겠다는 생각이 들었습니다.

loop는 원본 슬라이드를 기반으로 앞 뒤에 복제 슬라이드를 생성하여 무한 반복 시키는 기능입니다.

<mark>따라서 원본 슬라이드 개수가 충분하지 않으면 위치 계산이 불안정해질 수 있다고 판단했습니다.</mark>
```js
$('.playSwiper .swiper-wrapper').append($('.playSwiper .swiper-slide').clone());
```
위와 같이 JavaScript(jQuery)로 기존 슬라이드를 복제하여 원본 슬라이드 개수를 7개 → 14개로 늘렸습니다. 

슬라이드 개수 증가 후 loop 계산이 정상적으로 동작하여 오류가 해결되었습니다.

**✔ 결론:** 

**Swiper의 loop 기능은 원본 슬라이드 개수가 부족하면 위치 계산이 불안정해질 수 있습니다.**

**라이브러리를 사용할 때는 단순히 옵션을 적용하기보다 내부 동작 원리를 이해하고 문제의 근본적인 원인을 분석하는 과정이 중요하다고 느꼈습니다.**
