import { shallowMount } from '@vue/test-utils';
import ItemsList from '../../../components/ItemsList.vue';
import AllListsButton from '../../../components/AllListsButton.vue';

describe('ItemsList', () => {
  it('renders "Loading..." when loading prop is true', () => {
    const wrapper = shallowMount(ItemsList, {
      propsData: {
        loading: true
      },
      mocks: {
        $router: {
          push: jest.fn()
        }
      },
    });

    expect(wrapper.text()).toBe('Loading...');
  });

  it('renders AllListsButton component', () => {
    const wrapper = shallowMount(ItemsList);

    expect(wrapper.findComponent(AllListsButton).exists()).toBe(true);
  });
});
