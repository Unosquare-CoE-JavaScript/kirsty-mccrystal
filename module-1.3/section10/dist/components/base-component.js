export default class Component {
    constructor(templateID, hostElementID, insertAtStart, newElementID) {
        this.templateEl = (document.getElementById(templateID));
        this.hostEl = document.getElementById(hostElementID);
        const importedHTMLContent = document.importNode(this.templateEl.content, true);
        this.element = importedHTMLContent.firstElementChild;
        if (newElementID) {
            this.element.id = newElementID;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostEl.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=base-component.js.map