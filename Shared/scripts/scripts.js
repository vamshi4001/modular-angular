'use strict';

/**
 * @ngdoc overview
 * @name providerApp
 * @description
 * # providerApp
 *
 * Main module of the application.
 */
angular
  .module('providerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];  
    delete $httpProvider.defaults.headers.post['Content-Type'];
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/claims', {
        templateUrl: 'views/claims.html',
        controller: 'ClaimsCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/usermgmt', {
        templateUrl: 'views/usermanage.html',
        controller: 'UserManageCtrl'
      })
      .when('/sent', {
        templateUrl: 'views/sent.html',
        controller: 'SentCtrl'
      })
      .when('/approved', {
        templateUrl: 'views/approved.html',
        controller: 'ApprovedCtrl'
      })
      .when('/denied', {
        templateUrl: 'views/denied.html',
        controller: 'DeniedCtrl'
      })
      .when('/hospital-profile', {
        templateUrl: 'views/hospital-profile.html',
        controller: 'HospitalProfileCtrl'
      })
      .when('/guidelines', {
        templateUrl: 'views/guidelines.html',
        controller: 'GuidelinesCtrl'
      })
      .when('/faqs', {
        templateUrl: 'views/faqs.html',
        controller: 'FAQCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/claims'
      });
  })
  /*
  This directive allows us to pass a function in on an enter key to do what we want.
   */
  .directive('ngEnter', function () {
      return function (scope, element, attrs) {
          element.bind("keydown keypress", function (event) {
              if(event.which === 13) {
                  scope.$apply(function (){
                      scope.$eval(attrs.ngEnter);
                  });
   
                  event.preventDefault();
              }
          });
      };
  })
  .service("MessagingService", function(){
    var messages = [];
    return {
      setMessage: function(message){
        messages.push(message);
      },
      getMessage: function(){
        return messages;
      },
      resetMessage: function(){
        messages = [];
      }
    }
  })
  .service("UtilitiesService", function(){
    var urlPrefix = "http://192.168.2.99:9898";
    return{
      getUrlPrefix: function(){        
          return urlPrefix;
      },
      openNewTab : function(name, id, event){
        if($("#"+id).length==0){
          $("#myTab").append(
            $("<li>").html('<a href="/#tab'+id+'" id="'+id+'" role="tab" data-toggle="tab" class="customer-tab">'+name +'<i class="close">×</i></a>')
          );
        }       
        $('#myTab a#'+id).tab('show');    
      }
    }
  })
  .service("UserService", function ($http){
    var userObj = {};
    var adminId = 0;
    var roles = [];
    return{
      setUserObj : function(obj){
        userObj = obj;
      },
      getUserObj : function(){
        return userObj;
      },
      destroyUserObj : function(){
        userObj = null;
      },
      setToken : function(token){
        userObj.authToken = token;
      },
      getToken : function(){
        return userObj.token;
      },
      destroyToken :function(){
        delete userObj['token'];
      },
      getAdminId: function(){
        return adminId;
      },
      setAdminId: function(id){
        adminId = id;
      },
      isAdmin: function(){
        var user = this.getUserObj();        
        if(user && user.roleId == this.getAdminId()){
          return true;
        }
        else{
          return false;
        }
      },
      setRoles: function(roleArray){
        roles = roleArray;
      },
      getRoles: function(){
        return roles;
      },
      fetchRoles: function(){        
        var self = this;
        $http.get("http://192.168.2.99:9898/hosp/master/roles.json").
          success(function(roleData){            
            if(roleData.isSuccess){
              roles = roleData.lookUpData;
              for (var i = 0; i < roles.length; i++) {
                if(roles[i].lookUpValue=="Admin"){                  
                  self.setAdminId(roles[i].lookUpId);
                }
              };     
              self.setRoles(roles);            
            }
          })
          .error(function(){
            console.log("Error");
          })
      },      
      isActive: function(){
        var user = this.getUserObj();        
        if(user){
          if(user.isActive){
            return true;
          }
          else{
            return false;
          }
        }
        else{
          return false;
        }
      }
    } 
  })



