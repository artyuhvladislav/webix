export class Tag {
  constructor(content, addButton, input, clearButton) {
    this.$content = content;
    this.$button = addButton;
    this.$input = input;
    this.$clear = clearButton;
  }

  static tagList = [];
  static readOnlyMode = false;

  getAllTags() {
    return Tag.tagList;
  }

  clearTagList() {
    localStorage.clear();
    Tag.tagList = [];
    this.$content.innerHTML = "";
  }

  getDataFromStorage(data) {
    data.forEach(({ value }, index) => {
      this.addTag(value, index);
    });
  }

  getDataFromUserField(data) {
    const dataArray = data.trim().replace(/\s+/g, " ").split(" ");
    dataArray.forEach((item) => {
      let id = this.getAllTags().length + 1;
      this.addTag(item, id);
    });
  }

  addTagList(data) {
    try {
      if (data.includes(",") || data.includes("<") || data.includes(">")) {
        throw new Error('do not use "," "<" ">" symbol instead of - use spaces');
      }
      if (!data) {
        throw new Error("Empty input value");
      }

      if (typeof data === "string") {
        this.getDataFromUserField(data);
      } else {
        this.getDataFromStorage(data);
      }
      // to LocalStorage
      localStorage.setItem("tagList", JSON.stringify(this.getAllTags()));
      this.$input.value = "";
    } catch (error) {
      alert(error);
      return;
    }
  }

  addTag(item, index) {
    const obj = {
      id: index,
      value: item,
      disabled: false,
    };

    let $element = `<li>
        <p>${obj.value}</p>
        <button class="deleteTag" data=${index} ${
      obj.disabled ? "disabled" : ""
    }>delete</button>
    </li>`;
    this.$content.insertAdjacentHTML("beforeend", $element);

    Tag.tagList.push(obj);
  }

  deleteTag(tagId) {
    this.$content.innerHTML = "";
    const allTags = this.getAllTags();
    const data = allTags.filter(({ id }) => id !== +tagId);
    Tag.tagList = [];
    this.addTagList(data);
  }

  toggleReadOnlyMode() {
    Tag.readOnlyMode = !Tag.readOnlyMode;
    const deleteTags = document.querySelectorAll(".deleteTag");
    this.$input.setAttribute("disabled", "disabled");

    if (Tag.readOnlyMode) {
      this.$input.setAttribute("disabled", "disabled");
      this.$button.setAttribute("disabled", "disabled");
      this.$clear.setAttribute("disabled", "disabled");
      deleteTags.forEach((item) => item.setAttribute("disabled", "disabled"));
    } else {
      this.$input.removeAttribute("disabled");
      this.$button.removeAttribute("disabled");
      this.$clear.removeAttribute("disabled");
      deleteTags.forEach((item) => item.removeAttribute("disabled"));
    }
  }

  init() {
    // get item from localStorage if they exist
    const data =
      JSON.parse(localStorage.getItem("tagList")) ?? this.getAllTags();
    this.addTagList(data);
  }
}
