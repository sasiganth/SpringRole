import React from "react";
import { observer } from 'mobx-react-lite';
import { observable, action } from 'mobx';
import Header from './../Header'
import axios from 'axios';
import menuIcon from './../images/menu.png';
import {
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
} from './styled'
class CommonState {
    @observable listData = [];
    @observable curList = []
    @observable tempCurList = []
    @observable pageNummber = 1;
    @observable startPagenumber = 1;
    @observable searchText = "";
    @observable showSearchError = false;
    @observable sortObj = {
        "first_name": "",
        "last_name": "",
        "company_name": "",
        "city": "",
        "state": "",
        "zip": "",
        "email": "",
        "web": "",
        "age": ""
    }
    @action
    setListData = (val) => {
        console.log("showCartMask ")
        this.listData = val;
    }
    @action
    nextPage = () => {
        console.log("clicked next")
        this.searchText = ""
        if (this.pageNummber <= this.listData.length) {
            this.pageNummber = this.pageNummber + 1;
            if (this.pageNummber % 10 == 0) {
                this.startPagenumber = (Math.floor(this.pageNummber / 10) * 10) - 9
            } else {
                this.startPagenumber = (Math.floor(this.pageNummber / 10) * 10) + 1
            }
        }
    }
    @action
    previousPage = () => {
        this.searchText = ""
        console.log("clicked previous")
        if (this.pageNummber > 1) {
            this.pageNummber = this.pageNummber - 1;
            if (this.pageNummber % 10 == 0) {
                this.startPagenumber = (Math.floor(this.pageNummber / 10) * 10) - 9
            } else {
                this.startPagenumber = (Math.floor(this.pageNummber / 10) * 10) + 1
            }
        }
    }
    @action
    clickPage = (e) => {
        this.searchText = ""
        console.log("clicked clickPage");
        const pageNummber = e.currentTarget.getAttribute("data-number")
        console.log("element ", pageNummber)
        this.pageNummber = parseInt(pageNummber);
    }

    @action
    nextPagination = () => {
        console.log("clicked next")
        if (this.listData.length - this.startPagenumber > 10)
            this.startPagenumber = this.startPagenumber + 10;
    }
    @action
    previousPagination = () => {
        console.log("clicked previous")
        if (this.startPagenumber > 1)
            this.startPagenumber = this.startPagenumber - 10;
    }

    @action
    setCurrentList = () => {
        let startFrom = (this.pageNummber * 5) - 5;
        let endTo = this.pageNummber * 5;
        let curArray = []
        if(this.listData.length > 0){
            for (let i = startFrom; i < endTo; i++) {
                curArray.push(this.listData[i])
            }
            this.curList = curArray;
            this.tempCurList = curArray;
        }
    }

    @action
    setSortable = (e) => {
        let field = e.currentTarget.getAttribute("data-field");
        let sortObj = this.sortObj;
        let orginalArr = this.tempCurList;
        let sortType = "";

        console.log("field ", field)
        console.log("sortObj ", sortObj)
        console.log("orginalArr ", orginalArr)
        console.log("sortType ", sortType)
        if (sortObj[field] == "asc") {
            sortObj[field] = "desc"
            sortType = "desc"
        } else if (sortObj[field] == "desc") {
            sortObj[field] = ""
        } else {
            sortObj = {
                "first_name": "",
                "last_name": "",
                "company_name": "",
                "city": "",
                "state": "",
                "zip": "",
                "email": "",
                "web": "",
                "age": ""
            };
            sortType = "asc"
            sortObj[field] = "asc";
        }
        let sortedArr = [];
        if (sortType == "asc") {
            if ((field == "zip") || (field == "age")) {
                sortedArr = orginalArr.sort(function (a, b) {
                    return a[field] - b[field]
                })
            } else {
                sortedArr = orginalArr.sort(function (a, b) {
                    var nameA = a[field].toLowerCase(), nameB = b[field].toLowerCase()
                    if (nameA < nameB) //sort string ascending
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0 //default return value (no sorting)
                })
            }

        } else if (sortType == "desc") {
            if ((field == "zip") || (field == "age")) {
                sortedArr = orginalArr.sort(function (a, b) {
                    return b[field] - a[field]
                })
            } else {
                sortedArr = orginalArr.sort(function (a, b) {
                    var nameA = a[field].toLowerCase(), nameB = b[field].toLowerCase()
                    if (nameA > nameB) //sort string ascending
                        return -1
                    if (nameA < nameB)
                        return 1
                    return 0 //default return value (no sorting)
                })
            }
        } else {
            if (this.curList.length == this.tempCurList.length)
                sortedArr = this.curList;
            else
                sortedArr = this.tempCurList;
        }



        console.log("field ", field)
        console.log("sortObj ", sortObj)
        console.log("orginalArr ", orginalArr)
        console.log("sortType ", sortType)

        this.tempCurList = sortedArr;
        this.sortObj = sortObj;
    }
    @action
    onSearchTextChnage = (e) => {
        this.searchText = e.currentTarget.value
    }

