import { vnode } from './vnode.js';

/**
 * 生成虚拟DOM对象
 * @param {string} tag
 * @param {object | null} data
 * @param {string | Array<string | object | any>} children
 * @returns {{
 * tag: string;
 * data: object | null;
 * children: string | number | Array<string | object | any>;
 * key: string | number | undefined;
 * }}
 */

export function h(tag, data, children) {
    return vnode(tag, data, children);
}