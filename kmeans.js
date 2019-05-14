function calculate() {
    // Clear out closestPoints array
    document.getElementById('centroids').childNodes.forEach(function(centroid) {
        centroid.closestPoints = [];
    });

    // Calculate distances    
    document.getElementById('points').childNodes.forEach(function(point) {
        // compute distance to each centroid

        minDistance = Number.MAX_VALUE;
        document.getElementById('centroids').childNodes.forEach(function(centroid) {
            // TODO Make choosable distance metric
            distance = Math.abs(
                Math.sqrt(point.getAttribute("cx")**2 + point.getAttribute("cy")**2)
                - Math.sqrt(centroid.getAttribute("cx")**2 + centroid.getAttribute("cy")**2)
            )

            if (distance < minDistance) {
                minDistance = distance;
                centroid.closestPoints.push(point);
                point.closestCentroid = centroid;
            }
        })
    });

    // Set colors
    document.getElementById('points').childNodes.forEach(function(point) {
        point.setAttribute("fill", point.closestCentroid.getAttribute("fill"));
    });
}

function findcenter() {
    // Calculate mean and move centroids to it
    // TODO: If there are zero closest points, errors because NaN
    document.getElementById('centroids').childNodes.forEach(function(centroid) {
        cx = 0;
        cy = 0;
        n = 0;

        centroid.closestPoints.forEach(function(point) {
            cx += parseInt(point.getAttribute("cx"));
            cy += parseInt(point.getAttribute("cy"));
            n += 1;
        });

        centroid.setAttribute("cx", cx/n);
        centroid.setAttribute("cy", cy/n);
    });

    
    // Color all points black
    document.getElementById('points').childNodes.forEach(function(point) {
        point.setAttribute("fill", "black");
    });


}


// TODO Generate colors or something
let colors = ['red','blue','green','orange','purple']
function getColor(i) {
    return colors[i];
}

function new_points() {
    let n = 500;

    let points = document.getElementById("points");

    // Remove previous children
    while (points.firstChild) {
        points.removeChild(points.firstChild);
    }

    for (let i = 0; i < n; i++) {
        point = document.createElement("circle");
        point.setAttribute("r", "4");

        point.setAttribute("cy", Math.random() * canvas_height);
        point.setAttribute("cx", Math.random() * canvas_width);

        point.setAttribute("fill", "black");

        points.appendChild(point);
    }

    fixSVG();
}

function new_centroids() {
    let n = 5;

    let centroids = document.getElementById("centroids");

    // Remove previous children
    while (centroids.firstChild) {
        centroids.removeChild(centroids.firstChild);
    }

    for (let i = 0; i < n; i++) {
        centroid = document.createElement("circle");
        centroid.setAttribute("r", "10");

        centroid.setAttribute("cy", Math.random() * canvas_height);
        centroid.setAttribute("cx", Math.random() * canvas_width);

        centroid.setAttribute("fill", getColor(i));

        centroids.append(centroid);
    }

    fixSVG();    
}

function fixSVG() {
    document.getElementById('canvas').innerHTML = document.getElementById('canvas').innerHTML;
}

let canvas_width;
let canvas_height
document.addEventListener("DOMContentLoaded", function () {
    canvas_width = parseInt(window.getComputedStyle(document.getElementById('canvas')).width);
    canvas_height = parseInt(window.getComputedStyle(document.getElementById('canvas')).height);
    
    new_points();
    new_centroids();
});