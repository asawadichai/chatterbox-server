// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    //App.startSpinner();
    App.fetch(App.stopSpinner);


    // Poll for new messages every 3 sec
    setInterval(App.fetch, 3000);
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      console.log('fetching', data);

      // Only update if we have messages.
      //(data && data.length) {
      Rooms.update(data.results, RoomsView.render);
      Messages.update(data.results, MessagesView.render);
      console.log('update');

      callback();
      //}
      return;

    });
  },

  // startSpinner: function() {
  //   App.$spinner.show();
  //   FormView.setStatus(true);
  // },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
