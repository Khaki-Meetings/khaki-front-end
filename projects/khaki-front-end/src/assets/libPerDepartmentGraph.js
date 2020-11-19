
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

var googleIsLoaded = false;
var perDepartmentStatisticsData;

function drawChart(divId, dataTable) {
  googleIsLoaded = true;

  if (googleIsLoaded) {

    try {

      var options = {
          title: 'My Daily Activities',
          titlePosition: 'none',
          chartArea: {width: '60%', height: '80%'},
          pieHole: 0.8,
          pieSliceText: 'none',
          tooltip: {
            trigger: 'none'
          },
          legend: {
            position: 'none'
          },
          backgroundColor: { fill:'transparent' },
          colors: ['#3182ce', '#38b2ac', '#ed64a6', '#9f7aea', '#008aad', '#00728e']
        };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      console.log("DATA TABLE:" + JSON.stringify(dataTable));
      var array = [['Department', 'Hours']];

      if (dataTable === undefined) {
        dataTable = perDepartmentStatisticsData;
      }

      if (typeof dataTable !== 'undefined') {
        dataTable.forEach(element => array.push([element.name, element.value]));
      }
      var data = google.visualization.arrayToDataTable(array);
      console.log("DATA TABLE:" + JSON.stringify(array));
      chart.draw(data, options);

      google.visualization.events.addListener(chart, 'onmouseover', function(e) {
        setTooltipContent(data, e.row);
      });

    } catch (err) {
      console.log("CAUGHT: " + err);
    }
  } else {
    console.log('waiting for google');
    drawChart(divId, dataTable);
  }

}

function setTooltipContent(d, e) {
  $($('#center')[0]).html(
    '<font class="tooltipAmount">'
    + '$' + d.cache[e][1].Ve
    + '</font>'
    + '<br/>'
    + '<font class="tooltipText">'
    + d.cache[e][0].Ve
    + '</font>'
  );
}

var libPerDepartmentGraphJS = (function() {
  return {

    refreshChart: function(divId, dataTable) {
      console.log("refresh chart: " + divId + " " + JSON.stringify(dataTable));
      perDepartmentStatisticsData = dataTable;
      drawChart(divId, dataTable);
    },

    test: function() {
      console.log("HI")
    }
  }
})(libPerDepartmentGraphJS||{})
