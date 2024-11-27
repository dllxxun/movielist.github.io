# webproject2

## Movie List Web Application

넷플릭스 스타일의 영화 목록 웹 애플리케이션입니다.

### 주요 기능

- TMDB API를 활용한 영화 정보 검색
- 장르별 영화 필터링
- 평점 기반 영화 정렬
- 최근 검색어 저장 기능
- 위시리스트 관리
- 무한 스크롤
- 테이블/그리드 뷰 전환


### 기술 스택

- Frontend: Vue.js 3
- API: TMDB API
- 상태 관리: Vue Composition API
- 라우팅: Vue Router
- 스타일링: CSS

***
### 개발 가이드

#### 컴포넌트 작성 규칙
- 컴포넌트는 단일 책임 원칙을 따릅니다
- Props와 Emits를 명확히 정의합니다
- Composition API를 사용하여 로직을 구성합니다
#### 스타일 가이드
- CSS 클래스명은 BEM 방식을 따릅니다
- 컴포넌트별 스코프드 스타일을 사용합니다
#### API 통신
- API 호출은 api 폴더의 모듈을 통해 수행합니다
- 에러 처리를 항상 포함합니다

***
### 프로젝트 구조

movielist.github.io/
├── public/                 # 정적 파일
│   ├── favicon.ico
│   └── index.html
└── src/                    # 소스 코드
    ├── api/               # API 관련 파일
    │   └── tmdb.js       # TMDB API 연동
    ├── assets/           # 이미지, 스타일 등 자원
    │   ├── styles/      # CSS 파일
    │   └── logo.png     
    ├── components/       # 재사용 가능한 컴포넌트
    │   ├── InfiniteScrollView.vue
    │   ├── MovieList.vue
    │   └── TableView.vue
    ├── composables/      # 컴포지션 API
    │   ├── useFavorites.js
    │   └── useMovies.js
    ├── router/           # 라우팅 설정
    │   └── index.js
    ├── types/           # 타입 정의
    ├── views/           # 페이지 컴포넌트
    │   ├── MovieDetail.vue
    │   ├── PopularPage.vue
    │   ├── SearchPage.vue
    │   ├── SignIn.vue
    │   └── WishlistPage.vue
    ├── App.vue          # 루트 컴포넌트
    └── main.js          # 애플리케이션 진입점

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/dllxxun/movielist.github.io.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run serve