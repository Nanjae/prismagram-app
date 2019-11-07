# DevNote for "FullStack Development" with React and React-Native by JAEUK LEE a.k.a Nanjae

## 개발환경 구성

1. node.js
   - https://nodejs.org/ko/
   - 버전은 그냥 안정적인걸로 받자 => v10 이상이면 상관없음
   - 익숙해지면 최신 버전으로 해봐야지
2. npm or yarn
   - https://yarnpkg.com/lang/en/docs/install
   - 둘 중 하나만 있으면 되는데 npm은 node깔면 알아서 깔리고 yarn은 따로 깔아야 함
   - npm install yarn 보단 yarn 홈페이지에서 깔자 => 해본 결과 PATH 설정이 알아서 됨 => 매우 편함
   - 나는 yarn을 쓰는 편임
3. visual code
   - https://code.visualstudio.com/
   - 코드 에디터는 이게 젤 깔끔한거 같음 => 실은 extension 너무 많이 깔아버려서 이제 돌이킬 수 없음
4. git
   - 이제 git에 push 안해놓으면 로컬은 너무 불안해서 잠을 못잠
5. google chrome
   - 노코멘트
6. android studio or x-code
   - 앱 만들 때 테스트 용 => 그냥 여차하면 expo 써서 하지 뭐 => 지금은 window에서 하는 중이라 ios는 expo가 없인 못돌려봄
7. a lot of coffee
   - 개발시간 = 마신 커피 잔 수 => 난 라떼가 좋더라

## 백엔드 프로젝트 생성

1. github repository
   - git init 하고 여러가지 하는 것보다 그냥 애초에 github에서 만들고 clone 하는게 편함 => 개인취향
   - 만들 때 .gitignore node.js로 만들고 하자 => 안하면? node_modules 폴더도 전부 올리고 싶은거라 생각함 => 혹시 뭐 더 필요하면 스크립트 작성해서 추가 가능
   - 까먹고 안만들었으면 gitignore.io 사이트 가서 만들면 됨 => 만들어보면 조금 다른데 push하는데 전혀 지장없음
2. yarn init
   - 이건 그냥 package.json에 들어가는 설정이라고 해야하나? => 질문하는거 대부분 그냥 default로 두는데 몇개는 적어주는 편임
   - 하고나면 package.json에 프로젝트의 기본 정보들이 들어감 => 이 package.json은 내가 생각할때 정말 git을 위해 존재하는거 같음 => dependency 설명할 때 더 적어봄
   - 그리고 그냥 main은 지워버려도 됨 => index.js 안 쓰게 될 걸? 아마도?
3. dependency
   - https://yarnpkg.com/en/docs/dependency-types#toc-dev-dependencies
   - 어어어어엄청 중요한 포인트! 개념은 머리 속에 있으니 딱히 적지 않겠음 => 궁금하면 구글링 고고
   - yarn add [package-name] 으로 package.json이랑 yarn.lock에 원하는 패키지를 추가할 수 있음
   - git에 node_modules 폴더를 push하지 않아도 clone 한 후 yarn install 하게 되면 알아서 적힌대로 깔아주니까 너무 편함
   1. graphql-yoga
      - https://github.com/prisma-labs/graphql-yoga
      - yarn add graphql-yoga
      - graphql을 편하게 사용할 수 있게 만들어진 오픈소스 패키지인데 graphql server를 진짜 쉽고 편하게 사용할 수 있게 해줌 => 실은 그냥 graphql을 써보진 않아서 비교불가
   2. nodemon
      - https://nodemon.io/
      - yarn add nodemon -D
      - -D 혹은 --dev을 붙이면 그냥 dependency가 아니라 devDependency로 들어가게됨 => 코드가 실행되는 동안 필요한게 아니라 요기다 넣을예정
      - 이건 소스코드 작성 후 저장하면 자동으로 서버를 재시작해주는 패키지인데 있으면 따로 서버 껐다 켰다 안하고 알아서 해줌 => 매우 편함
   3. server.js
      - src 폴더에 생성
      - 다음 단계에서 쓰게됨
   4. package.json
      - 소스 추가
        "scripts": {
        "dev": "nodemon --exec babel-node src/server.js"
        }
      - 이건 패키지가 아니라 package.json에서 수정을 해야되는 순서임 => "dev" 말고 "start"로 쓰는 편인데 난 그냥 배웠던대로 "dev" 씀
      - 이제 yarn dev 해주면 "nodemon --exec babel-node src/server.js"이 실행되는거지
   5. nodemon.json
      - { "ext" : "js graphql" }
      - nodemon이 감시할 파일의 확장자를 지정해주자 => .js랑 .graphql 파일이 수정 될 때마다 서버를 재시작 해줄거야

