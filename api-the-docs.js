


var api = pinoccioAPI();


(function(){

  $(document).on('flatdoc:ready', function() {
    o.init();
  });


  var o = {
    init:function(){

    },
    onLogin:function(){
      var sync = api.sync();
      sync.on('data',function(data){
        console.log('data',data); 
      });
    }
  }



});

