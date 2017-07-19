/**
 * Created by sereb on 6/7/2017.
 */

desking.factory("timeService", function() {

	Date.prototype.addDays = function(days) {
		var dat = new Date(this.valueOf())
		dat.setDate(dat.getDate() + days);
		return dat;
	}

	Date.prototype.addTimeMinutes = function(time) {
		var dat = new Date(this.valueOf())
		dat.setMinutes(dat.getMinutes()+time);
		return dat;
	}


	function getDates(startDate, stopDate) {
		var dateArray = new Array();
		var currentDate = startDate;
		while (currentDate <= stopDate) {

			dateArray.push( new Date (currentDate) )
			currentDate = currentDate.addDays(1);
		}
		return dateArray;
	}



	var o = {
		time: new Date(),
		timeline: getDates( new Date(), (new Date()).addDays(30) ).map(function(d){ return d.getTime() }),
	}

	var p = {};

	// --------- Observers
	var observerCallbacks = [];
	var sliderObserverCallbacks = [];

	// call this when you know data has been changed
	var notifyObservers = function(){
		angular.forEach(observerCallbacks, function(callback){
			callback();
		});
	};

	var notifySliderObservers = function(){
		angular.forEach(sliderObserverCallbacks, function(callback){
			callback();
		});
	};


	// register an observer
	p.registerObserverCallback = function(callback){
		observerCallbacks.push(callback);
	};

	p.registerSliderObserverCallback = function(callback){
		sliderObserverCallbacks.push(callback);
	};


	p.getTime = function(){
		return o.time;
	}

	p.getTimeline = function(){
		return o.timeline;
	}


	p.setTime = function(time){
		o.time = time;
		notifyObservers();
		return o.time;
	}

	p.setTimeline = function(data){
		o.timeline = data;
		notifySliderObservers();
		return o.timeline;
	}

	p.setTimelineRange = function(highest, lowest){
		var dateArray = getDates( lowest, highest );
		p.setTimeline(dateArray.map(function(d){ return d.getTime() }));

	}

	return p;

});

