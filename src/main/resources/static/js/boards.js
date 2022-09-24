// detailForm---------------------------------------------------------------
$("#btnDelete").click(() => {
	deleteById();
});

function deleteById() {
	let id = $("#id").val();

	let page = $("#page").val();
	let keyword = $("#keyword").val();

	$.ajax("/s/api/boards/" + id, {
		type: "DELETE",
		dataType: "json" // 응답 데이터
	}).done((res) => {
		if (res.code == 1) {
			//location.href = document.referrer;
			location.href = "/?page=" + page + "&keyword=" + keyword;  //  /?page=?&keyword=?
		} else {
			alert("글삭제 실패");
		}
	});
}

// 하트 아이콘을 클릭했을때의 로직
$("#iconLove").click(() => {
	let isLovedState = $("#iconLove").hasClass("fa-solid");
	if (isLovedState) {
		deleteLove();
	} else {
		insertLove();
	}
});

// DB에 insert 요청하기
function insertLove() {
	let id = $("#id").val();

	$.ajax("/s/api/boards/" + id + "/loves", {
		type: "POST",
		dataType: "json"
	}).done((res) => {
		console.log(res);
		if (res.code == 1) {
			renderLoves();
			// 좋아요 수 1 증가
			let count = $("#countLove").text();
			$("#countLove").text(Number(count) + 1);
			$("#lovesId").val(res.data.id);
			//console.log(res);
		} else {
			alert("좋아요 실패했습니다");
		}
	});
}

// DB에 delete 요청하기
// 좋아요 취소는 곧 테이블의 행을 삭제하는 것이다
// 삭제하는 방법은 2가지
// DELETE FROM loves WHERE usersId = 1 AND boardsId = 3; => 서버 입장에서 받아야 하는 데이터 : usersId(세션값), boardsId(클라이언트로부터 받아야함)
// DELETE FROM loves WHERE id = 1; => 받아야 하는 값 : lovesId
// DELETE 메서드 
// /loves/1도 가능하지만
// /boards/3/loves/1 => 3번 받아도 의미가 없지만 가독성이 좋다 3번 게시물의 1번 좋아요를 삭제 하겠다
function deleteLove() {
	let id = $("#id").val();
	let lovesId = $("#lovesId").val();


	$.ajax("/s/api/boards/" + id + "/loves/" + lovesId, { // 주소가 만들어진다
		type: "DELETE",
		dataType: "json" // 응답 받는 데이터 json	
	}).done((res) => { // json데이터를 자바스크립트 오브젝트로 바꿔준다
		if (res.code == 1) {
			//location.reload(); => 페이지 새로고침 => 부하가 심함
			// 이게 ajax, 부분 리로딩
			renderCancelLoves(); // 그림을 빈하트로 변경
			let count = $("#countLove").text(); // 좋아요 개수를 text로 가져와서 
			$("#countLove").text(Number(count) - 1); // -1만 해준다, 밑에서 하는 이유는 통신성공 이후에 변경되어야 하기 때문이다
		} else {
			alert("좋아요 취소에 실패했습니다");
		} // insert한 PK가 필요하고 뷰에서 응답 받아야 할 때 SELECT MAX(id) FROM loves 하는데 위험하다 -> insert 도중에 다른 사람이 좋아요 하면 MAX 값이 올라가서 망한다
	});
}

// 빨간색 하트 그리기
function renderLoves() {
	$("#iconLove").removeClass("fa-regular");
	$("#iconLove").addClass("fa-solid");
}

// 검정색 하트 그리기
function renderCancelLoves() {
	$("#iconLove").removeClass("fa-solid");
	$("#iconLove").addClass("fa-regular");
}

// updateFrom----------------------------------------------------

$("#btnUpdate").click(() => {
	update();
});

function update() {
	let data = {
		title: $("#title").val(),
		content: $("#content").val()
	};

	let id = $("#id").val();

	$.ajax("/s/api/boards/" + id, {
		type: "PUT",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("게시글 수정 완료");
			location.href = "/boards/" + id;
		} else {
			alert("업데이트에 실패하였습니다");
		}
	});
}

$('#content').summernote({
	height: 400
});

// writeForm---------------------------------------------------------------
$("#btnSave").click(() => {
	save();
	//saveTest();
});


function save() {
	let data = {
		title: $("#title").val(),
		content: $("#content").val()
	};

	$.ajax("/s/api/boards", {
		type: "POST",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/"; // 현재 접속중인 페이지 정보를 갖고 있다 "/" 로 이동한다는 말이다
		}
	});
}

	$('#content').summernote({
		height : 400
	});
// ----------------------------------------------------------------------