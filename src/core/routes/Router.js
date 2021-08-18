import {$} from '../dom'
import {ActiveRoute} from './ActiveRoute'

export class Router {
    constructor(selector, routes) {
        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null
        this.pageChangeHandler = this.pageChangeHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.pageChangeHandler)
        this.pageChangeHandler()
    }

    destroy() {
        window.removeEventListener('hashchange', this.pageChangeHandler)
    }

    pageChangeHandler() {
        if (this.page) {
            this.page.destroy()
        }
        this.$placeholder.clear()

        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard
        this.page = new Page(ActiveRoute.param)
        this.$placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }
}