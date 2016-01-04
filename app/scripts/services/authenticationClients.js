'use strict';


angular.module('banightonAdminApp')
    .factory('AuthenticationClients',['$rootScope', '$firebaseAuth', 'fire', '$location', '$firebaseObject', '$firebaseArray', '$timeout', 
    	function($rootScope, $firebaseAuth, fire, $location, $firebaseObject, $firebaseArray, $timeout) {

    	var refClients = new Firebase(fire.clients + '/clients'); 
    	var ref = new Firebase(fire.clients);
    	var authClient = $firebaseAuth(ref);

    	return {
    		online: function(){
                $rootScope.dataLoading = true;
                refClients.on('value', function(snap){
                    var boliches = snap.val();
                    var bolichesFiltered = [];
                    var djsFiltered = [];
                    angular.forEach(boliches, function(value) {
                        if(value.client.client === 'Boliche'){
                            bolichesFiltered.push(value);
                            
                        }else{
                            djsFiltered.push(value);
                        }
                    });
                    $rootScope.boliches = bolichesFiltered;
                    $rootScope.djs = djsFiltered;
                    $rootScope.dataLoading = false;
                    // console.log($rootScope.boliches);
                    // console.log($rootScope.djs);
                });
    		},
    		onlineActive: function(){
    			
    			refClients.on('value', function(snap){
    				var clients = snap.val();
    				var filtered = [];
    				angular.forEach(clients, function(value) {
						if(value.client.status === '0'){
					 		filtered.push(value);
						}
					});
					$rootScope.notActiveClients = filtered;
    			});
    			
    		},

    		register: function(client){
    			authClient.$createUser({
		  			email: client.email,
		  			password: client.password
		  		}).then(function(regClient){

                    client.date= Firebase.ServerValue.TIMESTAMP;
                    client.regClient= regClient.uid;
                    client.status = '0';
                    client.password = '';

		  			var regRef = new Firebase(fire.clients + '/clients').child(regClient.uid).set({

                        client:client     
                        
		  			});
		  			$rootScope.message = 'Registering ' + client.firstname;
		  		}).catch(function(error){
		  			$rootScope.message = error.message;
		  		});
    		}
    	};

    }]);