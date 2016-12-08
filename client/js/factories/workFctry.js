app.factory('workFctry', ['$http', workFctry])

function workFctry($http){
    console.log("work factory loaded!!!.. ")

    return {

        index: function(success){
            console.log("workFctry.index fired")
            $http.get('/works').then(success);
        },

        create: function(newWork, success){
            console.log("workFctry.create fired!!!!", newWork)
            $http.post('/works', newWork).then(success);
        },

        delete: function(work, success){
          console.log("workFctry.delete fired", work)
          $http.delete('/works/'+work._id).then(success);
        }
    }
}
