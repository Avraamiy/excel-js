export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select(el) {
        this.clear()
        el.focus().addClass(TableSelection.className)
        this.current = el
        this.group.push(el)
    }

    selectGroup($cells) {
        this.clear()
        $cells.forEach($cell =>{
            $cell.addClass(TableSelection.className)
            this.group.push($cell)
        })
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }
    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
   get selectedIds() {
        return this.group.map($el => $el.id())
    }
}