## 백엔드 구성 GraphQL Server

1. dotenv
   - https://github.com/motdotla/dotenv
   - yarn add dotenv
   - 포트나 DB같은 정보를 저장할 환경변수 파일을 "외부"에 만들고 관리하려고 쓰게되는데 그 .env 파일을 읽기 위해 필요함
   - .env 파일은 오픈소스로 프로젝트 공개할 때 .gitignore를 통해 제외하면 안전함
2. .env
   - src 폴더에 생성 및 소스 추가
     PORT=4000
   - 모든 숨겨야할 설정 값들(key)을 .env에 추가하는 습관은 좋은거임
3. env.js
   - src 폴더에 생성 및 소스 추가
     import dotenv from "dotenv";
     import path from "path";
     dotenv.config({ path: path.resolve(\_\_dirname, ".env") });
4. server.js

   - 소스 추가
     import "./env";
     import { GraphQLServer } from "graphql-yoga";

     const PORT = process.env.PORT || 4000;

     const typeDefs = `type Query{ hello: String! }`;

     const resolvers = {
     Query: {
     hello: () => "Hi"
     }
     };

     const server = new GraphQLServer({ typeDefs, resolvers });

     server.start({ port: PORT }, () =>
     console.log(`Server running on http://localhost:${PORT}`)
     );

5. .babelrc
   - 파일 생성 및 소스 추가
     {
     "presets": ["@babel/preset-env"]
     }
   - bable 설정 파일인데 preset이랑 plugin 같은 걸 설정함
6. @babel/node
   - https://babeljs.io/docs/en/babel-node
   - yarn add @babel/node
   - babel CLI 도구 중 하나 => babel 명령줄 사용하게 해줌
7. @babel/preset-env
   - https://babeljs.io/docs/en/babel-preset-env
   - yarn add @babel/preset-env
   - babel preset 중 하나 => 호환되지 않는 상위 버전 언어의 코드를 transpile 해줌
8. @babel/core
   - https://babeljs.io/docs/en/babel-core
   - yarn add @babel/core
   - babel 핵심 파일 => 다른 babel 모듈들이 종속성을 가짐 => babel 사용하려면 명시적으로 추가해줘야 하는 건데 뭔지 잘 모르겠음
9. morgan

- https://alligator.io/nodejs/getting-started-morgan/
- yarn add morgan
- logger 미들웨어. 즉, 로깅 전용 모듈인데 => HTTP 서버에서 로그 기록 남기는 역할을 함 => 서버를 서버답게 만들어준달까

11. server.js

- 소스 추가
  import logger from "morgan"
  server.express.use(logger("dev"));

12. schema.js

- src 폴더에 생성
- api 폴더에 있는 graphql과 resolvers 파일을 합치는 역할

11. graphql-tools

- https://www.apollographql.com/docs/graphql-tools/
- yarn add graphql-tools
- JavaScript GraphQL schema를 만들기 위한 패키지

12. merge-graphql-schemas

- https://github.com/Urigo/merge-graphql-schema
- yarn add merge-graphql-schema
- schema를 구성할 query와 resolver를 합치기 위한 패키지

13. schema.js

