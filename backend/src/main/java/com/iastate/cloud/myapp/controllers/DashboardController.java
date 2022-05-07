package com.iastate.cloud.myapp.controllers;

import com.iastate.cloud.myapp.aws.s3.S3Operations;
import com.iastate.cloud.myapp.beans.AuthTokenBean;
import com.iastate.cloud.myapp.beans.AwsCredentialsBean;
import com.iastate.cloud.myapp.beans.PutObjectBean;
import com.iastate.cloud.myapp.encryption.AES;
import com.iastate.cloud.myapp.utils.GsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Author @ Pawan Namagiri
 **/

@CrossOrigin("*")
@RestController
@RequestMapping("/home")
public class DashboardController {

    @Autowired
    private S3Operations s3Operations;

    @Value("${AesKey}")
    private String AesKey;


    @PostMapping(path = "/s3/getBucketList")
    public ResponseEntity<List<String>> getBucketList(@RequestBody AuthTokenBean authTokenBean) {


        System.out.println(AesKey);

        return new ResponseEntity<>(s3Operations.getListOfBuckets(authTokenBean), HttpStatus.OK);

    }

    @PostMapping(path ="s3/putObject", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> s3PutObject(@ModelAttribute PutObjectBean putObjectBean){

        System.out.println(putObjectBean.token2 );

        return null;
    }
}
