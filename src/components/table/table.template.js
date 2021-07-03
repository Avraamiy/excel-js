const CODES = {
    A: 65,
    Z: 90
}

function toCell(row) {
    return function(_, col) {
        return `<div class="cell"
                data-coll="${col}" 
                data-type="cell"
                data-id="${row}:${col}" 
                contenteditable
                ></div>`
    }
}

function toColumn(content, index) {
    // console.log('content', content)
    // const index = content.charCodeAt() - CODES.A
    return `
        <div class="column " 
                data-col="${index}" 
                data-type="resizable">
                    ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content = '', i) {
    const resize = i ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `
        <div class="row" data-type="resizable" >
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

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(collCount)
            .fill('')
            .map(toCell(row))
            .join('')
        rows.push(createRow(cells, row + 1))
    }

    return rows.join('')
}