desking.factory("dataService", ['timeService','$timeout', function(timeService, $timeout) {

	var o = {
		floors : [

			// {floorImage:"assets/images/SDE3_2ndFloor.svg" },
			// {floorImage:"assets/images/SDE3_6thFloor.svg" },
			// {floorImage:"assets/images/SDE3_1stFloor.svg"},
			// {floorImage:"assets/images/Overall.svg"}
		],
		rows: [],
		chartData: [
			/*{
			 "key" : "First Year" ,
			 "values" : [ [ 1025409600000 , 10] , [ 1028088000000 , 9] , [ 1030766400000 , 11] , [ 1033358400000 , 12] , [ 1036040400000 , 15] , [ 1038632400000 , 16] , [ 1041310800000 , 9] , [ 1043989200000 , 9] , [ 1046408400000 , 9] , [ 1049086800000 , 11] , [ 1051675200000 , 14] , [ 1054353600000 , 14] , [ 1056945600000 , 13] , [ 1059624000000 , 13] , [ 1062302400000 , 14] , [ 1064894400000 , 14] , [ 1067576400000 , 17] , [ 1070168400000 , 16] , [ 1072846800000 , 16] , [ 1075525200000 , 14] , [ 1078030800000 , 18] , [ 1080709200000 , 11] , [ 1083297600000 , 10] , [ 1085976000000 , 14] , [ 1088568000000 , 18] , [ 1091246400000 , 16] , [ 1093924800000 , 14] , [ 1096516800000 , 14] , [ 1099195200000 , 14] , [ 1101790800000 , 15] , [ 1104469200000 , 13] , [ 1107147600000 , 11] , [ 1109566800000 , 11] , [ 1112245200000 , 11] , [ 1114833600000 , 19] , [ 1117512000000 , 11] , [ 1120104000000 , 11] , [ 1122782400000 , 12] , [ 1125460800000 , 11] , [ 1128052800000 , 13] , [ 1130734800000 , 12] , [ 1133326800000 , 13] , [ 1136005200000 , 16] , [ 1138683600000 , 14] , [ 1141102800000 ,12] , [ 1143781200000 , 16] , [ 1146369600000 , 16] , [ 1149048000000 , 16] , [ 1151640000000 , 13] , [ 1154318400000 , 13] , [ 1156996800000 , 12] , [ 1159588800000 , 17] , [ 1162270800000 , 19] , [ 1164862800000 , 18] , [ 1167541200000 , 12] , [ 1170219600000 , 12] , [ 1172638800000 , 12] , [ 1175313600000 , 14] , [ 1177905600000 , 16] , [ 1180584000000 , 16] , [ 1183176000000 , 18] , [ 1185854400000 , 18] , [ 1188532800000 , 19] , [ 1191124800000 , 14] , [ 1193803200000 , 16] , [ 1196398800000 , 15] , [ 1199077200000 , 17] , [ 1201755600000 , 17] , [ 1204261200000 , 16] , [ 1206936000000 , 19] , [ 1209528000000 , 18] , [ 1212206400000 , 14] , [ 1214798400000 , 15] , [ 1217476800000 , 15] , [ 1220155200000 , 15] , [ 1222747200000 , 13] , [ 1225425600000 , 11] , [ 1228021200000 , 12] , [ 1230699600000 , 15] , [ 1233378000000 , 14] , [ 1235797200000 , 15] , [ 1238472000000 , 13] , [ 1241064000000 , 14] , [ 1243742400000 , 14] , [ 1246334400000 , 16] , [ 1249012800000 , 15] , [ 1251691200000 , 16] , [ 1254283200000 , 18] , [ 1256961600000 , 16] , [ 1259557200000 , 19] , [ 1262235600000 , 12] , [ 1264914000000 , 13] , [ 1267333200000 , 15] , [ 1270008000000 , 16] , [ 1272600000000 , 15] , [ 1275278400000 , 14] , [ 1277870400000 , 15] , [ 1280548800000 , 19] , [ 1283227200000 , 17] , [ 1285819200000 , 19] , [ 1288497600000 , 18] , [ 1291093200000 , 18] , [ 1293771600000 , 12] , [ 1296450000000 , 15] , [ 1298869200000 , 18] , [ 1301544000000 , 12] , [ 1304136000000 , 15] , [ 1306814400000 , 13] , [ 1309406400000 , 13] , [ 1312084800000 , 13] , [ 1314763200000 , 11] , [ 1317355200000 , 11] , [ 1320033600000 , 16] , [ 1322629200000 , 17] , [ 1325307600000 , 10] , [ 1327986000000 , 19] , [ 1330491600000 , 20] , [ 1333166400000 , 19] , [ 1335758400000 , 19]]
			 },

			 {
			 "key" : "Second Year" ,
			 "values" : [ [ 1025409600000 , 7] , [ 1028088000000 , 7] , [ 1030766400000 , 7] , [ 1033358400000 , 5] , [ 1036040400000 , 6] , [ 1038632400000 , 5] , [ 1041310800000 , 8] , [ 1043989200000 , 8] , [ 1046408400000 , 8] , [ 1049086800000 , 5] , [ 1051675200000 , 6] , [ 1054353600000 , 6] , [ 1056945600000 , 7] , [ 1059624000000 , 6] , [ 1062302400000 , 6] , [ 1064894400000 , 2] , [ 1067576400000 , 2] , [ 1070168400000 , 2] , [ 1072846800000 , 1] , [ 1075525200000 , 1] , [ 1078030800000 , 1] , [ 1080709200000 , 1] , [ 1083297600000 , 2] , [ 1085976000000 , 2] , [ 1088568000000 , 3] , [ 1091246400000 , 3] , [ 1093924800000 , 3] , [ 1096516800000 , 3] , [ 1099195200000 , 3] , [ 1101790800000 , 3] , [ 1104469200000 , 5] , [ 1107147600000 , 5] , [ 1109566800000 , 5] , [ 1112245200000 , 4] , [ 1114833600000 , 4] , [ 1117512000000 , 4] , [ 1120104000000 , 4] , [ 1122782400000 , 4] , [ 1125460800000 , 4] , [ 1128052800000 , 3] , [ 1130734800000 , 3] , [ 1133326800000 , 3] , [ 1136005200000 , 7] , [ 1138683600000 , 7] , [ 1141102800000 , 7] , [ 1143781200000 , 8] , [ 1146369600000 , 8] , [ 1149048000000 , 8] , [ 1151640000000 , 5] , [ 1154318400000 , 6] , [ 1156996800000 , 6] , [ 1159588800000 , 4] , [ 1162270800000 , 4] , [ 1164862800000 , 4] , [ 1167541200000 , 6] , [ 1170219600000 , 7] , [ 1172638800000 , 7] , [ 1175313600000 , 10] , [ 1177905600000 , 10] , [ 1180584000000 , 10] , [ 1183176000000 , 8] , [ 1185854400000 , 8] , [ 1188532800000 , 8] , [ 1191124800000 , 8] , [ 1193803200000 , 8] , [ 1196398800000 , 8] , [ 1199077200000 , 6] , [ 1201755600000 , 6] , [ 1204261200000 , 7] , [ 1206936000000 , 4] , [ 1209528000000 , 3] , [ 1212206400000 , 3] , [ 1214798400000 , 6] , [ 1217476800000 , 6] , [ 1220155200000 , 6] , [ 1222747200000 , 5] , [ 1225425600000 , 5] , [ 1228021200000 , 5] , [ 1230699600000 , 4] , [ 1233378000000 , 4] , [ 1235797200000 , 4] , [ 1238472000000 , 7] , [ 1241064000000 , 7] , [ 1243742400000 , 6] , [ 1246334400000 , 6] , [ 1249012800000 , 6] , [ 1251691200000 , 6] , [ 1254283200000 , 4] , [ 1256961600000 , 4] , [ 1259557200000 , 4] , [ 1262235600000 , 6] , [ 1264914000000 , 6] , [ 1267333200000 , 6] , [ 1270008000000 , 6] , [ 1272600000000 , 5] , [ 1275278400000 , 5] , [ 1277870400000 , 0] , [ 1280548800000 , 1] , [ 1283227200000 , 0] , [ 1285819200000 , 1] , [ 1288497600000 , 1] , [ 1291093200000 , 1] , [ 1293771600000 , 1] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 4] , [ 1320033600000 , 3] , [ 1322629200000 , 3] , [ 1325307600000 , 5] , [ 1327986000000 , 5] , [ 1330491600000 , 5] , [ 1333166400000 , 5] , [ 1335758400000 , 5]]
			 },

			 {
			 "key" : "Third year" ,
			 "values" : [ [ 1025409600000 , 7] , [ 1028088000000 , 7] , [ 1030766400000 , 7] , [ 1033358400000 , 8] , [ 1036040400000 , 9] , [ 1038632400000 , 9] , [ 1041310800000 , 10] , [ 1043989200000 , 10] , [ 1046408400000 , 10] , [ 1049086800000 , 8] , [ 1051675200000 , 9] , [ 1054353600000 , 8] , [ 1056945600000 , 8] , [ 1059624000000 , 8] , [ 1062302400000 , 7] , [ 1064894400000 , 7] , [ 1067576400000 , 8] , [ 1070168400000 , 8] , [ 1072846800000 , 9] , [ 1075525200000 , 9] , [ 1078030800000 , 10] , [ 1080709200000 , 9] , [ 1083297600000 , 8] , [ 1085976000000 , 9] , [ 1088568000000 , 9] , [ 1091246400000 , 9] , [ 1093924800000 , 10] , [ 1096516800000 , 10] , [ 1099195200000 , 10] , [ 1101790800000 , 10] , [ 1104469200000 , 10] , [ 1107147600000 , 10] , [ 1109566800000 , 9] , [ 1112245200000 , 9] , [ 1114833600000 , 9] , [ 1117512000000 , 9] , [ 1120104000000 , 12] , [ 1122782400000 , 12] , [ 1125460800000 , 12] , [ 1128052800000 , 8] , [ 1130734800000 , 8] , [ 1133326800000 , 9] , [ 1136005200000 , 12] , [ 1138683600000 , 13] , [ 1141102800000 , 13] , [ 1143781200000 , 6] , [ 1146369600000 , 6] , [ 1149048000000 , 6] , [ 1151640000000 , 5] , [ 1154318400000 , 5] , [ 1156996800000 , 5] , [ 1159588800000 , 6] , [ 1162270800000 , 7] , [ 1164862800000 , 6] , [ 1167541200000 , 9] , [ 1170219600000 , 9] , [ 1172638800000 , 8] , [ 1175313600000 , 10] , [ 1177905600000 , 10] , [ 1180584000000 , 10] , [ 1183176000000 , 10] , [ 1185854400000 , 9] , [ 1188532800000 , 9] , [ 1191124800000 , 10] , [ 1193803200000 , 9] , [ 1196398800000 , 9] , [ 1199077200000 , 8] , [ 1201755600000 , 8] , [ 1204261200000 , 8] , [ 1206936000000 , 8] , [ 1209528000000 , 8] , [ 1212206400000 , 7] , [ 1214798400000 , 7] , [ 1217476800000 , 6] , [ 1220155200000 , 6] , [ 1222747200000 , 6] , [ 1225425600000 , 6] , [ 1228021200000 , 5] , [ 1230699600000 , 5] , [ 1233378000000 , 4] , [ 1235797200000 , 4] , [ 1238472000000 , 5] , [ 1241064000000 , 5] , [ 1243742400000 , 5] , [ 1246334400000 , 7] , [ 1249012800000 , 7] , [ 1251691200000 , 7] , [ 1254283200000 , 10] , [ 1256961600000 , 9] , [ 1259557200000 , 9] , [ 1262235600000 , 10] , [ 1264914000000 , 11] , [ 1267333200000 , 11] , [ 1270008000000 , 8] , [ 1272600000000 , 8] , [ 1275278400000 , 7] , [ 1277870400000 , 8] , [ 1280548800000 , 9] , [ 1283227200000 , 8] , [ 1285819200000 , 10] , [ 1288497600000 , 10] , [ 1291093200000 , 9] , [ 1293771600000 , 10] , [ 1296450000000 , 16] , [ 1298869200000 , 17] , [ 1301544000000 , 16] , [ 1304136000000 , 17] , [ 1306814400000 , 16] , [ 1309406400000 , 15] , [ 1312084800000 , 14] , [ 1314763200000 , 24] , [ 1317355200000 , 18] , [ 1320033600000 , 15] , [ 1322629200000 , 14] , [ 1325307600000 , 16] , [ 1327986000000 , 16] , [ 1330491600000 , 17] , [ 1333166400000 , 18] , [ 1335758400000 , 18]]
			 },

			 {
			 "key" : "Fourth Year" ,
			 "values" : [ [ 1025409600000 , 3] , [ 1028088000000 , 2] , [ 1030766400000 , 2] , [ 1033358400000 , 3] , [ 1036040400000 , 4] , [ 1038632400000 , 4] , [ 1041310800000 , 2] , [ 1043989200000 , 2] , [ 1046408400000 , 2] , [ 1049086800000 , 3] , [ 1051675200000 , 2] , [ 1054353600000 , 2] , [ 1056945600000 , 2] , [ 1059624000000 , 2] , [ 1062302400000 , 1] , [ 1064894400000 , 1] , [ 1067576400000 , 0] , [ 1070168400000 , 1] , [ 1072846800000 , 1] , [ 1075525200000 , 1] , [ 1078030800000 , 2] , [ 1080709200000 , 1] , [ 1083297600000 , 1] , [ 1085976000000 , 1] , [ 1088568000000 , 1] , [ 1091246400000 , 1] , [ 1093924800000 , 1] , [ 1096516800000 , 1] , [ 1099195200000 , 1] , [ 1101790800000 , 1] , [ 1104469200000 ,3] , [ 1107147600000 , 3] , [ 1109566800000 , 3] , [ 1112245200000 , 3] , [ 1114833600000 , 3] , [ 1117512000000 , 3] , [ 1120104000000 , 2] , [ 1122782400000 , 2] , [ 1125460800000 , 2] , [ 1128052800000 , 9] , [ 1130734800000 , 9] , [ 1133326800000 , 9] , [ 1136005200000 , 4] , [ 1138683600000 , 4] , [ 1141102800000 , 3] , [ 1143781200000 , 5] , [ 1146369600000 , 4] , [ 1149048000000 , 3] , [ 1151640000000 , 5] , [ 1154318400000 , 6] , [ 1156996800000 , 6] , [ 1159588800000 , 4] , [ 1162270800000 , 4] , [ 1164862800000 , 3] , [ 1167541200000 , 2] , [ 1170219600000 , 3] , [ 1172638800000 , 3] , [ 1175313600000 , 5] , [ 1177905600000 , 6] , [ 1180584000000 , 6] , [ 1183176000000 , 7] , [ 1185854400000 , 7] , [ 1188532800000 , 8] , [ 1191124800000 , 5] , [ 1193803200000 , 5] , [ 1196398800000 , 5] , [ 1199077200000 , 9] , [ 1201755600000 , 9] , [ 1204261200000 , 8] , [ 1206936000000 , 8] , [ 1209528000000 , 7] , [ 1212206400000 , 6] , [ 1214798400000 , 8] , [ 1217476800000 , 8] , [ 1220155200000 , 8] , [ 1222747200000 , 6] , [ 1225425600000 , 4] , [ 1228021200000 , 4] , [ 1230699600000 , 3] , [ 1233378000000 , 4] , [ 1235797200000 , 3] , [ 1238472000000 , 1] , [ 1241064000000 , 9] , [ 1243742400000 , 1] , [ 1246334400000 , 1] , [ 1249012800000 , 1] , [ 1251691200000 , 1] , [ 1254283200000 , 0] , [ 1256961600000 , 9] , [ 1259557200000 , 1] , [ 1262235600000 , 3] , [ 1264914000000 , 4] , [ 1267333200000 , 4] , [ 1270008000000 , 3] , [ 1272600000000 , 2] , [ 1275278400000 , 1] , [ 1277870400000 , 3] , [ 1280548800000 , 3] , [ 1283227200000 , 3] , [ 1285819200000 , 3] , [ 1288497600000 , 4] , [ 1291093200000 , 3] , [ 1293771600000 , 3] , [ 1296450000000 , 9] , [ 1298869200000 , 5] , [ 1301544000000 , 2] , [ 1304136000000 , 5] , [ 1306814400000 , 4] , [ 1309406400000 , 4] , [ 1312084800000 , 2] , [ 1314763200000 , 6] , [ 1317355200000 , 5] , [ 1320033600000 , 2] , [ 1322629200000 , 2] , [ 1325307600000 , 5] , [ 1327986000000 , 5] , [ 1330491600000 , 5] , [ 1333166400000 , 5] , [ 1335758400000 , 5]]
			 } ,

			 {
			 "key" : "Fifth Year" ,
			 "values" : [ [ 1025409600000 , 9] , [ 1028088000000 , 8] , [ 1030766400000 , 8] , [ 1033358400000 , 8] , [ 1036040400000 , 10] , [ 1038632400000 , 12] , [ 1041310800000 , 10] , [ 1043989200000 , 11] , [ 1046408400000 , 11] , [ 1049086800000 , 10] , [ 1051675200000 , 11] , [ 1054353600000 , 12] , [ 1056945600000 , 8] , [ 1059624000000 , 8] , [ 1062302400000 , 8] , [ 1064894400000 , 7] , [ 1067576400000 , 9] , [ 1070168400000 , 9] , [ 1072846800000 , 10] , [ 1075525200000 , 10] , [ 1078030800000 , 10] , [ 1080709200000 , 13] , [ 1083297600000 , 12] , [ 1085976000000 , 13] , [ 1088568000000 , 12] , [ 1091246400000 , 11] , [ 1093924800000 , 12] , [ 1096516800000 , 11] , [ 1099195200000 , 12] , [ 1101790800000 , 12] , [ 1104469200000 , 9] , [ 1107147600000 , 8] , [ 1109566800000 , 8] , [ 1112245200000 , 11] , [ 1114833600000 , 11] , [ 1117512000000 , 12] , [ 1120104000000 , 10] , [ 1122782400000 , 10] , [ 1125460800000 , 10] , [ 1128052800000 , 17] , [ 1130734800000 , 15] , [ 1133326800000 , 16] , [ 1136005200000 , 12] , [ 1138683600000 , 13] , [ 1141102800000 , 12] , [ 1143781200000 , 2] , [ 1146369600000 , 2] , [ 1149048000000 , 2] , [ 1151640000000 , 6] , [ 1154318400000 , 4] , [ 1156996800000 , 5] , [ 1159588800000 , 2] , [ 1162270800000 , 6] , [ 1164862800000 , 6] , [ 1167541200000 , 8] , [ 1170219600000 , 8] , [ 1172638800000 , 9] , [ 1175313600000 , 8] , [ 1177905600000 , 7] , [ 1180584000000 , 7] , [ 1183176000000 , 8] , [ 1185854400000 , 9] , [ 1188532800000 , 8] , [ 1191124800000 , 3] , [ 1193803200000 , 4] , [ 1196398800000 , 2] , [ 1199077200000 , 3] , [ 1201755600000 , 8] , [ 1204261200000 , 7] , [ 1206936000000 , 7] , [ 1209528000000 , 8] , [ 1212206400000 , 9] , [ 1214798400000 , 9] , [ 1217476800000 , 8] , [ 1220155200000 , 8] , [ 1222747200000 , 5] , [ 1225425600000 , 12] , [ 1228021200000 , 2] , [ 1230699600000 , 5] , [ 1233378000000 , 7] , [ 1235797200000 , 1] , [ 1238472000000 , 2] , [ 1241064000000 , 4] , [ 1243742400000 , 5] , [ 1246334400000 , 6] , [ 1249012800000 , 7] , [ 1251691200000 , 7] , [ 1254283200000 , 5] , [ 1256961600000 , 3] , [ 1259557200000 , 5] , [ 1262235600000 , 4] , [ 1264914000000 , 3] , [ 1267333200000 , 2] , [ 1270008000000 , 3] , [ 1272600000000 , 3] , [ 1275278400000 , 3] , [ 1277870400000 , 3] , [ 1280548800000 , 3] , [ 1283227200000 , 3] , [ 1285819200000 , 3] , [ 1288497600000 , 3] , [ 1291093200000 , 3] , [ 1293771600000 , 3] , [ 1296450000000 , 14] , [ 1298869200000 , 14] , [ 1301544000000 , 3] , [ 1304136000000 , 4] , [ 1306814400000 , 3] , [ 1309406400000 , 3] , [ 1312084800000 , 3] , [ 1314763200000 , 4] , [ 1317355200000 , 4] , [ 1320033600000 , 3] , [ 1322629200000 , 3] , [ 1325307600000 , 3] , [ 1327986000000 , 3] , [ 1330491600000 , 3] , [ 1333166400000 , 3] , [ 1335758400000 , 3]]
			 } ,

			 {
			 "key" : "MDesign" ,
			 "values" : [ [ 1025409600000 , 0] , [ 1028088000000 , 4] , [ 1030766400000 , 4] , [ 1033358400000 , 0] , [ 1036040400000 , 6] , [ 1038632400000 , 6] , [ 1041310800000 , 5] , [ 1043989200000 , 5] , [ 1046408400000 , 5] , [ 1049086800000 , 5] , [ 1051675200000 , 5] , [ 1054353600000 , 5] , [ 1056945600000 , 6] , [ 1059624000000 , 6] , [ 1062302400000 , 7] , [ 1064894400000 , 4] , [ 1067576400000 , 4] , [ 1070168400000 , 4] , [ 1072846800000 , 4] , [ 1075525200000 , 4] , [ 1078030800000 , 4] , [ 1080709200000 , 3] , [ 1083297600000 , 3] , [ 1085976000000 , 3] , [ 1088568000000 , 4] , [ 1091246400000 , 4] , [ 1093924800000 , 5] , [ 1096516800000 , 5] , [ 1099195200000 , 5] , [ 1101790800000 , 5] , [ 1104469200000 , 5] , [ 1107147600000 , 5] , [ 1109566800000 , 6] , [ 1112245200000 , 6] , [ 1114833600000 , 5] , [ 1117512000000 , 6] , [ 1120104000000 , 5] , [ 1122782400000 , 5] , [ 1125460800000 , 5] , [ 1128052800000 , 5] , [ 1130734800000 , 5] , [ 1133326800000 , 5] , [ 1136005200000 , 5] , [ 1138683600000 , 5] , [ 1141102800000 , 5] , [ 1143781200000 , 7] , [ 1146369600000 , 7] , [ 1149048000000 , 8] , [ 1151640000000 , 7] , [ 1154318400000 , 8] , [ 1156996800000 , 8] , [ 1159588800000 , 4] , [ 1162270800000 , 4] , [ 1164862800000 , 4] , [ 1167541200000 , 5] , [ 1170219600000 , 6] , [ 1172638800000 , 6] , [ 1175313600000 , 5] , [ 1177905600000 , 5] , [ 1180584000000 , 5] , [ 1183176000000 , 5] , [ 1185854400000 , 5] , [ 1188532800000 , 5] , [ 1191124800000 , 4] , [ 1193803200000 , 4] , [ 1196398800000 , 4] , [ 1199077200000 , 4] , [ 1201755600000 , 4] , [ 1204261200000 , 4] , [ 1206936000000 , 4] , [ 1209528000000 , 4] , [ 1212206400000 , 4] , [ 1214798400000 , 3] , [ 1217476800000 , 3] , [ 1220155200000 , 2] , [ 1222747200000 , 2] , [ 1225425600000 , 2] , [ 1228021200000 , 1] , [ 1230699600000 , 0] , [ 1233378000000 , 0] , [ 1235797200000 , 0] , [ 1238472000000 , 0] , [ 1241064000000 , 0] , [ 1243742400000 , 0] , [ 1246334400000 , 0] , [ 1249012800000 , 0] , [ 1251691200000 , 0] , [ 1254283200000 , 0] , [ 1256961600000 , 0] , [ 1259557200000 , 0] , [ 1262235600000 , 0] , [ 1264914000000 , 0] , [ 1267333200000 , 0] , [ 1270008000000 , 0] , [ 1272600000000 , 0] , [ 1275278400000 , 0] , [ 1277870400000 , 0] , [ 1280548800000 , 0] , [ 1283227200000 , 0] , [ 1285819200000 , 0] , [ 1288497600000 , 0] , [ 1291093200000 , 0] , [ 1293771600000 , 0] , [ 1296450000000 , 1] , [ 1298869200000 , 1] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 0] , [ 1320033600000 , 0] , [ 1322629200000 , 0] , [ 1325307600000 , 0] , [ 1327986000000 , 0] , [ 1330491600000 , 0] , [ 1333166400000 , 0] , [ 1335758400000 , 0]]
			 } ,

			 {
			 "key" : "PhD" ,
			 "values" : [ [ 1025409600000 , 0] , [ 1028088000000 , 1] , [ 1030766400000 , 1] , [ 1033358400000 , 1] , [ 1036040400000 , 1] , [ 1038632400000 , 1] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 2] , [ 1051675200000 , 2] , [ 1054353600000 , 2] , [ 1056945600000 , 2] , [ 1059624000000 , 2] , [ 1062302400000 , 2] , [ 1064894400000 , 2] , [ 1067576400000 , 2] , [ 1070168400000 , 2] , [ 1072846800000 , 1] , [ 1075525200000 , 1] , [ 1078030800000 , 2] , [ 1080709200000 , 1] , [ 1083297600000 , 1] , [ 1085976000000 , 1] , [ 1088568000000 , 1] , [ 1091246400000 , 1] , [ 1093924800000 , 1] , [ 1096516800000 , 1] , [ 1099195200000 , 1] , [ 1101790800000 , 1] , [ 1104469200000 , 3] , [ 1107147600000 , 3] , [ 1109566800000 , 3] , [ 1112245200000 , 3] , [ 1114833600000 , 3] , [ 1117512000000 , 3] , [ 1120104000000 , 4] , [ 1122782400000 , 4] , [ 1125460800000 , 4] , [ 1128052800000 , 4] , [ 1130734800000 , 4] , [ 1133326800000 , 5] , [ 1136005200000 , 3] , [ 1138683600000 , 3] , [ 1141102800000 , 3] , [ 1143781200000 , 2] , [ 1146369600000 , 2] , [ 1149048000000 , 2] , [ 1151640000000 , 3] , [ 1154318400000 , 3] , [ 1156996800000 , 3] , [ 1159588800000 , 2] , [ 1162270800000 , 2] , [ 1164862800000 , 2] , [ 1167541200000 , 1] , [ 1170219600000 , 1] , [ 1172638800000 , 1] , [ 1175313600000 , 2] , [ 1177905600000 , 2] , [ 1180584000000 , 2] , [ 1183176000000 , 3] , [ 1185854400000 , 3] , [ 1188532800000 , 3] , [ 1191124800000 , 4] , [ 1193803200000 , 4] , [ 1196398800000 , 4] , [ 1199077200000 , 5] , [ 1201755600000 , 5] , [ 1204261200000 , 5] , [ 1206936000000 , 3] , [ 1209528000000 , 3] , [ 1212206400000 , 3] , [ 1214798400000 , 4] , [ 1217476800000 , 4] , [ 1220155200000 , 4] , [ 1222747200000 , 3] , [ 1225425600000 , 3] , [ 1228021200000 , 3] , [ 1230699600000 , 1] , [ 1233378000000 , 1] , [ 1235797200000 , 1] , [ 1238472000000 , 0] , [ 1241064000000 , 0] , [ 1243742400000 ,2] , [ 1246334400000 , 2] , [ 1249012800000 , 2] , [ 1251691200000 , 2] , [ 1254283200000 , 1] , [ 1256961600000 , 1] , [ 1259557200000 , 1] , [ 1262235600000 , 0] , [ 1264914000000 , 0] , [ 1267333200000 , 0] , [ 1270008000000 , 0] , [ 1272600000000 , 0] , [ 1275278400000 , 0] , [ 1277870400000 , 0] , [ 1280548800000 , 0] , [ 1283227200000 , 0] , [ 1285819200000 , 0] , [ 1288497600000 , 1] , [ 1291093200000 , 1] , [ 1293771600000 , 1] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 2] , [ 1317355200000 , 0] , [ 1320033600000 , 0] , [ 1322629200000 , 0] , [ 1325307600000 , 0] , [ 1327986000000 , 0] , [ 1330491600000 , 0] , [ 1333166400000 , 0] , [ 1335758400000 , 0]]
			 }*/	], // to be replaced, dummy data
		jsonData:[]
	}

	var p = {};

	// --------- Observers
	var observerCallbacks = [];
	var graphObserverCallbacks = [];

	// call this when you know data has been changed
	var notifyObservers = function(observers){

		if(observers == undefined)
			observers = observerCallbacks;
		else if(observers == "graph")
			observers = graphObserverCallbacks;

		angular.forEach(observers, function(callback){
			callback();
		});
	};

	// register an observer
	p.registerObserverCallback = function(callback){
		observerCallbacks.push(callback);
	};

	// register an observer
	p.registerGraphObserverCallback = function(callback){
		graphObserverCallbacks.push(callback);
	};


	p.getFloors = function(){
		return o.floors;
	}

	p.getRows = function(){
		return o.rows;
	}

	p.getChartData = function(){
		return o.chartData;
	}

	p.getJsonData = function(){           // added to get Json Data
		return o.jsonData;
	}


	p.setJsonData  = function(jsonData){

		//console.log('setting json data');
		o.jsonData =jsonData;

		var lowest = new Date(), highest = new Date();
		var rows=[];
		var chart = [];

		for(x in jsonData){

			if(x=="Overview"){
				continue;
			}
			jsonData[x].map(function(obj){
				obj.name=x;
				rows.push(obj);
			});

		}


		for(var i=0; i<rows.length; i++){

			var row = rows[i];

			if(row == undefined || row['Date'] == undefined || row['Time'] == undefined)
				continue;

			var date = row['Date'].split("/");
			var time = row['Time'].split(":");
			var duration=+row['Duration'];

			var newdate = new Date();
			newdate.setDate(date[0]);
			newdate.setMonth(date[1]-1);
			newdate.setYear(date[2]);
			newdate.setHours(+time[0]);
			newdate.setMinutes(+time[1]);
			newdate.setSeconds(+time[2]);
			newdate.setMilliseconds(0);


			row['formattedDate'] = newdate.getTime();

			var startTime=newdate;
			var endTime=newdate.addTimeMinutes(duration);

			while (startTime <= endTime) {
				if(chart[Object.keys(row)[3]] == undefined){
					chart[Object.keys(row)[3]] = [];
					chart[Object.keys(row)[3]][startTime.getTime()] = parseInt(row[Object.keys(row)[3]]);
				}
				else if(chart[Object.keys(row)[3]][startTime.getTime()] == undefined){
					chart[Object.keys(row)[3]][startTime.getTime()] = parseInt(row[Object.keys(row)[3]]);
				}
				else{
					chart[Object.keys(row)[3]][startTime.getTime()] += parseInt(row[Object.keys(row)[3]]);
				}
				startTime = startTime.addTimeMinutes(30);
			}

			if(i==0){
				highest = newdate;
				lowest = newdate;
			}
			else{
				if(newdate > highest)
					highest = newdate.addTimeMinutes(duration);
				else if(newdate < lowest)
					lowest = newdate;
			}

			// add values for chart
			// if(chart[Object.keys(row)[3]] == undefined){
			// 	chart[Object.keys(row)[3]] = [];
			// 	chart[Object.keys(row)[3]][row['formattedDate']] = parseInt(row[Object.keys(row)[3]]);
			// }
			// else if(chart[Object.keys(row)[3]][row['formattedDate']] == undefined){
			// 	chart[Object.keys(row)[3]][row['formattedDate']] = parseInt(row[Object.keys(row)[3]]);
			// }
			// else
			// 	chart[Object.keys(row)[3]][row['formattedDate']] += parseInt(row[Object.keys(row)[3]]);
		}



		rows.sort(function(a,b){
			if (a['formattedDate'] === b['formattedDate']) {
				return 0;
			}
			else {
				return (a['formattedDate'] < b['formattedDate']) ? -1 : 1;
			}

		});





		o.rows = rows;
		var dateArray = new Array();
		var currentDate = lowest;
		while (currentDate <= highest) {
			dateArray.push( new Date (currentDate).getTime() );
			currentDate = currentDate.addTimeMinutes(30);
			if(currentDate.getHours()>=18){
				var date=new Date(currentDate);
				date.setHours(date.getHours()+15)
				 currentDate = date;
			}
		}

		timeService.setTimeline(dateArray);




		// timeService.setTimelineRange(highest, lowest);

		/*console.log(chart);*/


		updateStackedAreaChart(chart);

		// $timeout(notifyObservers(),1000);

		notifyObservers();


	}


	p.setRows = function(rows){

		o.rows = rows;

		var chart = [];

		var lowest = new Date(), highest = new Date();
		for(var i=0; i<rows.length; i++){

			var row = rows[i];

			if(row == undefined || row.date == undefined || row.time == undefined)
				continue;

			var date = row.date.split("/");
			var time = row.time.split(":");

			var newdate = new Date();
			newdate.setDate(date[0]);
			newdate.setMonth(date[1]-1);
			newdate.setYear(date[2]);
			// newdate.setHours(time[0]);
			// newdate.setMinutes(time[1]);
			// newdate.setSeconds(time[2]);



			if(i==0){
				highest = newdate;
				lowest = newdate;
			}
			else{
				if(newdate > highest)
					highest = newdate;
				else if(newdate < lowest)
					lowest = newdate;
			}

			row.formattedDate = newdate.getTime();



			// add values for chart
			if(chart[row.year] == undefined){
				chart[row.year] = [];
				chart[row.year][row.formattedDate] = parseInt(row.desks);
			}
			else if(chart[row.year][row.formattedDate] == undefined){
				chart[row.year][row.formattedDate] = parseInt(row.desks);
			}
			else
				chart[row.year][row.formattedDate] += parseInt(row.desks);
		}




		timeService.setTimelineRange(highest, lowest);

		notifyObservers();

		// this needs to be after timeline has been set
		updateChart(chart);


		return o.rows;
	}


	var updateStackedAreaChart = function(data){

		//console.log("formatting chart data");

		o.chartData = [];
		var timelineRange = timeService.getTimeline();

		for(key in data){
			var obj = { "key":key, "values": []};
			for(var t=0; t<timelineRange.length; t++){
				var time = timelineRange[t];
				if(data[key][String(time)] !== undefined){

					obj.values.push([ time, data[key][time] ]);
				}
				else{
					obj.values.push([ time, 0 ]);
				}
			}
			o.chartData.push(obj);
		}

		c = o.chartData;
		//console.log("chart data update completed")

		notifyObservers("graph");

	}

	/*var updateChart = function(data){

		o.chartData = [];
		var timelineRange = timeService.getTimeline();
		for(key in data){
			var obj = { "key": "Year " + key, "values": []};
			for(var t=0; t<timelineRange.length; t++){
				var time = timelineRange[t];
				if(data[key][String(time)] !== undefined){
					obj.values.push([ time, data[key][time] ]);
				}
				else{
					obj.values.push([ time, 0 ]);
				}
			}
			o.chartData.push(obj);
		}

		c = o.chartData;
		notifyObservers("graph");

	}*/

	return p;

}]);

