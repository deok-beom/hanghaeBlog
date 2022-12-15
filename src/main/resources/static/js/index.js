$(document).ready(function () {
    getPosts();
})

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
    let author = $('#author').val();
    let title = $('#title').val();
    let contents = $('#contents').val();
    let data = {'author': author, 'title': title, 'contents': contents};

    $.ajax({
        type: 'POST',
        url: `/api/posts`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('게시글이 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    });
}

function logout() {
    document.cookie = 'Authorization' + '=' + '' + ';path=/';
    window.location.reload();
}