import {$} from '../../core/dom'

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const index = $parent.data.col
    const type = $resizer.data.resize
    let value
    const sideProp = type === 'col' ? 'bottom' : 'right'
    $resizer.css({
        opacity: 1,
        [sideProp]: '-2000px'
    })
    document.onmousemove = (e) => {
        if (type === 'col') {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
        document.onmouseup = (e) => {
            $resizer.css({opacity: 0, right: 0, bottom: 0})
            if (type === 'col') {
                $parent.css({width: value + 'px'})
                $root.findAll(`[data-coll='${index}']`)
                    .forEach(cell => cell.style.width = value + 'px')
            } else {
                $parent.css({
                    height: value + 'px',
                    // backgroundColor: `rgba(243, 232, 123, .2`
                })
            }
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}
