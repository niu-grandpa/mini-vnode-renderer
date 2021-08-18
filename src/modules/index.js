import { setIdAndClass, update as updateIdAndClass } from './class.js';
import { setDataSet, update as updateDateset } from './dataset.js';
import { setStyle, update as updateStyle } from './style.js';
import { setAttributes, update as updateAttr } from './attributes.js';
import { addEventListenrs, update as updateEventListenrs } from './eventlisteners.js';

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
    updateIdAndClass(oldVnode, vnode);
    updateDateset(oldVnode, vnode);
    updateStyle(oldVnode, vnode);
    updateAttr(oldVnode, vnode);
    updateEventListenrs(oldVnode, vnode);
}