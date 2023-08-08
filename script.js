document.addEventListener('DOMContentLoaded', () => {
    const gridStyleSelect = document.getElementById('GridStyle');
    const gridContainer = document.querySelector('.SketchBox');
    
    gridStyleSelect.addEventListener("change", () => {
        const selectedGrid = gridStyleSelect.value;
        const [rows, cols] = selectedGrid.split("x");
        gridContainer.textContent = "";

        const blockWidth = 12; // Width of each block in pixels
        const blockHeight = 12; // Height of each block in pixels
        gridContainer.style.display = "flex";
        // We calculate the container width and heigth because we need it to
        // scale appropriatelly to the elements there are in the box.
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
});