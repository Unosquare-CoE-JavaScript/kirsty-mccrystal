var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from './base-component.js';
import * as Validation from '../util/validation.js';
import { Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInput = this.element.querySelector("#title");
        this.descInput = (this.element.querySelector("#description"));
        this.peopleInput = (this.element.querySelector("#people"));
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const enteredTitle = this.titleInput.value;
        const enteredDesc = this.descInput.value;
        const enteredPeople = this.peopleInput.value;
        const validateTitle = {
            value: enteredTitle,
            required: true,
        };
        const validateDesc = {
            value: enteredDesc,
            required: true,
            minLength: 1,
            maxLength: 40,
        };
        const validatePeople = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 30,
        };
        if (!Validation.validation(validateTitle) ||
            !Validation.validation(validateDesc) ||
            !Validation.validation(validatePeople)) {
            alert("Invalid");
            return;
        }
        else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInput.value = "";
        this.descInput.value = "";
        this.peopleInput.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
        }
        this.clearInputs();
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map