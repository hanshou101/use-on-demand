// Import the `mount()` method from Vue Test Utils
import { mount } from '@vue/test-utils';


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 基本测试
 */
// The component to test
const MessageComponent = {
	template: '<p>{{ msg }}</p>',
	props   : ['msg'],
};

test('displays message', () => {
	// mount() returns a wrapped Vue component we can interact with
	const wrapper = mount(MessageComponent, {
		propsData: {
			msg: 'Hello world',
		},
	});

	// Assert the rendered text of the component
	expect(wrapper.text()).toContain('Hello world');
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 模拟用户互动
 */
const Counter = {
	template: `
    <div>
    <button @click="count++">Add up</button>
    <p>Total clicks: {{ count }}</p>
    </div>
	`,
	data() {
		return { count: 0 };
	},
};

test('increments counter value on click', async () => {
	const wrapper = mount(Counter);
	const button  = wrapper.find('button');
	const text    = wrapper.find('p');

	expect(text.text()).toContain('Total clicks: 0');

	await button.trigger('click');

	expect(text.text()).toContain('Total clicks: 1');
});

/**
 * 不渲染【子组件】的【浅渲染】———— shallowMount 。
 */

import { shallowMount }             from '@vue/test-utils';

const wrapper = shallowMount(Counter);


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 *
 */

it('updates text', async () => {
	const wrapper = mount(Component);
	await wrapper.trigger('click');
	expect(wrapper.text()).toContain('updated');
	await wrapper.trigger('click');
	wrapper.text().toContain('some different text');
});

// Or if you're without async/await
it('render text', done => {
	const wrapper = mount(TestComponent);
	wrapper.trigger('click').then(() => {
		expect(wrapper.text()).toContain('updated');
		wrapper.trigger('click').then(() => {
			expect(wrapper.text()).toContain('some different text');
			done();
		});
	});
});


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 测试【emit发射事件】
 */
wrapper.vm.$emit('foo');
wrapper.vm.$emit('foo', 123);

// assert event has been emitted
expect(wrapper.emitted().foo).toBeTruthy();

// assert event count
expect(wrapper.emitted().foo.length).toBe(2);

// assert event payload
expect(wrapper.emitted().foo[1]).toEqual([123]);

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 子组件的【emit发射事件】
 */
// import { mount } from '@vue/test-utils'
import ParentComponent   from '../demos/ParentComponent';
import ChildComponent    from './demos/ChildComponent';

describe('ParentComponent', () => {
	it('displays \'Emitted!\' when custom event is emitted', () => {
		const wrapper = mount(ParentComponent);
		wrapper.findComponent(ChildComponent).vm.$emit('custom');
		expect(wrapper.html()).toContain('Emitted!');
	});
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 操作【组件】的【状态】，data 或props
 */
it('manipulates state', async () => {
	await wrapper.setData({ count: 10 });

	await wrapper.setProps({ foo: 'bar' });
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 在【组件】创建时，传入【props】
 */
mount(Component, {
	propsData: {
		aProp: 'some value',
	},
});


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 模拟【<transition>过滤】
 *        1.这个似乎有点Bug。
 *                1.使用【transitionStub】助手，进行修复。
 */
import Foo               from '../demos/Foo';

test('should render Foo, then hide it', async () => {
	const wrapper = mount(Foo);
	expect(wrapper.text()).toMatch(/Foo/);

	await wrapper.setData({
		show: false,
	});

	expect(wrapper.text()).not.toMatch(/Foo/);
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 【transitionStub】助手？？？？？？  怎么用的？？？
 *        1.是为了修复，上面那个Bug。
 *        2.通过避免使用【setData】，来避免<transition>的Bug。
 */
const transitionStub = () => ({
	render: function(h) {
		return this.$options._renderChildren;
	},
});

test('should render Foo, then hide it', async () => {
	const wrapper = mount(Foo, {
		stubs: {
			transition: transitionStub(),
		},
	});
	expect(wrapper.text()).toMatch(/Foo/);

	await wrapper.setData({
		show: false,
	});

	expect(wrapper.text()).not.toMatch(/Foo/);
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 通过避免使用【setData】，来避免<transition>的Bug。
 */
test('should render Foo', async () => {
	const wrapper = mount(Foo, {
		data() {
			return {
				show: true,
			};
		},
	});

	expect(wrapper.text()).toMatch(/Foo/);
});

test('should not render Foo', async () => {
	const wrapper = mount(Foo, {
		data() {
			return {
				show: false,
			};
		},
	});

	expect(wrapper.text()).not.toMatch(/Foo/);
});


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 使用【全局插件plugin】和【混合插件 mixin plugin】
 */
import { createLocalVue /*mount*/ } from '@vue/test-utils';

// create an extended `Vue` constructor
const localVue = createLocalVue();

// install plugins as normal
localVue.use(MyPlugin);

// pass the `localVue` to the mount options
mount(Component, {
	localVue,
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 模仿【inject】
 */
import {/*mount*/ }                 from '@vue/test-utils';

const $route = {
	path  : '/',
	hash  : '',
	params: { id: '123' },
	query : { q: 'hello' },
};

mount(Component, {
	mocks: {
		// adds mocked `$route` object to the Vue instance
		// before mounting component
		$route,
	},
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 使用【stubs】选项，来覆盖 全局注册 或 本地注册，的组件。
 */
import {/*mount*/ }                 from '@vue/test-utils';

mount(Component, {
	// Will resolve globally-registered-component with
	// empty stub
	stubs: ['globally-registered-component'],
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 处理路由：https://vue-test-utils.vuejs.org/guides/#dealing-with-routing
 */


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 检测样式：https://vue-test-utils.vuejs.org/guides/#detecting-styles
 */


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * Trigger触发事件
 */
describe('A', () => {

	it('a', () => {
		const wrapper = mount(MyButton);

		wrapper.trigger('click');
	});
	it('b', () => {
		const wrapper = mount(MyComponent);

		wrapper.find('button').trigger('click');
	});
});


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * Trigger触发事件的选项
 */
describe('B', () => {
	it('c', () => {

		const wrapper = mount(MyButton);

		wrapper.trigger('click', { button: 0 });
	});
});


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 鼠标点击事件，的示例
 */
import YesNoComponent    from '../demos/YesNoComponent';
import {/*mount*/ }      from '@vue/test-utils';
import sinon                        from 'sinon';

describe('Click event', () => {
	it('Click on yes button calls our method with argument "yes"', () => {
		const spy     = sinon.spy();
		const wrapper = mount(YesNoComponent, {
			propsData: {
				callMe: spy,
			},
		});
		wrapper.find('button.yes').trigger('click');

		spy.should.have.been.calledWith('yes');
	});
});


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 键盘事件，的示例
 */
import QuantityComponent from '../demos/QuantityComponent';
import {/*mount*/ }      from '@vue/test-utils';

describe('Key event tests', () => {
	it('Quantity is zero by default', () => {
		const wrapper = mount(QuantityComponent);
		expect(wrapper.vm.quantity).toBe(0);
	});

	it('Up arrow key increments quantity by 1', () => {
		const wrapper = mount(QuantityComponent);
		wrapper.trigger('keydown.up');
		expect(wrapper.vm.quantity).toBe(1);
	});

	it('Down arrow key decrements quantity by 1', () => {
		const wrapper       = mount(QuantityComponent);
		wrapper.vm.quantity = 5;
		wrapper.trigger('keydown.down');
		expect(wrapper.vm.quantity).toBe(4);
	});

	it('Escape sets quantity to 0', () => {
		const wrapper       = mount(QuantityComponent);
		wrapper.vm.quantity = 5;
		wrapper.trigger('keydown.esc');
		expect(wrapper.vm.quantity).toBe(0);
	});

	it('Magic character "a" sets quantity to 13', () => {
		const wrapper = mount(QuantityComponent);
		wrapper.trigger('keydown', {
			key: 'a',
		});
		expect(wrapper.vm.quantity).toBe(13);
	});
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 【异步】Vue应用内的更新
 *        1.第一种方法：await Vue.nextTick()
 *        2.第二种方法：await使用更改状态的方法，例如trigger。
 */
// inside test-suite, add this test case
it('button click should increment the count text', async () => {
	expect(wrapper.text()).toContain('0');
	const button = wrapper.find('button');
	await button.trigger('click');
	expect(wrapper.text()).toContain('1');
});

it('button click should increment the count text', async () => {
	expect(wrapper.text()).toContain('0');
	const button = wrapper.find('button');
	button.trigger('click');
	await Vue.nextTick();
	expect(wrapper.text()).toContain('1');
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 【异步】Vue之外的异步行为-第一种
 */

import {/*shallowMount*/ } from '@vue/test-utils';
import Foo2                from '../demos/Foo2';

jest.mock('axios', () => ({
	get: Promise.resolve('value'),
}));

/*
*  该测试当前失败，因为在fetchResults解析中的promise之前调用了断言。
*         1.大多数单元测试库都提供一个回调，以使跑步者知道测试何时完成。
*         2.Jest和Mocha都使用done。我们可以done结合使用$nextTick或setTimeout确保在作出断言之前兑现任何承诺。
*/
it('fetches async when a button is clicked', () => {
	const wrapper = shallowMount(Foo2);
	wrapper.find('button').trigger('click');
	expect(wrapper.text()).toBe('value');
});


it('fetches async when a button is clicked 2', done => {
	const wrapper = shallowMount(Foo);
	wrapper.find('button').trigger('click');
	wrapper.vm.$nextTick(() => {
		expect(wrapper.text()).toBe('value');
		done();
	});
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 【异步】Vue之外的异步行为-第二种
 *        1.使用async函数和包（如flush-promises）。
 *                1.flush-promises刷新所有待处理的已解决的Promise处理程序。您可以await要求flushPromises刷新未完成的承诺并提高测试的可读性。
 */
import { /*shallowMount*/ } from '@vue/test-utils';
import flushPromises        from 'flush-promises';
// import Foo2 from './demos/Foo2'
jest.mock('axios');

it('fetches async when a button is clicked', async () => {
	const wrapper = shallowMount(Foo);
	wrapper.find('button').trigger('click');
	await flushPromises();
	expect(wrapper.text()).toBe('value');
});

/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 *
 */


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 *
 */


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 与【Vue-Router】一起使用：https://vue-test-utils.vuejs.org/guides/#using-with-vue-router
 */


/** ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 * 与【Vuex】一起使用：https://vue-test-utils.vuejs.org/guides/#testing-vuex-in-components
 */


