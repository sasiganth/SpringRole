import React from "react";
import {
    HeaderWrapper,
    HederIcon,
    HeaderTitle
} from './styled'
const Header = (props) => {
    console.log("props", props)
    let title = props && props.title ? props.title : "Data Peace";
    return (
        <HeaderWrapper>
            <HederIcon onClick={props.click} className={props.name ? props.name : ""} src={props.icon}/>
            <HeaderTitle>{title}</HeaderTitle>
        </HeaderWrapper>
    )
}
export {Header}
export default Header;