'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
  .controller('DashboardCtrl', function ($scope, UserService, $location) {
  	$scope.isActive = UserService.isActive(); 
    if($scope.isActive){
      
    } 
    else{
      $location.path("/");
    } 
  });

'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
  .controller('SentCtrl', function ($scope, UserService, $location) {
  	$scope.isActive = UserService.isActive(); 
    if($scope.isActive){
        
    } 
    else{
      $location.path("/");
    }
  });

'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
  .controller('ApprovedCtrl', function ($scope, UserService, $location) {
  	$scope.isActive = UserService.isActive(); 
    if($scope.isActive){
      
    } 
    else{
      $location.path("/");
    } 
  });

'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
  .controller('DeniedCtrl', function ($scope, UserService, $location) {
  	$scope.isActive = UserService.isActive(); 
    if($scope.isActive){
      
    } 
    else{
      $location.path("/");
    } 
  });

'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
  .controller('HospitalProfileCtrl', function ($scope, UserService, $location, $http) {
    $scope.isActive = UserService.isActive(); 
    if($scope.isActive){
        $scope.hospitalDetails = {};
        $scope.getHospitalDetails = function(hospId){
            $http.get("http://192.168.2.99:9898/hosp/details.json?hospId=1005278")
            .success(function(hospData){                
                if(hospData.isSuccess){
                    $scope.hospitalDetails = hospData.hospDetails;
                    $scope.city = $scope.hospitalDetails.city?$scope.hospitalDetails.city+", "+$scope.hospitalDetails.district:$scope.hospitalDetails.district;
                }
                else{
                    console.log("Something went wrong");
                }
            })
            .error(function(){
                console.log("Error");
            })
        }
        $scope.getHospitalDetails(1005278);
    } 
    else{
      $location.path("/");
    } 	

    $scope.editHospitalProfile = function(){
    	if(UserService.isAdmin()){
    		console.log("Is Admin");
    	}
    	else{
    		console.log("You do not have sufficient privileges");
    	}
    }
  });

'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
  .controller('GuidelinesCtrl', function ($scope, UserService, $location) {
  	$scope.isActive = UserService.isActive(); 
    if($scope.isActive){
       
    } 
    else{
      $location.path("/");
    }
  });

'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
  .controller('FAQCtrl', function ($scope, UserService, $location) {  	
    $scope.isActive = UserService.isActive(); 
    if($scope.isActive){
      $('#faqtabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
      });  
    } 
    else{
      $location.path("/");
    }     		
  });

'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
  .controller('ContactCtrl', function ($scope, UserService, $location) {
  	$scope.isActive = UserService.isActive(); 
    if($scope.isActive){
      
    } 
    else{
      $location.path("/");
    } 
  });

'use strict';

/**
 * @ngdoc function
 * @name providerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the providerApp
 */
