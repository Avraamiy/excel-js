import {DOMListener} from './DOMListener'

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
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
    }
}