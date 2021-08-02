export function capitalize(listener) {
    if (typeof listener !== 'string') {
        return ''
    } else {
        return listener.charAt(0).toUpperCase() + listener.slice(1)
    }
}

export function range(start, end) {
    if (end < start) {
        [start, end] = [end, start]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => index + start)
}

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    } else {
        return localStorage.setItem(key, JSON.stringify(data))
    }
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function toDashCase(camel) {
    return camel.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
}

export function toInlineStyles(styles) {
    return Object.keys(styles).map(key => {
        return `${toDashCase(key)}: ${styles[key]}`
    }).join('; ')
}

export function debounce(fn, wait) {
    let timer
    return function(...args) {
        const later = () => {
            clearInterval(timer)
            // eslint-disable-next-line
            fn.apply(this, args)
        }
        clearInterval(timer)
        timer = setTimeout(later, wait)
    }
}