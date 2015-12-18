'use strict';

function ClientClass(){
	var myData = new Firebase('https://clientsbnoapp.firebaseio.com/clients');

	this.getData = function(){
		myData.on('value', function(snapshot){
      		var clients = snapshot.val();
      		return clients;
      	});
      	
	};
}

angular.module('banightonAdminApp')
    .factory('clients', function(){

    	var myData = new Firebase('https://clientsbnoapp.firebaseio.com/clients');

    	return {
    		getData : function(){
				myData.on('value', function(snapshot){
		      		var clients = snapshot.val();
		      		return clients;
      			});
      		}
      	};
		
    });

