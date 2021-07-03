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
    }
}

