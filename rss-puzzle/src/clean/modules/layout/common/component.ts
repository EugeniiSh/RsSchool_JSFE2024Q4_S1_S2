export interface IComponentOptions {
  tag: string;
  className: string[];
  text: string;
  parentComponent?: null | Component;
}

export interface TypedEventHandler<T extends Event> {
  (event: T): void;
}

/**
 * Represents a component for creating and managing HTML elements with additional functionalities.
 * @class
 */
export class Component {
  /**
   * @type {Array<Component>} - An array to store child components.
   */
  protected children: Component[] = [];

  /**
   * @type {HTMLElement} - The HTML node associated with the component.
   */
  protected node: HTMLElement;

  protected nodeText: string;

  protected nodeAttribute: Record<string, string>;

  protected nodeClassList: Record<string, boolean>;

  protected nodeEvents: Map<EventListener, [string, boolean]>;

  protected parentComponent: null | Component;

  /**
   * Creates a new Component.
   * @constructor
   * @param {Object} options - The options for creating the component.
   * @param {string=} options.tag - HTML element tag (default is 'div').
   * @param {string=} options.className - CSS class name for the element.
   * @param {string=} options.text - Text content of the element.
   * @param {...Component} children - Child components to be appended.
   */

  constructor(
    {
      tag = 'div',
      className = [],
      text = '',
      parentComponent = null,
    }: IComponentOptions,

    ...children: Component[]
  ) {
    const node = document.createElement(tag);
    node.classList.add(...className);
    node.textContent = text;
    this.node = node;
    this.nodeText = text;
    this.nodeAttribute = {};
    this.nodeClassList = {};
    this.nodeEvents = new Map();
    this.parentComponent = parentComponent;

    className.forEach((nameClass) => {
      this.nodeClassList[nameClass] = true;
    });

    if (children) {
      this.appendChildren(children);
    }
  }

  /**
   * Appends a child component to the current component.
   * @param {Component} child - The child component to be appended.
   */
  append(child: Component) {
    child.setParentComponent(this);
    this.children.push(child);
    this.node.append(child.getNode());
  }

  prepend(child: Component) {
    child.setParentComponent(this);
    this.children.unshift(child);
    this.node.prepend(child.getNode());
  }

  /**
   * Appends an array of child components to the current component.
   * @param {Array<Component>} children - Array of child components to be appended.
   */
  appendChildren(children: Component[]) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  prependChildren(children: Component[]) {
    children.forEach((el) => {
      this.prepend(el);
    });
  }

  appBeforeSpecifiedChildren(position: number, newComponent: Component) {
    const newChildrenArr: Component[] = [];
    newComponent.setParentComponent(this);

    this.children.forEach((child, index) => {
      if (index === position) {
        newChildrenArr.push(newComponent);
        newChildrenArr.push(child);
        child.getNode().before(newComponent.getNode());
        return;
      }

      newChildrenArr.push(child);
    });

    this.children = newChildrenArr;
  }

  appAfterSpecifiedChildren(position: number, newComponent: Component) {
    const newChildrenArr: Component[] = [];
    newComponent.setParentComponent(this);

    this.children.forEach((child, index) => {
      if (index === position) {
        newChildrenArr.push(child);
        newChildrenArr.push(newComponent);
        child.getNode().after(newComponent.getNode());
        return;
      }

      newChildrenArr.push(child);
    });

    this.children = newChildrenArr;
  }

  /**
   * Returns the HTML node associated with the component.
   * @returns {HTMLElement} - The HTML node.
   */
  getNode() {
    return this.node;
  }

  /**
   * Returns an array of child components.
   * @returns {Array<Component>} - Array of child components.
   */
  getChildren() {
    return this.children;
  }

  getTextContent(): string {
    return this.nodeText;
  }

  getAttribute(attribute: string): string | undefined {
    return this.nodeAttribute[attribute];
  }

  getClassList(): Record<string, boolean> {
    return this.nodeClassList;
  }

