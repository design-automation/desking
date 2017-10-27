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

desking.factory("dataService", ['timeService', function(timeService) {

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
        displayGroups:[],
        restructuredData:[],
		jsonData:[]
	}

	var p = {};

	// --------- Observers
	var observerCallbacks = [];
	var graphObserverCallbacks = [];
    var groupsObserverCallbacks = [];
    var restructuredDataObserverCallbacks =[];

	// call this when you know data has been changed
	var notifyObservers = function(observers){

		if(observers == undefined)
			observers = observerCallbacks;
		else if(observers == "graph")
			observers = graphObserverCallbacks;
        else if(observers == "groupsUpdated")
            observers = groupsObserverCallbacks;
        else if(observers == "restructuredDataUpdated")
            observers = restructuredDataObserverCallbacks;

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

    // register an observer
    p.registerGroupsObserverCallback = function(callback){
        groupsObserverCallbacks.push(callback);
    };

    // register an observer
    p.registerRestructuredDataObserverCallback = function(callback){
        restructuredDataObserverCallbacks.push(callback);
    };




	p.getRows = function(){
		return o.rows;
	}
    p.setRows = function(rows){
        o.rows = rows;
        return o.rows;
    }

    p.getDisplayGroups= function(){
        return o.displayGroups;
    }
    p.setDisplayGroups = function(groups){
        o.displayGroups=groups;
        notifyObservers("groupsUpdated");
        return o.displayGroups;
    }

	p.getJsonData = function(){           // added to get Json Data
		return o.jsonData;
	}
	p.setJsonData  = function(jsonData){

		o.jsonData =jsonData;

		var lowest = new Date(), highest = new Date();
		var rows=[];
		var chart = [];
		var displayGroups =[];



		for(x in jsonData){
            if(x=="Overview"){
                continue;
            }
            jsonData[x].map(function(row){
                var obj={}
                var headers=Object.keys(jsonData[x][0]);
                for(i=0;i<headers.length;i++){
                    obj[headers[i]]=row[headers[i]];
                }
                obj.Name=x;
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
                if(chart[Object.keys(row)[4]] == undefined){
                    chart[Object.keys(row)[4]] = [];
                    chart[Object.keys(row)[4]][startTime.getTime()] = parseInt(row[Object.keys(row)[4]]);
                }
                else if(chart[Object.keys(row)[4]][startTime.getTime()] == undefined){
                    chart[Object.keys(row)[4]][startTime.getTime()] = parseInt(row[Object.keys(row)[4]]);
                }
                else{
                    chart[Object.keys(row)[4]][startTime.getTime()] += parseInt(row[Object.keys(row)[4]]);
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

        p.setRows(rows);

		for(x in jsonData){
            var newgroup = {Name: x};
            newgroup.headers=Object.keys(jsonData[x][0]);
            newgroup.rows=jsonData[x].map(function(row){
            	var obj={}
            	for(i=0;i<newgroup.headers.length;i++){
            		obj[newgroup.headers[i]]=row[newgroup.headers[i]];
				}
                obj.Name=x;
				return obj;
			});

			if(x=="Overview"){
                displayGroups.push(newgroup);
				continue;
			}
			else{

                newgroup.rows.map(function(row,index){

                    if( row['Date'] != undefined || row['Time'] != undefined){
                        var date = row['Date'].split("/");
                        var time = row['Time'].split(":");

                        var newdate = new Date();
                        newdate.setDate(date[0]);
                        newdate.setMonth(date[1]-1);
                        newdate.setYear(date[2]);
                        newdate.setHours(+time[0]);
                        newdate.setMinutes(+time[1]);
                        newdate.setSeconds(+time[2]);
                        newdate.setMilliseconds(0);

                        row['formattedDate'] = newdate.getTime();

                    }

                    row.clusterIdArray =row['Desks'] == undefined ? [] : row['Desks'].split(",");
                    row.totalDesksNeeded=row[newgroup.headers[4]];
                    row.desksAlloted=0;
                    var clusters = d3.selectAll('g g.cluster');
                    clusters[0].map(function(cluster){

                        if(row.clusterIdArray.length>0){
                            row.clusterIdArray.map(function(Id){

                                if(Id==cluster.id){
                                    var desksAllotedCluster=d3.select(cluster);
                                    row.desksAlloted+=desksAllotedCluster.selectAll('g rect')[0].length;
                                }
                            });
                        }

                    });

                    if(row.desksAlloted < row.totalDesksNeeded){
                        row.mode="selection"
                    }
                    else{
                        row.mode="display"
                    }
                });
			}

			// jsonData[x].map(function(obj){
			// 	obj.Name=x;
			// 	rows.push(obj);
			// });
            displayGroups.push(newgroup);
		}

        p.setDisplayGroups(displayGroups);

		var dateArray = new Array();
		var currentDate = lowest;
		while (currentDate <= highest) {
			dateArray.push( new Date (currentDate).getTime() );
			currentDate = currentDate.addTimeMinutes(30);
			// if(currentDate.getHours()>=18){
			// 	var date=new Date(currentDate);
			// 	date.setHours(date.getHours()+15)
			// 	if(date.getDay()==6){
             //        date.setHours(date.getHours()+48);
             //        console.log("saturday and Sunday Removed");
			// 	}
			// 	 currentDate = date;
			// }
		}

		timeService.setTimeline(dateArray);

		updateStackedAreaChart(chart);
        restructureData(jsonData);
		// updateDisplayGroups();

		notifyObservers();

        return o.jsonData;

	}
    p.updateJsonData =function(jsonData){
        o.jsonData =jsonData;
        restructureData(jsonData);
        return o.jsonData;
    }

    p.getChartData = function(){
        return o.chartData;
    }
    p.getFloors = function(){
        return o.floors;
    }

    p.setRestructuredData =function(restructuredData){
        o.restructuredData=restructuredData;
        notifyObservers("restructuredDataUpdated");
        return o.restructuredData;
    }
    p.getRestructuredData = function(){
        return o.restructuredData;
    }

	var updateStackedAreaChart = function(data){

		o.chartData = [];
		c=[];
		var timelineRange = timeService.getTimeline();


		for(key in data){
			var obj = { "key":key, "values": []};
			var obj1={ "key":key, "values": []};
			for(var t=0; t<timelineRange.length; t++){
				var time = timelineRange[t];
				if(data[key][String(time)] !== undefined){

					obj.values.push([ time, data[key][time] ]);
                    obj1.values.push([ time, data[key][time] ]);
				}
				else{
					obj.values.push([ time, 0 ]);
                    obj1.values.push([ time, 0 ]);
				}
			}
			o.chartData.push(obj);
			c.push(obj1);
		}

		c = o.chartData;

		notifyObservers("graph");

	}

    var restructureData = function(jsonData){

        o.crossFilterData = [];
        var facts=[];
        for(x in jsonData){
            if(x=="Overview"){
                continue;
            }

            jsonData[x].map(function(row){
                var fact={}

                fact.Name = x;
                fact.Type = row['Type'];
                fact.Date = row['Date'];

                var date = row['Date'] == undefined ? [] :  row['Date'].split("/");
                var time = row['Time'] == undefined ? [] :  row['Time'].split(":");

                var startTime = new Date();
                startTime.setDate(date[0]);
                startTime.setMonth(date[1]-1);
                startTime.setYear(date[2]);
                startTime.setHours(+time[0]);
                startTime.setMinutes(+time[1]);
                startTime.setSeconds(+time[2]);
                startTime.setMilliseconds(0);
                var endTime=startTime.addTimeMinutes(+row['Duration']);

                fact.FormattedClassStartTime = startTime.getTime();
                fact.FormattedClassEndTime = endTime.getTime();

                var headers=Object.keys(row);
                fact.StudentGroup = headers[4];

                fact.DesksNeeded = row[fact.StudentGroup];
                fact.AllocatedDesks = row['Desks'] == undefined ? [] : row['Desks'].split(",");
                fact.DesksAllocated = 0;
                var clusters = d3.selectAll('g g.cluster');
                clusters[0].map(function(cluster){

                    if(fact.AllocatedDesks.length>0){
                        fact.AllocatedDesks.map(function(Id){

                            if(Id==cluster.id){
                                var desksAllotedCluster=d3.select(cluster);
                                fact.DesksAllocated+=desksAllotedCluster.selectAll('g rect')[0].length;
                            }
                        });
                    }

                });

                facts.push(fact);
            });
        }
        p.setRestructuredData(facts);
    }




	// var updateDisplayGroups = function(){
	// 	o.displayGroups=[];
     //    if(Object.keys(o.jsonData).length == 0)
     //        return;
    //
     //    for(x in o.jsonData){
    //
     //        var newgroup = {Name: x};
     //        newgroup.headers=Object.keys(o.jsonData[x][0]);
     //        newgroup.rows=o.jsonData[x];
     //        if(x!=="Overview"){
    //
     //            newgroup.rows.map(function(row){
     //                row.clusterIdArray =row['Desks'] == undefined ? [] : row['Desks'].split(",");
     //                row.totalDesksNeeded=row[newgroup.headers[4]];
     //                row.desksAlloted=0;
     //                var clusters = d3.selectAll('g g.cluster');
     //                clusters[0].map(function(cluster){
    //
     //                    if(row.clusterIdArray.length>0){
     //                        row.clusterIdArray.map(function(Id){
    //
     //                            if(Id==cluster.id){
     //                                var desksAllotedCluster=d3.select(cluster);
     //                                row.desksAlloted+=desksAllotedCluster.selectAll('g rect')[0].length;
     //                            }
     //                        });
     //                    }
    //
     //                });
    //
     //                if(row.desksAlloted < row.totalDesksNeeded){
     //                    row.mode="selection"
     //                }
     //                else{
     //                    row.mode="display"
     //                }
    //
	// 			});
     //            newgroup.clusterIdArray =o.jsonData[x][0]['Desks'] == undefined ? [] : o.jsonData[x][0]['Desks'].split(",");
     //            newgroup.totalDesksNeeded=o.jsonData[x][0][newgroup.headers[4]];
     //            newgroup.desksAlloted=0;
     //            var clusters = d3.selectAll('g g.cluster');
     //            clusters[0].map(function(cluster){
    //
     //                if(newgroup.clusterIdArray.length>0){
     //                    newgroup.clusterIdArray.map(function(Id){
    //
     //                        if(Id==cluster.id){
     //                            var desksAllotedCluster=d3.select(cluster);
     //                            newgroup.desksAlloted+=desksAllotedCluster.selectAll('g rect')[0].length;
     //                        }
     //                    });
     //                }
    //
     //            });
    //
     //            if(newgroup.desksAlloted < newgroup.totalDesksNeeded){
     //                newgroup.mode="selection"
     //            }
     //            else{
     //                newgroup.mode="display"
     //            }
    //
     //        }
     //        o.displayGroups.push(newgroup);
    //
     //    }
    //
     //    notifyObservers("groupsUpdated");
	// }

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

desking.factory("displayService",['timeService','dataService',function(timeService, dataService){
    var o = {
        mode: [],
        groups:[],
		selectionGroup:[],
        updatedRowupdatedGroup:[],
		selectionRow:[],
		updatedRow:[],
        clickedRow:[]
    }

    var p = {};

    // --------- Observers
    var observerCallbacks = [];
    var modeObserverCallbacks = [];
    var clickObserverCallbacks=[];


    // register an observer
    p.registerObserverCallback = function(callback){
        observerCallbacks.push(callback);
    };
    // register an observer
    p.registerModeObserverCallback = function(callback){
        modeObserverCallbacks.push(callback);
    };

    // register an observer
    p.registerClickObserverCallback = function(callback){
        clickObserverCallbacks.push(callback);
    };


    var notifyObservers = function(observers){

        if(observers == undefined)
            observers = observerCallbacks;
        else if(observers == "mode")
            observers = modeObserverCallbacks;
        else if(observers == "click")
            observers = clickObserverCallbacks;

        angular.forEach(observers, function(callback){
            callback();
        });
    };

    p.getMode= function(){
        return o.mode;

    }

    p.setMode= function(mode){
        o.mode=mode;
        notifyObservers("mode");
        return o.mode;
    }

    p.getGroups= function(){
        return o.groups;
    }

    p.setGroups= function(groups){
        o.groups=groups;
        notifyObservers();
        return o.groups;

    }

    p.setSelectionGroup= function(group){
        o.selectionGroup=group;
        o.updatedGroup=group;
        p.setMode(group.mode);
        return o.selectionGroup;
    }

    p.getSelectionGroup= function(){
        return o.selectionGroup;
    }

    p.setSelectionRow= function(row){

        o.selectionRow=row;
        o.updatedRow=row;
        p.setMode(row.mode);
        return o.selectionRow;
    }
    p.getSelectionRow= function(){
        return o.selectionRow;
    }

    p.setClickedRow= function(row){
        o.clickedRow=row;
        notifyObservers("click");
        return o.clickedRow;
    }
    p.getClickedRow= function(){
        return o.clickedRow;
    }



    p.setUpdatedGroup= function(group){
        o.updatedGroup=group;
        o.groups=dataService.getDisplayGroups();

        o.groups.map(function(group){
            if(group.Name==o.updatedGroup.Name){
                group=o.updatedGroup;
            }
        });

        notifyObservers();
        dataService.setDisplayGroups(o.groups);

        return o.updatedGroup;

    }

    p.getUpdatedGroup= function(){
        return o.updatedGroup;
    }

    p.setUpdatedRow= function(row){
        o.updatedRow=row;
        o.groups=dataService.getDisplayGroups();

        o.groups.map(function(group){
            if(group.Name==o.selectionGroup.Name){

                group.rows.map(function(row){
                    if(row['formattedDate']==o.updatedRow['formattedDate']){
                        row=o.updatedRow;
                    }
                });

            }
        });

        dataService.setDisplayGroups(o.groups);

        return o.updatedRow;

    }

    p.getUpdatedRow= function(){
        return o.updatedRow;
    }

    p.updateJson=function(){

    	var group=o.updatedGroup;
    	var updatedRow=o.updatedRow;

        var jsonData=dataService.getJsonData();
        // var clusterString=group.clusterIdArray.toString();
        var clusterString=updatedRow.clusterIdArray.toString();
        console.log(clusterString);

        jsonData[group.Name].map(function(row){
            if( row['Date'] != undefined || row['Time'] != undefined){
                var date = row['Date'].split("/");
                var time = row['Time'].split(":");

                var newdate = new Date();
                newdate.setDate(date[0]);
                newdate.setMonth(date[1]-1);
                newdate.setYear(date[2]);
                newdate.setHours(+time[0]);
                newdate.setMinutes(+time[1]);
                newdate.setSeconds(+time[2]);
                newdate.setMilliseconds(0);


                if(newdate.getTime()==updatedRow['formattedDate']){
                    row['Desks']=clusterString;
                }

            }

        });

        dataService.setJsonData(jsonData);
	}

    return p;


}]);