- 소스 추가
  import path from "path";
  import { makeExecutableSchema } from "graphql-tools";
  import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

  const allTypes = fileLoader(path.join(**dirname, "/api/\*_/_.graphql"));
  const allResolvers = fileLoader(path.join(**dirname, "/api/\*_/_.js"));

  const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
  });

  export default schema;

14. folders and files for schema

- src/api/--/--/--.graphql => Query 소스 예제
  type Query {
  sayHello: String!
  }
- src/api/--/--/--.js => Resolver 소스 예제
  export default {
  Query: {
  sayHello: () => "Hello"
  }
  };
- src/schema.js => Query와 Resolver를 모아서 import함

15. server.js

- 소스 수정
  import schema from "./schema";
  const server = new GraphQLServer({ schema });
- 기존 typeDefs와 resolvers => schema
- 나중에 많은 query와 resolver가 생기면 관리하기 편할거 같음

## 백앤드 구성 Prisma

1. prisma
   - https://www.prisma.io
   - yarn add prisma
   - 앱에서 필요한 데이터모델을 graphql로 정의하게 만들어줌 => 거기다 서버랑 관리도구도 만들어 주는데? 이거 진짜 최고임 쓰다 놀랬음
   - yarn prisma login -k [key]로 로그인 해주면 웹에서 로그인 인증이 완료됨
   - yarn prisma init 으로 설정하고 => 일단은 Demo server로 시작해보자
   - yarn prisma deploy 해주면 끝! => 수정하고나서 서버에 적용하려면 써야함 => 출시하고 나면 자동업데이트 된다는데?
2. .gitignore
   - .gitignore에 generated 폴더 prisma.yml 파일은 .gitignore에 추가하도록 하자 => 안그럼 admin이랑 endpoint가 노출되서 맘대로 데이터 수정이 가능해버림
3. package.json
   - 소스 추가
     "deploy": "prisma deploy",
     "generate": "prisma generate",
     "prisma": "yarn run deploy && yarn run generate"
     "admin" : "prisma admin"
   - prisma 명령어 편하게 쓰려면 "scripts"에 추가하자 => generate는 generated/prisma-client 안에 prisma-schame.js 파일에 query를 갱신해주는 역할임
   - admin은 관리도구 browser 열어주는 용도 => endpoint 뒤에 \_admin 붙이면 되는데 바로 여는 링크 어딨는지 몰라서 doc 뒤져서 추가해놨음
4. models.graphql
   - src/api 안에 생성
   - datamodel.prisma 소스 복사 후 모든 directive = @... 삭제 => @... 들은 prisma 영역이라 grahql에서는 쓸 수가 없음
5. resolvers
   - api/[bigGroup]/[smallGroup]/[smallGroup.js&graphql] => graphql은 query, js는 resolver
   - resolver는 query에 맞게 데이터에 접근하는 함수! => 기능별로 쪼개서 만들고 불러다 쓰면 됨!
   1. resolvers with Prisma
      - import { prisma } from "../../../../generated/prisma-client";
      - prisma.function() 형태로 사용

## 프론트엔드 프로젝트 생성

1. npx create-react-app [projectName]
   - npx 없으면 깔고 저거 해주면 알아서 프로젝트 잘 만들어 준다
2. clean up src folder

   - src 폴더 안에 App.js랑 index.js만 두고 다 지워준다
   - public 폴더 안에 favicon.ico, index.html, manifest.json 빼고 다 지운다
   - App.js 소스 수정 및 src/Components 폴더로 이동
     import React from "react";
     import GlobalStyles from "../Styles/GlobalStyles";
     import { ThemeProvider } from "styled-components";

     export default () => (
     <ThemeProvider theme={Theme}>
     <GlobalStyles />
     </ThemeProvider>
     );

