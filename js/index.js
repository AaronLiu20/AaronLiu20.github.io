$( document ).ready(function() {
    $("#go").on( "click", function( event ) {
      event.preventDefault()
      $("#confirmation_contact").empty()
      $("#confirmation_contact").append("We have recieved your message")
     });  
   }); 