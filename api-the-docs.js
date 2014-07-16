


var api = pinoccioAPI();


(function(){

  $(document).on('flatdoc:ready', function() {
    o.init();
  });

  var o;
  o = {
    sync:false,
    state:{},
    account:false,
    pollingLogin:false, 
    init:function(){

      var z = this;
      this.pollLoginState();
      this.uiLoginButton();

    },
    onLogin:function(){
      var data = this.account;
      // hide login show logged in.
      $(".login-loggedout").hide();
      var a = $("<a>").attr('href',"#").css({"display":"inline","vertical-align":"top"});

      data.firstname = data.firstname||'';
      a.text("Hi, "+(data.firstname.length?data.firstname:data.email.split('@').shift()))

      $(".login-loggedin").append("<img src='"+data.gravatar+"' width='20' height='20' alt=''/>");
      $(".login-loggedin").append(a).show()

      /*
      var sync = api.sync();
      sync.on('data',function(data){
        console.log('data',data); 
      });
      this.sync = sync;
      */

      this.updateExamples();

    },
    pollLoginState:function(){
      var z = this;
      if(z.pollingLogin) return;
      if(z.account) return (z.pollingLogin = false);

      z.pollingLogin = true;
      (function fn(){

        // because sync stream requires login  a login in another tab would not be picked up here. 
        api.rest({url:'/v1/account'},function(err,data){

          if(err || !data) {
            console.log('not logged in ',err);
            return setTimeout(function(){
              fn();
              //return console.log('not logged in');
            },30000);
          }

          z.pollingLogin = false;

          z.account = data;
          z.onLogin();
        })
      }());
    },
    handleLogin:function(data,cb){
      var z = this;
      api.login(data.email,data.password,function(err,data){
        cb(err,data);
        if(data){
          z.account = data;
          z.onLogin();
        }
      });
    },
    updateExamples:function(){
      var replacements = {
        '7fc11b7554f0cd303bad94eb0eb36e2d':api.token
      };
      $("code").each(function(){
        var html = $(this).html();
        var changed = false;
        var code = this;
        $.each(replacements,function(k,v){
          $(code).find('.string, .comment').each(function(){
            var text = $(this).text()||'';
            if(text.trim().indexOf(k) > -1) {
              text = text.replace(k,v);
              $(this).text(text);
            }
          })
        });
      });
    },
    uiLoginButton:function(){
      var opened = false;
      var z = this;
      $(".login-button").click(function(){
        if(opened) {
          opened.remove();
          opened = false;
          return false;
        }
 
        // clone
        var dims = _dims(this);
        dims.top += dims.height+3;

        var form = $("#api-templates .login-form-template").clone();
        form.addClass('rendered');

        form.css({position:'absolute',top:dims.top+'px',right:dims.right-dims.outerWidth+'px'}) 
        form.appendTo('body');

        opened = form;

        // form submitting
        var locked = false;

        form.on('submit',function(){
          var o = $(form).find('form').serializeObject();

          console.log('form data',o);

          var valid = true;

          if(!o.email || !o.email.length){
             valid = false;
             $(form).find('input[name=email]').flashClass('error'); 
          }

          if(!o.password || !o.password.length){
             valid = false;
             $(form).find('input[name=password]').flashClass('error'); 
          }

          if(!valid) return false;

          locked = true;
          form.addClass('submitting');
          form.find('.error').hide();
          z.handleLogin(o,function(err){
            locked = false;
            form.removeClass('submitting');
            if(!opened) return;

            if(err) {
              form.find('.error-bar').show();
              return;
            }

            opened.remove();
            opened = false;

          });
        
          return false;
        })

        return false;
      });

      // esc button
      $("body").keyup(function(ev){
        if(opened && ev.which === 27) {
          opened.remove();
          opened = false;
        }
      }).on('click',function(ev){
        if(opened) {
          if($(ev.target).parents(".login-form-template").length === 0){
            opened.remove();
            opened = false;
          }
        }
      });
    }
  }


function find(arr,obj){
  if(arr.indexOf) return arr.indexOf(obj);
  for(var i=0;i<arr.length;++i){
    if(arr[i] === obj) break;
  }
  return i==arr.length?-1:i;
}

//
// return dimensions for easy access
//
function _dims(el){
  var dims = _coords(el);
  dims.width = $(el).width();
  dims.outerWidth = $(el).outerWidth();
  dims.outerHeight = $(el).outerHeight();
  dims.height = $(el).height();
  dims.bottom = dims.top+dims.height;
  dims.right = 0;
  if(el !== document) dims.right = document.documentElement.clientWidth-dims.left;
  return dims;
}

//
// return absolute document position of element.
//
function _coords(el){
  var left=0,top=0,right=0; 
  if(el === window){
	  return _wcoords();
  }
  

  do{
    left += el.offsetLeft||0;
    top  += el.offsetTop||0;
    el = el.offsetParent;
  }while(el)

  return {top:top,left:left}
}

function _wcoords(){
	return {
	  left:(window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
	  top:(window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
	}
}

$.fn.serializeObject = function(){
  var a = $(this).serializeArray();

  var o = {};
  $.each(a,function(k,v){
    o[v.name] = v.value;
  })
  return o;
}

$.fn.flashClass = function(cls,dur){
  var z = this;
  $(z).addClass(cls);
  setTimeout(function(){
    z.removeClass(cls);
  },dur||2000);
}




}());




