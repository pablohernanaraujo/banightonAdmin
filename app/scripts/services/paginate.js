'use strict';

angular.module('banightonAdminApp')
  .filter('paginate', function( $filter){
    return function(data, start){

      if (!data || !data.length) { return; }

      return data.slice(start);
       
    };
  });