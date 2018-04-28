console.log('client.js');

var app = angular.module('TodoApp', []);

app.controller('TodoController', function() {
  console.log('angular.js');

  self = this;

  self.newTask = {};
  self.tasks = [];

  self.getTasks = function() {
    $http({
      method: 'GET',
      url: '/task'
    })
      .then(function (response) {
        self.tasks = response.data;
      })
      .catch(function(error) {
        console.log('error with /task GET:', error);
      })
  }

  self.addTask = function() {
    $http({
      method: 'POST', 
      url: '/task',
      data: self.newTask
    })
      .then(function (response) {
        self.getTasks();
      })
      .catch(function (error) {
        console.log('error with /task POST', error);
      })
  }

  self.completeTask = function(task) {
    $http({
      method: 'PUT',
      url: '/task',
      data: task
    })
      .then(function (response) {
        self.getTasks();
      })
      .catch(function(error) {
        console.log('error with /task PUT', error);
      })
  }

  self.deleteTast = function(tast) {
    $http({
      method: 'DELETE',
      url: '/task',
      params: task
    })
      .then(function (response) {
        self.getTasks();
      })
      .catch(function(error) {
        console.log('error with /task DELETE', error);
      })
  }

  self.getTasks();

})