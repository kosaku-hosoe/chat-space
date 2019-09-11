$(function(){
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
    var html = `<div class="message" id='${message.id}'>
                  <div class="message__upper-info" >
                    <p class="message__upper-info__talker">
                    ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                    ${message.content}
                  </p>
                  ${image_url}
                  </div>`
    return html;
  }
  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast')
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html); 
      $('.form__message').val('');
      $('.hidden').val('');
      $('.submit-btn').attr("disabled",false);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight }, 'fast');
    })
    .fail(function(data){
      alert('入力してください');
      $(".submit-btn").attr("disabled",false);
    })
  });
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('messageId');
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        $('.messages').append(buildHTML(message));
        scroll();
      })
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});