'use strict';

angular.module('banightonAdminApp')
  .filter('status', function( $filter){
    return function(data, estatus){

    	var activeFiltered = [];

    	if(estatus === 'all'){
    		return data;
    	}
    	if(estatus === 'active'){
    		angular.forEach(data, function(value) {
	            if(value.client.status === '1'){
	                activeFiltered.push(value);
	            } 
	        });
    		return activeFiltered;
    	}
    	if(estatus === 'notactive'){
    		angular.forEach(data, function(value) {
	            if(value.client.status === '0'){
	                activeFiltered.push(value);
	            } 
	        });
    		return activeFiltered;
    	}
    	

    	//return data.slice(start);
    	//return activeFiltered;
       
    };
  });