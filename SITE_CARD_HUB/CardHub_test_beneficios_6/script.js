const ctx = document.getElementById('benefitsChart');


new Chart(ctx, {

    type: 'line',

    data: {

        labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul'
        ],

        datasets: [

            {

                label: 'Benefícios utilizados',

                data: [
                    1200,
                    1800,
                    2200,
                    3100,
                    4000,
                    4800,
                    5600
                ],

                borderWidth: 3

            }

        ]

    },


    options: {

        responsive: true,

        plugins: {

            legend: {

                display: true

            }

        }

    }

});