import { render } from '../src/index.js';
import { Layout } from './layout/index.js';

const App = render(Layout, document.querySelector('#app'));
console.log('渲染后的实例元素:', App);