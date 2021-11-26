function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  const orgMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = orgMethod.bind(this);
      return boundFn;
    },
  };
  return newDescriptor;
}


//DRAG AND DROP
interface Draggable {
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//Singleton
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super()
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners()
  }

  switchProjectStatus(projectID: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectID);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

// Validation
interface ValidatorConfig {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validation(input: ValidatorConfig) {
  let isValid = true;

  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }

  if (input.minLength != null && typeof input.value === "string") {
    isValid = input.value.length > input.minLength;
  }

  if (input.maxLength != null && typeof input.value === "string") {
    isValid = input.value.length < input.maxLength;
  }

  if (input.min != null && typeof input.value === "number") {
    isValid = input.value > input.min;
  }

  if (input.max != null && typeof input.value === "number") {
    isValid = input.value < input.max;
  }

  return isValid;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(templateID: string, hostElementID: string, insertAtStart: boolean, newElementID?: string) {
    this.templateEl = <HTMLTemplateElement>(
      document.getElementById(templateID)!
    );
    this.hostEl = <T>document.getElementById(hostElementID)!;

    const importedHTMLContent = document.importNode(
      this.templateEl.content,
      true
    );
    this.element = <U>importedHTMLContent.firstElementChild;
    if (newElementID) {
      this.element.id = newElementID;
    }

    this.attach(insertAtStart)
  }

  private attach(insertAtBeginning: boolean) {
    this.hostEl.insertAdjacentElement(insertAtBeginning? 'afterbegin' : 'beforeend', this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
 }

 class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
   private project: Project;

   get persons () {
     if (this.project.people === 1) {
       return '1 person'
     } else {
       return `${this.project.people} persons`;
     }
   }
  
  constructor(hostID: string, project: Project) {
     super('single-project', hostID, false, project.id);
     this.project = project

     this.configure();
     this.renderContent();
   }

   @Autobind
   dragStartHandler(event: DragEvent) {
     event.dataTransfer!.setData('text/plain', this.project.id);
     event.dataTransfer!.effectAllowed = 'move';
   }

   dragEndHandler(_: DragEvent) {
     console.log('dragEnd')
   }

   configure() {
     this.element.addEventListener('dragstart', this.dragStartHandler)
     this.element.addEventListener('dragend', this.dragEndHandler)
   }

   renderContent() {
     this.element.querySelector('h2')!.textContent = this.project.title;
     this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
     this.element.querySelector('p')!.textContent = this.project.description;
   }
 }

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super('project-list', 'app', false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure()
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    listEl.innerHTML = ''
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem)
    }
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEL = this.element.querySelector('ul')!;
      listEL.classList.add('droppable');
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const prjID = event.dataTransfer!.getData('text/plain');
    projectState.switchProjectStatus(prjID, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);

  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    const listEL = this.element.querySelector('ul')!;
    listEL.classList.remove('droppable')
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const filteredProjects = projects.filter(project => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active
        }
        return project.status === ProjectStatus.Finished
      })

      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listID = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listID;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, 'user-input');
    // We know this element won't be empty and know it's an HTMLTemplateElement ( Type Casting)

    this.titleInput = <HTMLInputElement>this.element.querySelector("#title");
    this.descInput = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInput = <HTMLInputElement>this.element.querySelector("#people");

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

    const validateTitle: ValidatorConfig = {
      value: enteredTitle,
      required: true,
    };
    const validateDesc: ValidatorConfig = {
      value: enteredDesc,
      required: true,
      minLength: 1,
      maxLength: 40,
    };
    const validatePeople: ValidatorConfig = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 30,
    };

    if (
      !validation(validateTitle) ||
      !validation(validateDesc) ||
      !validation(validatePeople)
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

const proInput = new ProjectInput();
const acitveProList = new ProjectList("active");
const finishedProList = new ProjectList("finished");
