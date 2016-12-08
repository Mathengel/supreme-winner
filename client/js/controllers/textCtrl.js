app.controller('textCtrl', ['$scope', 'textFctry', textCtrl])

function textCtrl($scope, textFctry){
    console.log('text controller loaded!!!!!!!!')

    function getTexts(){
        console.log("getting texts...");
        textFctry.index (function (response){
            console.log("response from factory.index", response)
            $scope.texts = response.data;
        })
    }
    getTexts();


    $scope.singleChosen = false;

    //SELECT One
    $scope.one = function(text){
      $scope.singleChosen = true;
      $scope.single = text;
    }

    //SEARCH TERM hover
    $scope.hover = false;
    $scope.hoverIn = function(text){
      $scope.textDeets = text;
      $scope.hover = true;
    }

    $scope.hoverOut = function(){
      $scope.hover = false;
    }

    //SLIDE DEETS
    $scope.slideDetail = function(text){
      $scope.slideDeets = text;
    }

    //IMAGE FILTER

    $scope.multiFilter = function(text) {
        var match = false;
        var input = $scope.searchTerms;
        var matchCount = 0;


        if(input){
            var terms = input.split(' ');

            terms.forEach(function(term){
                if( (new RegExp(term).test(text.colors)) ||
                    (new RegExp(term).test(text.description)) ||
                    (new RegExp(term).test(text.shapes)) ||
                    (new RegExp(term).test(text.phrase))
                ){
                    matchCount += 1;
                }
                if( matchCount == terms.length){
                    match = true;
                }
            });
        } else {
            match = true;
        }
        return match;
    }

    // SORT by phrase or date_created
    $scope.propertyName = 'results.date_created'
    $scope.sortBy = function(propertyName) {
      $scope.propertyName = propertyName;
    };

    //SCOPE WATCH...
    $scope.$watch('results.length', function(){
      // if($scope.results){
        $scope.single = $scope.results[0]
        $scope.apply();
      // }
    })

    //IMAGE CAROUSEL

    //sets the current index to 0, the start
    $scope.currentSlideIndex = 0;

    //allows us to change the index by passing this function a new index
    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentSlideIndex = index;
    };
    //returns a boolean value as to whether the current index matches whatever we pass this function
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentSlideIndex === index;
    };
    $scope.prevSlide = function (text) {
      $scope.single = text;
        $scope.currentSlideIndex = ($scope.currentSlideIndex < $scope.results.length - 1) ? ++$scope.currentSlideIndex : 0;
    };
    $scope.nextSlide = function (text) {
      $scope.single = text;
        $scope.currentSlideIndex = ($scope.currentSlideIndex > 0) ? --$scope.currentSlideIndex : $scope.results.length - 1;
    };

    // $scope.show = function()

    // $scope.create = function(newText){
    //     console.log('scope.create method fires!!!', newText)
    //     textFctry.create(newText, function (response){
    //         console.log("response from textFctry.create, but from controller call", response)
    //     })
    //     getTexts();
    //     $scope.newText = {};
    // }
}
