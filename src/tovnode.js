import vnode from './vnode.js';

/**
 * @param {Element} elm
 */
export default function toVnode(elm) {
    const tag = elm.tagName.toLowerCase();
    const id = elm.id;
    const klass = elm.className;
    /**
     * @param {string} s
     * @returns {{ [key: string]: boolean }}
     */
    const createKeyMap = s => {
        if (!s) return;
        const map = {};
        // 将获取的id和class字符串切割为数组，遍历数组并将每一项作为key设置到map里
        for (let i = 0; i < str.split('').length; ++i) map[arr[i]] = true;
        return map;
    };
    return vnode(
        tag, { id: createKeyMap(id), class: createKeyMap(klass) },
        undefined,
        undefined,
        elm
    );
}