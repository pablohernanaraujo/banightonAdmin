'use strict';


angular.module('banightonAdminApp')
  .filter('notActive', function($filter){
    return function(data, start){
      //console.log(data);
      // var filtered = [];

      // angular.forEach(data, function(value) {
      //   if(value.user.status === '0'){
      //     filtered.push(value);
      //   }
      // });

      if(data) {
        start = +start; //parse to int
        return data.slice(start);
      }
    };
  });