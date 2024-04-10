export function fetchImage(imageName: string): HTMLImageElement {
  let imgElement = document.createElement("img");
  imgElement.setAttribute("src", "../images/" + imageName);
  imgElement.setAttribute("height", "100");
  imgElement.setAttribute("width", "100");

  return imgElement;
}

export function highlight(element: HTMLDivElement, color: string): void {
  element.style.backgroundColor = color;
}

