package site.metacoding.red.handler;

	import java.io.BufferedWriter;
	import java.io.OutputStreamWriter;
	import java.io.PrintWriter;

	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;
	import javax.servlet.http.HttpSession;

	import org.springframework.http.MediaType;
	import org.springframework.web.servlet.HandlerInterceptor;

	import com.fasterxml.jackson.databind.ObjectMapper;

	import site.metacoding.red.domain.users.Users;
	import site.metacoding.red.web.dto.response.CMRespDto;

	public class LoginIntercepter implements HandlerInterceptor{ // 메서드 실행 직전에 사용할 수 있음
		
		@Override
		public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
				throws Exception {
			System.out.println("================");
			System.out.println(request.getRequestURI());
			System.out.println("================");
			
			String uri = request.getRequestURI();
			
			HttpSession session = request.getSession();
			Users principal = (Users) session.getAttribute("principal");
			if(principal == null) { // 세션에 값이 없으면 바로 false 때림
				if(uri.contains("api")) {
					System.out.println("===========");
					System.out.println("API 가 주소에 있음");
					
					//response.setHeader("Content-Type", "application/json; charset=utf-8");
					
					response.setContentType("application/json; charset=utf-8");
					PrintWriter out = response.getWriter();
					CMRespDto<?> cmRespDto = new CMRespDto<>(-1, "인증이 필요합니다", null);
					ObjectMapper om = new ObjectMapper();
					String json = om.writeValueAsString(cmRespDto);
					out.println(json);
				}else {
					System.out.println("===========");
					System.out.println("API 가 주소에 없음");
					response.sendRedirect("/loginForm"); // return "redirect:/loginForm"; 과 같다. 로그인 페이지로 다시 돌려보낸다,
				}
				return false;
			}
			return true;
		}
	}
