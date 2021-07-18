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
    // 为了简单起见，不做参数格式化以达到像函数重载的功能
    // snabbdom中是有的

    let c, t;

    if (children !== undefined) {
        if (is.primitive(children)) {
            t = children;
        } else if (is.array(children)) {
            c = children;
        }
    }

    return vnode(tag, data, c, t, undefined);
}