const CODES = {
    A: 65,
    Z: 90
}

function toCell(row, coll) {
    // const value = row + String.fromCharCode(CODES.A + coll)
    return `<div class="cell" contenteditable></div>`
}

function toColumn(content) {
    return `
        <div class="column">
            ${content}
        </div>
    `
}

function createRow(content = '', i) {
    return `
    <div class="row">
        <div class="row-info">${i ? i : ''}</div>
        <div class="row-data">${content}</div>
    </div>
    `
}

const toChar = (_, i) => {
    return String.fromCharCode(CODES.A + i)
}

export const createTable = (rowsCount = 15) => {
    const collCount = CODES.Z - CODES.A + 1
    const coll = new Array(collCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')
    // for (let i = CODES.A; i <= CODES.Z; i++) {
    //     coll.push(createColl(String.fromCharCode(i)))
    // }
    const rows = []
    rows.push(createRow(coll))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(collCount)
            .fill('')
            .map((_, index) => toCell(i + 1, index))
            .join('')
        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}