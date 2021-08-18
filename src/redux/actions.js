import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TEXT,
    CHANGE_TITLE,
    RESIZE_TABLE,
    SAVE_DATE
} from './types'

export function tableResize(data) {
    return {
        type: RESIZE_TABLE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data,
    }
}
export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data,
    }
}
export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data,
    }
}
export function applyStyles(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}
export function saveDate() {
    return {type: SAVE_DATE}
}