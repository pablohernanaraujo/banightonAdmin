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
                    var bolichesFilteredActive = [];
                    var djsFilteredActive = [];

                    angular.forEach(boliches, function(value) {
                        if(value.user.client === 'Boliche'){
                            bolichesFiltered.push(value);
                            if(value.user.status === '0'){
                                bolichesFilteredActive.push(value);
                            }
                        }else{
                            djsFiltered.push(value);
                            if(value.user.status === '0'){
                                djsFilteredActive.push(value);
                            }
                        }
                    });
                    $rootScope.boliches = bolichesFiltered;
                    $rootScope.djs = djsFiltered;

                    $rootScope.notActiveClients = bolichesFilteredActive;
                    $rootScope.notActiveClientsDj = djsFilteredActive;

                    $rootScope.dataLoading = false;
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