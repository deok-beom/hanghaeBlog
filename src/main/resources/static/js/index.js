$(document).ready(function () {
    const auth = getToken();

    if (auth == '') {
        $('#logout').hide();
        $('#post-box').hide();
        $('#login').show();
        $('#signup').show();
    } else {
        $('#logout').show();
        $('#post-box').show();
        $('#login').hide();
        $('#signup').hide();
    }

    $.ajax({
        type: 'GET',
        url: `/api/user/home`,
        data: {},
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", auth);
        },
        error: function (response) {
            alert("[Error:" + response.status + "] " + response.responseText);
            logout();
        }
    })

    getPosts();
})

function getToken() {
    let cName = 'Authorization' + '=';
    let cookieData = document.cookie;
    let cookie = cookieData.indexOf('Authorization');
    let auth = '';
    if (cookie !== -1) {
        cookie += cName.length;
        let end = cookieData.indexOf(';', cookie);
        if (end === -1) end = cookieData.length;
        auth = cookieData.substring(cookie, end);
    }
    return auth;
}

function getPosts() {
    $.ajax({
        type: 'GET',
        url: `/api/posts`,
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let post = response[i];
                let id = post['id'];
                let author = post['author'];
                let title = post['title'];
                let contents = post['contents'];
                let modifiedAt = new Date(post['modifiedAt']);

                var now = new Date()
                var elapsedMinute = (now.getTime() - modifiedAt.getTime()) / 1000 / 60;

                var date = "";
                if (elapsedMinute < 1) {
                    date = "방금 전";
                } else {
                    date = `${modifiedAt.getFullYear()}년 ${modifiedAt.getMonth()}월 ${modifiedAt.getDate()}일`
                }

                let temp_html = `<div class="card">
                                            <div class="card-body">
                                                <blockquote class="blockquote mb-0">
                                                    <p id="${id}-title" class="title"><a href="/api/detail?id=${id}">${title}</a></p>
                                                    <footer id="${id}-author" style="color: grey; font-size: 15px; margin-bottom: 10px">${author}</footer>
                                                    <p id="${id}-contents" style="font-size: 20px; margin-bottom: 5px">${contents}</p>
                                                    <footer style="color: grey; font-size: 15px">${date}</footer>
                                                </blockquote>
                                            </div>
                                        </div>`

                $('#post-list').append(temp_html)
            }
        }
    })
}

function writePost() {
    const auth = getToken();

    if (auth == '') {
        alert("사용자 로그인이 필요합니다.")
        let host = window.location.host;
        let url = host + '/api/user/login';
        window.location.href = 'http://' + url;
    }

    let title = $('#title').val();
    let contents = $('#contents').val();

    if (title.trim() == '') {
        alert('제목을 입력해주세요')
        return;
    } else if (contents.trim() == '') {
        alert('내용을 입력해주세요')
        return;
    }

    let data = {'title': title,'contents': contents};

    $.ajax({
        type: 'POST',
        url: `/api/posts`,
        contentType: "application/json",
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", auth);
        },
        success: function (response) {
            alert('게시글이 성공적으로 작성되었습니다.');
            window.location.reload();
        },
        error: function (response) {
            alert("[Error:" + response.status + "] " + response.responseText);
        }
    });
}

function logout() {
    document.cookie = 'Authorization' + '=' + '' + ';path=/';
    window.location.reload();
}