3. dependency
   1. graphql
      - query 언어~
   2. react-router-dom
      - react-router 모듈에 dom이 binding 되어있는 모듈 => date binding 해준다는 거임
   3. react-apollo-hooks
      - Apollo Client에서 GraphQL API를 호출할 수 있게 해주는 모듈
   4. react-helmet
      - head tag를 사용할 수 있게해줌 => title, base, meta 같은거
   5. react-toastify
      - https://www.npmjs.com/package/react-toastify
      - notification 기능을 쉽게 추가해줌
   6. apollo-boost
      - GraphQL Client 패키지
   7. styled-components
      - css 관련
   8. styled-reset
      - css 관련
   9. prop-types
      - data의 type으로 유효성 검사해줌

## 프론트엔드 구성

1. GlobalStyles and Theme
   - src/Styles 폴더 생성 => GlobalStyles.js, Theme.js 파일 생성
   - GlobalStyles.js
   - Theme.js => 공통으로 사용하는 색상이나 레이아웃 설정들을 저장해놓으면 편함
2. React Router
   - 화면 이동이 생길 경우 Routes 폴더 안에 생성한 각 화면으로 이동되도록 만들거임
   - src/Components 안의 Router.js에서 각 Routes path로 이동할 조건에 맞으면 이동시킴
   - src/Routes 안의 [pathName].js 파일에서 화면 구성을 함
   - 이렇게 하니까 보기도 좋고 관리하기도 편한거 같음
3. Apollo Client
   - 백엔드에서 만들어 놓은 GraphQL을 쓰기위해 사용
   1. Client.js
   - Client를 통해 GraphQL Server에 만들어진 resolver들 이용해 query에 맞는 데이터를 받는다고 보면 됨
   2. LocalState.js
      - LocalState란 App의 오프라인 상태에서 발생하는 건데 => 로그인 된 상태인지 아닌지 판단하는 용으로만 쓸거임
      - 실은 뭔지 잘 모르겠음 아직 => 해봐야 알듯
4. Hook Query

## 앱 프로젝트 생성

1. yarn global add expo-cli
2. expo init [project_name]
   - blank 생성 후 app 이름 설정
3. README.md 생성
4. git commit & create git repository
5. dependency
   1. styled-components
   2. react-navigation
   3. apollo-boost
   4. graphql
   5. react-apollo-hooks

## 앱 구성

1. dependency
   1. @expo/vector-icons
   2. expo install
      1. expo-font
      2. expo-asset
      - preload Assets 관련
   3. apollo-cache-persist
   4. apollo-cache-inmemory
      - preload Cache 관련
      - https://github.com/apollographql/apollo-cache-persist

## 앱 개발 시 유용한 정보

1. preload Assets
   - 앱에서 필요한 Assets을 미리 loading 해온 뒤 앱을 시작하는 방법
2. preload Cache
   - 새로운 데이터를 가져와 보여주기 전에 이전에 있던 cache 데이터를 먼저 보여주고 새로운 데이터가 load되면 보여주는 방법
   - apollo.js 파일에 apolloClientOptions을 가져와 client 구성
   - ApolloProvider
3. react-navigation-stack
   - react-navigation 4.x 부터 stackNavagition이 일로 빠져나옴

## 유용한 패키지들 or 사이트들

1. send mail
   1. ❌❌❌nodemailer & nodemailer-sendgrid-transport❌❌❌
      - https://nodemailer.com/about/
      - https://sendgrid.com/blog/sending-email-nodemailer-sendgrid/
      - yarn add nodemailer
      - yarn add nodemailer-sendgrid-transport
      - 메일 보낼때 사용 => sendgrid는 nodemailer에서 필요한 transport를 지원하는 모듈임
   2. ⭕⭕⭕@sendgrid/mail⭕⭕⭕
      - https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail
      - https://sendgrid.com
      - nodemailer-sendgrid-transport가 뭐 때문인지 제대로 동작 안하길래 다른거 찾아다 쓰는중
      - 이건 API_KEY를 발급받아서 사용하는거 => nodemailer 쓸 필요 없음 => spam으로 안가게 하려고 sendgrid 통해서 보내는거임
2. Random Word Generator
   - https://www.randomlists.com/random-words
   - 무작위 글자들을 생성해주는 사이트 => 대량으로 가능
