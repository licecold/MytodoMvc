(function (angular) {

	angular
		.module('app.service', [])
		.service('todoService', ["$window", function ($window) {

			//查看localStorage中有没有存过的数据
			this.todoList = $window.localStorage['todoList'] ? todoList = JSON.parse($window.localStorage['todoList']) : todoList = [];

			// 添加
			this.add = function (value) {
				todoList.push({
					id: todoList.length + 1,
					content: value,
					isComplete: false
				});
			}

			//清除完成项
			this.cleanComp = function () {
				todoList = todoList.filter(function (v, i) {
					return !v.isComplete;
				}, true)
				return todoList
			}
		}])

    



})(angular)
