angular.module('EDeC')
    .controller('FriendProfileCtrl', ['$scope', '$routeParams', '$filter', '$http', 'FriendProfile', function($scope, $routeParams, $filter, $http, FriendProfile) {

$scope.GoodComments = [];
$scope.BadComments = [];
$scope.FriendsList = [];
$scope.FriendInfo;


// FriendProfile.post()
//     .success(function(data){
//     });  



 FriendProfile.get()
    .success(function(data) {
        console.log(data);
         data.GoodCommData.forEach(function(comment) {
            var temp = {};
            temp.id_comm = comment.id_comm;
            temp.id_user = comment.id_user;
            temp.id_product = comment.id_product;
            temp.postDate = comment.postDate;
            temp.comm = comment.comm;
            temp.positiveRating = Math.round(comment.rating);
            temp.negativeRating = 5 - temp.positiveRating;
            temp.name= comment.name;

            $scope.GoodComments.push(temp);
        });
        data.BadCommData.forEach(function(comment) {
            var temp2 = {};
            temp2.id_comm = comment.id_comm;
            temp2.id_user = comment.id_user;
            temp2.id_product = comment.id_product;
            temp2.postDate = comment.postDate;
            temp2.comm = comment.comm;
            temp2.positiveRating = Math.round(comment.rating);
            temp2.negativeRating = 5 - temp2.positiveRating;
            temp2.name= comment.name;

            $scope.BadComments.push(temp2);
        });
        var profile = data.FriendData[0];
        var temp3 = {};
            temp3.id_users = profile.id_users;
            temp3.username = profile.username;
            temp3.mail = profile.mail;
            temp3.name = profile.name;
            temp3.lastname = profile.lastname;
            temp3.gender = profile.gender;
            temp3.birthday = profile.birthday;
            temp3.address = profile.address;

            $scope.FriendInfo = temp3; 


          data.ListFriends.forEach(function(friend) {
            var temp4 = {};
            temp4.id_friend = friend.id_friend;
            temp4.username = friend.username;

            $scope.FriendsList.push(temp4);   


    });
      });

}]);
  