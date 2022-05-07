package com.iastate.cloud.myapp.beans;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

/**
 * Author @ Pawan Namagiri
 **/


public class PutObjectBean extends AuthTokenBean{

    private MultipartFile file;

    public MultipartFile getFile() { return file;};

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public PutObjectBean(String token1, String token2, String username) {
        super(token1, token2, username);
    }







}
