// put API config in .env file
let config = {};
firebase.initializeApp(config);

let clickCounter = 0;
let overall = [];
let database = firebase.database();

database.ref().on("value", function (snapshot) {

    let snap = snapshot.val();
    console.log(snap);
    let fireArray = Object.keys(snap);
    console.log(fireArray);

    let getKey = fireArray[0];
    console.log(getKey);
    let getObj = snap[getKey];
    console.log(getObj);
    let counter = getObj.clickCounter;
    console.log(counter);
    clickCounter = counter;


});



//let population = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/cities";
$("#bar-chart-horizontal").hide();
$("#weather").hide();
$(".hrLine").hide();


$(".dropdown-item").on("click", function (e) {
    e.preventDefault();

    clickCounter++;

    //console.log($(this).HTML());

    let dataBase = database.ref().child("counter");

    dataBase.set({
        clickCounter: clickCounter

    });


    console.log(clickCounter);
    $("#chart").empty();
    $("#images").html("");
    $("#bar-chart-horizontal").show();
    $(".hrLine").show();


    //if (userInput)
    let userInput = $(this).children()["0"].innerText.toLowerCase();
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
    let queryURL = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/images/";
    let queryURL2 = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/scores/";
    let queryURL3 = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/salaries/";
    let queryURL4 = "https://api.teleport.org/api/urban_areas/slug:" + userInput + "/details/";




    $.ajax({
            url: queryURL,
            method: "GET"

        })
        // After data comes back from the request
        .done(function (response) {

            let picture = response.photos[0].image.web;
            let newDiv = $("<div>");
            let newImg = $("<img>");
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
            let summary = response.summary;
            $("#summary").html(summary);


            for (let i = 0; i < response.categories.length; i++) {
                let catNames = response.categories[i].name;
                // console.log(catNames);
                let labelObj = grph.data.labels;
                // console.log(labelObj);
                labelObj.push(catNames);
                let catScore = response.categories[i].score_out_of_10.toFixed(2);
                //console.log(typeof parseFloat(catScore));
                overall.push(catScore);
                console.log(overall);




                //console.log(catScore.reduce(overall));
                let dataObj = grph.data.datasets[0].data;
                dataObj.push(catScore);
                let catColor = response.categories[i].color;
                let objColor = grph.data.datasets[0].backgroundColor;
                objColor.push(catColor);
                let chartG = new Chart(document.getElementById("bar-chart-horizontal"), grph);

            }
            console.log(overall);
            let sum = overall.reduce((total, amount) => total + amount);
            console.log(sum);
        });


    $.ajax({
            url: queryURL3,
            method: "GET"

        })
        // After data comes back from the request
        .done(function (response) {


            let salaryName = [];
            let salaryMin = [];
            let salaryAvg = [];
            let salaryMax = [];

            let trace1 = {
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

            let trace2 = {
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

            let trace3 = {
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


            let salaries = response.salaries;

            jobName = salaries[51].job.id;
            salaryMin.push(salaries[51].salary_percentiles.percentile_25.toFixed(2), salaries[45].salary_percentiles.percentile_25.toFixed(2),
                salaries[32].salary_percentiles.percentile_25.toFixed(2));

            salaryAvg.push(salaries[51].salary_percentiles.percentile_50.toFixed(2), salaries[45].salary_percentiles.percentile_50.toFixed(2),
                salaries[32].salary_percentiles.percentile_50.toFixed(2));

            salaryMax.push(salaries[51].salary_percentiles.percentile_75.toFixed(2), salaries[45].salary_percentiles.percentile_75.toFixed(2),
                salaries[32].salary_percentiles.percentile_75.toFixed(2));
            salaryName.push(salaries[51].job.id, salaries[45].job.id, salaries[32].job.id);

            // 51 50 48 46 45 32
            let data = [trace1, trace2, trace3];

            let layout = {
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
            let results = response;
            let sunny = results.categories[2].data[1].float_value;
            let sunnyLabel = results.categories[2].data[1].label;
            let rainy = results.categories[2].data[2].float_value;
            let rainyLabel = results.categories[2].data[2].label;
            let days = results.categories[2].data[0].float_value;
            let daysLabel = results.categories[2].data[0].label;
            console.log(days);
            $("#sun").html(sunny);
            $("#sunLabel").html(sunnyLabel);
            $("#rain").html(rainy);
            $("#rainLabel").html(rainyLabel);
            $("#length").html(days);
            $("#lengthLabel").html(daysLabel);


        });

});


let grph = {
    type: 'horizontalBar',
    data: {
        labels: [],

        datasets: [{
            label: "City Index",
            backgroundColor: [],
            data: []

        }]
    },

    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'City Chart Indexes'
        }
    }

};
