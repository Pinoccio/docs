


var api = pinoccioAPI();


(function(){

  $(document).on('flatdoc:ready', function() {
    o.init();
  });


  var o = {
    init:function(){
      api.rest({url:'v1/account'},function(err,data){

        console.log('logged in?',data);

      })
    },
    onLogin:function(){
      var sync = api.sync();
      sync.on('data',function(data){
        console.log('data',data); 
      });
    }
  }



});

