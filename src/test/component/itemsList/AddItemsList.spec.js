import AllListsButton from "../../../components/AllListsButton.vue";
const { createLocalVue, shallowMount } = require('@vue/test-utils');
import AddItemsList from '../../../components/AddItemsList.vue';
import {ShoppingListController} from '../../../controller/ShoppingListController';

jest.mock('../../../controller/ShoppingListController',  () => ({
  ShoppingListController: {
    createItemsList: jest.fn(),
  }
}));

describe('AddItemsList component test', () => {
  let localVue;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    wrapper = shallowMount(AddItemsList, {
      localVue,
      mocks: {
        $router: {
          push: jest.fn()
        }
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should render the component without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the title "Add a new shopping list"', () => {
    const title = wrapper.find('h1');
    expect(title.text()).toBe('Add a new shopping list');
  });

  it('should display a label "Name"', () => {
    const nameLabel = wrapper.find('label');
    expect(nameLabel.text()).toBe('Name:');
  });

  it('should display a text filed', () => {
    const nameInput = wrapper.find('[data-test="name-shopping-list"]');
    expect(nameInput.exists()).toBe(true);
  });

  it('should display a button of type submit with text "Add list"', () => {
    const submitButton = wrapper.find('[data-test="add-shopping-list-btn"]');

    expect(submitButton.exists()).toBe(true);
    expect(submitButton.attributes().type).toBe('submit');
    expect(submitButton.attributes().value).toBe('Add list');
  });

  it('should display a button to go back to all lists', () => {
    const AllListUlElement = wrapper.find('[class="list-inline"]');
    expect(AllListUlElement.exists()).toBe(true);
    const AllListButton = wrapper.findComponent(AllListsButton);
    expect(AllListButton.exists()).toBe(true);
    expect(AllListButton.element.parentElement).toBe(AllListUlElement.element)
  });

  it('should update the "name" data property when input value changes', async () => {
    const nameInput = wrapper.find('[data-test="name-shopping-list"]');
    await nameInput.setValue('New Shopping List');
    expect(wrapper.vm.name).toBe('New Shopping List');
  });

  it('should call "addItemsList" method on form submission', async () => {
    // Mock the successful response from the controller
    ShoppingListController.createItemsList.mockImplementation(() => Promise.resolve());

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    expect(ShoppingListController.createItemsList).toHaveBeenCalled();
  });

  it('should handle successful form submission and perform router redirection', async () => {
    // Mock the successful response from the controller
    ShoppingListController.createItemsList.mockImplementation(() => Promise.resolve());

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
  });
});
