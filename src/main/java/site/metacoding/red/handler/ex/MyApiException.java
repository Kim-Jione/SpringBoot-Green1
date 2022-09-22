package site.metacoding.red.handler.ex;

public class MyApiException extends RuntimeException{
	
	public MyApiException(String msg) {
		super(msg); // 빈 생성자를 때리면 메시지를 못 넘긴다
	}
}
