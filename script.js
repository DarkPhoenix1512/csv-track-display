document.addEventListener('DOMContentLoaded', function() {
    function loadCSV(callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    console.error('Fehler beim Laden der CSV-Datei.');
                }
            }
        };
        xhr.open('GET', 'data/points.csv', true);
        xhr.send();
    }

    function drawPoints(csvData) {
        var csvArray = csvData.trim().split('\n').map(function(row) {
            return row.split('\t');
        });

        var canvas = document.getElementById('canvas');
        var canvasWidth = canvas.clientWidth;
        var canvasHeight = canvas.clientHeight;

        for (var i = 0; i < csvArray.length; i++) {
            var posX = parseFloat(csvArray[i][1]);
            var posZ = parseFloat(csvArray[i][3]);

            var point = document.createElement('div');
            point.className = 'point';
            var pointX = Math.min(Math.max(posX * 5 + canvasWidth / 2 - 1.5, 0), canvasWidth - 3);
            var pointY = Math.min(Math.max(-posZ * 5 + canvasHeight / 2 - 1.5, 0), canvasHeight - 3);
            point.style.left = pointX + 'px';
            point.style.top = pointY + 'px';
            canvas.appendChild(point);
        }

        var origin = document.createElement('div');
        origin.className = 'origin';
        origin.style.left = (canvasWidth / 2 - 3) + 'px';
        origin.style.top = (canvasHeight / 2 - 3) + 'px';
        canvas.appendChild(origin);

        function loadNodesAndDrawPoints() {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var nodes = JSON.parse(xhr.responseText).nodes;
                        drawNodePoints(nodes);
                    } else {
                        console.error('Fehler beim Laden der Node-Daten.');
                    }
                }
            };
            xhr.open('GET', 'data/nodes.json', true);
            xhr.send();
        }

        function drawNodePoints(nodes) {
            nodes.forEach(function(nodeNumber) {
                var posX = parseFloat(csvArray[nodeNumber][1]);
                var posZ = parseFloat(csvArray[nodeNumber][3]);

                var nodePoint = document.createElement('div');
                nodePoint.className = 'node-point';
                var nodePointX = Math.min(Math.max(posX * 5 + canvasWidth / 2 - 5, 0), canvasWidth - 10);
                var nodePointY = Math.min(Math.max(-posZ * 5 + canvasHeight / 2 - 5, 0), canvasHeight - 10);
                nodePoint.style.left = nodePointX + 'px';
                nodePoint.style.top = nodePointY + 'px';
                canvas.appendChild(nodePoint);
            });
        }

        loadNodesAndDrawPoints();
    }

    loadCSV(drawPoints);
});