desking.factory("graphService",['timeService','dataService',function(timeService, dataService){

	return {
		lineChart: {
			options: lineChartOptions,
			data: lineChartData
		},
		discreteBarChart: {
			options: discreteBarChartOptions,
			data: discreteBarChartData
		},
		stackedAreaChart:{
			options: stackedAreaChartOptions,
			data: stackedAreaChartData

		},
		pieChart: {
			options: pieChartOptions,
			data: pieChartData
		},
		candlestickBarChart: {
			options: candlestickBarChartOptions,
			data: candlestickBarChartData
		}
	};


	/**
	 *  Data & Options Generators
	 */
	function lineChartOptions() {
		return {
			chart: {
				type: 'lineChart',
				margin : {
					top: 40,
					right: 20,
					bottom: 40,
					left: 55
				},
				x: function(d){ return d.x; },
				y: function(d){ return d.y; },
				useInteractiveGuideline: true,
				xAxis: {
					axisLabel: 'Time (ms)',
					axisLabelDistance: -5
				},
				yAxis: {
					axisLabel: 'Voltage (v)',
					tickFormat: function(d){
						return d3.format('.02f')(d);
					},
					axisLabelDistance: -10
				},
				showLegend: false
			}
		};
	}
	function lineChartData() {
		var sin = [],sin2 = [], cos = [];

		//Data is represented as an array of {x,y} pairs.
		for (var i = 0; i < 100; i++) {
			sin.push({x: i, y: Math.sin(i/10)});
			sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
			cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
		}

		//Line chart data should be sent as an array of series objects.
		return [
			{
				values: sin,      //values - represents the array of {x,y} data points
				key: 'Sine Wave', //key  - the name of the series.
				color: '#ff7f0e'  //color - optional: choose your own line color.
			},
			{
				values: cos,
				key: 'Cosine Wave',
				color: '#2ca02c'
			},
			{
				values: sin2,
				key: 'Another sine wave',
				color: '#7777ff',
				area: true      //area - set to true if you want this line to turn into a filled area chart.
			}
		];
	}

	function discreteBarChartOptions() {
		return {
			chart: {
				type: 'discreteBarChart',
				margin : {
					top: 40,
					right: 20,
					bottom: 30,
					left: 55
				},
				x: function(d){return d.label;},
				y: function(d){return d.value;},
				showValues: true,
				valueFormat: function(d){
					return d3.format(',.0f')(d);
				},
				duration: 500,
				xAxis: {
					axisLabel: 'X Axis',
					axisLabelDistance: -10
				},
				yAxis: {
					axisLabel: 'Y Axis',
					axisLabelDistance: -10
				}
			}
		}
	}
	function discreteBarChartData() {
		return [
			{
				key: "Cumulative Return",
				values: [
					{
						"label" : "A" ,
						"value" : 29.765957771107
					} ,
					{
						"label" : "B" ,
						"value" : 0
					} ,
					{
						"label" : "C" ,
						"value" : 32.807804682612
					} ,
					{
						"label" : "D" ,
						"value" : 196.45946739256
					} ,
					{
						"label" : "E" ,
						"value" : 0.19434030906893
					} ,
					{
						"label" : "F" ,
						"value" : 98.079782601442
					} ,
					{
						"label" : "G" ,
						"value" : 13.925743130903
					} ,
					{
						"label" : "H" ,
						"value" : 5.1387322875705
					}
				]
			}
		];
	}

	function stackedAreaChartOptions(){
		return {
			chart: {
				type: 'stackedAreaChart',
				margin : {
					top: 20,
					right: 20,
					bottom: 30,
					left: 40
				},
				x: function(d){ return d[0];},
				y: function(d){return d[1];},
				useVoronoi: false,
				clipEdge: true,
				duration: 100,
				useInteractiveGuideline: true,
				xAxis: {
					showMaxMin: true,
					tickFormat: function(d) {
						return d3.time.format('%x')(new Date(d))
					}
				},
				yAxis: {
					tickFormat: function(d){
						return d3.format(',.2f')(d);
					}
				},
				zoom: {
					enabled: true,
					scaleExtent: [1, 10],
					useFixedDomain: false,
					useNiceScale: false,
					horizontalOff: false,
					verticalOff: true,
					unzoomEventType: 'dblclick.zoom'
				},
				interactiveLayer: {

					dispatch: {
						elementMousemove: function(e) {

							// var today = new Date(e.pointXValue);
							// $scope.scrollValue=today.toDateString();
							// console.log(e.mouseX + " " + e.mouseY + " " +e.pointXValue);
						},
						elementClick: function(e) {
							// console.log(e.mouseX + " " + e.mouseY + " " + e.pointXValue);
						}
					},
				}
			}


		}
	}
	function stackedAreaChartData(){

		return dataService.getChartData();
	}

	function pieChartOptions() {
		return {
			chart: {
				type: 'pieChart',
				margin : {
					top: 30,
					right: 0,
					bottom: 0,
					left: 0
				},
				donut: true,
				x: function(d){return d.key;},
				y: function(d){return d.y;},
				showLabels: true,
				duration: 500,
				labelThreshold: 0.01,
				labelSunbeamLayout: true,
				showLegend: false
			}
		};
	}
	function pieChartData() {
		return [
			{
				key: "One",
				y: 5
			},
			{
				key: "Two",
				y: 2
			},
			{
				key: "Three",
				y: 9
			},
			{
				key: "Four",
				y: 7
			},
			{
				key: "Five",
				y: 4
			},
			{
				key: "Six",
				y: 3
			},
			{
				key: "Seven",
				y: .5
			}
		];
	}

	function candlestickBarChartOptions() {
		return {
			chart: {
				type: 'candlestickBarChart',
				margin : {
					top: 40,
					right: 20,
					bottom: 42,
					left: 65
				},
				x: function(d){ return d['date']; },
				y: function(d){ return d['close']; },
				transitionDuration: 100,
				useInteractiveGuideline: false,

				xAxis: {
					axisLabel: 'Dates',
					tickFormat: function(d) {
						return d3.time.format('%x')(new Date(new Date() - (20000 * 86400000) + (d * 86400000)));
					},
					showMaxMin: false
				},

				yAxis: {
					axisLabel: 'Stock Price',
					tickFormat: function(d){
						return '$' + d3.format(',.1f')(d);
					},
					showMaxMin: false
				}
			}
		};
	}
	function candlestickBarChartData() {
		return [{values: [
			{"date": 15854, "open": 165.42, "high": 165.8, "low": 164.34, "close": 165.22, "volume": 160363400, "adjusted": 164.35},
			{"date": 15855, "open": 165.35, "high": 166.59, "low": 165.22, "close": 165.83, "volume": 107793800, "adjusted": 164.96},
			{"date": 15856, "open": 165.37, "high": 166.31, "low": 163.13, "close": 163.45, "volume": 176850100, "adjusted": 162.59},
			{"date": 15859, "open": 163.83, "high": 164.46, "low": 162.66, "close": 164.35, "volume": 168390700, "adjusted": 163.48},
			{"date": 15860, "open": 164.44, "high": 165.1, "low": 162.73, "close": 163.56, "volume": 157631500, "adjusted": 162.7},
			{"date": 15861, "open": 163.09, "high": 163.42, "low": 161.13, "close": 161.27, "volume": 211737800, "adjusted": 160.42},
			{"date": 15862, "open": 161.2, "high": 162.74, "low": 160.25, "close": 162.73, "volume": 200225500, "adjusted": 161.87},
			{"date": 15863, "open": 163.85, "high": 164.95, "low": 163.14, "close": 164.8, "volume": 188337800, "adjusted": 163.93},
			{"date": 15866, "open": 165.31, "high": 165.4, "low": 164.37, "close": 164.8, "volume": 105667100, "adjusted": 163.93},
			{"date": 15867, "open": 163.3, "high": 164.54, "low": 162.74, "close": 163.1, "volume": 159505400, "adjusted": 162.24},
			{"date": 15868, "open": 164.22, "high": 164.39, "low": 161.6, "close": 161.75, "volume": 177361500, "adjusted": 160.9},
			{"date": 15869, "open": 161.66, "high": 164.5, "low": 161.3, "close": 164.21, "volume": 163587800, "adjusted": 163.35},
			{"date": 15870, "open": 164.03, "high": 164.67, "low": 162.91, "close": 163.18, "volume": 141197500, "adjusted": 162.32},
			{"date": 15873, "open": 164.29, "high": 165.22, "low": 163.22, "close": 164.44, "volume": 136295600, "adjusted": 163.57},
			{"date": 15874, "open": 164.53, "high": 165.99, "low": 164.52, "close": 165.74, "volume": 114695600, "adjusted": 164.87},
			{"date": 15875, "open": 165.6, "high": 165.89, "low": 163.38, "close": 163.45, "volume": 206149500, "adjusted": 162.59},
			{"date": 15876, "open": 161.86, "high": 163.47, "low": 158.98, "close": 159.4, "volume": 321255900, "adjusted": 158.56},
			{"date": 15877, "open": 159.64, "high": 159.76, "low": 157.47, "close": 159.07, "volume": 271956800, "adjusted": 159.07},
			{"date": 15880, "open": 157.41, "high": 158.43, "low": 155.73, "close": 157.06, "volume": 222329000, "adjusted": 157.06},
			{"date": 15881, "open": 158.48, "high": 160.1, "low": 157.42, "close": 158.57, "volume": 162262200, "adjusted": 158.57},
			{"date": 15882, "open": 159.87, "high": 160.5, "low": 159.25, "close": 160.14, "volume": 134848000, "adjusted": 160.14},
			{"date": 15883, "open": 161.1, "high": 161.82, "low": 160.95, "close": 161.08, "volume": 129483700, "adjusted": 161.08},
			{"date": 15884, "open": 160.63, "high": 161.4, "low": 159.86, "close": 160.42, "volume": 160402900, "adjusted": 160.42},
			{"date": 15887, "open": 161.26, "high": 162.48, "low": 161.08, "close": 161.36, "volume": 131954800, "adjusted": 161.36},
			{"date": 15888, "open": 161.12, "high": 162.3, "low": 160.5, "close": 161.21, "volume": 154863700, "adjusted": 161.21},
			{"date": 15889, "open": 160.48, "high": 161.77, "low": 160.22, "close": 161.28, "volume": 75216400, "adjusted": 161.28},
			{"date": 15891, "open": 162.47, "high": 163.08, "low": 161.3, "close": 163.02, "volume": 122416900, "adjusted": 163.02},
			{"date": 15894, "open": 163.86, "high": 164.39, "low": 163.08, "close": 163.95, "volume": 108092500, "adjusted": 163.95},
			{"date": 15895, "open": 164.98, "high": 165.33, "low": 164.27, "close": 165.13, "volume": 119298000, "adjusted": 165.13},
			{"date": 15896, "open": 164.97, "high": 165.75, "low": 164.63, "close": 165.19, "volume": 121410100, "adjusted": 165.19},
			{"date": 15897, "open": 167.11, "high": 167.61, "low": 165.18, "close": 167.44, "volume": 135592200, "adjusted": 167.44},
			{"date": 15898, "open": 167.39, "high": 167.93, "low": 167.13, "close": 167.51, "volume": 104212700, "adjusted": 167.51},
			{"date": 15901, "open": 167.97, "high": 168.39, "low": 167.68, "close": 168.15, "volume": 69450600, "adjusted": 168.15},
			{"date": 15902, "open": 168.26, "high": 168.36, "low": 167.07, "close": 167.52, "volume": 88702100, "adjusted": 167.52},
			{"date": 15903, "open": 168.16, "high": 168.48, "low": 167.73, "close": 167.95, "volume": 92873900, "adjusted": 167.95},
			{"date": 15904, "open": 168.31, "high": 169.27, "low": 168.2, "close": 168.87, "volume": 103620100, "adjusted": 168.87},
			{"date": 15905, "open": 168.52, "high": 169.23, "low": 168.31, "close": 169.17, "volume": 103831700, "adjusted": 169.17},
			{"date": 15908, "open": 169.41, "high": 169.74, "low": 169.01, "close": 169.5, "volume": 79428600, "adjusted": 169.5},
			{"date": 15909, "open": 169.8, "high": 169.83, "low": 169.05, "close": 169.14, "volume": 80829700, "adjusted": 169.14},
			{"date": 15910, "open": 169.79, "high": 169.86, "low": 168.18, "close": 168.52, "volume": 112914000, "adjusted": 168.52},
			{"date": 15911, "open": 168.22, "high": 169.08, "low": 167.94, "close": 168.93, "volume": 111088600, "adjusted": 168.93},
			{"date": 15912, "open": 168.22, "high": 169.16, "low": 167.52, "close": 169.11, "volume": 107814600, "adjusted": 169.11},
			{"date": 15915, "open": 168.68, "high": 169.06, "low": 168.11, "close": 168.59, "volume": 79695000, "adjusted": 168.59},
			{"date": 15916, "open": 169.1, "high": 169.28, "low": 168.19, "close": 168.59, "volume": 85209600, "adjusted": 168.59},
			{"date": 15917, "open": 168.94, "high": 169.85, "low": 168.49, "close": 168.71, "volume": 142388700, "adjusted": 168.71},
			{"date": 15918, "open": 169.99, "high": 170.81, "low": 169.9, "close": 170.66, "volume": 110438400, "adjusted": 170.66},
			{"date": 15919, "open": 170.28, "high": 170.97, "low": 170.05, "close": 170.95, "volume": 91116700, "adjusted": 170.95},
			{"date": 15922, "open": 170.57, "high": 170.96, "low": 170.35, "close": 170.7, "volume": 54072700, "adjusted": 170.7},
			{"date": 15923, "open": 170.37, "high": 170.74, "low": 169.35, "close": 169.73, "volume": 87495000, "adjusted": 169.73},
			{"date": 15924, "open": 169.19, "high": 169.43, "low": 168.55, "close": 169.18, "volume": 84854700, "adjusted": 169.18},
			{"date": 15925, "open": 169.98, "high": 170.18, "low": 168.93, "close": 169.8, "volume": 102181300, "adjusted": 169.8},
			{"date": 15926, "open": 169.58, "high": 170.1, "low": 168.72, "close": 169.31, "volume": 91757700, "adjusted": 169.31},
			{"date": 15929, "open": 168.46, "high": 169.31, "low": 168.38, "close": 169.11, "volume": 68593300, "adjusted": 169.11},
			{"date": 15930, "open": 169.41, "high": 169.9, "low": 168.41, "close": 169.61, "volume": 80806000, "adjusted": 169.61},
			{"date": 15931, "open": 169.53, "high": 169.8, "low": 168.7, "close": 168.74, "volume": 79829200, "adjusted": 168.74},
			{"date": 15932, "open": 167.41, "high": 167.43, "low": 166.09, "close": 166.38, "volume": 152931800, "adjusted": 166.38},
			{"date": 15933, "open": 166.06, "high": 166.63, "low": 165.5, "close": 165.83, "volume": 130868200, "adjusted": 165.83},
			{"date": 15936, "open": 165.64, "high": 166.21, "low": 164.76, "close": 164.77, "volume": 96437600, "adjusted": 164.77},
			{"date": 15937, "open": 165.04, "high": 166.2, "low": 164.86, "close": 165.58, "volume": 89294400, "adjusted": 165.58},
			{"date": 15938, "open": 165.12, "high": 166.03, "low": 164.19, "close": 164.56, "volume": 159530500, "adjusted": 164.56},
			{"date": 15939, "open": 164.9, "high": 166.3, "low": 164.89, "close": 166.06, "volume": 101471400, "adjusted": 166.06},
			{"date": 15940, "open": 166.55, "high": 166.83, "low": 165.77, "close": 166.62, "volume": 90888900, "adjusted": 166.62},
			{"date": 15943, "open": 166.79, "high": 167.3, "low": 165.89, "close": 166, "volume": 89702100, "adjusted": 166},
			{"date": 15944, "open": 164.36, "high": 166, "low": 163.21, "close": 163.33, "volume": 158619400, "adjusted": 163.33},
			{"date": 15945, "open": 163.26, "high": 164.49, "low": 163.05, "close": 163.91, "volume": 108113000, "adjusted": 163.91},
			{"date": 15946, "open": 163.55, "high": 165.04, "low": 163.4, "close": 164.17, "volume": 119200500, "adjusted": 164.17},
			{"date": 15947, "open": 164.51, "high": 164.53, "low": 163.17, "close": 163.65, "volume": 134560800, "adjusted": 163.65},
			{"date": 15951, "open": 165.23, "high": 165.58, "low": 163.7, "close": 164.39, "volume": 142322300, "adjusted": 164.39},
			{"date": 15952, "open": 164.43, "high": 166.03, "low": 164.13, "close": 165.75, "volume": 97304000, "adjusted": 165.75},
			{"date": 15953, "open": 165.85, "high": 166.4, "low": 165.73, "close": 165.96, "volume": 62930500, "adjusted": 165.96}
		]}];
	}





}]);