var config = {
    apiKey: "AIzaSyA-YYEL0pDCpuA4guq5O12kvzhnOAhhNi4",
    authDomain: "project3-ae711.firebaseapp.com",
    databaseURL: "https://project3-ae711.firebaseio.com",
    projectId: "project3-ae711",
    storageBucket: "project3-ae711.appspot.com",
    messagingSenderId: "944322481348"
};
firebase.initializeApp(config);

var clickCounter = 0;
var overall = [];
var database = firebase.database();

database.ref().on("value", function (snapshot) {

    var snap = snapshot.val();
    console.log(snap);
    var fireArray = Object.keys(snap);
    console.log(fireArray);

    var getKey = fireArray[0];
    console.log(getKey);
    var getObj = snap[getKey];
    console.log(getObj);
    var counter = getObj.clickCounter;
    console.log(counter);
    clickCounter = counter;



});



//var population = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/cities";
$("#bar-chart-horizontal").hide();
$("#weather").hide();
$(".hrLine").hide();


$(".dropdown-item").on("click", function (e) {
    e.preventDefault();

    clickCounter++;

//console.log($(this).HTML());

    var dataBase = database.ref().child("counter");

    dataBase.set({
        clickCounter: clickCounter

    });


    console.log(clickCounter);
    $("#chart").empty();
    $("#images").html("");
    $("#bar-chart-horizontal").show();
    $(".hrLine").show();


    //if (userInput)
    var userInput = $(this).children()["0"].innerText.toLowerCase();
    console.log(userInput);

    if (userInput.indexOf(' ') >= 0) {
        console.log("contains spaces");
        userInput = userInput.replace(/\s+/g, '-');
        console.log(userInput);
    }


//if (database.ref().child(userInput) == true) {
//    
//}
    $("#cityName").html(userInput.toUpperCase());

    //if (userInput)
    var queryURL = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/images/";
    var queryURL2 = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/scores/";
    var queryURL3 = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/salaries/";
    var queryURL4 = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/details/";




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
                    //console.log(typeof parseFloat(catScore));
                    overall.push(catScore);
                    console.log(overall);



                    //console.log(catScore.reduce(overall));
                    var dataObj = grph.data.datasets[0].data;
                    dataObj.push(catScore);
                    var catColor = response.categories[i].color;
                    var objColor = grph.data.datasets[0].backgroundColor;
                    objColor.push(catColor);
                    var chartG = new Chart(document.getElementById("bar-chart-horizontal"), grph);

                }

//                var config3 = liquidFillGaugeDefaultSettings();
//                config3.textVertPosition = 0.8;
//                config3.waveAnimateTime = 5000;
//                config3.waveHeight = 0.15;
//                config3.waveAnimate = false;
//                config3.waveOffset = 0.25;
//                config3.valueCountUp = false;
//                config3.displayPercent = false;
//                var gauge4 = loadLiquidFillGauge("fillgauge4", 123, config3);
//                
//                var config4 = liquidFillGaugeDefaultSettings();
//                config4.circleThickness = 0.15;
//                config4.circleColor = "#808015";
//                config4.textColor = "#555500";
//                config4.waveTextColor = "#FFFFAA";
//                config4.waveColor = "#AAAA39";
//                config4.textVertPosition = 0.8;
//                config4.waveAnimateTime = 1000;
//                config4.waveHeight = 0.05;
//                config4.waveAnimate = true;
//                config4.waveRise = false;
//                config4.waveHeightScaling = false;
//                config4.waveOffset = 0.25;
//                config4.textSize = 0.75;
//                config4.waveCount = 3;
//
//                function NewValue() {
//                    if (Math.random() > .5) {
//                        return Math.round(Math.random() * 100);
//                    } else {
//                        return (Math.random() * 100).toFixed(1);
//                    }
//                }

//console.log(loadLiquidFillGauge);
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

                // 51 50 48 46 45 32
                var data = [trace1, trace2, trace3];

                var layout = {
                    title: 'Goal Salaries after the BootCamp'
                };

                Plotly.newPlot('myDiv', data, layout);



            });

    $.ajax({
        url: queryURL4,
        method: "GET"

    })
            // After data comes back from the request
            .done(function (response) {
                $("#weather").show();
                var results = response;
                var sunny = results.categories[2].data[1].float_value;
                var sunnyLabel = results.categories[2].data[1].label;
                var rainy = results.categories[2].data[2].float_value;
                var rainyLabel = results.categories[2].data[2].label;
                var days = results.categories[2].data[0].float_value;
                var daysLabel = results.categories[2].data[0].label;
                console.log(days);
                $("#sun").html(sunny);
                $("#sunLabel").html(sunnyLabel);
                $("#rain").html(rainy);
                $("#rainLabel").html(rainyLabel);
                $("#length").html(days);
                $("#lengthLabel").html(daysLabel);


            });




//            database.ref().push({
//            clickCounter: clickCounter
//                    // dateAdded: firebase.database.ServerValue.TIMESTAMP
//        });

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
