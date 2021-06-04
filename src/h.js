/**
 * 生成虚拟 dom
 * @param {string} tag
 * @param {object} props
 * @param {string | Array<string | object>} children
 */

export function h(tag, props, children) {
    return {
        tag,
        props,
        children,
    };
}