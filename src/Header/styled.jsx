import styled from 'styled-components'
const HeaderWrapper = styled.header`
    height: 50px;
    background-color: #4486f6;
`
const HederIcon = styled.img`
    width: 60px;
    height: 100%;
    float: left;
    &.userPage{
        width: 30px;
        height: 30px;
        padding: 10px 15px;
    }
`
const HeaderTitle = styled.div`
    width: 200px;
    height: 100%;
    float: left;
    line-height: 52px;
    color: #fff;
    font-size: 26px;
`
export {
    HeaderWrapper,
    HederIcon,
    HeaderTitle
}