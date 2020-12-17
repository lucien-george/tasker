import { Controller } from 'stimulus';
import StimulusReflex from 'stimulus_reflex';
import Sortable from 'sortablejs';

export default class extends Controller {
  static targets = [ 'form', 'tasks' ];

  connect() {
    StimulusReflex.register(this);
    Sortable.create(this.tasksTarget, {
      onEnd: (event) => { this.reorder(event) },
      filter: '.completed'
    });
  }

  reorder(event) {
    // any argument passed after the first two arguments, are passed as arguments to ruby
    // the second argument defines the `element` method in the ruby reflex
    this.stimulate('TaskReflex#reorder', event.item, event.newIndex);
  }

  beforeCreateTask(element) {
    element.querySelectorAll('input').forEach((input) => input.blur());
    element.classList.add('form-disabled');
  }

  createTaskSuccess() {
    this.formTarget.reset();
  }

  createTaskError(element, name, error) {
    alert(error);
  }
}
