import { h, render } from '../../src/index.js';

const Header = h('header', { class: 'header' }, 'This is an Header Component');

render(Header).mount('#container');