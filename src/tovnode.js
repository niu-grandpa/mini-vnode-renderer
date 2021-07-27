import vnode from './vnode.js';

/**
 * @param {Element} elm
 */
export default function toVnode(elm) {
    const tag = elm.tagName.toLowerCase();
    const id = elm.id;
    const klass = elm.className;
    const idObj = {};
    const clsObj = {};

    createToKey(id, idObj);
    createToKey(klass, clsObj);

    return vnode(tag, { id: idObj, class: clsObj }, undefined, undefined, elm);
}

/**
 * 1.将获取的id和class字符串切割为数组
 * 2.遍历数组并将每一项作为key设置到对应对象里
 */
function createToKey(str, obj) {
    let i, arr, key;
    if (str !== '') {
        arr = str.split('');
        for (i = 0; i < arr.length; i++) {
            key = arr[i];
            obj[key] = true;
        }
    }
}