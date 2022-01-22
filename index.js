
const data =[]
db.collection('countries').get().then(res => {
    res.docs.forEach(doc => {
        //console.log(doc.data())
        let res_object = doc.data()
        for(const key in res_object) {
            //console.log(key);
            //console.log(res_object[key])
            let country_object = {name: `${key}`, value: `${res_object[key]}`}
            //console.log(country_object)
            data.push(country_object);
        }
    })
    let sortedData = data.sort((a,b) => (parseFloat(a.value) > parseFloat(b.value)) ? -1 : 1) // sort the data 
    console.log(sortedData);
    //console.log(data);
    generateGraph(sortedData); // generates the chart 
}) 

function generateGraph(data){  // You have to create an array of objects first 
    //console.log(data[0]);

    const graph = d3.select('#graph')
    //console.log(graph);

    //set dimensions 
    const width = 800;
    const height = 500;

    const margin = {top: 20, bottom: 20, left: 30, right: 30}

    //set svg 
    graph
    .attr('width', width)
    .attr('height', height)

    //set scales
    const x_scale = d3.scaleBand().range([margin.left,width - margin.right]).padding(0.1)
    const y_scale = d3.scaleLinear().range([height - margin.bottom, margin.top])
    
    x_scale.domain(data.map((d) => d.name));
    //d3.max expects an array of numbers, not of objects 
    y_scale.domain([0,d3.max(data, d => parseFloat(d.value))]);

    let x_axis = d3.axisBottom(x_scale)
    let y_axis = d3.axisLeft(y_scale)


    graph
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) =>  x_scale(d.name))
    .attr('y', (d) => y_scale(d.value))
    .attr('width', x_scale.bandwidth())
    .attr('height', (d) => height - margin.bottom - y_scale(d.value))

    graph
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(x_axis)

    graph
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(y_axis);
    
}