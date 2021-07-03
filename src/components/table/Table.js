import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {isCell, matrix, nextSelector, shouldResize} from './table.function'
import {TableSelection} from './TableSelection'
import {$} from '../../core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        })
        this.prepare()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(30)
    }


    init() {
        super.init()
        this.$on('formula:input', (text) => {
            this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
                this.selection.current.focus()
        })
        const $cell = this.$root.find(`[data-id='0:0']`)
        this.selectCell($cell)
    }
    selectCell($cell) {
        this.$emit('table:select', $cell)
        this.selection.select($cell)
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter', 'Tab',
            'ArrowLeft', 'ArrowUp',
            'ArrowRight', 'ArrowDown']
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = nextSelector(key, id)
            this.selectCell(this.$root.find($next))
        }
    }
    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}
