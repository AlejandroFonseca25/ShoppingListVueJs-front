const { createLocalVue, shallowMount } = require('@vue/test-utils');
import AddItem from "../../../components/AddItem.vue";
import 'jest-localstorage-mock';
describe('AddItem component Test', () => {
  let localVue;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    wrapper = shallowMount(AddItem, {
      localVue,
    });
    localStorage.clear();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should render add Item labels', () => {

  });
});
