module.exports = function (params) {
  params.debug && console.log('[DEBUG ' + params.name + '] fn call')
  // Test condition, if true run the callback
  if (params.condition.test()) {
    params.debug && console.log('[DEBUG ' + params.name + '] condition test passed!')
    if (typeof params.condition.callback === 'function') {
      params.debug && console.log('[DEBUG ' + params.name + '] callback is fn, should call!')
      return params.condition.callback()
    }
  }
  // Keep trying as long it does not exceed max timeout
  params.time.start = typeof params.time.start === 'undefined' ||
                      isNaN(params.time.start) ? new Date().getTime() : params.time.start
  params.time.end = new Date().getTime()
  params.time.totalMs = params.time.end - params.time.start
  params.debug && console.log('[DEBUG ' + params.name + '] update params.time: ', params.time)
  if (params.time.totalMs < (params.time.maxMs || 40000)) {
    params.debug && console.log('[DEBUG ' + params.name + '] did not exceed total timeout')
    params.timeout = setTimeout(function () {
      clearTimeout(params.timeout)
      if (typeof params.stepCallback === 'function') {
        params.debug && console.log('[DEBUG ' + params.name + '] has a stepCallback and should call')
        params.setCallback()
      }
      params.debug && console.log('[DEBUG ' + params.name + '] should recall / recursive')
      module.exports(params)
    }, params.time.retryAfterMs || 1000)
  } else {
    params.debug && console.log('[DEBUG ' + params.name + '] timeout exceeded')
    if (typeof params.time.exceedMaxTimeCallback === 'function') {
      params.debug && console.log('[DEBUG ' + params.name + '] has exceedMaxTimeCallback and should call')
      params.time.exceedMaxTimeCallback()
    }
  }
}
