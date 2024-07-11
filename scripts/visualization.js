const width = 960;
const height = 500;

const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const scenes = [
    { id: "scene1", title: "Total Cases", description: "Overview of Total COVID-19 Cases", render: renderScene1 },
    { id: "scene2", title: "Total Deaths", description: "Overview of Total COVID-19 Deaths", render: renderScene2 },
    { id: "scene3", title: "Total Vaccinations", description: "Overview of Total COVID-19 Vaccinations", render: renderScene3 }
];

let data;

// Load the CSV data
d3.csv("data/owid-covid-data.csv").then(loadedData => {
    data = loadedData;
    processData();
    showScene(currentScene);
});

function processData() {
    data.forEach(d => {
        d.total_cases = +d.total_cases;
        d.total_deaths = +d.total_deaths;
        d.total_vaccinations = +d.total_vaccinations;
    });
}

function renderScene1() {
    svg.selectAll("*").remove();
    const totalCases = d3.sum(data, d => d.total_cases);
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height / 2)
       .attr("text-anchor", "middle")
       .text(`Total COVID-19 Cases: ${totalCases}`);
    createAnnotation(100, 100, `Total cases: ${totalCases}`);
}

function renderScene2() {
    svg.selectAll("*").remove();
    const totalDeaths = d3.sum(data, d => d.total_deaths);
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height / 2)
       .attr("text-anchor", "middle")
       .text(`Total COVID-19 Deaths: ${totalDeaths}`);
    createAnnotation(100, 100, `Total deaths: ${totalDeaths}`);
}

function renderScene3() {
    svg.selectAll("*").remove();
    const totalVaccinations = d3.sum(data, d => d.total_vaccinations);
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height / 2)
       .attr("text-anchor", "middle")
       .text(`Total COVID-19 Vaccinations: ${totalVaccinations}`);
    createAnnotation(100, 100, `Total vaccinations: ${totalVaccinations}`);
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