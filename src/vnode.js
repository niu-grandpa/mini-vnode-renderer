export function vnode(tag, data, children) {
    const key = data === undefined ? undefined : data.key;
    return { tag, data, children, key };
}