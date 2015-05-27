 
var defaultScale;

var defaultDataSet = 'Gemeinden_2013.csv';

var colours2 = {
    Asien: ['rgb(252,251,253)','rgb(239,237,245)','rgb(218,218,235)','rgb(188,189,220)','rgb(158,154,200)','rgb(128,125,186)','rgb(106,81,163)','rgb(84,39,143)','rgb(63,0,125)'], Amerika:['rgb(255,245,240)','rgb(254,224,210)','rgb(252,187,161)','rgb(252,146,114)','rgb(251,106,74)','rgb(239,59,44)','rgb(203,24,29)','rgb(165,15,21)','rgb(103,0,13)'], Europa:['rgb(247,252,253)','rgb(229,245,249)','rgb(204,236,230)','rgb(153,216,201)','rgb(102,194,164)','rgb(65,174,118)','rgb(35,139,69)','rgb(0,109,44)','rgb(0,68,27)'], Ozeanien:['rgb(255,255,255)','rgb(240,240,240)','rgb(217,217,217)','rgb(189,189,189)','rgb(150,150,150)','rgb(115,115,115)','rgb(82,82,82)','rgb(37,37,37)','rgb(0,0,0)'], Afrika: ['rgb(255,245,235)','rgb(254,230,206)','rgb(253,208,162)','rgb(253,174,107)','rgb(253,141,60)','rgb(241,105,19)','rgb(217,72,1)','rgb(166,54,3)','rgb(127,39,4)'], Andere:['rgb(255,255,255)','rgb(240,240,240)','rgb(217,217,217)','rgb(189,189,189)','rgb(150,150,150)','rgb(115,115,115)','rgb(82,82,82)','rgb(37,37,37)','rgb(0,0,0)']};