angular.module('providerApp')
    .controller('UserManageCtrl', function ($scope, $http, UserService, $location) {
    	$scope.update = {};
    	$scope.data = {};
    	$scope.newuser = {};
    	$scope.user = UserService.getUserObj();    	

    	$scope.roles = [];
    	UserService.fetchRoles();
    	$scope.roles = UserService.getRoles();
    	$scope.isAdmin = function(){
    		if(UserService.isAdmin()){    			
	    		return true;
	    	}	    	
	    	else{	    		
	    		return false;
	    	}	    	
    	}
    	$scope.getUsers = function(hospId){
    		var url = "http://192.168.2.99:9898/hosp/user/entityusers.json?hospId="+hospId;
	    	$http({
	    		method: "GET",
	    		url: url
	    	}).success(function(data){
	    		if(data.isSuccess){
	    			console.log(data);
	    			$scope.data = data;
	    			$scope.userCount = $scope.data.users.length;	    		
	    		}	
	    		else{
	    			$scope.errorMsg = "Unable to find users.";
	    		}    		
	    	}).error(function(){
	    		console.log("Error");
	    	})                	        
    	}
    	$scope.deleteUser = function(){
    		var confirmation = confirm("Do you want to delete the user?");
    		if(confirmation){
    			//send request to server to delete a user
    		}
    	}
    	$scope.updateUser = function(userName, event){    		
    		if(UserService.isAdmin()){
    			var data = {
				    "userId": userName.userId,
				    "roleId": $scope.update.updateUserRole.lookUpId,
				    "isActive":$scope.update.updateStatus,
				    "hospId": userName.entityId,
				    "updatedBy": $scope.user.userId				    
				}	
				$.ajax({
					type: "POST",
					url: "http://192.168.2.99:9898/hosp/user/edit.json",
					data: data,
					success: function(resData){
						console.log(resData);
						if(resData.isSuccess){
							$scope.data = resData;
							$scope.userCount = $scope.data.users.length;
							$scope.$apply();							
						}
					},
					error: function(){
						console.log("Error");
					}
				})
    		}   
    		else{
    			console.log("You do not have sufficient privileges");
    		} 		    		
    	} 
    	$scope.editUser = function(user, event){
    		if(UserService.isAdmin()){
    			var data = {
				    "userId": user.userId,
				    "userName": user.userName,
				    "firstName": user.firstName,
				    "lastName": user.lastname,
				    "roleId": $scope.newuser.role.lookUpId,
				    "hospId": $scope.user.entityId,
				    "createdBy": $scope.user.userId				    
				}	
				$.ajax({
					type: "POST",
					url: "http://192.168.2.99:9898/hosp/user/addedit.json",
					data: data,
					success: function(resData){
						console.log(resData);
						if(resData.isSuccess){
							$scope.data = resData;
							$scope.userCount = $scope.data.users.length;
							$scope.$apply();
							$("#addUserForm").find("input[type=text],input[type=email],input[type=password]").val("");
							window.scrollTo(0,0);	    								
						}
					},
					error: function(){
						console.log("Error");
					}
				})
    		} 
    		else{
    			console.log("You do not have sufficient privileges");
    		}   			    			
    	}
    	$scope.newUserRole = {
			lookUpId: 4670,
			lookUpType: "User_Role",
			lookUpValue: "General",
			lookUpParent: 0,
			sortOrder: 0
		};
		$scope.updateUserRole = {
			lookUpId: 4670,
			lookUpType: "User_Role",
			lookUpValue: "General",
			lookUpParent: 0,
			sortOrder: 0
		};	    			
		$scope.addUser = function(){      	 		
    		if(UserService.isAdmin()){
    			if($scope.newuser.password == $scope.newuser.confirmpassword){    				
    				if($scope.newuser.username &&
    					$scope.newuser.firstname &&
    					$scope.newuser.lastname &&
    					$scope.newuser.password &&
    					$scope.newUserRole
    					){
		    				var data = {
							    "userId": 0,
							    "userName": $scope.newuser.username,
							    "firstName": $scope.newuser.firstname,
							    "lastName": $scope.newuser.lastname,
							    "password": $.md5($scope.newuser.password),
							    "roleId": $scope.newUserRole.lookUpId,
							    "hospId": $scope.user.entityId,
							    "createdBy": $scope.user.userId				    
							}	
							console.log(data);
							$.ajax({
								type: "POST",
								url: "http://192.168.2.99:9898/hosp/user/add.json",
								data: data,
								success: function(resData){
									console.log(resData);
									if(resData.isSuccess){
										$scope.data = resData;
	    								$scope.userCount = $scope.data.users.length;
	    								$scope.$apply();
	    								$("#addUserForm").find("input[type=text],input[type=email],input[type=password]").val("");
	    								window.scrollTo(0,0);	    								
									}
								},
								error: function(){
									console.log("Error");
								}
							})
    				}
	    			else{
	    				console.log("Some data is missing");
	    			}
	    		}
	    		else{
	    			console.log("Passwords Didn't match");
	    		}
    		}	
    		else{
    			console.log("You do not have sufficient privileges");
    		}    	  		
    	}    	
    	if($scope.user.isActive){
			$scope.getUsers($scope.user.entityId);
		}                        
		else{
			$location.path("/");			
		}
    	 		
    });
