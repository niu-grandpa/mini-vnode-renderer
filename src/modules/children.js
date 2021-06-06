import { mount } from '../mount.js';
import { patch } from '../patch.js';

export function updateChildren(oldVnode, vnode) {
    const elem = (vnode.elem = oldVnode.elem);

    let oldCh = oldVnode.children,
        newCh = vnode.children,
        commonLength = 0,
        i = 0,
        len = 0;

    if (!Array.isArray(oldCh) && !Array.isArray(newCh)) {
        oldCh = String(oldCh);
        newCh = String(newCh);
        if (newCh !== oldCh) {
            elem.textContent = newCh;
        }
    } else {
        if (typeof newCh === 'string' && Array.isArray(oldCh)) {
            elem.innerHTML = '';
            elem.textContent = newCh;
        } else {
            elem.textContent = newCh;
        }
        if (typeof oldCh === 'string' && Array.isArray(newCh)) {
            elem.innerHTML = '';
            mount(newCh);
        }
        if (Array.isArray(oldCh) && Array.isArray(newCh)) {
            commonLength = Math.min(oldCh.length, newCh.length);
            for (i = 0; i < commonLength; i++) {
                patch(oldCh[i], newCh[i]);
            }
            if (newCh.length > oldCh.length) {
                for (i = 0, len = newCh.slice(oldCh.length); i < len; i++) {
                    mount(newCh[i]);
                }
            }
            if (newCh.length < oldCh.length) {
                for (i = 0, len = oldCh.slice(newCh.length); i < len; i++) {
                    elem.removeChild(oldCh[i]);
                }
            }
        }
    }
}