# Call Moe Dee

Yo! Ain't me who's gonna leave those calls in the WWW! Call-Moe-Dee (inspired by Kool Moe Dee, Wild Wild West song) is a helper function that makes timed recursive calls, if a given condition does not pass, repeatedly, over a period of time, until a condition is met! When the condition test passes, a callback function is called, terminating the timed recursive calls! Also, for each recursive or step in the call stack, there is a stepCallback callback function, if required. So, hell yeah! No mo' breakin' da neck guessing when you is able to make those goddam calls doug!

[![IMAGE ALT TEXT](http://img.youtube.com/vi/n_AMPcFym0Q/0.jpg)](http://www.youtube.com/watch?v=n_AMPcFym0Q "Kool Moe Dee - The Wild Wild West!")

### How to use

```
npm install call-moe-dee
```

Import it into your project like you do with your regular libraries

```
import callMoeDee from 'call-mode-dee'
```

or, that funky ol' school way brotha and sista

```
var callMoeDee = require('call-moe-dee')
```


Pass the parameters to `callMoeDee` do resolve once your condition is ready!

```
const params = {
  name: 'fnFoobar',
  time: {
    start: new Date().getTime(),
    end: 0,
    totalMs: 0,
    maxMs:10000,
    retryAfterMs: 1000,
    exceedMaxTimeCallback: () => {
      console.log('The caller exceedMaxTimeout!')
    }
  },
  condition: {
    test: () => (global && global.stop),
    callback: () => {
      console.log('Hello world!')
    }
  },
  debug: true
}

callMoeDee(params)
```

### Example

```
import callMoeDee from 'call-mode-dee'

// We'll modify this at a later stage
let global = {
  stop: false
}

// Initialize it
callMoeDee({
  name: 'My callMoeDee test', // for your convenience, to help debug, etc
  time: {
    maxMs: 10000, // if omitted, defaults to 40000ms
    retryAfterMs: 200, // if omitted, defaults to 1000ms
    exceedMaxTimeCallback: () => {
      console.log('The caller exceedMaxTimeout!')
    }
  },
  condition: {
    test: () => (global && global.stop),
    callback: () => {
      console.log('Hello world!')
    }
  },
  debug: true
})

// After some time we modify the global.stop property
setTimeout(() => {
  global.stop = true
  console.log('global.stop: ', global.stop)
}, 5000)
```