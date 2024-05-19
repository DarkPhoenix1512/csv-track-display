document.addEventListener('DOMContentLoaded', function() {
    const csvPath = 'data/points.csv'; // Pfad zur CSV-Datei
    fetch(csvPath)
        .then(response => response.text())
        .then(csvData => {
            const rows = csvData.trim().split('\n');
            const tableBody = document.querySelector('#csvTable tbody');
            tableBody.innerHTML = '';
            rows.forEach(row => {
                const columns = row.trim().split('.');
                if (columns.length >= 13) {
                    const tr = document.createElement('tr');
                    for (let i = 0; i < 13; i++) {
                        const td = document.createElement('td');
                        td.textContent = columns[i];
                        tr.appendChild(td);
                    }
                    tableBody.appendChild(tr);
                }
            });
        })
        .catch(error => console.error('Error loading the CSV file:', error));
});
