import {capitalize} from './utils'

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('Not provided $root for DOMListener')
        }
        this.$root = $root
        this.listners = listeners
    }

    initDomListener() {
        this.listners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                // eslint-disable-next-line max-len
                throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
    removeDomListener() {
        this.listners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}
function getMethodName(listener) {
    return 'on' + capitalize(listener)
}