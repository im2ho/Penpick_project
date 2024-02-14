package com.penpick.users.dto;

import lombok.*;

@Builder
@Data
public class ChangePasswordDTO {

	private String currentPassword;
    private String newPassword;
}
