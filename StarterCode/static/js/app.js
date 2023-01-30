const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

let dropdownMenu = d3.select("#selDataset");


//fetch json data
d3.json(url).then(function (data) {
    console.log(data);
    let name_list = data.names;

    for (let i = 0; i < name_list.length; i++) {
        dropdownMenu
            .append("option")
            .text(name_list[i])
            .property("value", name_list[i]);
    };


    //   name_list.forEach((id) => {
    //     dropdownMenu
    //       .append("option")
    //       .property("value", id)
    //       .text(id);
    //   });

    getMetadata(name_list[0])
    buildCharts(name_list[0])

});

function optionChanged(id) {
    getMetadata(id)
    buildCharts(id)
}

function getMetadata(id) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let filtered_metadata = metadata.filter(person => person.id == id);
        console.log(filtered_metadata)
        let box = d3.select("#sample-metadata");
        box.html("");

        Object.entries(filtered_metadata[0]).forEach(([key, value]) => {
            box.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });

}

function buildCharts(id) {
    d3.json(url).then(function (data) {
        //console.log(data);
        let sample_list = data.samples;
        let resultArray = sample_list.filter(sampleObj => sampleObj.id == id);
        let resultVals = resultArray[0];
        console.log(resultVals);
        let sliced_otu_ids = resultVals.otu_ids.slice(0, 10);
        let y_vals = sliced_otu_ids.map(data => `OTU ID: ${data}`);
        let sliced_sample_values = resultVals.sample_values.slice(0,10);
        let sliced_otu_labels = resultVals.otu_labels.slice(0,10);
        let bar_chart = d3.select('#bar');
        let barchart_data = [{
            //values: sliced_sample_values,
            //labels: sliced_otu_ids,
            x: sliced_sample_values,
            y : y_vals,
            type: "bar",
            orientation: 'h',
            hovertext: sliced_otu_labels
          }];
          console.log(sliced_sample_values);
          console.log(sliced_otu_ids);
          console.log(sliced_otu_labels);
        Plotly.newPlot('bar', barchart_data);
        
}   

)};


// };

