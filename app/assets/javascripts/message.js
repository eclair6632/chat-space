$(function () {
  var reloadMessages = function () {
  //カスタム属性で付与したidで、最新のメッセージを取得
    var last_message_id = $('.chatmain__mlog__box:last').data("message-id");
    $.ajax({
      type: "GET",
      url: "api/messages",
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (messages) {
        if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function (i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
          $('.chatmain__mlog').append(insertHTML);
          $('.chatmain__mlog').animate({ scrollTop: $('.chatmain__mlog')[0].scrollHeight });
        }
    })
    .fail(function () {
      alert('error');
    });
  }
  
  function buildHTML(message) {
    if (message.image) {
      var html = `<div class= "chatmain__mlog__box" data-message-id=${message.id}>
                            <div class= "chatmain__mlog__box__uinfo">
                              <div class="chatmain__mlog__box__uinfo__name">
                                ${message.user_name}
                              </div>
                              <div class="chatmain__mlog__box__uinfo__date">
                                ${message.created_at}
                              </div>
                            </div>
                          <div class="chatmain__mlog__box__m">
                            <p class="charmain__mlog__box__m__content">
                              ${message.content}
                            </p>
                            <img src= ${message.image}>
                          </div>
                        </div>`
    } else {
      var html = `<div class= "chatmain__mlog__box" data-message-id=${message.id}>
                            <div class= "chatmain__mlog__box__uinfo">
                              <div class="chatmain__mlog__box__uinfo__name">
                                ${message.user_name}
                              </div>
                              <div class="chatmain__mlog__box__uinfo__date">
                                ${message.created_at}
                              </div>
                            </div>
                          <div class="chatmain__mlog__box__m">
                            <p class="charmain__mlog__box__m__content">
                              ${message.content}
                            </p>
                          </div>
                        </div>`
    }
    return html;
  }
  
  $("#new_message").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      var html = buildHTML(data);
      $('.chatmain__mlog').append(html);
      $('.chatmain__mlog').animate({ scrollTop: $('.chatmain__mlog')[0].scrollHeight });
      $('form')[0].reset();
      $(".chatmain__mform__submit").removeAttr("disabled");
    })
    .fail(function () {
      alert("メッセージの送信に失敗しました。");
    })
  })
  // /groups/group:id/messagesにいる時だけ更新
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});