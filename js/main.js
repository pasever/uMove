var config = {
    apiKey: "AIzaSyC5AelpScvlFmvMj7LmkSdyU-bJWeEu-cI",
    authDomain: "umove-c0450.firebaseapp.com",
    databaseURL: "https://umove-c0450.firebaseio.com",
    projectId: "umove-c0450",
    storageBucket: "umove-c0450.appspot.com",
    messagingSenderId: "175940356512"
};
firebase.initializeApp(config);

//var population = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/cities";

$(".dropdown-item").on("click", function (e) {
    e.preventDefault();
    //$(".table").html();
    $("#chart").empty();
    //$("#chart").html();

    $("#images").html("");



    //if (userInput)
    var userInput = $(this).children()["0"].innerText.toLowerCase();
    console.log(userInput);

    if (userInput.indexOf(' ') >= 0) {
        console.log("contains spaces");
        userInput = userInput.replace(/\s+/g, '-');
        console.log(userInput);

    }

    $("#cityName").html(userInput.toUpperCase());

    //if (userInput)
    var queryURL = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/images/";
    var queryURL2 = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/scores/";
    var queryURL3 = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/salaries/";




    $.ajax({
        url: queryURL,
        method: "GET"

    })
            // After data comes back from the request
            .done(function (response) {

                var picture = response.photos[0].image.web;
                var newDiv = $("<div>");
                var newImg = $("<img>");
                newImg.attr("src", picture);
                newDiv.prepend(newImg);
                $("#images").prepend(newDiv);
                $(newImg).prepend(picture);

            });

    $.ajax({
        url: queryURL2,
        method: "GET"

    })
            // After data comes back from the request
            .done(function (response) {
                grph.data.labels = [];
                console.log(grph.data.labels);
                grph.data.datasets[0].data = [];
                console.log(grph.data.datasets[0].data);
                //grph.data.datasets = []; 
                var summary = response.summary;
                $("#summary").html(summary);


                for (var i = 0; i < response.categories.length; i++) {
                    var catNames = response.categories[i].name;
                    // console.log(catNames);
                    var labelObj = grph.data.labels;
                    // console.log(labelObj);
                    labelObj.push(catNames);
                    var catScore = response.categories[i].score_out_of_10.toFixed(2);
                    // console.log(catScore);
                    var dataObj = grph.data.datasets[0].data;
                    dataObj.push(catScore);
                    var catColor = response.categories[i].color;
                    var objColor = grph.data.datasets[0].backgroundColor;
                    objColor.push(catColor);
                    var chartG = new Chart(document.getElementById("bar-chart-horizontal"), grph);


                }


            });


    $.ajax({
        url: queryURL3,
        method: "GET"

    })
            // After data comes back from the request
            .done(function (response) {



                var salaryName = [];
                var salaryMin = [];
                var salaryAvg = [];
                var salaryMax = [];

                var trace1 = {
                    x: salaryName,
                    y: salaryMin,
                    type: 'bar',
                    text: salaryMin,
                    textposition: 'auto',
                    hoverinfo: 'none',
                    opacity: 0.5,
                    name: 'Salary Min',
                    marker: {
                        color: 'rgb(158,151,105)',
                        line: {
                            color: 'rbg(168,48,107)',
                            width: 1.5
                        }
                    }
                };

                var trace2 = {
                    x: salaryName,
                    y: salaryAvg,
                    type: 'bar',
                    text: salaryAvg,
                    textposition: 'auto',
                    hoverinfo: 'none',
                    name: 'Salary Avg',
                    marker: {
                        color: 'rgba(58,200,225,.5)',
                        line: {
                            color: 'rbg(8,48,107)',
                            width: 1.5
                        }
                    }
                };

                var trace3 = {
                    x: salaryName,
                    y: salaryMax,
                    type: 'bar',
                    text: salaryMax,
                    textposition: 'auto',
                    hoverinfo: 'none',
                    name: 'Salary Max',
                    marker: {
                        color: 'rgba(58,200,56,.5)',
                        line: {
                            color: 'rbg(8,48,107)',
                            width: 1.5
                        }
                    }
                };


                var salaries = response.salaries;

                jobName = salaries[51].job.id;
                salaryMin.push(salaries[51].salary_percentiles.percentile_25.toFixed(2), salaries[45].salary_percentiles.percentile_25.toFixed(2),
                        salaries[32].salary_percentiles.percentile_25.toFixed(2));

                salaryAvg.push(salaries[51].salary_percentiles.percentile_50.toFixed(2), salaries[45].salary_percentiles.percentile_50.toFixed(2),
                        salaries[32].salary_percentiles.percentile_50.toFixed(2));

                salaryMax.push(salaries[51].salary_percentiles.percentile_75.toFixed(2), salaries[45].salary_percentiles.percentile_75.toFixed(2),
                        salaries[32].salary_percentiles.percentile_75.toFixed(2));
                salaryName.push(salaries[51].job.id, salaries[45].job.id, salaries[32].job.id);

                console.log(salaryMin);
                console.log(salaryAvg);
                console.log(salaryMax);
                // 51 50 48 46 45 32
                var data = [trace1, trace2, trace3];

                var layout = {
                    title: 'Goal Salaries after the BootCamp'
//                    legend: {
//                        x: 1,
//                        y: 1
//                    }

                };

                Plotly.newPlot('myDiv', data, layout);



            });

});


var grph = {
    type: 'horizontalBar',
    data: {
        labels: [],

        datasets: [
            {
                label: "City Index",
                backgroundColor: [],
                data: []

            }
        ]
    },

    options: {
        legend: {display: false},
        title: {
            display: true,
            text: 'City Chart Indexes'
        }
    }

};


// 51 50 48 46 45 32 

//var chartS = Highcharts.chart('container', {
//    chart: {
//        type: 'column'
//    },
//    title: {
//        text: 'Stacked column chart'
//    },
//    xAxis: {
//        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
//    },
//    yAxis: {
//        min: 0,
//        title: {
//            text: 'Total fruit consumption'
//        }
//    },
//    tooltip: {
//        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
//        shared: true
//    },
//    plotOptions: {
//        column: {
//            stacking: 'percent'
//        }
//    },
//    series: [{
//        name: 'John',
//        data: [5, 3, 4, 7, 2]
//    }, {
//        name: 'Jane',
//        data: [2, 2, 3, 2, 1]
//    }, {
//        name: 'Joe',
//        data: [3, 4, 4, 2, 5]
//    }]
//});
