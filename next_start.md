# next start 스크립트의 실행 

package.json에 명시되어있는 “next start”가 어떻게 실행 되는지 알아보자

우선 해당 명령이 실행되는 파일은 ****[next.js >](https://github.com/vercel/next.js) [packages >](https://github.com/vercel/next.js/tree/canary/packages) [next >](https://github.com/vercel/next.js/tree/canary/packages/next) [cli](https://github.com/vercel/next.js/tree/canary/packages/next/cli) >next-start.ts 에서 찾을 수 있다.** 

전체 코드는 아래와 같다. 

```jsx
#!/usr/bin/env node

import arg from 'next/dist/compiled/arg/index.js'
import { startServer } from '../server/lib/start-server'
import { getPort, printAndExit } from '../server/lib/utils'
import * as Log from '../build/output/log'
import isError from '../lib/is-error'
import { getProjectDir } from '../lib/get-project-dir'
import { cliCommand } from '../lib/commands'

const nextStart: cliCommand = (argv) => {
  const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
    '--port': Number,
    '--hostname': String,
    '--keepAliveTimeout': Number,

    // Aliases
    '-h': '--help',
    '-p': '--port',
    '-H': '--hostname',
  }
  let args: arg.Result<arg.Spec>
  try {
    args = arg(validArgs, { argv })
  } catch (error) {
    if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
      return printAndExit(error.message, 1)
    }
    throw error
  }
  if (args['--help']) {
    console.log(`
      Description
        Starts the application in production mode.
        The application should be compiled with \`next build\` first.

      Usage
        $ next start <dir> -p <port>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        --port, -p      A port number on which to start the application
        --hostname, -H  Hostname on which to start the application (default: 0.0.0.0)
        --keepAliveTimeout  Max milliseconds to wait before closing inactive connections
        --help, -h      Displays this message
    `)
    process.exit(0)
  }

  const dir = getProjectDir(args._[0])
  const host = args['--hostname'] || '0.0.0.0'
  const port = getPort(args)

  const keepAliveTimeoutArg: number | undefined = args['--keepAliveTimeout']
  if (
    typeof keepAliveTimeoutArg !== 'undefined' &&
    (Number.isNaN(keepAliveTimeoutArg) ||
      !Number.isFinite(keepAliveTimeoutArg) ||
      keepAliveTimeoutArg < 0)
  ) {
    printAndExit(
      `Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`,
      1
    )
  }

  const keepAliveTimeout = keepAliveTimeoutArg
    ? Math.ceil(keepAliveTimeoutArg)
    : undefined

  startServer({
    dir,
    hostname: host,
    port,
    keepAliveTimeout,
  })
    .then(async (app) => {
      const appUrl = `http://${app.hostname}:${app.port}`
      Log.ready(`started server on ${host}:${app.port}, url: ${appUrl}`)
      await app.prepare()
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

export { nextStart }
```

# Start 명령어의 옵션 명시

```jsx
const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
    '--port': Number,
    '--hostname': String,
    '--keepAliveTimeout': Number,

    // Aliases
    '-h': '--help',
    '-p': '--port',
    '-H': '--hostname',
  }
```

가장먼저 `next start` 명령어에서 사용할 수 있는 옵션과 Aliases들을 정의해 놓았다. 

# 옵션에 대한 유효성 검사

```tsx
  let args: arg.Result<arg.Spec>
  try {
    args = arg(validArgs, { argv })
  } catch (error) {
    if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
      return printAndExit(error.message, 1)
    }
    throw error
  }