    @action
    setSearchable = (event) => {
        event.preventDefault();
        let curList = this.listData;
        let filterArr = [];
        let str = this.searchText;
        if (str != "") {
            filterArr = curList.filter((data, index) => {
                if (data.first_name.toLowerCase() == str.toLowerCase())
                    return data;
            });
            if(filterArr.length > 0) {
                this.tempCurList = filterArr;
            } else{
                this.showSearchError = true;
                setTimeout(() => {
                    this.showSearchError = false;
                }, 3000)
            }
        } else {
            this.tempCurList = this.curList;
            this.sortObj = {
                "first_name": "",
                "last_name": "",
                "company_name": "",
                "city": "",
                "state": "",
                "zip": "",
                "email": "",
                "web": "",
                "age": ""
            }
            this.showSearchError = true;
            setTimeout(() => {
                this.showSearchError = false;
            }, 3000)
        }
    }
}
export const commonState = new CommonState();

const renderList = (data) => {
    console.log("data ", data)
    return (
        data.map((item, index) => {
            return (
                <LinkToUser to={`/user/${item.id}`} key={index}>
                    {/* <tr key={index}> */}
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.company_name}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.zip}</td>
                    <td>{item.email}</td>
                    <td className="webLink">{item.web}</td>
                    <td>{item.age}</td>
                    {/* </tr> */}
                </LinkToUser>
            )
        })
    )
}
const renderPagination = () => {
    const view = []
    for (let i = commonState.startPagenumber; i < (commonState.startPagenumber + 10); i++) {
        view.push(
            <PreviousNextPagination className={commonState.pageNummber == i ? "disableClick selected" : ""} >
                <span data-number={i} onClick={commonState.clickPage}>{i}</span>
            </PreviousNextPagination>
        )
    }
    return view
}
const Home = observer(() => {
    React.useEffect(() => {
        commonState.setCurrentList();
        if (commonState.listData.length == 0) {
            axios.get("http://demo9197058.mockable.io/users").then(function (response) {
                // handle success
                console.log(response);
                commonState.setListData(response.data);
                commonState.setCurrentList();
            }).catch(function (error) {
                // handle error
                console.log(error);
            })
        }
    }, [commonState.pageNummber, commonState.startPagenumber])
    return (
        <React.Fragment>
            <Header icon={menuIcon} />
            {commonState.tempCurList.length > 0 ?
                <>
                    <SearchBoxWrapper>
                        <SearchForm onSubmit={commonState.setSearchable}>
                            <SearchBox value={commonState.searchText} placeholder="Search by first name" onChange={commonState.onSearchTextChnage} />
                            <SearchError show={commonState.showSearchError}>Search text doesn't match</SearchError>
                        </SearchForm>
                        <SearchPagination>{((commonState.pageNummber - 1) * 5) + 1} - {commonState.pageNummber * 5} of {commonState.listData.length}</SearchPagination>
                    </SearchBoxWrapper>
                    <ListTableWrapper>
                        <table border="1" cellPadding="0">
                            <thead>
                                <tr>
                                    <th data-field="first_name" className={commonState.sortObj.first_name} onClick={commonState.setSortable}><span></span>First Name</th>
                                    <th data-field="last_name" className={commonState.sortObj.last_name} onClick={commonState.setSortable}><span></span>Last Name</th>
                                    <th data-field="company_name" className={commonState.sortObj.company_name} onClick={commonState.setSortable}><span></span>Company Name</th>
                                    <th data-field="city" className={commonState.sortObj.city} onClick={commonState.setSortable}><span></span>City</th>
                                    <th data-field="state" className={commonState.sortObj.state} onClick={commonState.setSortable}><span></span>State</th>
                                    <th data-field="zip" className={commonState.sortObj.zip} onClick={commonState.setSortable}><span></span>Zip</th>
                                    <th data-field="email" className={commonState.sortObj.email} onClick={commonState.setSortable}><span></span>Email</th>
                                    <th data-field="web" className={commonState.sortObj.web} onClick={commonState.setSortable}><span></span>Web</th>
                                    <th data-field="age" className={commonState.sortObj.age} onClick={commonState.setSortable}><span></span>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderList(commonState.tempCurList)}
                            </tbody>
                        </table>
                    </ListTableWrapper>
                    <PaginationWrapper>
                        <PageButtonWrapper>
                            <PreviousNextButton className={commonState.pageNummber == 1 ? "disableClick" : ""}>
                                <span onClick={commonState.previousPage}>previous</span>
                            </PreviousNextButton>
                            <PreviousNextButton className={commonState.pageNummber == commonState.listData.length / 5 ? "disableClick right" : "right"} >
                                <span onClick={commonState.nextPage}>next</span>
                            </PreviousNextButton>
                        </PageButtonWrapper>
                        <PageButtonWrapper>
                            <PreviousNextPagination className={commonState.startPagenumber == 1 ? "disableClick" : ""}>
                                <span onClick={commonState.previousPagination}>&lt;&lt;</span>
                            </PreviousNextPagination>
                            {renderPagination()}
                            <PreviousNextPagination className={commonState.startPagenumber == ((commonState.listData.length / 5) - 9) ? "disableClick right" : "right"} >
                                <span onClick={commonState.nextPagination}>&gt;&gt;</span>
                            </PreviousNextPagination>
                        </PageButtonWrapper>
                    </PaginationWrapper>
                </>
            : <div>Loading...</div>
            }
        </React.Fragment>
    )
});
export { Home }
export default Home;