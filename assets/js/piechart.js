var datasPie = [
    {"label":"unlock supply","number":"94115972","color":"#CDDC39" },
    {"label":"Locked supply","number":"146405042","color":"#FFEB3B" }
  ];
  
  drawPie(datasPie);
  
  function drawPie(data) {
    /* ------------ initialization/calculation ------------- */
    /* ----------------------------------------------------- */
    var $container = $('.js-pie-chart'),
        width = $container.width(),
        height = width/2,
        r = width/2,
        ir = r/2,
        pi = Math.PI;
  
    //pie structure
    var pie = d3.layout.pie();
        pie.padAngle(.02)
          .sort(null)
          .value(function (d) {
              return d.number;
          })
          .startAngle(-90 * (pi / 180))
          .endAngle(90 * (pi / 180));
  
    //tooltip div, content dynamically changed
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, -10])
        .html(function (d) {
            return '<p class="d3-tip__label">' + d.data.label + '</p><p>' + d.data.number + '</p>';
        });
    
    var arc = d3.svg.arc().outerRadius(r - 10).innerRadius(ir - 5),
        arcHover = d3.svg.arc().outerRadius(r).innerRadius(ir);
  
    /* ------------------ drawing ------------------------- */
    /* ----------------------------------------------------- */
    //draw svg element
    var object = d3.select('#pieChart').append('object')
        .attr('width','100%')
        .attr('height','auto')
        .style('display', 'block')
        .style('position', 'relative')
        .style('padding-top', height+'px');
  
    var vis = object.append('svg')
                .data([data])
                    .attr('width', '100%')
                    .attr('height', '100%')
                    .attr('viewBox','0 0 '+width +' '+height )
                    .attr('preserveAspectRatio','xMinYMin')
                    .style('position','absolute')
                    .style('top','0')
                    .style('left','0')
                    .append('g')
                      .attr('transform', 'translate(' + r + ',' + r + ')');
  
    //init tooltips
    vis.call(tip);
  
    //draw slices
    var arcs = vis.selectAll('g.slice')
        .data(pie)
        .enter()
        .append('g')
        .attr('class', 'slice');
  
    arcs.on('mouseover', function (d) {
            tip.show(d);
            $('.d3-tip').addClass('is-active');
        })
        .on('mouseout', function (d) {
            tip.hide(d);
            $('.d3-tip').removeClass('is-active');
        });
  
    //draw arcs
    arcs
        .append('path')
            .attr('fill', '#00796B')
            .attr('d', arc)
            .on('mouseover', function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('fill', data[i].color)
                    .attr('d', arcHover);
            })
            .on('mouseout', function (d) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('fill', '#00796B')
                    .attr('d', arc);
            });
  }