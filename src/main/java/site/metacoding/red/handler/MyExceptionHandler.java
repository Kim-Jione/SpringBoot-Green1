package site.metacoding.red.handler;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import site.metacoding.red.handler.ex.MyApiException;
import site.metacoding.red.handler.ex.MyException;
import site.metacoding.red.util.Script;
import site.metacoding.red.web.dto.response.CMRespDto;

@ControllerAdvice // 에러 전담 컨트롤러
public class MyExceptionHandler {

	@ExceptionHandler(MyApiException.class) // 오류 발생시 호출된다 (응답)
	public @ResponseBody CMRespDto<?> apiError(Exception e) {
		return new CMRespDto<>(-1, e.getMessage(), null);
	}

	@ExceptionHandler(MyException.class) // 오류 발생시 호출된다 (응답)
	public @ResponseBody String m1(Exception e) {
		return Script.back(e.getMessage()); // 브라우저가 받자마자 JS 발동한다
	}

}
