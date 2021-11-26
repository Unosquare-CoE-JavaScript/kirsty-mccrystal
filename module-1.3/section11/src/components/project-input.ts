import Component from './base-component';
import * as Validation from '../util/validation'
import { Autobind } from '../decorators/autobind'
import { projectState } from '../state/project-state'


export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    // We know this element won't be empty and know it's an HTMLTemplateElement ( Type Casting)

    this.titleInput = <HTMLInputElement>this.element.querySelector("#title");
    this.descInput = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInput = <HTMLInputElement>(
      this.element.querySelector("#people")
    );

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInput.value;
    const enteredDesc = this.descInput.value;
    const enteredPeople = this.peopleInput.value;

    const validateTitle: Validation.ValidatorConfig = {
      value: enteredTitle,
      required: true,
    };
    const validateDesc: Validation.ValidatorConfig = {
      value: enteredDesc,
      required: true,
      minLength: 1,
      maxLength: 40,
    };
    const validatePeople: Validation.ValidatorConfig = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 30,
    };

    if (
      !Validation.validation(validateTitle) ||
      !Validation.validation(validateDesc) ||
      !Validation.validation(validatePeople)
    ) {
      alert("Invalid");
      return;
    } else {
      return [enteredTitle, enteredDesc, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInput.value = "";
    this.descInput.value = "";
    this.peopleInput.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
    }
    this.clearInputs();
  }
}
