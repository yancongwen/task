var markdownText = `
# 自我介绍
姓名：江小白  
性别：男  
外观：英俊  
出生日期：1999年10月20日  
保质期：永久  
性格：简单、好色  
优点：便于携带、拿得出手  
缺点：魅力太大、能瞬间秒杀  
![](./img/person.jpg)

# 个人经历
- 15岁，爱好文学和音乐，作文大赛获奖无数，颇具创作才华的好少年。高一那年，两个女孩的出现，影响了我的一生，一个是夕雨，一个是小离。
- 25岁，毕业于西南大学中文系，毕业后在广告公司做过文案专员，后来转到杂志社，成为一名新人编辑，没有谈过恋爱，个性不温不火，为人简单踏实，做事认真负责。

# 联系方式
QQ: xxxxxxx  
Email: xxxxxxxx  
手机: xxxxxxx  
`

var code1 = `
/* 
 * 你好，我是江小白
 * 你不知道吧，我还会写代码了
 * 来让我给你秀一段
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 1rem;
  overflow: auto;
}
/* 代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个动画 */
#code{
  animation: breath 2s infinite alternate-reverse;
}

/* 下面来做个自我介绍 */
/* 来一张白纸 */
#code-wrapper{
  width: 50%; left: 0;
  position: fixed;
  height: 100%;
}
#paper > .content {
 display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var code2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`

var code3 = `
/*
 * Show time is over!
 * Thanks!
 */
`

/*把code写到#code和style标签里*/
function writeCss(prefix, code, callback){
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix +  code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      callback && callback.call()
    }
  }, 20)
}

function writeMarkdown(markdown, callback){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      callback && callback.call()
    }
  }, 20)
}

function createPaper(fn){
  var paper = document.createElement('div') 
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(markdownText)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}

writeCss('', code1, ()=>{
  createPaper(() => {
    writeMarkdown(markdownText, ()=> {
      writeCss(code1, code2, ()=>{
        convertMarkdownToHtml(()=>{
          writeCss(code1 + code2, code3, ()=> {
            console.log('完成')
          })
        })
      })
    })
  })
})