  getEventListeners(): Map<EventListener, [string, boolean]> {
    return this.nodeEvents;
  }

  /**
   * Sets the text content of the component.
   * @param {string} content - The text content to be set.
   */
  setTextContent(content: string) {
    this.nodeText = content;
    this.node.textContent = content;
  }

  /**
   * Sets an attribute on the component's HTML node.
   * @param {string} attribute - The attribute to set.
   * @param {string} value - The value to set for the attribute.
   */
  setAttribute(attribute: string, value: string) {
    this.nodeAttribute[attribute] = value;
    this.node.setAttribute(attribute, value);
  }

  /**
   * Removes an attribute from the component's HTML node.
   * @param {string} attribute - The attribute to remove.
   */
  removeAttribute(attribute: string) {
    delete this.nodeAttribute[attribute];
    this.node.removeAttribute(attribute);
  }

  /**
   * Toggles the presence of a CSS class on the component's HTML node.
   * @param {string} className - The class name to toggle.
   */
  toggleClass(
    className: string,
    force: boolean | undefined = undefined,
  ): boolean {
    switch (true) {
      case force === true:
        this.nodeClassList[className] = true;
        break;
      case force === false:
        delete this.nodeClassList[className];
        break;
      default: {
        const currentClass = this.nodeClassList[className];
        if (currentClass !== undefined) {
          this.nodeClassList[className] = !currentClass;
          break;
        }

        this.nodeClassList[className] = true;
        break;
      }
    }

    return this.node.classList.toggle(className, force);
  }

  /**
   * Adds an event listener to the component's HTML node.
   * @param {string} event - The event type to listen for.
   * @param {EventListener} listener - The callback function to be executed when the event occurs.
   * @param {boolean|AddEventListenerOptions} [options=false] - An options object specifying characteristics of the event listener.
   */
  addListener(event: string, listener: EventListener, options = false) {
    this.node.addEventListener(event, listener, options);
    this.nodeEvents.set(listener, [event, options]);
  }

  /**
   * Removes an event listener from the component's HTML node.
   * @param {string} event - The event type for which to remove the listener.
   * @param {EventListener} listener - The listener function to be removed.
   * @param {boolean|EventListenerOptions} [options=false] - Options that were used when adding the listener.
   */
  removeListener(event: string, listener: EventListener, options = false) {
    this.node.removeEventListener(event, listener, options);
    this.nodeEvents.delete(listener);
  }

  dispatchSomeEvent(event: Event) {
    this.node.dispatchEvent(event);
  }

  destroyOneChild(position: number) {
    const destroingChild = this.children[position];
    this.children = this.children.filter((_, index) => {
      if (index === position) return false;
      return true;
    });

    destroingChild.destroy();
  }

  /**
   * Destroys all child components associated with the current component.
   */
  destroyChildren() {
    this.children.forEach((child) => {
      child.destroy();
    });

    this.children.length = 0;
  }

  /**
   * Destroys the current component and removes its HTML node from the DOM.
   */
  destroy() {
    this.destroyChildren();
    this.setParentComponent(null);
    this.nodeEvents.forEach((data, func) => {
      const [event, option] = data;
      this.removeListener(event, func, option);
    });
    this.node.remove();
  }

  cleanInnerHTML() {
    this.children.forEach((child) => {
      if (child.getParentComponent() === this) {
        child.setParentComponent(null);
      }
    });
    this.node.innerHTML = '';
    this.children.length = 0;
  }

  replaceChildren(childNum: number, newChild: Component): Component {
    const currentChild = this.children[childNum];

    currentChild.setParentComponent(null);
    newChild.setParentComponent(this);

    this.children[childNum] = newChild;
    currentChild.getNode().replaceWith(newChild.getNode());

    return currentChild;
  }

  getRef(): this {
    return this;
  }

  getParentComponent(): null | Component {
    return this.parentComponent;
  }

  setParentComponent(myParent: null | Component): void {
    this.parentComponent = myParent;
  }
}
