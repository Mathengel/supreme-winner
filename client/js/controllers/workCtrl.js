app.controller('workCtrl', ['$scope', 'workFctry', workCtrl])

function workCtrl($scope, workFctry){
    console.log('work controller loaded!!!!!!!!')

    function checkForAdmin(){
        workFctry.create({title:"AdminCheck"}, function(response){
            console.log("response about admin check", response)
        })
    }
    checkForAdmin();

    function getWorks(){
              console.log("getting works...")
              workFctry.index(function(response){
                  console.log("response from workFctry.index:", response)
                  $scope.textWorks = response.data;
              })
          }
    getWorks();

    $scope.create = function(newWork){
        console.log('scope.create method fires!!!', newWork)
        workFctry.create(newWork, function (response){
            console.log("response from workFctry.create, but from controller call", response)
        })
        $scope.newWork = {};
        getWorks();
    },

    $scope.delete = function(work){
      workFctry.delete(work, function(response){
                  console.log("success callback from workFctry.delete:", response)
                  getWorks();
              })
    }
}
