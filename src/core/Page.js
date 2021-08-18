export class Page {
    constructor(params) {
        this.params = params
    }
    getRoot() {
        throw Error('method getRoot must been implemented')
    }
    destroy() {}
    init() {}
    afterRender() {}
}