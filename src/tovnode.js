import vnode from './vnode.js';

/**
 * @param {Element} elm
 */
export default function toVnode(elm) {
    const tag = elm.tagName.toLowerCase();
    const id = elm.id;
    const klass = elm.className;

    return vnode(
        tag, { id: createKeyMap(id), class: createKeyMap(klass) },
        undefined,
        undefined,
        elm
    );
}

/**
 * 1.将获取的id和class字符串切割为数组
 * 2.遍历数组并将每一项作为key设置到对应对象里
 */
function createKeyMap(s) {
    if (!s) return;

    const map = {};
    let i, arr, key;

    arr = str.split('');

    for (i = 0; i < arr.length; i++) {
        key = arr[i];
        map[key] = true;
    }

    return map;
}