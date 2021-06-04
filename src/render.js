import { mount } from './index.js';
import { patch } from './index.js';

/**
 * 渲染虚拟 dom 到页面
 * @param {{
 *  component: object,
 *  el: string,
 *  created: () => void,
 *  beforeCreate: () => void,
 *  beforeMount: () => void,
 *  mounted: () => void
 * }} options
 */
export function render(options) {
    const { components, el, beforeMount, mounted, created, beforeCreate } = options;
    const container = document.querySelector(el);

    if (!container) return;

    beforeCreate && beforeCreate();

    let elem = null;
    for (const name in components) {
        const component = components[name];

        created && created();
        beforeMount && beforeMount();

        elem = mount(component, container);
    }
    mounted && mounted();

    return {
        $el: elem,
    };
}