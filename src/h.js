import { vnode } from './vnode.js';

/**
 * 生成虚拟DOM对象
 * @param {string} tag
 * @param {{ id?: string, class?: string, attrs?: {}, style?: {}, dataset?: {} }} data
 * @param {string | (string | object )[]} children
 * @returns {{
 * tag: string; data: {}; children: string | (strig | any)[]; key: string | number;
 * }}
 */

export function h(tag, data, children) {
    return vnode(tag, data, children);
}