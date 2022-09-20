package site.metacoding.red.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

import site.metacoding.red.domain.users.Users;

public class LoginIntercepter implements HandlerInterceptor{ // 메서드 실행 직전에 사용할 수 있음
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		System.out.println("나 실행 됐어!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"); // WebMcvConfig의 주소가 요청될 때 출력된다
		// 행위
		HttpSession session = request.getSession();
		Users principal = (Users) session.getAttribute("principal");
		if(principal == null) { // 세션에 값이 없으면 바로 false 때림
			response.sendRedirect("/loginForm"); // return "redirect:/loginForm"; 과 같다. 로그인 페이지로 다시 돌려보낸다, 
			return false; // 아무 응답 없게 보냄
		}

		return true;
	}
}
