import {DOMListener} from './DOMListener'

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.prepare()
    }

    prepare() {}
    // Return template component
    toHTML() {
        return ''
    }

    init() {
        this.initDomListener()
    }

    destroy() {
        this.removeDomListener()
        this.unsubscribers.forEach(unsub => unsub())
    }

    $emit(event, args) {
        this.emitter.emit(event, args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        this.store.subscribe(fn)
    }

    $getState() {
      return this.store.getState()
    }
    storeChanged() {}
    isWatching(key) {
        return this.subscribe.includes(key)
    }
}