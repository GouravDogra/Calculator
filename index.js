var app = angular.module('myApp', []);
app.controller('indexController', function($scope,indexFactory) {
    var lastInput = '';
    $scope.name;
    $scope.buttonRows = [
        [
            {
                value: '7',
                operator : false
            },
            {
                value: '8',
                operator : false
            },
            {
                value: '9',
                operator : false
            },
            {
                value: '/',
                operator: true
            }
         ],
        [
            {
                value: '4',
                operator : false
            },
            {
                value: '5',
                operator : false
            },
            {
                value: '6',
                operator : false
            },
            {
                value: '*',
                operator : true
            }
        ],
        [
            {
                value: '1',
                operator : false
            },
            {
                value: '2',
                operator : false
            },
            {
                value: '3',
                operator : false
            },
            {
                value: '+',
                operator : true
            }
        ],
        [
            {
                value: '0',
                operator : false
            },
            {
                value: 'C',
                operator : true,
                class: 'btn-danger'
            },
            {
                value: '=',
                operator : true,
                class: 'btn-success'
            },
            {
                value: '-',
                operator : true
            }
        ]
        ];
    $scope.operatorList = ['+','-','/','*','C', '='];
    $scope.clickedInputs='';

    $scope.click = function(btn) {

        if (!btn.operator) {
            joinNumberAndOperator(btn.value);
            lastInput = btn.value;
        } else {
            if ($scope.operatorList.indexOf(lastInput) == -1) {
                lastInput = btn.value;
                getOperator(btn.value);
            }
        }
    }

    function getOperator(operator) {
        if(operator == '='){
            result();
            lastInput = '';
            indexFactory.setOperator('');
        }else if(operator == 'C') {
            $scope.clickedInputs = '';
            lastInput = '';
            indexFactory.setOperator('');
        } else {
            joinNumberAndOperator(operator);
        }
    }

    function joinNumberAndOperator(value) {
        var temp = value.toString();
        var operatorPresent = false;
        if($scope.operatorList.indexOf(value) != -1) {
            if(indexFactory.getOperator()){
                operatorPresent = true;
            }else{
                indexFactory.setOperator(value);
            }
        }
        if(value != '='){
            if(operatorPresent){
                result();
            }
            $scope.clickedInputs = $scope.clickedInputs + temp;
        }

    }

    function result() {
        var requiredNumbers = [];
        switch (indexFactory.getOperator()) {
            case '+':
                requiredNumbers = output('+');
                $scope.clickedInputs = requiredNumbers[0] + requiredNumbers[1];
                break;
            case '-':
                requiredNumbers = output('-');
                $scope.clickedInputs = requiredNumbers[0] - requiredNumbers[1];
                break;
            case '*':
                requiredNumbers = output('*');
                $scope.clickedInputs = requiredNumbers[0] * requiredNumbers[1];
                break;
            case '/':
                requiredNumbers = output('/');
                $scope.clickedInputs = requiredNumbers[0] / requiredNumbers[1];
                break;
        }
    }

    function output(spliter) {
        var requiredArray = $scope.clickedInputs.split(spliter),
        requiredNumber = [];
        angular.forEach(requiredArray,function(element){
           element = parseInt(element);
            requiredNumber.push(element);
        });
        $scope.clickedInputs = '';
        return requiredNumber;
    }
});



app.factory('indexFactory', function () {
   var factoryObject = {};
   var operator = '';
    factoryObject.setOperator = function (name) {
        if(name != 'C')
        operator = name;
    }
    factoryObject.getOperator = function (name) {
       return operator;
    }
   return factoryObject;
});