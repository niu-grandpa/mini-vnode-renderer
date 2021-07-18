export default function vnode(tag, data, children, text, elm) {
    const key = data !== undefined ? data.key : undefined;
    return {
        tag,
        data,
        children,
        text,
        key,
        elm,
    };
}