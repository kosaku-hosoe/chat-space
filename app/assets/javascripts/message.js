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
});