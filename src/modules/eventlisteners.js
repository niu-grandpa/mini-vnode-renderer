import { is } from './index.js';

/**
 * 为元素创建并添加事件监听器
 * @param {object} vnode
 * @param {HTMLElement} el
 * @param {string} key
 * @param {string} value
 */
export function createListener(vnode, el, name, value) {
    // onClick -> click
    const type = name.slice(2).toLowerCase();
    const listener = event => invokeHandler(value, vnode, event);
    el.addEventListener(type, event => listener(event), false);
}

export function updateEventListenrs(oldVnode, vnode) {
    const elem = (vnode.elem = oldVnode.elem);
    let i = 0,
        name = '',
        type = '',
        listener = '',
        oldListener = '',
        oldData = oldVnode.data,
        newData = vnode.data;

    for (name in newData) {
        if (name.startsWith('on')) {
            listener = newData[name];
            createListener(newData, elem, name, listener);
        }
    }
    for (name in oldData) {
        if (name.startsWith('on')) {
            oldListener = oldData[name];
            type = name.slice(2).toLowerCase();
            // 如果已经添加了事件但它不存在新 vnode 中，则移除该事件
            if (!(name in newData)) {
                if (is.array(oldListener)) {
                    for (i = 0; i < oldListener.length; i++) {
                        elem.removeEventListener(type, oldListener[i], false);
                    }
                } else {
                    elem.removeEventListener(type, oldListener, false);
                }
            }
        }
    }
}

/**
 * 重定向绑定的事件的 this 指向为当前上下文
 * @param {Function} handler
 * @param {object} vnode
 * @param {Event | undefined} event
 */
function invokeHandler(handler, vnode, event = undefined) {
    // vnode 中添加事件监听的key的类型可以是一个函数，也可以是一个数组且里面有一个或多个函数
    // example: onClick: fn | onClick: [fn1, fn2, ...]
    if (is.func(handler)) {
        handler.call(vnode, event, vnode);
    } else if (is.array(handler)) {
        for (let i = 0, len = handler.length; i < len; i++) {
            invokeHandler(handler[i], vnode, event);
        }
    }
}