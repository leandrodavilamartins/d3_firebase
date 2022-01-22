const update = (data) => {
    //1.update scales ( domains ) if they rely on our data 
    y_scale.domain([0,d3.max(data, d => d.orders)])

    //2. join updated data to elements 
    const rects = graph.selectAll('rect').data(data)

    //3. remove unwanted ( if any) shapes using the exit selection 
    rects.exit().remove();

    //4. update current shapes in the dom 
    rects.attr(...etc)

    //5. append the enter selection to the dom 
    rects.enter().append('rect').attr(...etc)

}