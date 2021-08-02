import {ExcelComponent} from '../../core/ExcelComponent'
import * as actions from '../../redux/actions'
import {$} from '../../core/dom'
import {defaultTitle} from '../../constanats'
import {debounce} from '../../core/utils'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        </div>
`
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(actions.changeTitle($target.text()))
    }
}