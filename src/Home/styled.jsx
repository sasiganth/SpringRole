import styled from 'styled-components'
import { Link } from 'react-router-dom';

import dropdownIcon from './../images/dropdown.png';

const SearchBoxWrapper = styled.div`
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    width: 100%;
    padding: 15px 10px;
    max-width: 1366px;
    margin: auto;
`
const SearchForm = styled.form`
    width: fit-content;
    float: left;
`
const SearchBox = styled.input`
    width: 180px;
    height: 22px;
    display: block;
`
const SearchPagination = styled.div`
    width: 120px;
    float: left;
    line-height: 28px;
    margin-left: 10px;
`
const SearchError = styled.span`
    display: ${props => props.show ? "block": "none"};
    font-size: 13px;
    color: #f00;
    margin: 3px 10px;
`
const ListTableWrapper = styled.div`
    width: 100%;
    padding: 0px 10px;
    box-sizing: border-box;
    max-width: 1366px;
    margin: auto;
    table{
        border-spacing: 0;
        border: 1px solid #6a9cef;
        width: 100%;
        border-collapse: collapse;
        .webLink{
            color: #4486f6;
        }
    }
    td, th{
        white-space:nowrap;
        padding: 5px 10px;
        border-color: #6a9cef;
    }
    thead{
        cursor: pointer;
        .asc span{
            background: url(${dropdownIcon});
            background-size: 10px 10px;
            background-repeat: no-repeat;
            width: 10px;
            height: 10px;
            display: inline-block;
        }
        .desc span{
            background: url(${dropdownIcon});
            background-size: 10px 10px;
            background-repeat: no-repeat;
            width: 10px;
            height: 10px;
            display: inline-block;
            transform: rotate(180deg);
        }
    }
`
const PaginationWrapper = styled.div`
    width: 100%;
    padding: 0px 10px;
    box-sizing:  border-box;
    max-width: 1366px;
    margin: auto;
`
const PageButtonWrapper = styled.div`
    width: 100%;
    display: block;
    overflow: hidden;
    margin: 15px auto;
`
const PreviousNextButton = styled.div`
    width: fit-content;
    border: 1px solid #4486f6;
    float: left;
    width: 112px;
    text-align: center;
    border-radius: 20px;
    line-height: 28px;
    text-transform: capitalize;
    cursor: pointer;
    span{
        width: inherit;
        display: block;
    }
    &.right{
        float: right;
    }
    &.disableClick{
        cursor: no-drop;
        span{
            pointer-events: none;
        }
    }
`
const PreviousNextPagination = styled.div`
    width: fit-content;
    border: 1px solid #4486f6;
    float: left;
    width: 110px;
    text-align: center;
    line-height: 28px;
    text-transform: capitalize;
    cursor: pointer;
    span{
        width: inherit;
        display: block;
    }
    &.right{
        ${'' /* float: right; */}
    }
    &.disableClick{
        cursor: no-drop;
        span{
            pointer-events: none;
        }
    }
    &.selected{
        background-color: #4486f6;
    }
`
const LinkToUser = styled(Link)`
    display: table-row;
    color: #000;
    text-decoration: none;
`
export {
    SearchBoxWrapper,
    SearchForm,
    SearchBox,
    SearchError,
    SearchPagination,
    ListTableWrapper,
    PaginationWrapper,
    PageButtonWrapper,
    PreviousNextButton,
    PreviousNextPagination,
    LinkToUser
}