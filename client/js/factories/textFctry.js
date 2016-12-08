app.factory('textFctry', ['$http', textFctry])

function textFctry($http){
    console.log("text factory loaded!!!.. ")

    return {

        index: function(success){
            console.log("textFctry.index fired!!!")
            $http.get('/texts').then(success);
        },

        // show: function(success){
        //     console.log("textFctry.show fired!!!")
        //     $http.get('/text').then(success)
        // }

        // create: function(newText, success){
        //     console.log("textFctry.create fired!!!!", newText)
        //     $http.post('/texts', newText).then(success);
        // },

    }
}