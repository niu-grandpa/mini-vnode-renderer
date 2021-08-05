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
 * children: string | [];
 * text: string | undefined;
 * elm: Element | Text | undefined
 * }}
 */
export default function h(tag, data, children) {
    let text;
    if (children !== undefined) {
        if (is.primitive(children)) {
            text = children;
        }
    }

    return vnode(tag, data, children, text, undefined);
}