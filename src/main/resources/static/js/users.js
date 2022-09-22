let isUsernameSameCheck = false;

$("#btnJoin").click(() => {

	join();
});

$("#btnUsernameSameCheck").click(() => {
	checkUsername();
});

$("#btnLogin").click(() => {
	login();
});


$("#btnDelete").click(() => {
	resign();
});

$("#btnUpdate").click(() => {
	update();
});

function join() {
	if (userKoreanCheck()) {
		alert("이름에 한글이 있으면 안됩니다.");
		return;
	}
	
	if (passwordKoreanCheck()) {
		alert("비밀번호에 한글이 있으면 안됩니다.");
		return;
	}
	
	if (emailKoreanCheck()) {
		alert("이메일에 한글이 있으면 안됩니다.");
		return;
	}
	if (isUsernameSameCheck == false) {
		alert("유저네임 중복 체크를 진행해주세요");
		return;
	}

	if (capitalCheck() == false) {
		alert("첫글자를 대문자로 바꿔주세요.");
		return;
	}

	if (passwordSameCheck() == false) {
		alert("비밀번호가 같지 않습니다.");
		return;
	}

	if (emailCheck() == false) {
		alert("올바르지 않은 이메일 형식입니다.");
		return;
	}

	if (userBlankCheck() == false) {
		alert("이름의 공백을 지워주세요");
		return;
	}
	
	if (passwordBlankCheck() == false) {
		alert("비밀번호의 공백을 지워주세요");
		return;
	}
	
	if (emailBlankCheck() == false) {
		alert("이메일의 공백을 지워주세요");
		return;
	}

	

	//0. 통신 오브젝트 생성 (POST 요청이므로 body가 있다.)
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val()
	};

	$.ajax("/api/join", {
		type: "POST",
		dataType: "json", //응답 데이터(CMRespDto)
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/loginForm";		} else {
			alert(res.msg);
			history.back();
		}
	});
}

// 유저네임 중복 체크 -----------------------------------
function checkUsername() {
	let username = $("#username").val();

	$.ajax(`/api/users/usernameSameCheck?username=${username}`, {
		type: "GET",
		dataType: "json",
		async: true
	}).done((res) => {
		if (res.code == 1) { // 통신 성공
			if (res.data == false) {
				alert("아이디가 중복되지 않았습니다.");
				isUsernameSameCheck = true;
			} else {
				alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요.");
				isUsernameSameCheck = false;
				$("#username").val("");
			}
		}
	});
}

function login() {
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		remember: $("#remember").prop("checked")
	};

	$.ajax("/api/login", {
		type: "POST",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/";
		} else {
			alert("로그인 실패, 아이디 패스워드를 확인해주세요");
		}
	});
}

function resign() {
	let id = $("#id").val();

	$.ajax("/s/api/users/" + id, {
		type: "DELETE",
		dataType: "json" // 응답 데이터
	}).done((res) => {
		if (res.code == 1) {
			alert("회원탈퇴 완료");
			location.href = "/";
		} else {
			alert("회원탈퇴 실패");
		}
	});
}

function update() {
	let data = {
		password: $("#password").val(),
		email: $("#email").val()
	};

	let id = $("#id").val();

	$.ajax("/s/api/users/" + id, {
		type: "PUT",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("회원 수정 완료");
			location.reload(); // f5
		} else {
			alert("업데이트에 실패하였습니다");
		}
	});
}

// 모든 필드 한글 체크 -----------------------------------
function userKoreanCheck() {
	let username = $("#username").val();

	let korRule = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	if (korRule.test(username)) {
		return true;
	} else {
		return false;
	}
}

function passwordKoreanCheck() {
	let password = $("#password").val();

	let korRule = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	if (korRule.test(password)) {
		return true;
	} else {
		return false;
	}
}

function emailKoreanCheck() {
	let email = $("#email").val();

	let korRule = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	if (korRule.test(email)) {
		return true;
	} else {
		return false;
	}
}

// 첫글자 대문자인지 체크 -----------------------------------
function capitalCheck() {
	let username = $("#username").val();
	let capitalCheck = RegExp(/^[A-Z]/);
	if (capitalCheck.test(username)) {
		return true;
	} else {
		return false;
	}
}

// 비밀번호 동일 체크 -----------------------------------
function passwordSameCheck() {
	let password = $("#password").val();
	let passwordSame = $("#passwordSame").val();
	if (password == passwordSame) {
		return true;

	} else {

		return false;
	}

}

// 이메일 체크 -------------------------------
function emailCheck() {
	let email = $("#email").val();
	let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	// 이메일이 exptext에 ""포함되는 문자" 가 이 값에 있으면 true 반환
	if (exptext.test(email)) {
		return true;
	} else {
		return false;
	}

}
// 모든 필드 공백 체크 -----------------------------------
function userBlankCheck() {
	let username = $("#username").val();
	let reg = /\s/g;

	if (reg.test(username)) {
		return false;
	} else {
		return true;
	}

}

function passwordBlankCheck() {
	let password = $("#password").val();
	let reg = /\s/g;
	
	if (reg.test(password)) {
		return false;
	} else {
		return true; 
	}
}
function emailBlankCheck() {
	let email = $("#email").val();
	let reg = /\s/g;
	
	if (reg.test(email)) {
		return false;
	} else {
		return true;
	}
}