var world = { Afrika: [ "Äquatorialguinea", "Äthiopien", "Dschibuti", "Algerien", "Angola" ,"Botsuana", "Burundi" ,"Benin", "Côte d'Ivoire" ,"Gabun", "Gambia" ,"Ghana", "Guinea-Bissau", "Guinea" , "Kamerun" ,"Kap Verde" ,"Kenia" ,"Komoren", "Kongo (Brazzaville)" ,"Kongo (Kinshasa)", "Lesotho", "Liberia" ,"Libyen", "Madagaskar" ,"Malawi", "Mali" ,"Marokko" ,"Mauretanien", "Mauritius" ,"Mosambik", "Niger", "Nigeria" ,"Burkina Faso" ,"Simbabwe" ,"Ruanda", "Sambia" ,"São Tomé und Príncipe" ,"Senegal" ,"Seychellen" ,"Sierra Leone", "Somalia", "Südafrika", "Sudan", "Namibia" ,"Swasiland", "Tansania", "Togo" ,"Tschad", "Tunesien" ,"Uganda", "Ägypten" ,"Zentralafrikanische Republik" ,"Eritrea" ,"Südsudan" ,"Westsahara" ], Europa: ["Albanien" ,	"Andorra"	,"Belgien" , 	"Bulgarien" , "Dänemark" , 	"Deutschland" , "Finnland" , "Frankreich" , "Griechenland"	, "Vereinigtes Königreich" , "Irland" , "Island" , 	"Italien", "Liechtenstein"	, "Luxemburg", 	"Malta", 	"Monaco", 	"Niederlande", 	"Norwegen", 	"Österreich", "Polen"	, "Portugal" , 	"Rumänien" , 	"San Marino", 	"Schweden", 	"Spanien", "Türkei", 	"Ungarn", 	"Vatikanstadt", "Zypern", "Slowakei", 	"Tschechische Republik", 	"Serbien", 	"Kroatien", 	"Slowenien", 	"Bosnien und Herzegowina", 	"Montenegro", 	"Mazedonien", 	"Kosovo", 	"Estland", 	"Lettland", "Litauen", 	"Moldova", 	"Russland", 	"Ukraine", 	"Belarus" ], Amerika:["Argentinien" , "Bahamas" , "Barbados" , "Bolivien" , "Brasilien" , "Chile" , "Costa Rica" , "Dominikanische Republik" , "Ecuador" , "El Salvador" , "Guatemala" , "Guyana" , "Haiti" , "Belize" , "Honduras" , "Jamaika" , "Kanada" , "Kolumbien" , "Kuba" , "Mexiko" , "Nicaragua" , "Panama" , "Paraguay" , "Peru" , "Suriname" , "Trinidad und Tobago" , "Uruguay" , "Venezuela" , "Vereinigte Staaten" , "Dominica" , "Grenada" , "Antigua und Barbuda" , "St. Lucia" , "St. Vincent und die Grenadinen" , "St. Kitts und Nevis"], Asien: ["Afghanistan","Bahrain" , "Bhutan" , "Brunei Darussalam" , "Myanmar" , "Sri Lanka" , "Taiwan (Chinesisches Taipei)" , "China" , "Indien" , "Indonesien" , "Irak" , "Iran" , "Israel" , "Japan" , "Jemen" , "Jordanien" , "Kambodscha" , "Katar" , "Kuwait" , "Laos" , "Libanon" , "Malaysia" , "Malediven" , "Oman" , "Mongolei" , "Nepal" , "Korea (Nord-)" , "Vereinigte Arabische Emirate" , "Pakistan" , "Philippinen" , "Saudi-Arabien" , "Singapur" , "Korea (Süd-)" , "Syrien" , "Thailand" , "Vietnam" , "Bangladesch" , "Timor-Leste" , "Palästina" , "Armenien" , "Aserbaidschan" , "Georgien" , "Kasachstan" , "Kirgisistan" , "Tadschikistan" , "Turkmenistan" , "Usbekistan"], Ozeanien: ["Australien" , "Fidschi" , "Nauru", "Vanuatu", "Neuseeland", "Papua-Neuguinea", "Tonga", "Samoa", "Salomoninseln" , "Tuvalu", "Kiribati" , "Marshallinseln" ,"Mikronesien" , "Palau"], Andere: ["Staatenlos"	, "Nicht zuteilbar gemäss den aktuellen Grenzen" , 	"Ohne Angabe"]};

var heatmapColour = d3.scale.linear()
  .domain(d3.range(0, 0.4, 0.05))
  .range(colours2.Europa);
      

function drawLegend(scale){
    d3.select('#legend').selectAll('ul').remove();
    
    var legend = d3.select('#legend')
        .append('ul')
        .attr('class', 'list-inline');
    
    var keys = legend.selectAll('li.key')
        .data(scale.range());
    
    keys.enter().append('li')
        .attr('class', 'key')
        .style('border-top-color', String)
        .text(function(d) {
            var r = scale.invertExtent(d);
            return Math.round(r[0]*1000)/10+'%';
    });

}


var dataset = [];
var rows;

var width = 860, 
    height = 500, 
    colors = d3.scale.category20();
    
var svg = d3.select("#map").append("g").append("svg")
    .attr("width", width)
    .attr("height", height);
    
var div = d3.select("body").append("div")
    .attr("class","tooltip")
    .style("opacity",0);

function showTooltip(){
    div.transition()
        .duration(150)
        .style("opacity",.9);

}

function hideTooltip(){
    div.transition()
        .duration(150)
        .style("opacity",0);

}
   

 var zoom = d3.behavior.zoom()
      .scaleExtent([1, 10])
      .on('zoom', zoomMap);
d3.select("#map").select("g").call(zoom);

function zoomMap() {

  // Zoom keeping stroke width proportional inspired by Ivo Vonlanthen
  d3.select('#map').select('svg').selectAll(".municipality-boundaries").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")").style("stroke-width", .5 / d3.event.scale + "px");
    hideTooltip();

}


