import { setIdAndClass } from './class.js';
import { setDataSet } from './dataset.js';
import { setStyle } from './style.js';
import { setAttributes } from './attributes.js';
import { addEventListenrs } from './eventlisteners.js';

/**
 * 设置vnode的属性、事件监听、样式
 * @param {Element} elm
 * @param {object} data
 */
export function setModules(elm, data) {
    setIdAndClass(elm, data);
    setDataSet(elm, data);
    setStyle(elm, data);
    setAttributes(elm, data);
    addEventListenrs(elm, data);
}

/**
 * 更新vnode的属性、事件监听、样式
 * @param {object} oldVnode
 * @param {object} vnode
 */
export function updateModules(oldVnode, vnode) {
    //
}