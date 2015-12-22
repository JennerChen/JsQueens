'use strict';
var result = [];

/**
 * a js solution for solve eight queens issue(not only for 8, queens may be any number bigger than 4)
 * @param  {Array} queens [current queens array, if it is empty array, that's entry point]
 * @param  {int} max    [queens size]
 * @author Qing Zhang
 * @version 1.0
 * @example
 * 			getQueens([],4) : get 4 queens solution: 2
 * 			getQueens([],8) : get 8 queens solution: 92
 * 			getQueens([],10) : get 10 queens solution: 724
 * 			getQueens([2],8) : get 8 queens solution that first queen position is (1,2) : 8 (notice: you must manually set result=[] before run this, and then print result)
 */
function getQueens(queens, max) {
	if (max == 2 || max == 3) {
		return false;
	}
	// start caculate when queens is an empty array([]), 
	if (queens.length == 0) {
		var start = Date.now();
		result = [];
		// from [1..max] get result
		for (var i = 1; i <= max; i++) {
			getQueens([i], max);
		}
		console.log('get result:' + result.length);
		var end = Date.now();
		console.log('spend total:'+ (end-start) +"ms");
		return true;
	}
	if (queens.length == max) {
		// exit point when queens array match condition, that means one soluton get it, and push to result list
		result.push(queens);
	} else {
		var banPos = [];
		// core logic:
		// depend on queens array, find all banned position
		for (var x = 0; x < queens.length; x++) {
			var y = queens[x];
			// find banned position above current x position 
			if ((queens.length + 1 - (x + 1) + y) <= max) {
				banPos.push(queens.length + 1 - (x + 1) + y);
			}
			// find banned position below current x position 
			if (y - (queens.length + 1 - (x + 1)) > 0) {
				banPos.push(y - (queens.length + 1 - (x + 1)));
			}
			// find banned position in horizonal current x position 
			banPos.push(y);
		}
		// use undersocre.js tools to filter all repeated number;
		banPos = _.uniq(banPos);
		// use tools method to find all availalbe number  
		var resultPos = _.difference(_.range(1,max+1), banPos);
		// make new queens array 
		for (var i = 0; i < resultPos.length; i++) {
			// use _.union to concat queens and current postion, and not change original queens array
			getQueens(_.union(queens,[resultPos[i]]), max);
		}
	}
}