```

사용자가 입력한 옵션에 대한 유효성 검사를 실행하고, 실패시 Error를 던진다. 

isError 함수에 대한 코드는 “****[next.js >](https://github.com/vercel/next.js) [packages >](https://github.com/vercel/next.js/tree/canary/packages) [next >](https://github.com/vercel/next.js/tree/canary/packages/next) lib > is-error.ts**” 에서 확인 할 수 있다. 

```tsx
// '../lib/is-error'
export default function isError(err: unknown): err is NextError {
  return (
    typeof err === 'object' && err !== null && 'name' in err && 'message' in err
  )
}
```

printAndExit() “****[next.js](https://github.com/vercel/next.js)/[packages](https://github.com/vercel/next.js/tree/canary/packages)/[next](https://github.com/vercel/next.js/tree/canary/packages/next)/[server](https://github.com/vercel/next.js/tree/canary/packages/next/server)/[lib](https://github.com/vercel/next.js/tree/canary/packages/next/server/lib)/utils.ts**” 에서 확인 할 수 있다. 

```tsx
export function printAndExit(message: string, code = 1) {
  if (code === 0) {
    console.log(message)
  } else {
    console.error(message)
  }

  process.exit(code)
}
```

# help(—help, -h) 옵션의 경우

```tsx
  if (args['--help']) {
    console.log(`
      Description
        Starts the application in production mode.
        The application should be compiled with \`next build\` first.

      Usage
        $ next start <dir> -p <port>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        --port, -p      A port number on which to start the application
        --hostname, -H  Hostname on which to start the application (default: 0.0.0.0)
        --keepAliveTimeout  Max milliseconds to wait before closing inactive connections
        --help, -h      Displays this message
    `)
    process.exit(0)
  }
```

# 서버 실행

## 1. dir,host, port 설정

- getProjectDir을 통해 내 프로젝트의 경로를 가지고 온다.
- host와 port 그리고 keepAliveTimeoutArg의 경우 옵션으로 설정해준 값으로 설정하고 옵션으로 명시해준 값이 없다면 초기값으로 설정한다.

```tsx
  const dir = getProjectDir(args._[0])
  const host = args['--hostname'] || '0.0.0.0'
  const port = getPort(args)

```

## 2. keepAliveTimeoutdp 유효성 검사

keepAliveTimeout에 대한 사용자 입력이 유효한지 검사하고 그렇지 않을 경우 에러를 발생시킨다.

```tsx
 const keepAliveTimeoutArg: number | undefined = args['--keepAliveTimeout'] 
if (
    typeof keepAliveTimeoutArg !== 'undefined' &&
    (Number.isNaN(keepAliveTimeoutArg) ||
      !Number.isFinite(keepAliveTimeoutArg) ||
      keepAliveTimeoutArg < 0)
  ) {
    printAndExit(
      `Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`,
      1
    )
  }
```

## 3. 서버실행

dir, hostname, port, keepAliveTimeout이 유효값으로 판단될 경우 startServer함수를 호출해서 서버를 실행한다. 

```tsx
  startServer({
    dir,
    hostname: host,
    port,
    keepAliveTimeout,
  })
    .then(async (app) => {
      const appUrl = `http://${app.hostname}:${app.port}`
      Log.ready(`started server on ${host}:${app.port}, url: ${appUrl}`)
      await app.prepare()
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
```

### 3-1 startServer() 함수

startServer함수의 경우 “****[next.js](https://github.com/vercel/next.js)/[packages](https://github.com/vercel/next.js/tree/canary/packages)/[next](https://github.com/vercel/next.js/tree/canary/packages/next)/[server](https://github.com/vercel/next.js/tree/canary/packages/next/server)/[lib](https://github.com/vercel/next.js/tree/canary/packages/next/server/lib)/start-server.ts**” 경로에 위치한다.

- createServer 함수로 웹서버 객체를 생성한다.

```tsx
let requestHandler: RequestHandler

  const server = http.createServer((req, res) => {
    return requestHandler(req, res)
  })
```

- server.on()함수를 이용해 설정해준 server 옵션들을 이용해 웹서버를 실행시킨다.

```tsx
server.on('listening', () => {
      const addr = server.address()
      const hostname =
        !opts.hostname || opts.hostname === '0.0.0.0'
          ? 'localhost'
          : opts.hostname

      const app = next({
        ...opts,
        hostname,
        customServer: false,
        httpServer: server,
        port: addr && typeof addr === 'object' ? addr.port : port,
      })

      requestHandler = app.getRequestHandler()
      upgradeHandler = app.getUpgradeHandler()
      resolve(app)
    })

    server.listen(port, opts.hostname)
```
