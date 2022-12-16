# 항해 블로그
스파르타 코딩클럽 내일배움캠프 4기 Spring 입문 과제

최초 설계
![KakaoTalk_20221209_111640782](https://user-images.githubusercontent.com/78391166/206608978-22440d48-21fb-4506-bd64-a92efaefc46d.jpg)

ERD
![image](https://user-images.githubusercontent.com/78391166/208017665-2a38a17a-7e24-429d-8eb8-083be9965c5b.png)

API 명세서
![image](https://user-images.githubusercontent.com/78391166/208019259-abc4d487-6675-4add-9e96-9f3e8a6758db.png)

---
## 히스토리
[2022-12-14]

전통적인 Sping MVC인 컨트롤러인 *@Controller*는 주로 **View를 반환**하기 위해 사용된다. Controller는 요청을 처리한 후에 **ViewName**을 반환한다.

만약 Controller에서 데이터를 반환해야 하는 경우에는 *@ResponseBody*를 활용하면 Json 형태로 데이터를 반환할 수 있다.

*@RestController*는 *@Controller*에 *@ResponseBody*가 추가된 것이다. 당연하게도 RestController의 주용도는 Json 형태로 객체 데이터를 반환하는 것이다.

---
