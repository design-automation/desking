desking.directive('chart',function(){

    //define the directive object
    var chart = {
        restrict:'E',
        replace:false,
        templateUrl : 'app/templates/chart.html',
        scope:{data:'=chartData'},
        controller :'graphCtrl'
    };


    return chart;
});
