const testsContext = require.context('./test/browser', true, /\.spec\.ts$/)
testsContext.keys().forEach(testsContext)
