/**
 * Created by Vijaya Yeruva on 4/4/2017.
 */

var myapp = angular.module('app',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('MongoRestController',function($scope,$http){
    $scope.insertData = function(){
        console.log($scope.formData.lname);
        console.log($scope.formData.fname);
        console.log($scope.formData.email);
        console.log($scope.formData.password);
        console.log($scope.formData.cpassword);
        var dataParams = {
            'fname' : $scope.fname,
            'lname' : $scope.lname,
            'email' : $scope.email,
            'pw' : $scope.pw
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});

myapp.controller('homeController',function($scope,$http){
    $scope.getData=function(){
        var req = $http.get('http://127.0.0.1:8081/get');
        req.success(function(data, status, headers, config) {
            $scope.userList = data;
            console.log(data);
        });

        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }
    $scope.delete = function(id,callback){
        $http.get('http://127.0.0.1:8081/delete/'+id)
            .success(function(data){
                console.log("Successfully deleted");
                $scope.getData();
            });
    }
    $scope.update = function(book,callback){
        $http.get('http://127.0.0.1:8081/update/'+book._id,{params:book})
            .success(function(data){
                console.log("Successfully updated");
                $scope.getData();
            });
    }
});