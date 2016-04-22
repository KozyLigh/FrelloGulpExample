/**
 * Created by kozy on 22/04/16.
 */

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