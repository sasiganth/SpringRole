import React from "react";
import Header from './../Header'
import {
    UserDetailWrapper,
    UserInfo,
    UserNameCont,
    FieldName,
    FieldValue
} from './styled'

import whitearrowIcon from './../images/whitearrow.png';
import {commonState } from './../Home/Home'
const User = (props) => {
    console.log("propsddd ",props)
    let id = props && props.match && props.match.params && props.match.params.id;
    let userInfo = {}
    if(commonState.tempCurList.length > 0){
        commonState.tempCurList.filter(data => {
            if(data.id == id){
                userInfo = data;
            }
        })
    }else{
        props.history.push("/")
    }
    console.log("userInfo ", userInfo)
    const goBack = () => {
        props.history.push("/")
    }
    return (
        <React.Fragment>
            <Header name="userPage" icon={whitearrowIcon} click={goBack}/>
            <UserDetailWrapper>
                <UserNameCont>{userInfo.first_name} {userInfo.last_name}</UserNameCont>
                <UserInfo>
                    <FieldName>Company</FieldName>
                    <FieldValue>{userInfo.company_name}</FieldValue>
                </UserInfo>
                <UserInfo>
                    <FieldName>City</FieldName>
                    <FieldValue>{userInfo.city}</FieldValue>
                </UserInfo>
                <UserInfo>
                    <FieldName>State</FieldName>
                    <FieldValue>{userInfo.state}</FieldValue>
                </UserInfo>
                <UserInfo>
                    <FieldName>ZIP</FieldName>
                    <FieldValue>{userInfo.zip}</FieldValue>
                </UserInfo>
                <UserInfo>
                    <FieldName>Email</FieldName>
                    <FieldValue>{userInfo.email}</FieldValue>
                </UserInfo>
                <UserInfo>
                    <FieldName>Web</FieldName>
                    <FieldValue>{userInfo.web}</FieldValue>
                </UserInfo>
                <UserInfo>
                    <FieldName>Age</FieldName>
                    <FieldValue>{userInfo.age}</FieldValue>
                </UserInfo>
            </UserDetailWrapper>
        </React.Fragment>
    )
}
export default User;