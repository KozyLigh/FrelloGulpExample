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
