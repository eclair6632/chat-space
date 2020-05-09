$(function () {

  function buildHTML(message) {
    if (message.image) {
      var html = `<div class= "chatmain__mlog__box">
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
      var html = `<div class= "chatmain__mlog__box">
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
});