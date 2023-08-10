document.addEventListener('DOMContentLoaded', () => {
    const gridStyleSelect = document.getElementById('GridStyle');
    const gridContainer = document.querySelector('.SketchBox');
    const getColorInput = document.getElementById('colorInput');
    const clearButton = document.querySelector('.Clear');
    const rainbowButton = document.querySelector('.Rainbow');
    let isGridSet = false;
    let selectedColor = "#000000"; // Default color
   

    getColorInput.addEventListener("input", (e) => {
        selectedColor = e.target.value;
        console.log(`Your chosen color is ${selectedColor}`);
    });
    rainbowButton.addEventListener("click", (e) =>{
        e.preventDefault()
        if(rainbowButton.classList.contains("active")){
            rainbowButton.classList.remove("active");
        }else{
            rainbowButton.classList.add("active");
        }
    })
    const rainbowColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
    gridContainer.addEventListener("mousemove", (e) => {
        if(isGridSet && e.buttons === 1){
            e.preventDefault();
            e.target.style.backgroundColor = selectedColor;
            const rainbowModeActive = rainbowButton.classList.contains("active")
            if(rainbowModeActive){
                const randomColorIndex = Math.floor(Math.random() * rainbowColors.length);
                e.target.style.backgroundColor = rainbowColors[randomColorIndex];
            }
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



    const createGrid = (rows, cols) => {
        gridContainer.textContent = "";
        isGridSet = true;

        const blockWidth = (gridContainer.clientWidth - 1) / cols;
        const blockHeight = (gridContainer.clientHeight - 1) / rows;
        gridContainer.style.display = "flex";
        gridContainer.style.flexWrap = "wrap";
        gridContainer.style.backgroundColor = "white";

        const totalCubes = rows * cols;

        for (let i = 0; i < totalCubes; i++) {
            const gridCube = document.createElement("div");
            gridCube.style.width = `${blockWidth}px`;
            gridCube.style.height = `${blockHeight}px`;
            gridCube.className = "onebyoneblock";
            gridContainer.appendChild(gridCube);
        }
    };
    // Call the createGrid function with the default value of 16x16
    createGrid(16, 16);





    gridStyleSelect.addEventListener("change", () => {
        const selectedGrid = gridStyleSelect.value;
        const [rows, cols] = selectedGrid.split("x");
        gridContainer.textContent = "";
        isGridSet = true;
        
        const blockWidth = (gridContainer.clientWidth - 1) / cols;
        const blockHeight = (gridContainer.clientHeight - 1) / rows;
        gridContainer.style.display = "flex";
        // We calculate the block width and heigth, so it's scale appropriatelly
        // to the cubes are within the gridcontainer.
        gridContainer.style.flexWrap = "wrap";
        gridContainer.style.backgroundColor= "white";
        
        const totalCubes = rows * cols;

        for (let i = 0; i < totalCubes; i++) {
            const gridCube = document.createElement("div");
            gridCube.style.width = `${blockWidth}px`;
            gridCube.style.height = `${blockHeight}px`;
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
        const blockWidth = (gridContainer.clientWidth - 1) / col;
        const blockHeight = (gridContainer.clientHeight - 1) / row;
        const totalCube = row * col;
        for (let i = 0; i < totalCube; i++) {
            const gridCube = document.createElement("div");
            gridCube.className = "onebyoneblock";
            gridCube.style.width = `${blockWidth}px`;
            gridCube.style.height = `${blockHeight}px`;
            gridContainer.appendChild(gridCube);
        }
    }else{
        notificationText.textContent = `Incorrect format "${inputValue}"`;
        notificationText.style.display = "block";
        notificationText.style.color = "red"
    }

    
    });

});