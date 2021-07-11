import { h, render } from '../../src/index.js';

const vdom1 = h('header', { class: 'header' }, 'This is an Header Component');
const vdom2 = h('header', { class: 'header' }, 'This is an Header Component');

render(vdom1).mount('#container');