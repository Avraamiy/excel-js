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