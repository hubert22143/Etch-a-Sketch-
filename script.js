document.addEventListener('DOMContentLoaded', () => {
    const gridStyleSelect = document.getElementById('GridStyle');
    const gridContainer = document.querySelector('.SketchBox');
    const getColorInput = document.getElementById('colorInput');
    const clearButton = document.querySelector('.Clear');
    let isGridSet = false;
    let selectedColor = "#000000"; // Default color


    getColorInput.addEventListener("input", (e) => {
        selectedColor = e.target.value;
        console.log(`Your chosen color is ${selectedColor}`);
    });




    gridContainer.addEventListener("mousemove", (e) => {
        if(isGridSet && e.buttons === 1){
            e.preventDefault();
            e.target.style.backgroundColor = selectedColor;
        }
    });



    gridContainer.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });


    clearButton.addEventListener("click", (e) => {
        e.preventDefault();
        const gridCubes = document.querySelectorAll('.onebyoneblock');
        gridCubes.forEach(cube =>{
        cube.style.backgroundColor = "white";
        })

    })









    gridStyleSelect.addEventListener("change", () => {
        const selectedGrid = gridStyleSelect.value;
        const [rows, cols] = selectedGrid.split("x");
        gridContainer.textContent = "";
        isGridSet = true;
        
        const blockWidth = 12; // Width of each block in pixels
        const blockHeight = 12; // Height of each block in pixels
        gridContainer.style.display = "flex";
        // We calculate the container width and heigth because we need it to
        // scale appropriatelly to the elements there are in the box.
        // it is needed so the flexwrap work correctly.
        gridContainer.style.width = `${blockWidth * cols}px`; // Calculate container width
        gridContainer.style.height = `${blockHeight * rows}px`; // Calculate container height
        gridContainer.style.flexWrap = "wrap";

        const totalCubes = rows * cols;
        
        for (let i = 0; i < totalCubes; i++) {
            const gridCube = document.createElement("div");
            gridCube.className = "onebyoneblock";
            gridContainer.appendChild(gridCube);
        }
    });
    const submitbutton = document.getElementById('GridSubmit');
    const input = document.getElementById('textInput');
    const notificationText = document.getElementById('notificationText');
    const regexCorrectForm = /^\d+x\d+$/;
    submitbutton.addEventListener("click", (e) => {
        e.preventDefault();
    const inputValue = input.value;

    if(regexCorrectForm.test(inputValue)){
        isGridSet = true;
        notificationText.style.display = "none";
        gridContainer.textContent = "";
        const [row,col] = inputValue.split("x")
        const blockWidth = 12;
        const blockHeight = 12;
        gridContainer.style.width = `${blockWidth * col}px`;
        gridContainer.style.height = `${blockHeight * row}px`;
        const totalCube = row * col;
        for (let i = 0; i < totalCube; i++) {
            const gridCube = document.createElement("div");
            gridCube.className = "onebyoneblock";
            gridContainer.appendChild(gridCube);
        }
    }else{
        notificationText.textContent = `Incorrect format "${inputValue}"`;
        notificationText.style.display = "block";
        notificationText.style.color = "red"
    }

    
    });

});