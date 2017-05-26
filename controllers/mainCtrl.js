angular.module("oamHelperApp", ['ngRoute'])
    .controller('mainCtrl', mainCtrl)
    .controller('aboutCtrl', aboutCtrl)
    .config(function ($routeProvider) {
        $routeProvider.when('/about', { templateUrl: 'views/about.html', controller: 'aboutCtrl' });
        $routeProvider.when('/main', { templateUrl: 'views/main.html', controller: 'mainCtrl' });
        $routeProvider.otherwise({ templateUrl: 'views/about.html', controller: 'aboutCtrl' });
    })
    .directive('myMenuId', myMenuId)
    .factory('activeMenuSvc', activeMenuSvc);

function activeMenuSvc() {
    var activeMenu = "";

    return {
        setActiveMenu: function (Menu) {
            activeMenu = Menu;
        },
        getActiveMenu: function () {
            return activeMenu;
        }
    }
}

function mainCtrl($scope, activeMenuSvc, attr0Service, attr1Service, attr2Service) {
    $scope.getActiveMenu = function () {
        return activeMenuSvc.getActiveMenu();
    }

    $scope.isActive = function (MenuId) {
        return MenuId == activeMenuSvc.getActiveMenu();
    }

    $scope.setActive = function (menuId) {
        activeMenuSvc.setActiveMenu(menuId);
    }

    $scope.styleFromValidInput = function (input) {
        var value = parseInt(input);
        var result = {}

        if (isNaN(value) || value < 0 || value > 65535) {
            result["background-color"] = "lightpink";
        }

        return result;
    }

    $scope.inputAttributes = [];
    $scope.inputAttributes[0] = 0;
    $scope.inputAttributes[1] = 0;
    $scope.inputAttributes[2] = 0;

    $scope.attributeEntries = [];

    $scope.isInputValid = function (input) {
        var asNumber = parseInt(input);

        if (isNaN(asNumber) || asNumber < 0 || asNumber > 65535) {
            return false;
        }

        return true;
    }

    $scope.areInputsValid = function () {
        for (var i = 0; i < 3; i++) {
            if (!$scope.isInputValid($scope.inputAttributes[i])) {
                return false;
            }
        }

        return true;
    }

    $scope.addAttributeEntry = function () {
        var newEntry = {
            name: function () {
                if (angular.isDefined($scope.inputAttributeName) && $scope.inputAttributeName.length > 0) {
                    return $scope.inputAttributeName;
                }

                return undefined;
            }(),
            attr0: attr0Service.getAttributes($scope.inputAttributes[0]),
            attr1: attr1Service.getAttributes($scope.inputAttributes[1]),
            attr2: attr2Service.getAttributes($scope.inputAttributes[2])
        };

        newEntry.size = function () {
            switch (newEntry.attr0.shape) {
                case "Square": {
                    var squareSizes = ["8x8", "16x16", "32x32", "64x64"];
                    return squareSizes[newEntry.attr1.size];
                }
                case "Wide": {
                    var wideSizes = ["16x8", "32x8", "32x16", "64x32"];
                    return wideSizes[newEntry.attr1.size];
                }
                case "Tall": {
                    var tallSizes = ["8x16", "8x32", "16x32", "32x64"];
                    return tallSizes[newEntry.attr1.size];
                }
                default: {
                    return "0x0";
                }
            };
        }();

        $scope.attributeEntries.push(newEntry);
    }

    $scope.clearInputs = function () {
        $scope.inputAttributes[0] = 0;
        $scope.inputAttributes[1] = 0;
        $scope.inputAttributes[2] = 0;
        $scope.inputAttributeName = "";
    }

    $scope.removeEntry = function (index) {
        $scope.attributeEntries.splice(index, 1);
    }
}

function aboutCtrl($scope, activeMenuSvc) {
    $scope.getActiveMenu = function () {
        return activeMenuSvc.getActiveMenu();
    }

    $scope.isActive = function (MenuId) {
        return MenuId == activeMenuSvc.getActiveMenu();
    }

    $scope.setActive = function (menuId) {
        activeMenuSvc.setActiveMenu(menuId);
    }
}

function myMenuId(activeMenuSvc) {
    var menuElements = [];

    function setActive(element, menuId) {
        if (activeMenuSvc.getActiveMenu() == menuId) {
            element.addClass('active');
        } else {
            element.removeClass('active');
        }
    }

    return function (scope, element, attrs) {
        var menuId = attrs["myMenuId"];

        menuElements.push({ Id: menuId, Node: element });
        setActive(element, menuId);

        var watcherFn = function (watchScope) {
            return watchScope.$eval('getActiveMenu( )');
        }

        scope.$watch(watcherFn, function (newValue, oldValue) {
            for (var i = 0; i < menuElements.length; i++) {
                setActive(menuElements[i].Node, menuElements[i].Id);
            }
        });
    }
}
