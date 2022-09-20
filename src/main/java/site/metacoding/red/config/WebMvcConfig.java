package site.metacoding.red.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import site.metacoding.red.handler.LoginIntercepter;

@Configuration // 인터셉터 - 컨트롤러 진입 직전 실행
public class WebMvcConfig implements WebMvcConfigurer {
	@Override
	public void addInterceptors(InterceptorRegistry registry) { 
		registry.addInterceptor(new LoginIntercepter()) // 언제 작동해야 할지 추가로 적어줘야 한다
		.addPathPatterns("/s/**"); // 어떤 주소일 때 이 인터셉터가 실행되나요?, /s/**은 s 뒤의 모든 주소를 의미한다, /s/* => /s/boards, s/users (한 단계까지만)   
//		.addPathPatterns("/admin/**") => 관리자일 때 적용 가능
//		.excludePathPatterns("/s/boards/**") // /s/boards/** 는 제외한다
	}
}