3. passport & passport-jwt & jsonwebtoken
   - http://www.passportjs.org/
   - http://www.passportjs.org/packages/passport-jwt/
   - https://www.npmjs.com/package/jsonwebtoken
   - yarn add passport
   - yarn add passport-jwt
   - yarn add jsonwebtoken
   - 서명 인증을 위해 사용하자
   - passport는 인증 관련된 모든 일을 함 => 토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 저장해줌 => 토큰 해독해서 저장하는거임
   - passport-jwt는 jsonwebtoken을 해독해서 passport에 가져다주는 역할
   - jsonwebtoken은 jwt를 생성하기 위해 필요
   - 아니 진짜 얘넨 뭔지 너무 어렵다 => 3.4~3.6은 다시 쭉 보자
4. Random Keygen
   - https://randomkeygen.com/
   - 서명 등에 사용할 키조합을 랜덤으로 생성해주는 사이트 => CodeIgniter Encryption Keys 부분 키로 하는 가져오는 편
   - 정말 중요한 키인 경우가 99%이상이니 꼭 .env에 저장해주자
5. ColorZilla
   - web에서 색상 정보 가져오는 chrome 앱
6. Page Ruler Redux
   - 격자 재는 chrome 앱
7. react-autosize-textarea

## 유용한 정보들

1. middlewares.js
   - src폴더에 생성
   - 여러 코드에서 같이 쓰일 조건들을 middleware로 만들어 불러다 쓰면 편함 => 예를들어 인증받은 유저들만 사용할 기능에서
   - 중간에 불러다 쓰면 조건에 맞지않으면 그 뒤 코드들을 실행 안할거임
2. async & await
   - https://developers.google.com/web/fundamentals/primers/async-functions?hl=ko
   - https://developers.google.com/web/fundamentals/primers/promises?hl=ko
   - promise가 resolve될 때 까지 기다렸다가 return을 받으면 다음 promise를 실행한다 => 비동기 함수라고 하는데 콜백함수를 쓸 필요가 없고 가독성도 좋음
   - 그리고 기본 promise가 아닌 promise들을 안전하게 비동기 시킬 수 있다는데 아직 효과는 못 느낌
   - 소스의 마지막 줄이 return 할 값이라면 async와 await를 사용하지 않아도 자동으로 기다렸다 전달한다
3. relationship for Prisma
   1. fragments.js
      - src 폴더에 생성
      - 깊은 relationship이 필요한 경우 사용하면 됨 => 현재 prisma의 한계점인데 schema에 정의된 type 안에 연결된 다른 type에 접근하려면 필요함
      - prisma에서 깊은 관계들에 대해 접근하지 못하게 해놓은 이유는 무한루프로 인해 서버 다운을 방지하려는거 같음
      - 그래서 fragment를 만들어 더 깊은 관계로 들어갈 수 있도록 query를 보조해서 접근할 수 있음
   2. computed.js
      - 연관있는 api/folder에 생성 => 보통 folder.js로 만드는 편
      - 가끔씩 필요하게 될 resolver들을 만들어서 넣어서 관리하면 됨
      - api 안에 만들어진 resolver는 어차피 schema.js에서 통합시키므로 어디서든 불러다 쓸 수 있음
      - 이 resolver의 첫번째 인자는 parent로부터 받아서 씀
      - 깊은 relationship을 위해 fragment를 만들어서 접근하는 대신 computed resolvers를 만들어 쓰는게 더 깔끔함 => performance는 아직 모르겠음
      - 근데 가끔 어쩔 수 없이 fragment를 만들어야 하는 경우가 있는데 => 없앨 방법을 찾아보자
   3. @relation directive
      - https://www.prisma.io/docs/datamodel-and-migrations/datamodel-MYSQL-knul/#relations
      - 필요한게 있으면 찾아다 쓰자! => 왠만큼 필요한 건 다 있어서 쓸 줄만 알면 편한거 같음
