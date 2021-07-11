import vnode from './vnode.js';
import * as is from './is.js';

/**
 * 创建虚拟DOM节点
 * @param {string} tag
 * @param {object} data
 * @param {[] | string} children
 * @returns {{
 * tag: string;
 * data: object;
 * children: [];
 * text: string | undefined;
 * elm: Element | Text | undefined
 * }}
 */
export default function h(tag, data, children) {
    let d, c, t;
    // 参数格式化
    // h('div',('' | []))
    if (data && !children) {
        if (is.array(data)) {
            c = data;
        } else if (is.primitive(data)) {
            t = c;
        } else if (is.object(data)) {
            d = data;
        }
    }
    // h('div',{},[]);
    if (data && children) {
        d = data;
        if (is.array(children)) {
            c = children;
        } else if (is.primitive(children)) {
            t = children;
        }
    }

    return vnode(tag, d, c, t);
}