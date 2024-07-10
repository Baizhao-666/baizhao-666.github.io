const width = 960;
const height = 500;

const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const scenes = [
    { id: "scene1", title: "Introduction", description: "Overview of Car Sales Data", render: renderScene1 },
    { id: "scene2", title: "Main Content", description: "Best-Selling Car Models", render: renderScene2 },
    { id: "scene3", title: "Conclusion", description: "Summary of Findings", render: renderScene3 }
];

function renderScene1() {
    svg.selectAll("*").remove();
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height / 2)
       .attr("text-anchor", "middle")
       .text("Introduction: Overview of Car Sales Data");
    createAnnotation(100, 100, "Total cars sold: 500,000");
}

function renderScene2() {
    svg.selectAll("*").remove();
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height / 2)
       .attr("text-anchor", "middle")
       .text("Main Content: Best-Selling Car Models");
    createAnnotation(100, 100, "Top model: Model X with 50,000 sales");
}

function renderScene3() {
    svg.selectAll("*").remove();
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height / 2)
       .attr("text-anchor", "middle")
       .text("Conclusion: Summary of Findings");
    createAnnotation(100, 100, "Explore more details about car sales.");
}

function createAnnotation(x, y, text) {
    svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .text(text)
        .attr("class", "annotation");
}

let currentScene = 0;

function showScene(index) {
    if (index >= 0 && index < scenes.length) {
        currentScene = index;
        scenes[currentScene].render();
        updateNavigation();
    }
}

function updateNavigation() {
    document.getElementById("prevButton").disabled = (currentScene === 0);
    document.getElementById("nextButton").disabled = (currentScene === scenes.length - 1);
}

document.getElementById("nextButton").addEventListener("click", () => showScene(currentScene + 1));
document.getElementById("prevButton").addEventListener("click", () => showScene(currentScene - 1));

showScene(currentScene);
