$(function() {
  var user_list = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">${user}</div>`
    user_list.append(html);
  }

  function addUser(name,user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $("#chat-group-users").append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーがいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });
    $(document).on("click", ".chat-group-user__btn--add", function(){
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      addUser(name,user_id);
      $(this).parent().remove();
    });
    $(document).on("click", ".js-remove-btn", function(){
      $(this).parent().remove();
    });
  });