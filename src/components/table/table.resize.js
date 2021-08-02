import {$} from '../../core/dom'

export function resizeHandler($root, event) {
   return new Promise(resolve => {
       const $resizer = $(event.target)
       const $parent = $resizer.closest('[data-type="resizable"]')
       const coords = $parent.getCoords()
       const type = $resizer.data.resize
       const index = type === 'col' ? $parent.data.col : $parent.data.row
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
           document.onmouseup = () => {
               $resizer.css({opacity: 0, right: 0, bottom: 0})
               if (type === 'col') {
                   $parent.css({width: value + 'px'})
                   $root.findAll(`[data-col='${index}']`)
                       .forEach(cell => cell.style.width = value + 'px')
               } else {
                   $parent.css({
                       height: value + 'px',
                   })
               }
               document.onmousemove = null
               document.onmouseup = null
               resolve({value, id: index, type})
           }
       }
   })
}
