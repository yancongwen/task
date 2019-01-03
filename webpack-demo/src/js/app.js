import func1 from './module-1'
import func2 from './module-2'
import _ from 'lodash'
import '../css/style.scss'


func1()
func2()

function component() {
	let element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    return element
}
document.body.appendChild(component())
