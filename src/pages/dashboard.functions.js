import {storage} from '../core/utils'

function toHtml(keys) {
    const tableRecords = keys.map(key => {
        const {title, openedDate} = storage(key)

        return `<li class="db__record">
                     <a href="#${key}">${title}</a>
                        <strong>
                        ${new Date(openedDate).toLocaleDateString()}
                        ${new Date(openedDate).toLocaleTimeString()}
                        </strong>
                 </li>`
    })
    return `<div class="db__list-header">
                <span>Name</span>
                <span>Opened Date</span>
            </div>
            <ul class="db__list">
            ${tableRecords.join('')}</ul>`
}

function getAllKeys() {
    const keys = []
    for (let i = 0; localStorage.length > i; i++) {
        if (!localStorage.key(i).includes('excel')) {
            continue
        }
        keys.push(localStorage.key(i))
    }
    return keys
}

export function createTableRecords() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<p>you have not made any tables</p>`
    } else {
        return toHtml(keys)
    }
}

// 12.06.2021

