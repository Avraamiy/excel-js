import {DOMListener} from './DOMListener'

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
    }

    // Return template component
    toHTML() {
        return ''
    }

    init() {
        this.initDomListener()
    }

    destroy() {
        this.removeDomListener()
        this.unsubscribers(unsub => unsub())
    }

    $emit(event, args) {
        this.emitter.emit(event, args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
}