import {createLocalVue, shallowMount} from '@vue/test-utils'
import ShoppingList from '../../../components/ShoppingList.vue'
import ItemsList from "../../../components/ItemsList.vue";

describe('ShoppingList', () => {
  let localVue;
  let wrapper

  beforeEach(() => {
    localVue = createLocalVue();
    wrapper = shallowMount(ShoppingList, {
      localVue,
      mocks: {
        $router: {
          push: jest.fn()
        }
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

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
})
