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
                                                    <div id="${id}-editarea" class="edit">
                                                        <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                                                    </div>
                                                    <footer style="color: grey; font-size: 15px">${date}</footer>
                                                    <div class="footer">
                                                        <img id="${id}-edit" class="icon-start-edit" src="/images/edit.png" alt="" onclick="editPost('${id}')">
                                                        <img id="${id}-delete" class="icon-delete" src="/images/delete.png" alt="" onclick="deleteOne('${id}')">
                                                        <img id="${id}-submit" class="icon-end-edit" src="/images/done.png" alt="" onclick="submitEdit('${id}')">
                                                    </div>
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

function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

// 메모를 수정합니다.
function submitEdit(id) {
    let author = $(`#${id}-author`).text().trim();
    let contents = $(`#${id}-textarea`).val().trim();

    let data = {'author': author, 'contents': contents};

    $.ajax({
        type: 'PUT',
        url: `/api/posts/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('게시글 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

function deleteOne(id) {
    $.ajax({
        type: 'DELETE',
        url: `/api/posts/${id}`,
        success: function (response) {
            alert('게시글 삭제에 성공하였습니다.');
            window.location.reload();
        }
    })
}