import React from 'react'
import PrimaryTextInput from '../../../Components/primaty_text_input/PrimaryTextInput.component'
import PrimarySelectInput from '../../../Components/primary_select_input/PrimarySelectInput.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUniversity } from '@fortawesome/free-solid-svg-icons'
import Switch from "react-switch";
import PrimaryButton from '../../../Components/primary_button/PrimaryButton.component'
import globals from '../../../Globals/Global'
import { connect } from 'react-redux'
import { messageBoxModify } from '../../../Redux/UI/ui.action'
import styles from '../../../../styles/manager.module.scss'

class UpdateVila extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            selectedRules: [],
            checkedFacilities: [],
            checkedFacilitiesForRoom: [],
            vilaTypes: [
                'ویلایی',
                'آپارتمانی',
                'کلبه جنگلی',
                'روستایی',
                'سنتی/بوم گردی',
                'مجموعه اقامتی'
            ],
            buildinType: [
                ['همسطح', 'دوبلکس', 'تریبلکس'],
                ['یک واحد از چند واحد', 'چند واحد از آپارتمان'],
                ['چوبی', 'گلی', 'همسطح'],
                ['خانه روستایی'],
                ['همسطح', 'دوبلکس', 'تریبلکس'],
                ['مجموعه اقامتی']
            ],
            currentVilaType: 0,
            currentBuildingType: 0,
            facilities: [],
            province: [],
            rules: [],
            provinceIndexSelected: 0,
            vilaMainObjcet: {
                LocX: 12535.5488,
                LocY: 15484.8448
            },
            roomObject: {
                Cap: 1,
                CapMax: 1,
                ToshakCount: 0,
                RoomCount: 0,
                Takht1Count: 0,
                Takht2Count: 0,
            },
            notTheOwner: false
        };
    }

    componentDidMount() {
        // get base facilities
        fetch(`${globals.baseUrl}bj/emkanat/view`).then(res => res.json()).then(data => {
            if (data.status == "OK") {
                this.setState({
                    facilities: data.Emkanat
                })
            } else {

            }

        })
        // provinces and their cities
        fetch(`${globals.baseUrl}bj/province/cities`).then(res => res.json())
            .then(data => {
                if (data.status == "OK") {
                    this.setState({
                        province: data.Province
                    })
                }
            })
        // get base rules
        fetch(`${globals.baseUrl}bj/rules/view`).then(res => res.json())
            .then(data => {
                this.setState({
                    rules: data.Rules
                })
            })
        // get accommodation by the id
        fetch(`${globals.baseUrl}bj/eghamat/view/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                const vilaTypeIndex = this.state.vilaTypes.findIndex(type => type == data.Eghamat[0].EghamatType)
                this.setState({
                    vilaMainObjcet: {
                        ...data.Eghamat[0]
                    },
                    currentVilaType: vilaTypeIndex,
                    currentBuildingType: this.state.buildinType[vilaTypeIndex].findIndex(type => type == data.Eghamat[0].BuildingType),
                    notTheOwner: data.Eghamat[0].TelNo != "" || data.Eghamat[0].TelNo != null
                })
            })
        // get accommodation's room by the id
        fetch(`${globals.baseUrl}bj/eghamatRoom/view/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    roomObject: {
                        ...data.EghamatRoom[0]
                    }
                })
            })
        // get accommodation's facilities by the id
        fetch(`${globals.baseUrl}bj/eghamatEmkanat/view/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    checkedFacilities: data.EghamatEmkanat.map(x => x.EmkanatId)
                })
            })
        // get accommodation's rules by the id
        fetch(`${globals.baseUrl}bj/eghamatRules/view/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    selectedRules: data.EghamatRules.map(x => x.RulesId)
                })
            })

        //get facilities of accommmodation's room
        fetch(`${globals.baseUrl}bj/eghamatRoomEmkanat/view/0/1/${this.props.match.params.id}`)
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                checkedFacilitiesForRoom: data.EghamatRoomEmkanat.map(x => x.EmkanatId)
            })
        })
    }
    //for rules switches
    handleChange = (checked, e, id) => {
        if (checked) {
            this.setState({
                selectedRules: [...this.state.selectedRules, id]
            })
        } else {
            this.setState({
                selectedRules: this.state.selectedRules.filter(x => x != id)
            })
        }

    }
    // check and uncheck the options in vila main object
    handleChangeCheckbox = (e) => {
        this.setState({
            vilaMainObjcet: {
                ...this.state.vilaMainObjcet,
                [e.target.name]: e.target.checked ? 1 : 0
            }
        })
    }
    // fill the related data of inputs
    handleChangeInput = (e) => {
        this.setState({
            vilaMainObjcet: {
                ...this.state.vilaMainObjcet,
                [e.target.name]: e.target.value
            }
        })
    }
    // open and choose file
    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        this.setState({ file }); /// if you want to upload latter
    }
    // store the id of facilities that have been checked  for => whole accommodation
    onCheckFacility = (e) => {
        if (e.target.checked) {
            this.setState({
                checkedFacilities: [...this.state.checkedFacilities, e.target.name]
            })
        } else {
            this.setState({
                checkedFacilities: this.state.checkedFacilities.filter(x => x != e.target.name)
            })
        }
    }
    // store the id of facilities that have been checked  for => room
    onCheckRoomFacility = (e) => {
        if (e.target.checked) {
            this.setState({
                checkedFacilitiesForRoom: [...this.state.checkedFacilitiesForRoom, e.target.name]
            })
        } else {
            this.setState({
                checkedFacilitiesForRoom: this.state.checkedFacilitiesForRoom.filter(x => x != e.target.name)
            })
        }
    }
    // check and uncheck the options in room object
    roomHandleChangeCheckbox = (e) => {
        this.setState({
            roomObject: {
                ...this.state.roomObject,
                [e.target.name]: e.target.checked ? 1 : 0
            }
        })
    }
    // fill the related data of inputs in room object
    roomHandleChangeInput = (e) => {
        this.setState({
            roomObject: {
                ...this.state.roomObject,
                [e.target.name]: e.target.value
            }
        })
    }
    // check if the related option is checked or not for => accommodation
    isItChecked = (name) => {
        try {
            if (this.state.vilaMainObjcet[name] == 1) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
    // check if the related option is checked or not for => room
    isItCheckedForRoom = (name) => {
        try {
            if (this.state.roomObject[name] == 1) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
    // validate the inputs
    validation = () => {
        let validate = true
        let nameError, AdminName, TelNo, Dsc, Province, City, AddressName, Address
            , typeAccommodation, accommodationView, accommodationLocation,
            landMetraj, accommodationMetraj, facilities

        if (this.state.vilaMainObjcet.Name == "" || this.state.vilaMainObjcet.Name == undefined) {
            nameError = "نام اقامتگاه را وارد کنید"
            validate = false
        }

        if (this.state.vilaMainObjcet.AdminName == "" || this.state.vilaMainObjcet.AdminName == undefined) {
            AdminName = "نام صاحب اقامتگاه را وارد کنید"
            validate = false
        }

        // if (this.state.vilaMainObjcet.TelNo == "" || this.state.vilaMainObjcet.TelNo == undefined) {
        //     TelNo = "a صاحب اقامتگاه را وارد کنید"
        // }

        // if (this.state.vilaMainObjcet.Dsc == "" || this.state.vilaMainObjcet.Dsc == undefined) {
        //     Dsc = "توضیحات مربوط به اقامتگاه را وارد کنید"
        //     validate = false
        // }

        if (this.state.vilaMainObjcet.ProvinceId == "-1" || this.state.vilaMainObjcet.ProvinceId == undefined) {
            Province = "لطفا استان را انتخاب کنید"
            validate = false
        }

        if (this.state.vilaMainObjcet.CityId == "-1" || this.state.vilaMainObjcet.CityId == undefined) {
            City = "لطفا شهر را انتخاب کنید"
            validate = false
        }

        // if (this.state.vilaMainObjcet.AddressName == "" || this.state.vilaMainObjcet.AddressName == undefined) {
        //     AddressName = "لطفا محدوده ویلا را وارد کنید"
        // }

        if (this.state.vilaMainObjcet.Address == "" || this.state.vilaMainObjcet.Address == undefined) {
            Address = "لطفا آدرس ویلا را وارد کنید"
            validate = false
        }

        if ((this.state.vilaMainObjcet.EcoFlag == false || this.state.vilaMainObjcet.EcoFlag == undefined) &&
            (this.state.vilaMainObjcet.LuxFlag == false || this.state.vilaMainObjcet.LuxFlag == undefined) &&
            (this.state.vilaMainObjcet.NormalFlag == false || this.state.vilaMainObjcet.NormalFlag == undefined) &&
            (this.state.vilaMainObjcet.SupLuxFlag == false || this.state.vilaMainObjcet.SupLuxFlag == undefined) &&
            (this.state.vilaMainObjcet.TakhfifFlag == false || this.state.vilaMainObjcet.TakhfifFlag == undefined)
        ) {
            typeAccommodation = "لطفا نوع اقامتگاه را انتخاب کنید"
            validate = false
        }

        if ((this.state.roomObject.KohViewFlag == false || this.state.roomObject.KohViewFlag == undefined) &&
            (this.state.roomObject.JangalViewFlag == false || this.state.roomObject.JangalViewFlag == undefined) &&
            (this.state.roomObject.SeaViewFlag == false || this.state.roomObject.SeaViewFlag == undefined) &&
            (this.state.roomObject.PayeViewFlag == false || this.state.roomObject.PayeViewFlag == undefined) &&
            (this.state.roomObject.CityViewFlag == false || this.state.roomObject.CityViewFlag == undefined)
        ) {
            accommodationView = "لطفا چشم انداز اقامتگاه را انتخاب کنید"
            validate = false
        }

        if ((this.state.vilaMainObjcet.RostaFlag == false || this.state.vilaMainObjcet.RostaFlag == undefined) &&
            (this.state.vilaMainObjcet.SahelFlag == false || this.state.vilaMainObjcet.SahelFlag == undefined) &&
            (this.state.vilaMainObjcet.ShahrakFlag == false || this.state.vilaMainObjcet.ShahrakFlag == undefined) &&
            (this.state.vilaMainObjcet.YeylaFlag == false || this.state.vilaMainObjcet.YeylaFlag == undefined) &&
            (this.state.vilaMainObjcet.JangalFlag == false || this.state.vilaMainObjcet.JangalFlag == undefined) &&
            (this.state.vilaMainObjcet.KohFlag == false || this.state.vilaMainObjcet.KohFlag == undefined)
        ) {
            accommodationLocation = "لطفا موقعیت اقامتگاه را انتخاب کنید"
            validate = false
        }

        if (this.state.vilaMainObjcet.Metraj == "" || this.state.vilaMainObjcet.Metraj == undefined) {
            landMetraj = "لطفا متراژ زمین را وارد کنید"
            validate = false
        }

        if (this.state.roomObject.Metraj == "" || this.state.roomObject.Metraj == undefined) {
            accommodationMetraj = "لطفا متراژ اقامتگاه را وارد کنید"
            validate = false
        }

        // if (this.state.checkedFacilities.length == 0) {
        //     facilities = "لطفا امکانات اقامتگاه را انتخاب کنید"
        //     validate = false
        // }

        this.setState({
            errors: {
                nameError: nameError,
                AdminName: AdminName,
                TelNo: TelNo,
                Dsc: Dsc,
                Province: Province,
                City: City,
                AddressName: AddressName,
                Address: Address,
                typeAccommodation: typeAccommodation,
                accommodationView: accommodationView,
                accommodationLocation: accommodationLocation,
                accommodationMetraj: accommodationMetraj,
                landMetraj: landMetraj,
                facilities: facilities
            }
        })
        return validate
    }

    render() {
        const arrayOfTen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const arrayOfThirty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        return (
            <div className="container">
                <div>
                    <div className="row panel-main-content">
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">اقامتگاهتان را معرفی کنید</h3>
                        <div className="col-lg-8 padding-3px margin-top-10px">
                            <div className="row">
                                <div className="col-lg-3 col-12 padding-3px">
                                    <span className="font-bold-iransanse font-size-13">کد ویلای شما</span>
                                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                                        <PrimaryTextInput placeHolder="کد ویلا" value="0" value={this.state.vilaMainObjcet.EghamatId} disabled={true} />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-12 padding-3px">
                                    <span className="font-bold-iransanse font-size-13">نام صاحب ویلا</span>
                                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                                        <PrimaryTextInput placeHolder="نام صاحب ویلا" value={this.state.vilaMainObjcet.AdminName} name="AdminName" onChange={this.handleChangeInput} />
                                    </div>
                                    <span className="color-secondary error-message font-size-14"> {this.state.errors.AdminName}</span>
                                </div>
                                <div className="col-lg-3 col-12 padding-3px">
                                    <span className="font-bold-iransanse font-size-13">نام اقامتگاه</span>
                                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                                        <PrimaryTextInput placeHolder="نام اقامتگاه" value={this.state.vilaMainObjcet.Name} name="Name" onChange={this.handleChangeInput} />
                                    </div>
                                    <span className="color-secondary error-message font-size-14"> {this.state.errors.nameError}</span>
                                </div>

                                <div className="col-lg-3 col-12 padding-3px">
                                    <input type="checkbox" onChange={(e) => {
                                        this.setState({
                                            notTheOwner: e.target.checked
                                        })
                                    }} checked={this.state.notTheOwner} /><span className="font-bold-iransanse font-size-13">مالک اقامتگاه نیستم</span>
                                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                                        <PrimaryTextInput disabled={!this.state.notTheOwner} placeHolder="تلفن تماس مالک اقامتگاه" value={this.state.vilaMainObjcet.TelNo} name="TelNo" onChange={this.handleChangeInput} />
                                    </div>
                                    <span className="color-secondary error-message font-size-14"> {this.state.errors.TelNo}</span>
                                </div>
                            </div>
                            <div className="row margin-top-10px">
                                <div className="col-lg-4 col-12 padding-3px">
                                    <span className="font-bold-iransanse font-size-13">نوع اقامتگاه</span>
                                    <PrimarySelectInput value={this.state.currentVilaType} onChange={(e) => {
                                        this.setState({
                                            currentBuildingType: 0,
                                            currentVilaType: e.target.value
                                        })
                                    }}>
                                        {
                                            this.state.vilaTypes.map((type, index) => (
                                                <option value={index}>{type}</option>
                                            ))
                                        }
                                    </PrimarySelectInput>
                                </div>
                                <div className="col-lg-4 col-12 padding-3px">
                                    <span className="font-bold-iransanse font-size-13">نوع ساختمان</span>
                                    <PrimarySelectInput value={this.state.currentBuildingType} onChange={(e) => {
                                        this.setState({
                                            currentBuildingType: e.target.value
                                        })
                                    }}>
                                        {
                                            this.state.buildinType[this.state.currentVilaType].map((type, index) => (
                                                <option value={index}>{type}</option>
                                            ))
                                        }
                                    </PrimarySelectInput>
                                </div>
                            </div>
                            <div className="row margin-top-20px">
                                <div className="col-12 padding-3px">
                                    <span className="font-bold-iransanse font-size-13">توضیحات</span>
                                    <div className={` form-input-border  ${styles['form-input-border-private']} `} style={{ height: "auto" }}>
                                        <textarea rows="10" className="form-input primary-text" value={this.state.vilaMainObjcet.Dsc} name="Dsc" onChange={this.handleChangeInput}>

                                        </textarea>
                                    </div>
                                    <span className="color-secondary error-message font-size-14"> {this.state.errors.Dsc}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12 margin-top-10px">
                            <span>تصویر نمای اقامتگاه</span>
                            <input id="myInput"
                                type="file"
                                ref={(ref) => this.upload = ref}
                                style={{ display: 'none' }}
                                onChange={this.onChangeFile.bind(this)}
                            />
                            <div className="upload-box" style={{ height: 100 }} onClick={() => { this.upload.click() }}>
                                <p className="no-margin font-size-15 color-textpill">تصویر نمای خود را بارگذاری کنید</p>
                            </div>
                        </div>
                    </div>
                    <div className={ `row ${styles['panel-main-content']}  margin-top-10px`}>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse margin-bottom-5px">آدرس ویلا</h3>
                        <div className="col-lg-3 col-12 padding-3px">
                            <PrimarySelectInput name="ProvinceId" value={this.state.vilaMainObjcet.ProvinceId} onChange={this.handleChangeInput}>
                                <option value="-1"></option>
                                {
                                    this.state.province.map(oneProvince => (
                                        <option value={oneProvince.ProvinceId}>{oneProvince.ProvinceName}</option>
                                    ))
                                }
                            </PrimarySelectInput>
                            <span className="color-secondary error-message font-size-14"> {this.state.errors.Province}</span>
                        </div>
                        <div className="col-lg-3 col-12 padding-3px">
                            <PrimarySelectInput name="CityId" value={this.state.vilaMainObjcet.CityId} onChange={this.handleChangeInput}>
                                <option value="-1" ></option>
                                {
                                    this.state.vilaMainObjcet.ProvinceId && this.state.vilaMainObjcet.ProvinceId != "-1" ?
                                        this.state.province.filter(x => x.ProvinceId == this.state.vilaMainObjcet.ProvinceId)[0].Cities.map(city => (
                                            <option value={city.CityId}>{city.CityName}</option>
                                        ))
                                        :
                                        null
                                }
                            </PrimarySelectInput>
                            <span className="color-secondary error-message font-size-14"> {this.state.errors.City}</span>
                        </div>
                        <div className="col-lg-3 col-12 padding-3px">
                            <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                                <PrimaryTextInput placeHolder="نام محدوده اقامتگاه" value={this.state.vilaMainObjcet.AddressName} name="AddressName" onChange={this.handleChangeInput} />
                            </div>
                            <span className="color-secondary error-message font-size-14"> {this.state.errors.AddressName}</span>

                        </div>
                        <div className="col-12 padding-3px margin-top-10px">
                            <div className={` form-input-border  ${styles['form-input-border-private']} `} style={{ height: "auto" }}>
                                <textarea rows="5" placeholder="آدرس کامل اقامتگاه ( آمل-خیابان 1- کوچه 2 -پلاک 110)" value={this.state.vilaMainObjcet.Address} className="form-input primary-text" name="Address" onChange={this.handleChangeInput}>

                                </textarea>
                            </div>
                            <span className="color-secondary error-message font-size-14"> {this.state.errors.Address}</span>
                        </div>
                    </div>
                    <div className={ `row ${styles['panel-main-content']}  margin-top-10px`}>
                        <span className="color-secondary error-message font-size-14"> {this.state.errors.typeAccommodation}</span>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">نوع اقامتگاه</h3>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="EcoFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("EcoFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; اقتصادی</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="LuxFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("LuxFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; لوکس</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="NormalFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("NormalFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; معمولی</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="SupLuxFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("SupLuxFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; سوپر لوکس</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="TakhfifFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("TakhfifFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; تخفیف دار</label>
                        </div>

                    </div>
                    <div className={ `row ${styles['panel-main-content']}  margin-top-10px`}>
                        <span className="color-secondary error-message font-size-14"> {this.state.errors.accommodationView}</span>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">چشم انداز</h3>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="KohViewFlag" onChange={this.roomHandleChangeCheckbox} checked={this.isItCheckedForRoom("KohViewFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; کوهستانی</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="JangalViewFlag" onChange={this.roomHandleChangeCheckbox} checked={this.isItCheckedForRoom("JangalViewFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; جنگل</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="SeaViewFlag" onChange={this.roomHandleChangeCheckbox} checked={this.isItCheckedForRoom("SeaViewFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; دریا</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="PayeViewFlag" onChange={this.roomHandleChangeCheckbox} checked={this.isItCheckedForRoom("PayeViewFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; کوهپایه</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="CityViewFlag" onChange={this.roomHandleChangeCheckbox} checked={this.isItCheckedForRoom("CityViewFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; شهری</label>
                        </div>
                    </div>
                    <div className={ `row ${styles['panel-main-content']}  margin-top-10px`}>
                        <span className="color-secondary error-message font-size-14">{this.state.errors.accommodationLocation}</span>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">موقعیت</h3>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="RostaFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("RostaFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; روستایی</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="SahelFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("SahelFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; ساحلی</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="ShahrakFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("ShahrakFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; شهرک</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="YeylaFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("YeylaFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; ییلاقی</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="ShahrFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("ShahrFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; شهری</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="JangalFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("JangalFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; جنگلی</label>
                        </div>
                        <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                            <input class="form-check-input" type="checkbox" name="KohFlag" onChange={this.handleChangeCheckbox} checked={this.isItChecked("KohFlag")} />
                            <label class="form-check-label font-bold-iransanse">&nbsp; کوهستانی</label>
                        </div>
                    </div>
                    <div className={ `row ${styles['panel-main-content']}  margin-top-10px`}>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">ظرفیت ویلا</h3>
                        <div className="col-lg-3 padding-3px">
                            <div className="row">
                                <div className="col-lg-2 col-2">
                                    <br />
                                    <FontAwesomeIcon className="topic-icon margin-top-5px" style={{ fontSize: 30 }} icon={faUniversity} />
                                </div>
                                <div className="col-lg-10 col-10 no-padding">
                                    <div className="row">
                                        <div className="col-lg-5 col-5 text-right">
                                            <p className="margin-top-10px margin-bottom-0px font-size-13 font-bold-iransanse">متراژ زمین</p>
                                        </div>
                                        <div className="col-lg-7 col-7 padding-3px">
                                            <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                                                <PrimaryTextInput name="Metraj" onChange={this.handleChangeInput} value={this.state.vilaMainObjcet.Metraj} />
                                                <span className="color-secondary error-message font-size-14">{this.state.errors.landMetraj}</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-5 text-right">
                                            <p className="margin-top-10px margin-bottom-0px font-size-13 font-bold-iransanse">متراژ بنا</p>
                                        </div>
                                        <div className="col-lg-7 col-7 padding-3px">
                                            <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                                                <PrimaryTextInput name="Metraj" onChange={this.roomHandleChangeInput} value={this.state.roomObject.Metraj} />
                                                <span className="color-secondary error-message font-size-14">{this.state.errors.accommodationMetraj}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 padding-3px">
                            <div className="row">
                                <div className="col-lg-2 col-2">
                                    <br />
                                    <FontAwesomeIcon className="topic-icon margin-top-5px" style={{ fontSize: 30 }} icon={faUniversity} />
                                </div>
                                <div className="col-lg-10 col-10 no-padding">
                                    <div className="row">
                                        <div className="col-lg-5 col-5 text-right">
                                            <p className="margin-top-10px margin-bottom-0px font-size-13 font-bold-iransanse">ظرفیت</p>
                                        </div>
                                        <div className="col-lg-7 col-7 padding-3px">
                                            <PrimarySelectInput name="Cap" onChange={this.roomHandleChangeInput} value={this.state.roomObject.Cap}>
                                                {
                                                    arrayOfThirty.map(number => (
                                                        <option value={number}>{number}</option>
                                                    ))
                                                }
                                            </PrimarySelectInput>
                                        </div>
                                        <div className="col-lg-5 col-5 text-right">
                                            <p className="margin-top-10px margin-bottom-0px font-size-13 font-bold-iransanse">حداکثر ظرفیت</p>
                                        </div>
                                        <div className="col-lg-7 col-7 padding-3px">
                                            <PrimarySelectInput name="CapMax" onChange={this.roomHandleChangeInput} value={this.state.roomObject.CapMax}>
                                                {
                                                    arrayOfThirty.map(number => (
                                                        <option value={number}>{number}</option>
                                                    ))
                                                }
                                            </PrimarySelectInput>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 padding-3px">
                            <div className="row">
                                <div className="col-lg-2 col-2">
                                    <br />
                                    <FontAwesomeIcon className="topic-icon margin-top-5px" style={{ fontSize: 30 }} icon={faUniversity} />
                                </div>
                                <div className="col-lg-10 col-10 no-padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-12">&nbsp;</div>
                                        <div className="col-lg-5 col-5 text-right">
                                            <p className="margin-top-10px margin-bottom-0px font-size-13 font-bold-iransanse">تعداد اتاق</p>
                                        </div>
                                        <div className="col-lg-7 col-7 padding-3px">
                                            <PrimarySelectInput name="RoomCount" onChange={this.roomHandleChangeInput} value={this.state.roomObject.RoomCount}>
                                                {
                                                    arrayOfTen.map(number => (
                                                        <option value={number}>{number}</option>
                                                    ))
                                                }
                                            </PrimarySelectInput>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 padding-3px">
                            <div className="row">
                                <div className="col-lg-2 col-2">
                                    <br />
                                    <FontAwesomeIcon className="topic-icon margin-top-5px" style={{ fontSize: 30 }} icon={faUniversity} />
                                </div>
                                <div className="col-lg-10 col-10 no-padding">
                                    <div className="row">
                                        <div className="col-lg-5 col-5 text-right">
                                            <p className="margin-top-10px margin-bottom-0px font-size-13 font-bold-iransanse">تخت 1 نفره</p>
                                        </div>
                                        <div className="col-lg-7 col-7 padding-3px">
                                            <PrimarySelectInput name="Takht1Count" onChange={this.roomHandleChangeInput} value={this.state.roomObject.Takht1Count}>
                                                {
                                                    arrayOfTen.map(number => (
                                                        <option value={number}>{number}</option>
                                                    ))
                                                }
                                            </PrimarySelectInput>
                                        </div>
                                        <div className="col-lg-5 col-5 text-right">
                                            <p className="margin-top-10px font-size-13 font-bold-iransanse">تخت 2 نفره</p>
                                        </div>
                                        <div className="col-lg-7 col-7 padding-3px">
                                            <PrimarySelectInput name="Takht2Count" onChange={this.roomHandleChangeInput} value={this.state.roomObject.Takht2Count}>
                                                {
                                                    arrayOfTen.map(number => (
                                                        <option value={number}>{number}</option>
                                                    ))
                                                }
                                            </PrimarySelectInput>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 padding-3px">
                            <div className="row">
                                <div className="col-lg-2 col-2">
                                    <FontAwesomeIcon className="topic-icon" style={{ fontSize: 30 }} icon={faUniversity} />
                                </div>
                                <div className="col-lg-10 col-10 no-padding">
                                    <div className="row">
                                        <div className="col-lg-5 col-5 text-right">
                                            <p className="margin-top-10px margin-bottom-0px font-size-13 font-bold-iransanse">تعداد تشک</p>
                                        </div>
                                        <div className="col-lg-7 col-7 padding-3px">
                                            <PrimarySelectInput name="ToshakCount" onChange={this.roomHandleChangeInput} value={this.state.roomObject.ToshakCount}>
                                                {
                                                    arrayOfTen.map(number => (
                                                        <option value={number}>{number}</option>
                                                    ))
                                                }
                                            </PrimarySelectInput>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ `row ${styles['panel-main-content']}  margin-top-10px`}>
                        <span className="color-secondary error-message font-size-14">{this.state.errors.facilities}</span>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse margin-bottom-5px">امکانات اقامتگاه </h3>
                        {
                            this.state.facilities.map(facility => (
                                <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                                    <input class="form-check-input" type="checkbox" name={facility.EmkanatId} onChange={this.onCheckFacility} checked={this.state.checkedFacilities.find(x => x == facility.EmkanatId)} />
                                    <label class="form-check-label">&nbsp; {facility.EmkanatName}</label>
                                </div>
                            ))
                        }
                    </div>

                    <div className={ `row ${styles['panel-main-content']}  margin-top-10px`}>
                        <span className="color-secondary error-message font-size-14">{this.state.errors.roomFacilities}</span>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse margin-bottom-5px">امکانات اتاق اقامتگاه </h3>
                        {
                            this.state.facilities.map(facility => (
                                <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                                    <input class="form-check-input" type="checkbox" name={facility.EmkanatId} onChange={this.onCheckRoomFacility} checked={this.state.checkedFacilitiesForRoom.find(x => x == facility.EmkanatId)} />
                                    <label class="form-check-label">&nbsp; {facility.EmkanatName}</label>
                                </div>
                            ))
                        }
                    </div>
                    <div className={ `row ${styles['panel-main-content']}  margin-top-10px`}>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">با انتخاب تصاویر مناسب نمایش خوبی از اقامتگاهتان داشته باشید</h3>
                        <div className="col-lg-2 col-12 margin-top-10px">
                            <div className="upload-box" style={{ height: 150 }} onClick={() => { this.upload.click() }}>
                                <p className="no-margin font-size-15 color-textpill">آپلود تصویر</p>
                            </div>
                        </div>
                    </div>
                    <div className={ `${styles['panel-main-content']}  margin-top-10px`}>
                        <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">با انتخاب تصاویر مناسب نمایش خوبی از اقامتگاهتان داشته باشید</h3>

                        {
                            this.state.rules.map(rule => (
                                <div className="row">
                                    <div className="col-lg-6 col-7 margin-top-10px">
                                        <div className="font-size-14 font-bold-iransanse">{rule.RulesName}</div>

                                    </div>
                                    <div className="col-lg-6 col-5 margin-top-10px">
                                        <div className="font-size-14 font-bold-iransanse">
                                            <Switch height={20} onChange={this.handleChange} id={rule.RulesId} checked={this.state.selectedRules.find(x => x == rule.RulesId)} />
                                        </div>
                                    </div>
                                </div>

                            ))
                        }

                    </div>
                    <br />
                    <div className="row">
                        <div className="col-lg-8"></div>
                        <div className="col-lg-2 padding-3px">
                            <PrimaryButton value="ثبت" onClick={() => {
                                if (!this.validation()) {
                                    alert("لطفا مقادیر فرم را کامل پر کنید")
                                    return
                                }

                                let requestObject = {
                                    ...this.state.vilaMainObjcet,
                                    EghamatType: this.state.vilaTypes[this.state.currentVilaType],
                                    BuildingType: this.state.buildinType[this.state.currentVilaType][this.state.currentBuildingType],
                                }

                                fetch(`${globals.baseUrl}bj/eghamat/save`, {
                                    headers: { "Content-Type": "application/json" },
                                    method: "POST",
                                    body: JSON.stringify(requestObject)
                                }).then(res => res.json()).then(data => {
                                    if (data.status == "OK") {
                                        const vilaId = parseInt(data.message)
                                        ///  step 1
                                        let param = this.state.checkedFacilities.map(facility => ({
                                            EghamatId: vilaId,
                                            EmkanatId: parseInt(facility),
                                            Stat: 1
                                        }))
                                        console.log(JSON.stringify(param))

                                        fetch(`${globals.baseUrl}bj/eghamatEmkanat/save`, {
                                            headers: { "Content-Type": "application/json" },
                                            method: "POST",
                                            body: JSON.stringify(param)
                                        }).then(res => res.json()).then(data2 => {

                                            console.log(data2)
                                        })



                                        ///  step 2
                                        param = this.state.selectedRules.map(x => ({
                                            EghamatId: vilaId,
                                            RulesId: parseInt(x),
                                            Stat: 1
                                        }))
                                        fetch(`${globals.baseUrl}bj/eghamatRules/save`, {
                                            headers: { "Content-Type": "application/json" },
                                            method: "POST",
                                            body: JSON.stringify(param)
                                        }).then(res => res.json()).then(data2 => {
                                            // console.log(data2)
                                        })

                                        ///  step 3
                                        requestObject = {
                                            EghamatId: vilaId,
                                            ...this.state.roomObject
                                        }
                                        fetch(`${globals.baseUrl}bj/eghamatRoom/save`, {
                                            headers: { 'Content-Type': 'application/json' },
                                            method: 'POST',
                                            body: JSON.stringify(requestObject)
                                        }).then(res => res.json()).then(data2 => {
                                            if (data2.status == "OK") {

                                                param = this.state.checkedFacilitiesForRoom.map(x => ({
                                                    RoomRow: parseInt(data2.message),
                                                    EmkanatId: parseInt(x),
                                                    EghamatId: vilaId,
                                                    Stat: 1
                                                }))
                                                fetch(`${globals.baseUrl}bj/eghamatRoomEmkanat/save`, {
                                                    headers: { "Content-Type": "application/json" },
                                                    method: "POST",
                                                    body: JSON.stringify(param)
                                                }).then(res => res.json()).then(data3 => {

                                                    // console.log(data2)
                                                })

                                                this.props.messageBoxModify({
                                                    state: true,
                                                    message: `عملیات موفقیت آمیز بود ${vilaId}`
                                                })
                                            }
                                        })

                                    } else {
                                        this.props.messageBoxModify({
                                            state: true,
                                            message: 'متاسفانه مشکلی پیش آمده است. لطفا مجدد اقدام کنید'
                                        })
                                    }

                                })
                            }} />
                        </div>
                        <div className="col-lg-2 padding-3px">
                            <a href="#" className="btn-outlined-cancle" style={{ width: '100%' }}>بازگشت</a>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
const mapDispatchesToProps = (dispatch) => ({
    messageBoxModify: async value => dispatch(messageBoxModify(value))
})
export default connect(null, mapDispatchesToProps)(UpdateVila)