const Keys = {
    '0': ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    '1': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    '2': ['z', 'x', 'c', 'v', 'b', 'n', 'm']
}
// 图标默认url
const DefaultIconUrl = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
// 获取本地数据
let hash = getLocalStorage('hash')
if(!hash){
    hash = {
        'q': 'qq.com',
        'w': 'weibo.com',
        'e': 'ele.me',
        'r': 'renren.com',
        't': 'tianya.com',
        'y': 'yancongwen.cn',
        'u': 'uc.com',
        'i': 'iqiyi.com',
        'o': 'opera.com',
        'p': 'pinduoduo.com',
        'a': 'acfun.tv',
        's': 'sohu.com',
        'z': 'zhihu.com',
        'm': 'www.mcdonalds.com.cn'
    }
}

creatKeyboard()
// 监听键盘事件
document.onkeydown = function(event){
    if (hash[event.key]){
        window.open('http://' + hash[event.key], '_blank')
    }
}

// 根据数据创建键盘对应的DOM元素
function creatKeyboard(){
    let main = document.getElementById('main')
    for (index in Keys) {
        let rowEl = document.createElement('div')
        rowEl.className = 'row'
        Keys[index].forEach(function(key) {
            kbdEl = creatKbdEl(key)
            rowEl.appendChild(kbdEl)
        })
        main.appendChild(rowEl)
    }
}
// 创建kbd键盘元素
function creatKbdEl(key){
    let kbdEl = document.createElement('kbd')
    let textEl = creatTextEl(key)
    let iconEl = creatIconEl(key)
    let btnEl = creatBtnEl(key)
    kbdEl.appendChild(textEl)
    kbdEl.appendChild(iconEl)
    kbdEl.appendChild(btnEl)
    return kbdEl
}
// 创建字母文本元素
function creatTextEl(key){
    let textEl = document.createElement('span')
    // textEl.innerContent = key.toUpperCase()
    textEl.innerText = key.toUpperCase()
    return textEl
}
// 创建图标元素
function creatIconEl(key){
    let iconEl = document.createElement('img')
    iconEl.src = hash[key] ? ('https://' + hash[key] + '/favicon.ico') : DefaultIconUrl
    iconEl.onerror = function(){
        iconEl.src = DefaultIconUrl
    }
    return iconEl
}
// 创建编辑按钮元素
function creatBtnEl(key){
    let btnEl = document.createElement('button')
    btnEl.innerText = '编辑'
    btnEl.onclick = function(event){
        let newUrl = window.prompt('请输入网址：',hash[key])
        if (newUrl && newUrl !== hash[key]){
            hash[key] = newUrl
            let thisIconEl = event.target.previousSibling            
            thisIconEl.src = hash[key] ? ('https://' + hash[key] + '/favicon.ico') : DefaultIconUrl
            thisIconEl.onerror = function(){
                thisIconEl.src = DefaultIconUrl
            }
            window.localStorage.setItem('hash', JSON.stringify(hash))
        }
    }
    return btnEl
}

// 获取本地存储 localStorage 中的数据
function getLocalStorage(name){
    let data = JSON.parse(window.localStorage.getItem(name || 'null'))    
    return data
} 
