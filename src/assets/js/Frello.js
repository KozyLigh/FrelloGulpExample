/**
 * Created by Kozy on 14.4.2016.
 */
angular.module('Frello', [])
    .controller('FrelloToDoListController', function($scope, TodoFactory) {
        var todoList = this;
        var taskIndex=-1;
        todoList.todos=[];
        todoList.archivedTodos = [];
        $scope.addButton = 'Add new task';
        $scope.addEditBtnClass='btn-primary';

        $scope.$on('todoList changed', function(event, data) {
            todoList.todos = data;
        });
        $scope.$on('archivedList changed', function(event, data) {
            todoList.archivedTodos = data;
        });

        todoList.addTodo = function(todoText){
            TodoFactory.addTask(todoText, taskIndex);
            todoList.todos=TodoFactory.todoList;
            taskIndex=-1;
            $scope.addButton = 'Add new task';
            $scope.addEditBtnClass='btn-primary';
            todoList.todoText = '';
        }

        todoList.remaining = function() {
            var count = 0;
            angular.forEach(TodoFactory.todoList, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function() {
            TodoFactory.archiveDoneTasks();
        };

        todoList.unArchive = function() {
            TodoFactory.unArchiveTasks();
        };

        todoList.editTodo=function(todo){
            taskIndex=todoList.todos.indexOf(todo);
            todoList.todoText = todo.text;
            $scope.addButton = 'Edit task';
            $scope.addEditBtnClass='btn-success';
        }

        todoList.checkHide = function() {
            return todoList.shouldHide;
        };
        todoList.toggleHide = function() {
            if(todoList.shouldHide){
                todoList.shouldHide=false;
            }else{
                todoList.shouldHide=true;
            }
        };

        todoList.clearArchive = function(){
            TodoFactory.clearArchiveList();
        };

        todoList.clearTodo = function(){
            TodoFactory.clearList();
        };

    });

angular.module('Frello').factory('TodoFactory', ['$rootScope', function($rootScope){

    var todos = [];
    var archivedTodos = [];
    return {
        todoList:todos,
        archivedList:archivedTodos,
        addTask: addTask,
        addArchiveTask: addArchiveTask,
        clearList: clearList,
        clearArchiveList: clearArchiveList,
        archiveDoneTasks:archiveDoneTasks,
        unArchiveTasks:unArchiveTasks
    };

    function addTask(todoText, index) {
        if(index!=-1){
            todos[index].text=todoText;
        }else{
            todos.push({text:todoText, done:false});
        }
        $rootScope.$broadcast('todoList changed', todos);
    };
    function addArchiveTask(todoText) {
        archivedTodos.push({text:todoText, done:false});
        $rootScope.$broadcast('archivedList changed', archivedTodos);
    };
    function clearList(){
        todos.splice(0, todos.length);
        $rootScope.$broadcast('todoList changed', todos);
    };
    function clearArchiveList(){
        archivedTodos.splice(0, archivedTodos.length);
        $rootScope.$broadcast('archivedList changed', archivedTodos);
    };
    function archiveDoneTasks(){
        var oldTodos = todos.slice(0);
        clearList();
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done){
                addTask(todo.text, -1);
            }else{
                addArchiveTask(todo.text);
            }
        });
    };
    function unArchiveTasks(){
        var oldTodos = archivedTodos.slice(0);
        clearArchiveList();
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done){
                addArchiveTask(todo.text);
            }else{
                todo.done=false;
                addTask(todo.text,-1);
            }
        });
    };

}]);