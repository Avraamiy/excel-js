import {createToolbar} from './toolbar.template'
import {$} from '../../core/dom'
import {ExcelStateComponent} from '../../core/ExcelStateComponent'
import {defaultStyles} from '../../constanats'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'
    constructor($el, options) {
        super($el, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }
    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }
    toHTML() {
        return this.template
    }
    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'icon') {
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', value)
        }
    }
    storeChanged({currentStyles}) {
        this.setState(currentStyles)
    }
}