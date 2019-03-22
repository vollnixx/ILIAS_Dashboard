SimpleILIASDashboard = (function () {
  'use strict';

  let pub = {}, pro = {}, pri = {
    danger_span               : '<span class="badge badge-pill badge-danger">Danger</span>',
    success_span              : '<span class="badge badge-pill badge-success">Success</span>',
    background_colors_success : "['#D8EBD2', '#92C780', '#BBDCAF', '#74B85D']",
    background_colors_fail    : "['#fa6553', '#e20201', '#f33a2f', '#c7372b']",
    html_snippets : {
      card_header             : '.card-header h6',
      phpunit_date_class      : '.phpunit_date',
      phpunit_state_html      : '<p class="mr-2"><i class="fas fa-circle',
      dicto_state_html        : '<span class=""><a class="badge badge-pill',
      card_header_html_begin  : '<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">'
    }
  };

  pub.createPHPUnitWidget = function (url, version, id, title, warn, skip, incomp, fail, failure) {
    let failed = '';

    if (failure === "true") {
      failed = '-warning';
    }

    return '<a href="' + url + '" class="col-xl-4 col-lg-5" target="_blank"> ' +
            ' <div class="col-xl-12">' +
              ' <div class="card shadow mb-4" id="' + version + '_' + id + '_card">' +
                pri.html_snippets.card_header_html_begin +
                ' <h6>' + title + '</h6>' +
              ' </div>' +
              ' <div class="card-body phpunit">' +
                ' <div class="row hidden">' +
                  ' <div class="col-md-8">' +
                    ' <div class="chart-pie pt-6 pb-2">' +
                      ' <canvas id="' + version + '_' + id + '"></canvas>' +
                    ' </div>' +
                  ' </div>' +
                  ' <div class="col-md-4 ">' +
                    ' <div class="mt-4 text-left small ">' +
                      pri.html_snippets.phpunit_state_html + ' text-warnings'   + failed + '"></i> ' + warn + ' Warnings </p>' +
                      pri.html_snippets.phpunit_state_html + ' text-skipped'    + failed + '"></i> ' + skip + ' Skipped </p>' +
                      pri.html_snippets.phpunit_state_html + ' text-incomplete' + failed + '"></i> ' + incomp + ' Incomplete </p>' +
                      pri.html_snippets.phpunit_state_html + ' text-failed'     + failed + '"></i> ' + fail + ' Failed </p>' +
                    ' </div>' + 
                  ' </div>' +
                ' </div>' + 
              ' </div>' +
            ' </div>' + 
          ' </div>' +
        ' </a>' ;
  }

    pub.createDictoWidget = function (date, url, total, resolved, added) {

    return '<div class="col-xl-6 col-lg-6"> ' +
            '<div class="card shadow mb-4">' +
               pri.html_snippets.card_header_html_begin +
                '<h6>Dicto ' + date + '</h6>' +
              '</div>' +
              '<div class="card-body d-flex justify-content-between">' + 
                pri.html_snippets.dicto_state_html + ' badge-warning mr-2" href="#">' + total + ' Total</a> </span>' +
                pri.html_snippets.dicto_state_html + ' badge-success mr-2" href="#">' + resolved + ' Resolved</a> </span>' +
                pri.html_snippets.dicto_state_html + ' badge-danger mr-2" href="#">'  + added + ' Added</a> </span>' +
              '</div>' +
            '</div>' +
          '</div>';
  };


 pub.initialiseGraph = function (card_id, card_object, failure, warn, skip, incomp, failed, complete) {
   let card_cleaned_id = card_id.split("_card")[0];
   let backgroundColor = pri.background_colors_success;

   if (failure === "true") {
         backgroundColor = pri.background_colors_fail;
   }
   
    card_object.append( 
            '<script>'+
              '$( document ).ready(function() {' +
                'let ctx = document.getElementById("' + card_cleaned_id +'");'+
                'let myPieChart = new Chart(ctx, {'+
                  'type: "doughnut", data: '+
                    '{ '+
                      'labels: ["Warnings", "Skipped", "Incomplete", "Failed"],'+
                      'datasets: ['+
                        '{data: [ '+ warn +', '+ skip +', '+ incomp +', '+ failed +',], '+
                          'backgroundColor: ' + backgroundColor + ',' + 
                          'hoverBackgroundColor: ["#ffa500","#ffa500","#ffa500","#ffa500"],'+
                          'hoverBorderColor: "rgba(234, 236, 244, 1)"'+
                          '}],'+
                        '},'+
                      'options: {'+
                            'elements: '+
                                  '{'+
                                    'center: {'+
                                          'text: "Tests: ' + complete + '",color: "#212529", fontStyle: "Helvetica", sidePadding: 20 '+
                                        '}'+
                                   '}, '+
                      'maintainAspectRatio: false,'+
                      'tooltips:'+
                        '{backgroundColor: "#0059ff",bodyFontColor:"#ffffff",borderColor: "#dddfeb",'+
                          'borderWidth: 1,xPadding: 15,yPadding: 15,displayColors: false,caretPadding: 10,'+
                          'bodyFontFamily: "sans-serif",},'+
                      'legend: {display: false},cutoutPercentage: 60,},'+
                    '});'+
                '});'+
            '</script>');

  };

  pub.replaceLoaderSymbolForPHPUnitCard = function (card_id, failure, warn, skip, incomp, failed, complete) {
    let card_object = $('#' + card_id);

    if (failure === "true") {
      pro.addPHPUnitHeader(card_object, pri.danger_span);
    }
    else {
      pro.addPHPUnitHeader(card_object, pri.success_span);
    }

    card_object.find('.phpunit').removeClass('phpunit');
    card_object.find('.row').removeClass('hidden');
    pub.initialiseGraph(card_id, card_object, failure, warn, skip, incomp, failed, complete);
  };

  pro.addPHPUnitHeader = function(card_object, state) {
    card_object.find(pri.html_snippets.card_header).html(
        card_object.find(pri.html_snippets.card_header).html() + state
      );
  };

  pub.createPHPUnitWidgets = function (data) {
    let allRows = data.split(/\r?\n|\r/);

    $('.card-header').find('.badge-danger').remove();

    for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
      let cells = allRows[singleRow].split(',');
      let url       = cells[0], 
          version   = cells[1],
          id        = cells[2], 
          title     = cells[3], 
          warn      = cells[4], 
          skip      = cells[5], 
          incomp    = cells[6],
          complete  = cells[7], 
          failed    = cells[8], 
          failure   = cells[9];
      let version_string = 'ILIAS_' + version;

      if( $('.phpunit_data').find('.' + version_string).length === 0) {
         $('.phpunit_data').append('<div class="' + version_string + ' col-md-12"><h4>' + version_string + '</h4></div>')
      }
      $('.phpunit_data .' + version_string).append(pub.createPHPUnitWidget(url, version_string, id, title, warn, skip, incomp, failed, failure));

      let interval = setInterval(function () {
        SimpleILIASDashboard.replaceLoaderSymbolForPHPUnitCard(version_string + '_' + id + "_card", failure, warn, skip, incomp, failed, complete);
        
        clearInterval(interval);
      }, Math.random() * 1000);
    }
  };

    pub.createDictoWidgets = function (data) {
    let allRows = data.split(/\r?\n|\r/);
   
    for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
        let cells = allRows[singleRow].split(',');
        let date = cells[0], url = cells[1], total = cells[2], resolved = cells[3], added = cells[4];

      $('.dicto-data').append(pub.createDictoWidget(date, url, total, resolved, added));
    }
  };

  pub.anErrorOccured = function(){
    location.reload();
  };

  pub.getPHPUnitData = function () {

    $.ajax({
      url:      'data/phpunit_latest.csv',
      dataType: 'text',
    }).done(pub.createPHPUnitWidgets)
    .fail(function (jqXHR, textStatus, errorThrown) { setInterval(function () {
          pub.anErrorOccured();
      }, Math.random() * 5000); });
  };

    pub.getDictoData = function () {

    $.ajax({
      url:      'data/dicto_latest.csv',
      dataType: 'text',
    }).done(pub.createDictoWidgets)
    .fail(function (jqXHR, textStatus, errorThrown) { setInterval(function () {
          pub.anErrorOccured();
      }, Math.random() * 5000); });
  };

  pub.appendChartJSExtensionForCenterText = function() {
       Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          let ctx = chart.chart.ctx;

          //Get options from the center object in options
          let centerConfig = chart.config.options.elements.center;
          let fontStyle = centerConfig.fontStyle || 'Arial';
          let txt = centerConfig.text;
          let color = centerConfig.color || '#000';
          let sidePadding = centerConfig.sidePadding || 20;
          let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          let stringWidth = ctx.measureText(txt).width;
          let elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          let widthRatio = elementWidth / stringWidth;
          let newFontSize = Math.floor(30 * widthRatio);
          let elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          let fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });
  };


  return pub;
  
  }());

$( document ).ready(function() {
    $('.card-header').find('.badge-danger').remove();
    SimpleILIASDashboard.getPHPUnitData();
    SimpleILIASDashboard.getDictoData();
    SimpleILIASDashboard.appendChartJSExtensionForCenterText();
    $('body').scrollspy({ target: '#nav_list' });


});