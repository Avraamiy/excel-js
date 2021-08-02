import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {isCell, matrix, nextSelector, shouldResize} from './table.function'
import {$} from '../../core/dom'
import {ExcelStateComponent} from '../../core/ExcelStateComponent'
import {TableSelection} from './TableSelection'
import * as actions from '../../redux/actions'
import {defaultStyles} from '../../constanats'
import {parse} from '../../core/parse'

export class Table extends ExcelStateComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    toHTML() {
        const state = this.$getState()
        return createTable(30, state)
    }

    init() {
        super.init()
        this.$on('formula:input', value => {
            console.log('parse', parse(value))
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', value => {
            const ids = this.selection.selectedIds
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyles({value, ids}))
        })

        this.selectCell(this.$root.find(`[data-id='0:0']`))
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        const data = await resizeHandler(this.$root, event)
        this.$dispatch(actions.tableResize(data))
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
                id: this.selection.current.id(),
                value
            }))
    }

    onInput(event) {
        const target = $(event.target)
        target.attr('data-value', target.text())
        this.updateTextInStore(target.text())
    }
}
