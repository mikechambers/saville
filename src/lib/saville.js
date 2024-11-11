
const colors = {
    "green": "#4DFF99",
    "yellow": "#FFFF00",
    "purple": "#8080FF",
    "orange": "#FF6600",
    "lightblue": "#99FFFF",
    "pink": "#FF99FF",
    "darkpurple": "#3319FF", // You mentioned this seems off—double-check the intended hex code
    "red": "#FF00FF",
    "blue": "#00FFFF",
    "white": "#FFFFFF"
};

//should i store nums as string or num
const lookup = new Map([
    ['a', [colors.green]],
    ['b', [colors.yellow]],
    ['c', [colors.purple]],
    ['d', [colors.orange]],
    ['e', [colors.lightblue]],
    ['f', [colors.pink]],
    ['g', [colors.darkpurple]],
    ['h', [colors.red]],
    ['i', [colors.blue]],
    ['j', [colors.white, colors.green]],
    ['k', [colors.green, colors.green]],
    ['l', [colors.yellow, colors.green]],
    ['m', [colors.purple, colors.green]],
    ['n', [colors.orange, colors.green]],
    ['o', [colors.lightblue, colors.green]],
    ['p', [colors.pink, colors.green]],
    ['q', [colors.darkpurple, colors.green]],
    ['r', [colors.red, colors.green]],
    ['s', [colors.blue, colors.green]],
    ['t', [colors.white, colors.yellow]],
    ['u', [colors.green, colors.yellow]],
    ['v', [colors.yellow, colors.yellow]],
    ['w', [colors.purple, colors.yellow]],
    ['x', [colors.orange, colors.yellow]],
    ['y', [colors.lightblue, colors.yellow]],
    ['z', [colors.pink, colors.yellow]],
    ['1', [colors.green]],
    ['2', [colors.yellow]],
    ['3', [colors.purple]],
    ['4', [colors.orange]],
    ['5', [colors.lightblue]],
    ['6', [colors.pink]],
    ['7', [colors.darkpurple]],
    ['8', [colors.red]],
    ['9', [colors.blue]],
    ['0', [colors.white, colors.green]],
]);

//unknown chars return colors.white
export function convert(str) {

    let out = [];

    if(!str) {
        return out
    }

    // Base case for single character input
    if (str.length === 1) {
        let c = str.toLowerCase();  // Convert to lowercase

        // If character not found in lookup, return an array containing colors.white
        if (!lookup.has(c)) {
            out.push([colors.white])
              // Wrap in an additional array
        } else {
            out.push([lookup.get(c)])
        }

        return out;  // Wrap in an array to maintain the structure
    }
    //const result = str.match(/[a-zA-Z]+|\d+/g).map(item => isNaN(item) ? item : Number(item));
    const result = str.match(/[a-zA-Z]+|\d+|\r?\n/g).map(item => (isNaN(item) || item === '\n' || item === '\r\n') ? item : Number(item));

    
    for (let item of result) {
        
        //check if its a number between 9 and 100
        if (!isNaN(item) && item >=9 && item < 100) {

            const tens = Math.floor(item / 10).toString()
            const ones = (item % 10).toString()

            out.push([[lookup.get(ones)[0], lookup.get(tens)[0]]])
            continue;
        }

        item = item.toString()
        

        for (const char of item) {

            if(char == '\n') {
                out.push(null)
                continue;
            }

            out.push(convert(char)[0]);  // Each character conversion returns an array
        }
    }

    // For multi-character strings

    return out;  // Returns an array of arrays
}

export function generateSVG(str, outline, width = 800, height = 300) {
    let colors = convert(str);

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    if(outline) {
        const style = document.createElement("style");
        style.textContent = `
        rect {
            stroke: rgb(25, 23, 24);
            stroke-width: 1;
        }
        `;
        
        // Append the style element to the SVG
        svg.appendChild(style);
    }

    let defs = svg.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.appendChild(defs);
    }
    
    let gradientHash = new Map()

    const padding = 5
    const size = 50
    let row = 0
    let col = 0
    for (let i = 0; i < colors.length; i++) {

        if (!colors[i]) {
            row++
            col = 0
            continue;
        }

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute("height", size);
        rect.setAttribute("width", size);
        rect.setAttribute("x", (col * size) + padding * col)
        rect.setAttribute("y", (row * size) + padding * row)

        let gradientId = `gradient_${i}`;
        rect.setAttribute('fill', `url(#${gradientId})`);

        if (!gradientHash.has(gradientId)) {
            let gradient = createGradient(gradientId, colors[i][0])
            defs.appendChild(gradient);
            gradientHash.set(gradientId, true)
        }

        svg.appendChild(rect)
        col++
    }

    return svg
}

function createGradient(id = 'defaultGradient', colors) {

    let color1 = colors[0];
    let color2 = colors.length > 1 ? colors[1] : colors[0]; // Use the first color as default if only one is provided

    // Create a linearGradient element
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.setAttribute('id', id);
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%'); // Start at the top
    linearGradient.setAttribute('x2', '0%'); // Centered horizontally
    linearGradient.setAttribute('y2', '100%'); // End at the bottom

    // Create the first stop at 0% for color1
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', color1);
    stop1.setAttribute('stop-opacity', '1'); // Fully visible
    linearGradient.appendChild(stop1);

    // Create the second stop at 50% for color2
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', color1);
    stop2.setAttribute('stop-opacity', '1'); // Fully visible
    linearGradient.appendChild(stop2);

    // Create the second stop at 50% for color2
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '50%');
    stop3.setAttribute('stop-color', color2);
    stop3.setAttribute('stop-opacity', '1'); // Fully visible
    linearGradient.appendChild(stop3);

    // Create a final stop at 100% for color2 to ensure it remains solid
    const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop4.setAttribute('offset', '100%');
    stop4.setAttribute('stop-color', color2);
    stop4.setAttribute('stop-opacity', '1'); // Fully visible
    linearGradient.appendChild(stop4);

    // Return the gradient element
    return linearGradient;
}
