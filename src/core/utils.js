export function capitalize(listener) {
    if (typeof listener !== 'string') {
        return ''
    } else {
        return listener.charAt(0).toUpperCase() + listener.slice(1)
    }
}