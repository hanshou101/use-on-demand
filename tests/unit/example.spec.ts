import '@types/jest';													// WARN 似乎要加上这句，才能生效。(https://github.com/facebook/jest/issues/8285#issuecomment-685843704)

import { shallowMount } from '@vue/test-utils';
import HelloWorld       from '../../packages/components/hello-world/HelloWorld.vue';

describe('HelloWorld.vue', () => {
	it('renders props.msg when passed', () => {
		const msg     = 'new message';
		const wrapper = shallowMount(HelloWorld, {
			propsData: { msg },
		});
		expect(wrapper.text()).toMatch(msg);
	});
});
