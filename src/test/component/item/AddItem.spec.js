import { mount } from '@vue/test-utils'
import AddItem from '../../../components/AddItem.vue'
import ErrorAlert from '../../../components/ErrorAlert.vue'
import AllListsButton from '../../../components/AllListsButton.vue'
import BackToListButton from '../../../components/BackToListButton.vue'
import {ItemController} from '../../../controller/ItemController'

jest.mock('../../../controller/ItemController')

const mockRouter = {
  push: jest.fn()
}

const wrapper = mount(AddItem, {
  global: {
    mocks: {
      $router: {
        push: jest.fn()
      }
    },
    components: {
      ErrorAlert,
      AllListsButton,
      BackToListButton
    }
  },
  props: {
    listId: '1'
  }
})

describe('AddItem', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render the component without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the title "Add a new item"', () => {
    const title = wrapper.find('h1');
    expect(title.text()).toBe('Add a new item');
  });

  it('should display a label "Name"', () => {
    const nameLabel = wrapper.find('label');
    expect(nameLabel.text()).toBe('Name:');
  });

  it('should display a label "Comment"', () => {
    const labels = wrapper.findAll('label');
    const commentLabel = labels.at(1);
    expect(commentLabel.text()).toBe('Comment:');
  });

  it('should display a text input for name', () => {
    const nameInput = wrapper.find('input');
    expect(nameInput.exists()).toBe(true);
  });

  it('should display a text input for comment', () => {
    const nameInput = wrapper.find('textarea');
    expect(nameInput.exists()).toBe(true);
  });

/*  it('should display an error message when name is empty', async () => {
    wrapper.get('[data-test="add-item-btn"]').trigger('click')
    await flushPromises()
    expect(wrapper.get('[data-test="name-error-message"]').text()).toBe('Name is required.')
  })*/

  it('should display a button of type submit with text "Add item"', () => {
    const inputs = wrapper.findAll('input');

    const submitButton = inputs.at(1);
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.attributes().type).toBe('submit');
    expect(submitButton.attributes().value).toBe('Add item');
  });

  it('should display a button to go back to all lists', () => {
    const AllListUlElement = wrapper.find('[class="list-inline"]');
    expect(AllListUlElement.exists()).toBe(true);
    const AllListButton = wrapper.findComponent(AllListsButton);
    expect(AllListButton.exists()).toBe(true);
    expect(AllListButton.element.parentElement).toBe(AllListUlElement.element)
  });

  it('should display a button to go back to the list', () => {
    const AllListUlElement = wrapper.find('[class="list-inline"]');
    expect(AllListUlElement.exists()).toBe(true);
    const backToListButton = wrapper.findComponent(BackToListButton);
    expect(backToListButton.exists()).toBe(true);
    expect(backToListButton.element.parentElement).toBe(AllListUlElement.element)
  });

  it('should update the inputs data property when input value changes', async () => {
    const nameInput = wrapper.find('input');
    await nameInput.setValue('Meat');
    expect(wrapper.vm.name).toBe('Meat');
    const commentInput = wrapper.find('textarea');
    await commentInput.setValue('Beef');
    expect(wrapper.vm.comment).toBe('Beef');
  });

  it('should call "createItem" method on form submission', async () => {
    // Mock the successful response from the controller
    ItemController.createItem.mockImplementation(() => Promise.resolve());

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    expect(ItemController.createItem).toHaveBeenCalled();
  });
})
