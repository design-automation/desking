/**
 * Created by sereb on 9/7/2017.
 */

desking.controller('sliderCtrl', ['$scope', '$filter', 'timeService','$interval','$mdDateLocale', function ($scope, $filter, timeService, $interval,$mdDateLocale) {


    $scope.activeDate = undefined;
    $scope.sliderTimeline=[];
    $scope.toggle =true;
    $scope.opt="Play"
	$scope.play=0;


	Date.prototype.addTimeMinutes = function(time) {
		var dat = new Date(this.valueOf())
		dat.setMinutes(dat.getMinutes()+time);
		return dat;
	};


	//Angualar material Datepicker

    $mdDateLocale.formatDate = function(date) {
        return moment(date).format('DD-MM-YYYY');
    };

	$scope.myDate = new Date();
	$scope.minDate = new Date();

	$scope.maxDate = new Date(
		$scope.myDate.getFullYear(),
		$scope.myDate.getMonth(),
		$scope.myDate.getDate()+240
	);

	$scope.onlyWeekdaysPredicate = function(date) {
		var day = date.getDay();
		return day !== 0 && day !== 6;
	};

	$scope.$watch("myDate",function(newVal,oldVal){

        var time = new Date(newVal.getTime());
        time.setHours(9);
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);

		$scope.sliderTimeline=popualteSliderTimeline(new Date(newVal));
		$scope.slider_translate.options.stepsArray = $scope.sliderTimeline;
        // $scope.slider_translate.value=time.getTime();

	});



	//Slider config with custom display function
	$scope.timeLine=[];
	$scope.slider_translate = {
		value: 0,
		// options: {
		// 	stepsArray: timeService.getTimeline(),
		// 	onChange:  function(sliderId, modelValue, highValue, pointerType){
		// 		timeService.setTime(modelValue);
		//
		// 	},
		// 	translate: function (value) {
		// 		return   $filter('date')(value, 'dd-MM-yyyy');;
		// 	},
		// 	showTicks: 7
		// }
		options: {
			stepsArray: $scope.sliderTimeline,
			onChange:  function(sliderId, modelValue, highValue, pointerType){
				timeService.setTime(modelValue);

			},
			translate: function (value) {
				return  $filter('date')(value, 'HH:mm:ss');
			},
			showTicks: 2
		}
	};

	var updateSlider = function(){
		// $scope.slider_translate.options.stepsArray = timeService.getTimeline();
		$scope.timeLine=timeService.getTimeline();
        $scope.minDate = new Date(timeService.getTimeline()[0]);
        var currentDate=new Date( new Date().getTime());
		$scope.myDate = $scope.minDate;
		$scope.maxDate = new Date(timeService.getTimeline()[timeService.getTimeline().length-1]);
	}

	var updateSliderValue =function(){

		$scope.myDate= new Date(timeService.getTime());
		$scope.slider_translate.value=timeService.getTime();

	}

	$scope.playAnimation= function(){

        $scope.toggle=!$scope.toggle;
        $scope.timeLine = timeService.getTimeline();

		if($scope.toggle){
            $scope.opt="Play";
		}
		else{
            $scope.opt="Stop";

        }

        if($scope.play==0){
            $scope.anime=$interval(function(){
                timeService.setTime($scope.timeLine[$scope.play]);

                if($scope.play<$scope.timeLine.length-1){
                	if(new Date($scope.timeLine[$scope.play]).getHours()>=18){
                        $scope.play=$scope.play+30;
                		if(new Date($scope.timeLine[$scope.play]).getDay()==6){
                            $scope.play=$scope.play+96;
						}
					}else{
                        $scope.play++;
					}
                }
                else{
                    timeService.setTime($scope.timeLine[0]);
                    $interval.cancel($scope.anime);
                    $scope.play=0;
                }
            }, 200);
		}
		else{
            $interval.cancel($scope.anime);
            $scope.play=0;
		}

	};

	var popualteSliderTimeline = function(date){

		var timeArray = new Array();
		var currentDate = new Date(date);
		var stopDate = new Date(date);
		currentDate.setHours(9);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		currentDate.setMilliseconds(0);
		stopDate.setHours(18);
		stopDate.setMinutes(0);
		stopDate.setSeconds(0);
		stopDate.setMilliseconds(0);

		while (currentDate <= stopDate) {
			timeArray.push(new Date(currentDate).getTime());
			currentDate.setMinutes(currentDate.getMinutes()+15);
		}
		return timeArray;
	}
	timeService.registerSliderObserverCallback(updateSlider);
    timeService.registerObserverCallback(updateSliderValue);

}]);


