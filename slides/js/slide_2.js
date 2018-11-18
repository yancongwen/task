(function() {
  let current
  init()
  setInterval(() => {
    makeLeave(getImageElement(current))
      .one('transitionend', (e) => {
        makeEnter($(e.currentTarget))
      })
    makeCurrent(getImageElement(++current))
  }, 3000)

  function getImageElement(n) {
    return $(`#view2 > .images > img:nth-child(${getIndex(current)})`)
  }

  function getIndex(n) {
    n = n % 5
    n = (n === 0 ? 5 : n)
    return n
  }

  function init() {
    current = 1
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

})()