
//Function for get a hex ramdom color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Function for display the message
const message = (renderedChildren, numberOfChildren) => {
    //We validate that if renderedChildren is less than numberOfChildren, 
    //we display a message to the user. As the instruction states, 
    // since not all squares fit, we need to do so
    //For the case where there are missing squares, it's not necessary,
    //in theory, there are no more squares to paint and none are left over.
    if (renderedChildren < numberOfChildren) {
        const m = document.getElementById('message');
        const child = document.createElement('div');
        child.textContent = `Rendered ${renderedChildren} out of ${numberOfChildren} children.`;
        m.appendChild(child)
    }
}

//Function for draw the child squares
const drawChild = (childSize) => {
    const child = document.createElement('div');
    child.className = 'child';
    child.style.setProperty('--size', `${childSize}px`);
    child.style.setProperty('--color', getRandomColor());

    //Here,we are listening when the user focus any square and we chagen the color,
    // and we add a two second timer to delete the square after this time.
    child.addEventListener('mouseenter', () => {
        //here we get the ramdom color to draw the square
        child.style.backgroundColor = getRandomColor();
        child.timeout = setTimeout(() => {
            child.style.display = 'none';
        }, 2000);
    });

    //Here,we are listening when the user has unfocused the previously focused square, 
    //and the timeout it canceled.
    //If we remove this code, when the user focus the sqaure it will be removed in any way 
    //after to seconds.
    child.addEventListener('mouseleave', () => {
        clearTimeout(child.timeout);
    });

    return child;
}

//Function for draw the main container and calculate the rest of the sqaure to be draw
const drawContainer = (containerSize, childSize, numberOfChildren) => {
    //Here, we get the main div
    const container = document.getElementById('main');
    //we give the dimensions of the main container
    container.style.width = `${containerSize}px`;
    container.style.height = `${containerSize}px`;

    //we have the value "numberOfChildren", but this is just a reference
    //beacause we can't paint 100 square in a main square 10x10 wuth 200px childSize
    //so, we calculate how many square can be painted 
    let squares = Math.floor(containerSize / childSize);

    // we declare a value to count our painted squares
    let renderedChildren = 0;


    //Here, beacause is a Square, We need to create a for loop inside other for loop
    //this beacuase we new to paint rows and columns and this is how it works
    // when row is equal to 0 and we increase only col, so 
    //square 01,02,03,04,05 ... are goint to be painted
    //then in the next loop is gonna be 11,12,13,14 and son
    for (let row = 0; row < squares; row++) {
        for (let col = 0; col < squares; col++) {
            //Here we validate depending of renderedChildren and numberOfChildren
            //if we can still painting square,
            //the for loop increase the counter depending of "square" value
            //and we increase "renderedChildren" y each loop, so
            //if renderedChildren or squares is greater than numberOfChildren
            //that means we cannot still painting squares
            if (renderedChildren >= numberOfChildren) {
                break;
            } else {
                const child = drawChild(childSize);
                //Here we set the "position" of the square
                //in a way that they do not overlap with each other.
                child.style.top = `${row * childSize}px`;
                child.style.left = `${col * childSize}px`;
                container.appendChild(child);
                //Here we increase renderedChildren counter
                renderedChildren++;
            }

        }
    }
    //Here we call the function to display the message
    message(renderedChildren, numberOfChildren)
};

document.addEventListener('DOMContentLoaded', () => {
    //We initialize the square
    drawContainer(200, 50, 16);
    //We initialize the form
    const inputForm = document.getElementById('form');
    inputForm.addEventListener('submit', function (e) {
        e.preventDefault();
        //We get the values from the each input
        const containerSize = parseInt(document.getElementById('containerSize').value);
        const childSize = parseInt(document.getElementById('childSize').value);
        const numberOfChildren = parseInt(document.getElementById('numberOfChildren').value);
        drawContainer(containerSize, childSize, numberOfChildren);
    });
    inputForm.addEventListener('reset', function (e) {
        window.location.reload()
    });
});

