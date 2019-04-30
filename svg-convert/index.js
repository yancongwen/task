// 本脚本用于将 SVG 文件中 class 样式转为 svg 标签的内联样式

const path = require('path')
const fs = require('fs')
const filePath = path.join(__dirname, './')
const newPath = path.join(__dirname, './new/')

try {
  fs.mkdirSync(newPath)
} catch (e) {}

let svgFiles = fs.readdirSync(filePath).filter(item => {
  let index = item.lastIndexOf('.')
  let suffix = item.substring(index)
  return suffix === '.svg'
})

svgFiles.forEach(item => {
  fs.readFile(filePath + item, 'utf-8', function(err, data) {
    if (err) {
      throw new Error(err)
    } else {
      writeFile(item, convert(data))
    }
  })
})

function writeFile(fileName, str) {
  fs.writeFile(newPath + fileName, str, function(err) {
    if (err) {
      throw new Error(err)
    } else {
      console.log(fileName, 'convert success!')
    }
  })
}

function convert(str) {
  let styleStr = str.match(/<style>([\s\S]*)<\/style>/g)
  if (styleStr) {
    let classes = getClasses(styleStr[0])
    let result = str.replace(/class="([a-zA-Z0-9\-]*)"/g, function(match, p1) {
      if (classes[p1]) {
        return `style="${classes[p1]}"`
      } else {
        return ''
      }
    })
    return result
  } else {
    return str
  }
}

function getClasses(styleStr) {
  let classes = {}
  styleStr = styleStr.replace(/\s+/g, '')
  styleStr = styleStr.substring(7, styleStr.length - 8)
  let styles = styleStr.split('}.')
  styles.forEach(item => {
    item = item.split('}')[0]
    let keys = item.split('{')[0].split(',')
    let value = item.split('{')[1]
    keys.forEach(key => {
      if (key.indexOf('.') > -1) {
        key = key.substring(1)
      }
      if (classes[key]) {
        classes[key] = classes[key] + value
      } else {
        classes[key] = value
      }
    })
  })
  return classes
}
