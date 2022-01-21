const country_data = [{country:[], value:[]}];
const data =[]
db.collection('countries').get().then(res => {
    res.docs.forEach(doc => {
        //console.log(doc.data())
        let res_object = doc.data()
        for(const key in res_object) {
            //console.log(key);
            //console.log(res_object[key])
            let country_object = {name: `${key}`, valor: `${res_object[key]}`}
            console.log(country_object)
        }
    })
    //generateGraph(data);
}) 

function generateGraph(data){  // You have to create an array of objects first 
    //console.log(data[0]);

    for(const key in data[0] ){
        country_data[0].country.push(key)
        let value_holder = data[0][key]
        //console.log(value_holder);
        country_data[0].value.push(value_holder)
    }
    //console.log(country_data[0].country);
    //console.log(country_data[0].value);

    //console.log(country_data);

    const graph = d3.select('#graph')
    //console.log(graph);

    //set dimensions 
    const width = 500;
    const height = 500;

    const margin = {top: 20, bottom: 20, left: 30, right: 30}

    //set svg 
    graph
    .attr('width', width)
    .attr('height', height)

    //set scales
    const x_scale = d3.scaleBand().range([margin.left,width - margin.right]).padding(0.1)
    const y_scale = d3.scaleLinear().range([height - margin.bottom, margin.top])
    
    x_scale.domain(country_data[0].country.map((d) => d.country));
    y_scale.domain([0,d3.max(country_data[0].value, (d) => d.value)])

    graph
    .selectAll('rect')
    .data(country_data[0])
    .join('rect')
    .attr('x', (d) =>  x_scale(d.country))
    .attr('y', (d) => y_scale(d.value))
    .attr('width', x_scale.bandwidth())
    .attr('height', (d) => height - margin.bottom - y_scale(d.value))
    
}