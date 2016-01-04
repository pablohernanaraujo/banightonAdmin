'use strict';


angular.module('banightonAdminApp')
    .factory('Authentication',['$rootScope', '$firebaseAuth', 'fire', '$location', '$firebaseObject', '$firebaseArray', '$timeout', 
    	function($rootScope, $firebaseAuth, fire, $location, $firebaseObject, $firebaseArray, $timeout) {

    	var refUsers = new Firebase(fire.users + '/users'); 
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
    		online: function(){
    			$rootScope.dataLoading = true;
    			var users = $firebaseArray(refUsers);
    			$rootScope.users = users;
    			$rootScope.dataLoading = false;
    		},
    		onlineActive: function(){
    			
    			refUsers.on('value', function(snap){
    				var users = snap.val();
    				var filtered = [];
    				angular.forEach(users, function(value) {
						if(value.user.status === '0'){
					 		filtered.push(value);
						}
					});
					$rootScope.notActiveUsers = filtered;
    			});
    			
    		},
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
    			$location.path('/');
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
		  				user:{
		  					date: Firebase.ServerValue.TIMESTAMP,
			  				regUser: regUser.uid,
			  				firstname: user.firstname,
			  				lastname: user.lastname,
			  				nivel: user.nivel,
			  				email: user.email,
			  				status: '1'
		  				}
		  			});
		  			$rootScope.message = 'Registering ' + user.firstname;
		  		}).catch(function(error){
		  			$rootScope.message = error.message;
		  		});
    		}
    	};

    }]);