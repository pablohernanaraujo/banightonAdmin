'use strict';


angular.module('banightonAdminApp')
    .factory('Authentication',['$rootScope', '$firebaseAuth', 'fire', '$location', '$firebaseObject', 
    	function($rootScope, $firebaseAuth, fire, $location, $firebaseObject) {

    	var ref = new Firebase(fire.users);
    	var auth = $firebaseAuth(ref);

    	auth.$onAuth(function(authUser){
    		if(authUser){
    			var userRef = new Firebase(fire.users + '/users/' + authUser.uid);
    			var userObj = $firebaseObject(userRef);
    			$rootScope.currentUser = userObj;
    		}else{
    			$rootScope.currentUser = '';
    		}
    	});

    	return {
    		login: function(user){
    			auth.$authWithPassword({
    				email: user.email,
    				password: user.password
    			}).then(function(regUser){
    				$location.path('/clients');
    			}).catch(function(error){
    				$rootScope.message = error.message;
    			});
    		},

    		logout: function(){
    			return auth.$unauth();
    		},

    		requireAuth: function(){
    			return auth.$requireAuth();
    		},

    		register: function(user){
    			auth.$createUser({
		  			email: user.email,
		  			password: user.password
		  		}).then(function(regUser){

		  			var regRef = new Firebase(fire.users + '/users').child(regUser.uid).set({
		  				date: Firebase.ServerValue.TIMESTAMP,
		  				regUser: regUser.uid,
		  				firstname: user.firstname,
		  				lastname: user.lastname,
		  				nivel: user.nivel,
		  				email: user.email,
		  				status: 1
		  			});

		  			$rootScope.message = 'Hi ' + user.firstname + ', Thanks for registering';
		  		}).catch(function(error){
		  			$rootScope.message = error.message;
		  		});
    		}
    	};

    }]);