package com.sparta.hanghaeblog.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Setter
@Getter
public class SignupRequestDto {

    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    @Pattern(regexp = "[a-z0-9]{4,10}",
            message = "아이디는 최소 4자 이상, 10자 이하이며 알파벳 소문자(a~z), 숫자(0~9)로 구성되어야 합니다.")
    private String username;
    @Pattern(regexp = "[a-zA-Z0-9]{8,15}",
            message = "비밀번호는 최소 8자 이상, 15자 이하이며 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성되어야 합니다.")
    private String password;
    private boolean admin = false;
    private String adminToken = "";
}
