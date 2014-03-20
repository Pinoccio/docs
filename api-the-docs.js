


var api = pinoccioAPI();


(function(){

  $(document).on('flatdoc:ready', function() {
    console.log('RUNNING INIT')
    o.init();
  });


  var o;
  o = {
    sync:false,
    state:{},
    account:false,
    init:function(){
      var z = this;


      api.rest({url:'/v1/account'},function(err,data){

        if(err || !data) {
          // 
          return console.log('not logged in');
        }
        console.log('logged in?',data);
        z.account = data;

        z.ui.load('nav');
        z.onLogin();
      })
    },
    onLogin:function(){
      var sync = api.sync();
      sync.on('data',function(data){
        console.log('data',data); 
      });
      this.sync = sync;

      for(var i=0;i < o.ui.elements.length;++i){
        o.ui.elements[i].sync(this.sync);
        o.ui.elements[i]._sync(this.sync);
      }

    },
    pollLoginState:function(){
      // because sync stream requires login  a login in another tab would not be picked up here. 
    },
    ui:{
      elements:[],
      load:function(key,args){
        args = args||[];
        var z = this;
        var el = z[key].apply(z,args);
        el.root = true;
        z.elements.push(el);
        el.sync(o.sync);
        el._sync(o.sync);
      },
      nav:function(){

        var el = this._element();
        var syncStream;
        el.sync = function(sync){
          syncStream = sync;
          console.log('NAV SYNC')

          render();

          if(!syncStream) return;

          var z = this;
          z.syncStream = syncStream;
          z.onData = function(data){
            // sync data.
          }
          syncStream.on('data',z.onData);           
        }

        el.remove = function(){
          if(syncStream) syncStream.removeListener('data',this.onData);
          $(".pinoccio-nav").remove();
        }

        function render() {

          $(".pinoccio-nav").remove();
          var navList = $(".header ul");

          var navItem;

          if(o.account) {
            var account = o.account;
            var name = account.firstname;
            if(!name || !name.length) name = account.email.split('@').shift();
            navItem = $("<li>").addClass("pinoccio-nav").html("<a href='#'><img height='14px' src='"+account.gravatar+"' alt=''/> "+name+"</a>");

          } else {
            var loginLink = $("<a href='#' class='pinoccio-login'>login to api</a>") 
            navItem = $("<li>").addClass("pinoccio-nav").append(loginLink);
          }

          navList.append(navItem);
        }
        return el;
      },
      troopList:function(){
        // make troop list element
        
        var el = this._element();
        var syncStream;
        el.sync = function(){

        }

        //
        

      },
      exampleRewrite:function(){
        // update example html 
      },
      _element:function(){
        // an element is a thing that has an event listener for sync
        // it has a remove function
        // it may have a parent
        // it may have children
        return {
          _sync:function(data){
            if(!this.children) return;
            for(var i=0;i<this.children.length;++i) {
              this.children[i].sync(data);
            }
          },
          _remove:function(){
            // clean myself up
            if(this.parent) {
              var id = find(this.parent.children,this);
              if(id > -1) this.parent.children.splice(i,1);
              if(this.parent.removed) this.parent.removed(this);
              this,parent = false;// detach it
            }

            if(this.children) {
              for(var i=0;i<this.children.length;++i) {
                this.children[i].parent = false;
                this.children[i].remove()
              }
            }
            // remove from root elements list
            if(this.root) {
              var i = find(o.ui.elements,this);
              if(i > -1) o.ui.elements.splice(i,1);
            }
          },
          _load:function(el){
            if(!this.children) this.children = [];
            el.parent = this;
            this.children.push(el);
          },
          parent:false,
          children:false
        }
      }
    }
  }


function find(arr,obj){
  if(arr.indexOf) return arr.indexOf(obj);
  for(var i=0;i<arr.length;++i){
    if(arr[i] === obj) break;
  }
  return i==arr.length?-1:i;
}

}());


