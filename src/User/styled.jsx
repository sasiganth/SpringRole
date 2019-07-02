import styled from 'styled-components'

import dropdownIcon from './../images/dropdown.png';
const UserDetailWrapper = styled.div`
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
`
const UserNameCont = styled.div`
    font-size: 28px;
    font-weight: bold;
    padding: 10px 0;
`
const UserInfo = styled.div`
    border-bottom: 2px solid #bebebe;
    padding: 10px 30px 5px 10px;
    box-sizing: border-box;
`
const FieldName = styled.span``
const FieldValue = styled.span`
    float: right;
`

export {
    UserDetailWrapper,
    UserInfo,
    UserNameCont,
    FieldName,
    FieldValue
}