import AllListsButton from "../../../components/AllListsButton.vue";
const { createLocalVue, shallowMount } = require('@vue/test-utils');
import EditItemsList from "../../../components/EditItemsList.vue";

describe('EditItemsList component test', () => {
  let localVue;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    wrapper = shallowMount(EditItemsList, {
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

  it('renders the edit title correctly', () => {
    expect(wrapper.find('[data-test="edit-title"]').text()).toContain('Edit');
  });

  it('should display a label "Name"', () => {
    const nameLabel = wrapper.find('label');
    expect(nameLabel.text()).toBe('Name:');
  });

  it('should display a text filed', () => {
    const nameInput = wrapper.find('[data-test="name-shopping-list"]');
    expect(nameInput.exists()).toBe(true);
  });

  it('should display a button of type submit with text "Update list"', () => {
    const submitButton = wrapper.find('[data-test="update-shopping-list-btn"]');

    expect(submitButton.exists()).toBe(true);
    expect(submitButton.attributes().type).toBe('submit');
    expect(submitButton.attributes().value).toBe('Update list');
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
    await nameInput.setValue('Updated Shopping List');
    expect(wrapper.vm.list.name).toBe('Updated Shopping List');
  });
});
