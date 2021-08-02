import {toInlineStyles} from '../../core/utils'
import {defaultStyles} from '../../constanats'
import {parse} from '../../core/parse';

const CODES = {
    A: 65,
    Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

const getWidth = (state, index) => {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}
const getHeight = (state, index) => {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
    return function(_, col) {
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        const value = state.dataState[id] ? state.dataState[id] : ''
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })

        return `<div class="cell"
                data-col="${col}" 
                data-type="cell"
                data-id="${id}"
                data-value="${value}"
                style="${styles}; width: ${width}"
                contenteditable
                >${parse(value)}</div>`
    }
}

function toColumn({col, content, width}) {
    return `
        <div class="column" 
             data-col="${col}" 
             data-type="resizable"
             style="width: ${width}">
                    ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content = '', i, state = {}) {
    const resize = i ? `<div class="row-resize" data-resize="row"></div>` : ''
    const height = getHeight(state, i)
    return `
        <div class="row"
             data-type="resizable"
             data-row="${i}"
             style="height: ${height}"
             >
        <div class="row-info">${i ? i : ''}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

const toChar = (_, i) => {
    return String.fromCharCode(CODES.A + i)
}

function withWidthFrom(colState) {
    return function(content, col) {
        return {
            col, content, width: getWidth(colState, col)
        }
    }
}

export const createTable = (rowsCount = 15, state = {}) => {
    const colCount = CODES.Z - CODES.A + 1
    const col = new Array(colCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state.colState))
        .map(toColumn)
        .join('')
    const rows = []
    rows.push(createRow(col))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colCount)
            .fill('')
            .map(toCell(row, state))
            .join('')
        rows.push(createRow(cells, row + 1, state.rowState))
    }

    return rows.join('')
}