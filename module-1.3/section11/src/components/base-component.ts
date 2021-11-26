
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(
    templateID: string,
    hostElementID: string,
    insertAtStart: boolean,
    newElementID?: string
  ) {
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

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}