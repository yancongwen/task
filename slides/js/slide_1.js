// 最简单的轮播，无法实现无缝切换

(function() {
  var buttons = $('#view1 .dot')
  var length = buttons.length
  var timer
  var current = 0

  // 给按钮绑定点击事件
  for (var i = 0; i < length; i++) {
    $(buttons[i]).on('click', function(e) {
      $(e.target).siblings().removeClass('active')
      $(e.target).addClass('active')
      var index = $(e.target).index()
      var x = -index * 400
      current = index
      $('#view1 .images').css('transform', 'translateX(' + x + 'px)')
    })
  }

  // 设置定时器
  function setTimer() {
    timer = setTimeout(function() {
      current++
      $(buttons[current % length]).trigger("click")
      setTimer()
    }, 3000)
  }
  function clearTimer() {
    clearTimeout(timer)
  }

  // 向左向右按钮点击事件
  $('#view1 .left-btn').on('click', function() {
    current--
    if (current < 0) {
      current = length + current
    }
    $(buttons[current]).trigger("click")
  })
  $('#view1 .right-btn').on('click', function() {
    current++
    $(buttons[current % length]).trigger("click")
  })

  // 当鼠标划过图片停止自动播放
  $('.images').on('mouseenter', function() {
    clearTimer()
  })
  // 当鼠标划出图片开始播放
  $('.images').on('mouseleave', function() {
    setTimer()
  })
  // 当鼠标划过所有按钮时停止自动播放
  $('.btn').on('mouseenter', function() {
    clearTimer()
  })
  // 当鼠标划出所有按钮时开始播放
  $('.btn').on('mouseleave', function() {
    setTimer()
  })
  // 一加载页面就开始播放
  setTimer()

  // 监听页面是否切换，切换的话就停止轮播
  document.addEventListener('visibilitychange', function(e) {
    if (document.visibilityState == 'hidden') {
      clearTimer()
    } else {
      setTimer()
    }
  })
})()
