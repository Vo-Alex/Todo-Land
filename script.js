var tab = [];

class ListItem {
  constructor(mes, disp) {
    if (typeof(mes) === 'string') {
        this.mes = mes;
    }
    else {
      console.error('mes not string');
    }
    if (typeof(disp) === 'boolean') {
      this.disp = disp;
    }
    else {
      console.error('disp not bool');
    };
  };
};

function load() {
  $('li').remove();
  tab=JSON.parse(localStorage.getItem('tab'));

  $.each(tab, function (index, obj) {
    if (obj.disp == true) {
      $('ul').append("<li class=\"notclique\">"+obj.mes+"</li>");
    }
    else {
      $('ul').append("<li class=\"clique\">"+obj.mes+"</li>");
    }
  });
};

$(document).ready(function () {

  $('#add_todo').click(function () {
    $('ul').append("<li class=\"notclique\">"+$('#name_of_todo').val()+"</li>");
    $('#name_of_todo').val("");
  });

  $('ul').on("click", "li", function () {
    $(this).toggleClass("notclique");
    $(this).toggleClass("clique");
  });

  if(typeof(Storage) !== "undefined") {

    if (localStorage.getItem('tab') != null) {
      load();
    }
    
    $('#save').click( function () {
      tab = [];
      $('li').each(function(){
        if($(this).hasClass('clique')){
          tab.push(new ListItem($(this).text(), false));
        }
        else {
          tab.push(new ListItem($(this).text(), true));
        }
      });
      localStorage.setItem('tab', JSON.stringify(tab));
    });

    $('#load').click(load());

    $('#rm').click( function () {
      localStorage.removeItem('tab');
        $('li').remove();
    });
  }
  else {
    alert("Malheureusement votre navigateur ne permet pas de sauvegarder vos todo");
  }
  
});
