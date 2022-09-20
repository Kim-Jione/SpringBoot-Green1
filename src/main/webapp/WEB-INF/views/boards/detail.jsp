<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="../layout/header.jsp"%>

<input id="page" type="hidden" value="${sessionScope.referer.page}">
<input id="keyword" type="hidden" value="${sessionScope.referer.keyword}">
<div class="container">
	<br /> <br /> 
	<!-- id = boardId, jQuery로 당겨 쓰기 위해서 심어넣었다. 이걸 쓰지 않으면 EL표현식을 사용해야 하니 이걸 심어서 당겨쓴다 -->
	<input id="id" type="hidden" value="${detailDto.id}" />
	<input id="lovesId" type="hidden" value="${detailDto.lovesId}" />

	<div class="d-flex">

		<a href="/s/boards/${detailDto.id}/updateForm" class="btn btn-warning">수정하러가기</a>

		<form>
			<button id="btnDelete" class="btn btn-danger">삭제</button>
		</form>
	</div>


	<br />
	<div class="d-flex justify-content-between">
		<h3>${detailDto.title}</h3>
		<div>
			좋아요수 : <span id="countLove">${detailDto.loveCount}</span> 
			<i id="iconLove" class='${detailDto.loved ? "fa-solid" : "fa-regular"} fa-heart my_pointer my_red'></i>
		</div>
	</div>
	<hr />

	<div>${detailDto.content}</div>
</div>
<script src="/js/boards.js"></script>
<%@ include file="../layout/footer.jsp"%>