(function (window) {

	angular
		.module('app', [])
		.controller('todosC', ["$scope", "$log", "$window", "$location", function ($scope, $log, $window, $location) {

			//查看localStorage中有没有存过的数据
			$window.localStorage['todoList'] ? $scope.todoList = JSON.parse($window.localStorage['todoList']) : $scope.todoList = [];

			//添加输入内容 双向绑定 和 一个数组
			// 数组中为对象 有 id  内容  是否完成


			var ToL = $scope.todoList

			// 输入内容记录至数组内经过双向绑定自动渲染
			$scope.todoValue = function ($event) {
				if ($event.keyCode == 13 && $scope.value) {
					ToL.push({
						id: ToL.length + 1,
						content: $scope.value,
						isComplete: false,
						status: false
					});
					$scope.value = "";
				}
			}

			//删除按钮
			//获取当前行id 删除
			//贯穿线和打钩的一致

			$scope.del = function (id) {
				ToL.forEach(function (v, i) {
					if (v.id == id) {
						ToL.splice(i, 1);
					}
				});
			}

			//全选 和全不选
			$scope.complete = function () {
				var x = ToL.filter(function (v, i) {
					return !v.isComplete
				});
				if (x.length == 0) {
					$scope.toggle = true
				} else {
					$scope.toggle = false
				}
			};

			//点击全选
			$scope.allToggle = function () {
				ToL.forEach(function (v, i) {
					v.isComplete = $scope.toggle
				})
			}

			//编辑
			//双击编辑
			$scope.edit = function (id) {
				$scope.editId = id;
			}
			//回车修改
			$scope.editDeal = function ($event) {
				if ($event.keyCode == 13) {
					$scope.editId = -1
				}
			}

			//清除完成项
			$scope.clrAllComp = function () {
				$scope.todoList = ToL.filter(function (v, i) {
					return !v.isComplete;
				}, true)
				ToL = $scope.todoList
			};

			//隐藏清除完成项

			$scope.isHide = function () {
				return ToL.filter(function (v, i) {
					return v.isComplete
				}).length <= 0
			}


			//全部任务	
			$scope.allShow = function () {
				ToL.forEach(function (v, i) {
					v.status = false
				})
			}

			//未完成任务 
			$scope.ActShow = function () {
				ToL.forEach(function (v, i) {
					v.status = false
					if (v.isComplete) {
						v.status = v.isComplete
					}
				})

			}

			//已完成任务 
			$scope.CompShow = function () {
				ToL.forEach(function (v, i) {
					v.status = false;
					if (!v.isComplete) {
						v.status = true;
					}
				})

			}

			//watch 只能监视$scape
			//方法监视看的是返回值
			$scope.location = $location;
			$scope.$watch('location.url()', function (n, o) {
				$scope.url = n;
			})

			//待完成数量

			$scope.actCount = function () {
				return ToL.filter(function (v, i) {
					return !v.isComplete
				}).length
			}


			//存入localstory
			//$watch 监听对象的时候第二个参数要为true  默认为false
			$scope.$watch('todoList', function (n, o) {
				if (n === o) {
					return
				}
				$window.localStorage['todoList'] = JSON.stringify($scope.todoList )
			}, true)



		}])



})(window);
