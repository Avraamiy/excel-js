import {ExcelComponent} from '../../core/ExcelComponent'
import * as actions from '../../redux/actions'
import {$} from '../../core/dom'
import {defaultTitle} from '../../constanats'
import {debounce} from '../../core/utils'
import {ActiveRoute} from '../../core/routes/ActiveRoute'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            subscribe: ['title'],
            ...options
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const value = this.store.getState().title || defaultTitle
        return `
            <input id="title" type="text" class="input" value="${value}" >
            <div>
                <div class="button" data-button="delete">
                    <i class="material-icons" data-button="delete">delete</i>
                </div>
                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div>
        </div>
`
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'delete') {
            // eslint-disable-next-line
            const decision = confirm('Are you sure you want to delete this table?')
            if (decision) {
                localStorage.removeItem(ActiveRoute.path)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(actions.changeTitle($target.text()))
    }
}