function loadDataSet(path){
    //load CSV File
    d3.csv(path, function(row) {
        
        for(var k in row) {
            if (row[k].match(/^[0-9\.]+$/) ) {
                row[k] = +row[k];
            }
        }
        return row;
        
    }, function(loadedRows) {
        
        rows = loadedRows;
        processRows();
});


}

loadDataSet(defaultDataSet);



function processRows() {
    
    svg.selectAll('path').remove();
           
    d3.json("be-municipalities.json", function(error, ch) {
        
        if (error) return console.error(error);
        
        var subunits = topojson.feature(ch, ch.objects.municipalities),
            projection = null,
            path = d3.geo.path().projection(projection),
            gemeinden = topojson.feature(ch, ch.objects.municipalities).features;
   
        gemeinden.forEach(function(gemeinde){
            
            rows.some(function(row) {
                if (gemeinde.id == row['BFS-Nr'] ) {
            
                    for (var key in world) {
                        if (world.hasOwnProperty(key)) {
                            var count=0;
                            for(var i=0;i<world[key].length;i++){
                
                                count = count+row[world[key][i]];
                                
      
                            }

                        row[key]=count;
      
                        }
    
                    }

                gemeinde.properties.data = row;
                return true;
            }
        });
    });
            

	var max = d3.max(rows,function(d){return (1-(d['Schweiz']/d['Total']));});
        
    defaultScale = d3.scale.quantize()
        .domain(d3.range(0,max,max/(colours2['Europa'].length-1)))
        .range(colours2['Europa']);
        
    drawLegend(defaultScale);
    svg.selectAll(".subunit")
        .data(gemeinden)
        .enter()
        .append("path")
        .attr("class", "municipality-boundaries")
        .attr("id", function(d){return d.id;})
        .property("data", function(d){return d.properties.data;}) //doppelt drin?
        .attr("name", function(d){return d.properties.name;})
        .attr("fill", function (d) {
            if(d.properties.data){
                var auslaender = (1-(d.properties.data.Schweiz)/ d.properties.data.Total);
                return defaultScale((auslaender));
            }else if(d.id>9000){
                //ocean blue if it's a lake
                return '#2299ee';
            }
                
        })
        .attr("abbr", function(d){return d.properties.abbr;})
        .on("click",function(e,f){
           if(e.id<9000){
               
                d3.select('#piechart').select('h4').html(e.properties.name);
                d3.select('#piechart').select('h4').attr("BFS-Nr",e.id);
                
                drawFlare(prepareJSON(e.properties.data));
 
           }
        })
        .on("mouseout",function(e,f){
            hideTooltip();
        
           d3.select(this).style('stroke', '#000');
           
        })
        .on("mouseover",function(e,f){
           if(e.id<9000){
               
                d3.select(this).style('stroke', function (d) {
                    return '#a0a0a0';
                });  
               
                var tmp = e.properties.data,
                    filter = d3.select('#piechart').attr('filter'),
                    caption, total, percent;
               
                if(filter=='none'){
                    caption = 'Ausländer: ';
                    total = tmp['Total'] - tmp['Schweiz'];
                    percent = Math.round(((1-(tmp['Schweiz'])/ tmp.Total)*100) * 100) / 100, '%)';
               
                }else{
                    caption = filter+': ';
                    total = tmp[filter];
                    percent = Math.round((((tmp[filter])/ tmp.Total)*100) * 100) / 100, '%)';
                }
               
                showTooltip();
                
                div
                    .html(['<strong>', e.properties.name , '</strong><br/>',
                    'Einwohner: ', tmp['Total'], '<br/>' , caption, total, ' (', percent , '%)' ].join(''))
                    .style("left", (d3.event.pageX)+"px")
                    .style("top", (d3.event.pageY)+"px");
             
            }
       })
        .attr("d",path);
 
    });
    
    

// suburst
    
function prepareJSON(e){
    var newData = [];
    for (var key in world) {
    
        if (world.hasOwnProperty(key)) {
            var tmpObject = {name: key, children:[]};
            for(var i=0;i<world[key].length;i++){
                var x =  e[world[key][i]];
                if(x>0){
                    tmpObject.children.push({name: world[key][i], size: x});
                }
      
            }
        
            newData.push(tmpObject);
        } 
    
    }
    return {name: "root", children: newData};
}
    
//function to aggregate data from all municipalities
    
function combineMunicipalities(){
    var tmp = [];
    for (var key in world) {
    
        if (world.hasOwnProperty(key)) {
            for(var i=0;i<world[key].length;i++){
                var p=0;
                for(var j=0; j<rows.length;j++){
                    p = p+ rows[j][world[key][i]];
                }
                tmp[world[key][i]]=p;
      
            }

        }
     
    }
    
    return tmp;
}
    

    
function updateMap(bfs,name,link){
    if(name=="root"){
        d3.select('#piechart').attr('filter','none');
        drawLegend(defaultScale);
        d3.select('#map').select('svg').selectAll('path').attr("fill",function(d){
            if(parseInt(d.id)<9000){
                if(d.properties.data.hasOwnProperty("Schweiz")){
                    if(d.hasOwnProperty('properties')){
                        return defaultScale(1-((d.properties.data.Schweiz)/ d.properties.data.Total));
                    }
                }
            }else{
                return '#2299ee';
            }
     
        });
                               
    }else if(name=="Europa"||name=="Ozeanien"||name=="Asien"||name=="Afrika"||name=="Andere"||name=="Amerika"){
        var node = world[name];
        d3.select('#piechart').attr('filter',name);
        
        var max = d3.max(d3.select('#map').select('svg').selectAll('path')[0],function(d){if(d.id>9000){
        return 0;}else{var tmp = d.__data__.properties.data; return (tmp[name]/tmp['Total']);}});
        
        var newScale = d3.scale.quantize()
            .domain(d3.range(0,max,max/(colours2[name].length-1)))
            .range(colours2[name]);
        
        drawLegend(newScale);

        d3.select('#map').select('svg').selectAll('path').attr("fill",function(d){
            
            if(parseInt(d.id)<9000){
                
                return newScale(d.properties.data[name]/ d.properties.data.Total);
                
            }else{
                return '#2299ee';
            }
     
        });
       
        
        
    
    }else{
        d3.select('#piechart').attr('filter', name);
        var newData = [];
        var max = d3.max(rows,function(d){return (d[name]/d['Total']);});
        var heatmapColour2 = d3.scale.quantize()
                .domain(d3.range(0,max,max/(colours2[link.parent.name].length-1)))
                .range(colours2[link.parent.name]);
        
        drawLegend(heatmapColour2);

        d3.select('#map').select('svg').selectAll('path').attr("fill",function(d){
        
            if(parseInt(d.id)<9000){
                if(d.properties.data.hasOwnProperty(name)){
                    return heatmapColour2(((d.properties.data[name])/ d.properties.data.Total));
                }else{
                    return '#ababab';                           
                }   
        
            }else{
                return '#2299ee';
            }
        
     
        });
    }
    

}
  
    
var width = 360,
    height = 480,//380,
    radius = Math.min(width, height) / 2;
    
var x, y, node, color = d3.scale.category10();
    
function initializeSunburst(){
            x = d3.scale.linear().range([0, 2 * Math.PI]);
            y = d3.scale.sqrt()
                .range([0, radius]);    
    }
    
initializeSunburst();
    
d3.select('#piechart').attr('filter','none').select('h4').html('Kanton Bern');
d3.select('#legend').select('h3').html('Anteil Bürger ausländischer Herkunft an der ständigen Wohnbevölkerung');
d3.select('#piechart').selectAll('svg').remove();
    
var svg3 = d3.select("#piechart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + 200 + ")"); //(height / 2 + 10)

var partition = d3.layout.partition()
    //.sort(null)
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

drawFlare(prepareJSON(combineMunicipalities()));

function drawFlare(data){
    node = data;
    svg3.selectAll('path').remove();
    
    initializeSunburst();
    
    var path = svg3.datum(data).selectAll("path")
        .data(partition.nodes)
        .enter().append("path")
      //.attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
        .attr("d", arc)
        .style("stroke", "#fff")
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .style("fill-rule", "evenodd")
        .attr("name", function(d){return d.name;})
        .each(stash)
        .on("mouseover",function(e,f){
               
               if(e.name!="root"){
                   
                   showTooltip();
                   
                    div .html([
                    '<strong>', e.name , '</strong><br/>',
                    'Einwohner: ', e.value, '<br/>' , '(',Math.round((e.value/((e.parent.parent!=undefined) ?                       e.parent.parent : e.parent).value) *1000)/10,'%)'
                    ].join(''))
                    .style("left", (d3.event.pageX)+"px")
                    .style("top", (d3.event.pageY)+"px");

               }
            })
    
        .on("click",function(d){
            node = d;
            var bfs = d3.select('#piechart').select('h4').attr('BFS-Nr');
            
            d3.select("#legend").select("h3").html('Anteil Bürger aus'+((d.name=='root')?'ländischer Herkunft':'             '+d.name) +' an der ständigen Wohnbevölkerung');

            updateMap(bfs, d.name,d);
            
            path.transition()
                .duration(750)
                .attrTween("d", arcTween(d));
        })
    
        .on("mouseout",function(e,f){
                 hideTooltip();
             });
    

  
    //prepare Legend

    var legendRectSize = 18,
        legendSpacing = 4;
    
    var legend = svg3.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {        
            var height = legendRectSize + legendSpacing;
            var offset =  height * color.domain().length / 2;
            var horz, vert;
            if(i<4){
                horz = (i * legendRectSize*5.4)-225; // -2 * legendRectSize;
                vert = 200;// i * height - offset;
            }else{
                horz = ((i-3) * legendRectSize*5.4)-225;
                vert = height +210;      
            }
            
            return 'translate(' + horz + ',' + vert + ')';
            
        });
    
    legend.append('rect')
        .attr('width', legendRectSize)
        .style('display',function(d,i){return (i==0)?'none':'initial';})
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);
    
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; }).style("fill","#00")
        .style('font-family','sans-serif').style("display",function(d){
            return (d=='root')? 'none':'initial';
        });


} 

