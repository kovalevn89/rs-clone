export function createElement(
  tagName: string,
  classNames?: string,
  parent: HTMLElement | null = null,
  ...dataAttr: string[][]
): HTMLElement {
  const el = document.createElement(tagName);

  if (classNames) {
    el.classList.add(...classNames.split(' '));
  }

  if (parent !== null) {
    parent.appendChild(el);
  }

  if (dataAttr.length > 0) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        el.setAttribute(attrName, '');
        return;
      }
      if (
        attrName.match(/value|id|href|src|alt|type|name|placeholder|tabindex|min|max|for|step|width|height|selected|spellcheck/i) !== null
      ) {
        el.setAttribute(attrName, attrValue);
      } else {
        el.dataset[attrName] = attrValue;
      }
    });
  }

  return el;
}

export function removeChild(element: HTMLElement): void {
  while (element.firstChild !== null) {
    if (element.lastChild !== null) {
      element.removeChild(element.lastChild);
    }
  }
}
