# CSR (Client Side Rendering)

CSR이란 말 그대로 클라이언트사이드에서 렌더링 하는것을 의미 합니다.

## CSR 프로세스

1. 유저가 웹사이트에 요청을 보낸다. 
2. 브라우저는 HTML과 JS파일의 링크를 CDN을 통해서 전달받는다.
3. HTML과 JS파일을 다운받는다. 다운받는 동안 유저는 화면을 볼 수 없다.
4. 다운로드가 완료되면 JS가 실행되고, 데이터를 위한 API를 불러온다. 이 과정에서 유저는 placeHolder를보게된다. 
5. 서버에서 API요청에 대한 응답을 보내준다.
6. 서버에서부터 받아온 데이터를 placeHolder자리에 넣어준다. 이제부터 유저는 클라이언트와 상호작용할 수 있다. 

## 장점

- 후속 페이지 로드시간이 빠르다.
- 이미 스크립트가 캐싱된 경우 인터넷 없이도 해당 CSR 웹 어플리케이션을 실행할 수 있다.
- 서버를 호출할 때 마다 전체 UI를 다시 로드할 필요가 없다.

## 단점

- 초기 로드시간이 SSR에 비해 느리다. 
⇒최초 한번에 서버에서 전체 페이지를 로딩하여 보여주기 때문
- SEO에 친화적이지 않다.
- 브라우저가 페이지를 표시하기 전에 HTML 및 JS 파일을 다운로드하고 프레임워크를 실행하는 동안 사용자는 빈 페이지를 보게 됨으로 사용자 경험(UX)가 좋지 않다.

# SSR

Server Side Rendering의 약자로, 서버에서 렌더링 준비를 끝마치고 클라이언트에게 전달해주는 방식이다. 

## SSR 프로세스

1. 유저가 웹사이트에 요청을 보낸다.
2. 서버가 “Ready to Render” 즉시 렌더링 가능한 HTML파일을 만들어서 클라이언트에 전달해준다.
3. 브라우저가 JS파일을 다운로드 받는다.
4. JS 파일이 받아지는 동안 유저는 컨텐츠르 볼 순 있지만 상호 작용을 할 순 없다. (다운받는 동안 일어난 상호작용은 모두 기록해놓는다.)
5. 브라우저가 JS Framework를 실행시킨다.
6. 기록되었던 상호작용이 실행된다. 지금부터 클라이언트는 상호작용 가능하다. 

## 장점

- 초기 로딩이 빠르다
- CSR 처럼 빈 HTML을 받아오는게 아니기 때문에 SEO에 적합하다
- 클라이언트 부담이 CSR에 비해 덜하다.

## 단점

- 서버는 항상 각 요청이 올때마다 HTML파일을 생성하기 때문에 CDN 수준에서의 컨텐츠 캐시가 되지 않는다.
- 페이지 로드가 무겁다면 오히려 사용자 경험을 해칠 수 있다.

## 결론적으로 어떤것을 써야 하는가?

일반적으로 검색 엔진의 크롤러들은 데이터를 긁어올 떄 웹 페이지의 JS를 해석해 노출시킨다. 그렇기 때문에, 크롤링을 할 수 없는 시점에서는 검색 엔진에 데이터를 노출시키지 않는 것이다. 이는 상대적으로 운영하고 있는 서비스가 검색 엔진 서비스에 노출되는 것이 줄어든다는 것을 의미한다. 

CSR을 사용하면 View를 생성하기 위해 JS가 필요하다. 그 전까지는 빈페이지이기 때문에 View가 완성되지 않는다.View를 생성하기 전까지는 검색 엔진 크롤러의 데이터 수집이 제한적이기 때문에 상대적으로 검색 엔진이 이해하는 정보가 부족해 SEO에 유리하지 않다. 

반대로 SSR은 VIew를 서버에서 렌더링해 제공하기 때문에 상대적으로 SEO에 유리하다.
