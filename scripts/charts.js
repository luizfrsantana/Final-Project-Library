const JSON_FILE_URL = '/data/bookData.json';

$(document).ready(function() {
    $.getScript("https://cdn.jsdelivr.net/npm/chart.js", function() {
        $.getJSON(JSON_FILE_URL, function(data) {

            const labels = data.map(entry => entry.title);
            const totalData = data.map(entry => entry.total);
            const availablesData = data.map(entry => entry.availables);

            var barCtx = document.getElementById('barChart').getContext('2d');
            var barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total',
                        data: totalData,
                        backgroundColor: '#1b98e0'
                    }, {
                        label: 'Availables',
                        data: availablesData,
                        backgroundColor: '#98fb98'
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })
        .fail(function(error) {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
    });
});