// Stash the old values for transition.
function stash(d) {
  d.x0 = d.x;
  d.dx0 = d.dx;
}

function arcTweenData(a, i) {
    console.log(a +' '+i);
    var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
        function tween(t) {
            var b = oi(t);
            a.x0 = b.x;
            a.dx0 = b.dx;
            return arc(b);
        }
    
  if (i == 0) {
   // If we are on the first arc, adjust the x domain to match the root node
   // at the current zoom level. (We only need to do this once.)
    var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
    return function(t) {
      x.domain(xd(t));
      return tween(t);
    };
  } else {
    return tween;
  }
}
    
    
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

d3.select(self.frameElement).style("height", height + "px");



}


d3.select("#year").on("change", function(d){
    var selectedIndex = d3.select(this).property('selectedIndex');
    var dataCSV;
    switch (selectedIndex){
        case 1:
            dataCSV="Gemeinden_2012.csv";
            break;
        case 2:
            dataCSV="Gemeinden_2011.csv";
            break;
        case 3:
            dataCSV="Gemeinden_2010.csv";
            break;   
    
        default: 
            dataCSV="Gemeinden_2013.csv";
            break;
            
    }
    
    loadDataSet(dataCSV);
});


function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


d3.select("#info").on("click", function(d){
    overlay();
});
d3.select("#refresh").on("click", function(d){
    d3.select("#year").property('selectedIndex',0);
    loadDataSet(defaultDataSet);
});
