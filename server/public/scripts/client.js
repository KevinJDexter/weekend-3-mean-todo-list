console.log('client.js');

var app = angular.module('TodoApp', []);

app.controller('TodoController', ['$http', function($http) {
  console.log('angular.js');

  self = this;

  self.newTask = { completed: false };
  self.tasks = [];

  self.taskToDelete = {};
  self.deleteTaskExists = false;

  self.taskToSearch = '';
  self.categoryToSearch = '';


  // Populates our client side tasks with all tasks stored in our database
  self.getTasks = function() {
    console.log(self.toSearch);
    $http({
      method: 'GET',
      url: '/task',
      params: { test: self.toSearch }
    })
      .then(function (response) {
        self.tasks = response.data;
      })
      .catch(function(error) {
        console.log('error with /task GET:', error);
      })
  }

  // Sends our new task to be added to the database
  self.addTask = function() {
    $http({
      method: 'POST', 
      url: '/task',
      data: self.newTask
    })
      .then(function (response) {
        self.getTasks();
        self.newTask = { completed: false }
      })
      .catch(function (error) {
        console.log('error with /task POST', error);
      })
  }

  // Changes the tasks completed value to true and updates it in the database
  self.completeTask = function(task) {
    task.completed = true;
    self.updateTask(task);
  }

  // Deletes a task permanently from both the client and database
  self.deleteTask = function() {
    $http({
      method: 'DELETE',
      url: '/task',
      params: self.taskToDelete
    })
      .then(function (response) {
        self.getTasks();
        self.taskToDelete = {};
        self.deleteTaskExists = false;
      })
      .catch(function(error) {
        console.log('error with /task DELETE', error);
      })
  }

  // Updates task with new info
  self.updateTask = function(task) {
    $http({
      method: 'PUT', 
      url: '/task',
      data: task
    })
      .then(function(response) {
        self.getTasks();
      })
      .catch(function (error) {
        console.log('error with /task PUT', error);
      })
  }

  self.setToDelete = function (task) {
    self.taskToDelete = task;
    self.deleteTaskExists = true;
  }

  self.cancelDelete = function () {
    self.taskToDelete = {};
    self.deleteTaskExists = false;
  }

  self.getTasks();

}])