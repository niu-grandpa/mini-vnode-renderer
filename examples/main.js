import { render } from '../src/index.js';
import { Layout } from './layout/index.js';

const App = render({
    el: '#app',
    components: {
        Layout,
    },
    // 生命周期
    beforeCreate: () => {
        console.log('beforeCreate!');
    },
    beforeMount: () => {
        console.log('beforeMount!');
    },
    created: () => {
        console.log('created!');
    },
    mounted: () => {
        console.log('mounted!');
    },
});

console.log('渲染完毕后的实例元素:', App.$el);