define(["constants"], function (constants) {
  // Click toggle method for the play/pause button (normal jQuery no longer has a toggle method for clicking).
  (function($) {
    $.fn.clickToggle = function(func1, func2) {
      var funcs = [func1, func2];
      this.data('toggleclicked', 0);
      this.click(function() {
        var data = $(this).data();
        var tc = data.toggleclicked;
        $.proxy(funcs[tc], this)();
        data.toggleclicked = (tc + 1) % 2;
      });
      return this;
    };
  }(jQuery));
  // Pause, play, and restart buttons' code.
  $("#pause_button").clickToggle(function () {
    constants.PAUSED = true;
    $("#pause_button").html("&#9658;");
  },
  function () {
    constants.PAUSED = false;
    $("#pause_button").html("&#10074;&#10074;");
  });
  $("#restart_button").click(function () {
    clearInterval(mainLoop);
    onePlayerGame();
  });
});