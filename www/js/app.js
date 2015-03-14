// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "html/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'html/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.restaurants', {
      url: '/restaurants',
      views: {
<<<<<<< HEAD
        'tab-restaurants': {
=======
        'tab-chats': {

>>>>>>> f91143aecdc3086716f18c03329619cfc1ce1d4b
          templateUrl: 'templates/tab-restaurants.html',

          controller: 'MapController'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'html/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'html/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.twitter', {
    url: '/twitter',
    views: {
      'tab-twitter': {
        templateUrl: 'html/tab-twitter.html',
        controller: 'TwitterCtrl'
      }
    }
  })

  .state('tab.market', {
    url: '/market',
    views: {
      'tab-market': {
        templateUrl: 'html/tab-market.html',
        controller: 'MarketCtrl'
      }
    }
  })

  ;




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');


});

