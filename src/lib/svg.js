

export default class SVG {

    #width = 300
    #height = 300
    #root = null

    constructor(width, height) {
        this.#root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.#root.setAttribute("height", this.#height);
        this.#root.setAttribute("width", this.#width);
    }

    addNode(node) {

    }
}