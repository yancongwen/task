// 最简单无缝轮播，但是只能连续切换，无法实现跳转

(function() {
  var current = 1
  var timer = null
  init()
  setTimer()

  // 监听页面否切换，切换的话就停止轮播
  document.addEventListener('visibilitychange', function(e) {
    if (document.visibilityState == 'hidden') {
      clearTimer()
    } else {
      setTimer()
    }
  })

  function getImageElement(n) {
    return $(`#view2 > .images > img:nth-child(${getIndex(current)})`)
  }

  function getIndex(n) {
    n = n % 5
    n = (n === 0 ? 5 : n)
    return n
  }

  function init() {
    $(`#view2 > .images > img:nth-child(${current})`).addClass('current')
      .siblings().addClass('enter')
  }

  function makeCurrent($node) {
    return $node.removeClass('enter leave').addClass('current')
  }

  function makeLeave($node) {
    return $node.removeClass('enter current').addClass('leave')
  }

  function makeEnter($node) {
    return $node.removeClass('leave current').addClass('enter')
  }

  function setTimer() {
    timer = setTimeout(function() {
      makeLeave(getImageElement(current))
        .one('transitionend', function(e) {
          makeEnter($(e.currentTarget))
        })
      makeCurrent(getImageElement(++current))
      setTimer()
    }, 3000)
  }

  function clearTimer() {
    window.clearTimeout(timer)
  }
})()
