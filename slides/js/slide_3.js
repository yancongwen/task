(function() {
  var current = 1
  var $imagesEl = $('#view3 > .images')
  var $images = $('#view3 > .images > img')
  var $dotsEl = $('#view3 .dots')
  var $leftBtn = $('#view3 .left-btn')
  var $rightBtn = $('#view3 .right-btn')
  var length = $images.length
  var timer = null

  makeFakeImages()
  bindEvents()
  setTimer()
  document.addEventListener('visibilitychange', function(e) {
    if (document.visibilityState == 'hidden') {
      clearTimer()
    } else {
      setTimer()
    }
  })


  function bindEvents(){
    $dotsEl.on('click', 'li', function(e){
      let $dot = $(e.currentTarget)
      let index = $dot.index() + 1
      goTo(index)
    })

    $leftBtn.on('click', function() {
      if (current === 1) {
        goTo(length)
      } else {
        goTo(current-1)
      }
    })
    $rightBtn.on('click', function() {
      if (current === length) {
        goTo(1)
      } else {
        goTo(current+1)
      }
    })

    $('#view3').on('mouseenter', function() {
      clearTimer()
    })
    $('#view3').on('mouseleave', function() {
      setTimer()
    })
  }

  function makeFakeImages() {
    var $firstCopy = $images.eq(0).clone(true)
    var $lastCopy = $images.eq($images.length - 1).clone(true)
    $imagesEl.append($firstCopy)
    $imagesEl.prepend($lastCopy)
  }

  function goTo(index) {
    if (index < 1 || index > length || index === current) {
      return
    }
    if (current === 1 && index === length) {
      // 从第一个跳转去最后一个
      $imagesEl.css({transform:'translateX(0)'}).
        one('transitionend', function(){
          $imagesEl.hide()
          $imagesEl.offset()
          // offset() 可以触发 re-layout，删掉这行会有 bug
          $imagesEl.css({transform:`translateX(-${length*100}%)`}).show()
        })
    } else if (current === length && index === 1) {
      // 从最后一个跳转去第一个
      $imagesEl.css({transform:`translateX(-${(length+1)*100}%)`}).
        one('transitionend', function(){
          $imagesEl.hide()
          $imagesEl.offset()
          $imagesEl.css({transform:'translateX(-100%)'}).show()
        })
    } else {
      $imagesEl.css({transform:`translateX(-${index*100}%)`})
    }
    current = index
    synchBtnAcitveState()
  }

  function synchBtnAcitveState() {
    $dotsEl.children('.active').removeClass('active')
    $dotsEl.children(`li:eq(${current-1})`).addClass('active')
  }

  function setTimer() {
    timer = setTimeout(function(){
      if (current === length) {
        goTo(1)
      } else {
        goTo(current+1)
      }
      setTimer()
    },3000)
  }

  function clearTimer() {
    clearTimeout(timer)
  }
})()