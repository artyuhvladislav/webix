import "../styles/app.scss";
import { DOMElements } from "./DOMElements";
import { Tag } from "./first";

const tag = new Tag(
  DOMElements.content,
  DOMElements.addButton,
  DOMElements.input,
  DOMElements.clearButton
);

window.onload = function () {
  tag.init();
};

const addButtonHandler = () => {
  const value = input.value;
  tag.addTagList(value);
};

const clearButtonHandler = () => {
  tag.clearTagList();
};

const checkboxButtonHandler = () => {
  tag.toggleReadOnlyMode();
};

const contentHandler = (e) => {
  const element = e.target.closest(".deleteTag");
  if (element?.className.includes("deleteTag")) {
    tag.deleteTag(element.getAttribute("data"));
  }
};

DOMElements.addButton.addEventListener("click", addButtonHandler);
DOMElements.clearButton.addEventListener("click", clearButtonHandler);
DOMElements.checkboxButton.addEventListener("click", checkboxButtonHandler);
DOMElements.content.addEventListener("click", (e) => {
  contentHandler(e);
});
