import React from "react";
import PrimaryTextInput from "../../../sources/component/PrimaryTextInput.component";
import PrimarySelectInput from "../../../sources/component/PrimarySelectInput.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faTimes } from "@fortawesome/free-solid-svg-icons";
// import Switch from "react-switch";
import PrimaryButton from "../../../sources/component/PrimaryButton.component";
import globals from "../../Global";
import { connect } from "react-redux";
import { messageBoxModify } from "../../../Redux/UI/ui.action";
import styles from "../../../../styles/manager.module.scss";
import stylesTrack from "../../../../styles/TrackOrder.module.scss";
class AddVilaDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedRules: [],
      checkedFacilities: [],
      checkedFacilitiesForRoom: [],
      vilaTypes: [
        "ویلایی",
        "آپارتمانی",
        "کلبه جنگلی",
        "روستایی",
        "سنتی/بوم گردی",
        "مجموعه اقامتی",
      ],
      vilaaddress: [
        "مشهد",
        "تبریز",
        "مازندران",
        "اهواز",
        "اصفهان",
        "یزد",
        "کیش",
        "قشم",
        "اردبیل",
        "قم",
      ],

      buildinType: [
        ["همسطح", "دوبلکس", "تریبلکس"],
        ["یک واحد از چند واحد", "چند واحد از آپارتمان"],
        ["چوبی", "گلی", "همسطح"],
        ["خانه روستایی"],
        ["همسطح", "دوبلکس", "تریبلکس"],
        ["مجموعه اقامتی"],
      ],
      currentVilaType: 0,
      currentBuildingType: 0,
      facilities: [],
      province: [],
      facilitiesroom: [],
      rules: ["sdasd", "asdasd  "],
      provinceIndexSelected: 0,
      vilaMainObjcet: {
        LocX: 12535.5488,
        LocY: 15484.8448,
      },
      roomObject: {
        Cap: 1,
        CapMax: 1,
        ToshakCount: 0,
        RoomCount: 0,
        Takht1Count: 0,
        Takht2Count: 0,
      },
      notTheOwner: false,
    };
  }

  componentDidMount() {
    // get base facilities
    fetch(`${globals.baseUrl}bj/emkanat/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "OK") {
          this.setState({
            facilities: data.Emkanat,
          });
        } else {
        }
      });
    fetch(`${globals.baseUrl}bj/eghamatRoom/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "OK") {
          this.setState({
            facilitiesroom: data.Emkanat,
          });
        } else {
        }
      });
    // provinces and their cities
    fetch(`${globals.baseUrl}bj/province/cities`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "OK") {
          this.setState({
            province: data.Province,
          });
        }
      });
    // get base rules
    fetch(`${globals.baseUrl}bj/rules/view`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          rules: data.Rules,
        });
      });
  }

  //for rules switches
  handleChange = (checked, e, id) => {
    if (checked) {
      this.setState({
        selectedRules: [...this.state.selectedRules, id],
      });
    } else {
      this.setState({
        selectedRules: this.state.selectedRules.filter((x) => x != id),
      });
    }
  };
  // check and uncheck the options in vila main object
  handleChangeCheckbox = (e) => {
    this.setState({
      vilaMainObjcet: {
        ...this.state.vilaMainObjcet,
        [e.target.name]: e.target.checked ? 1 : 0,
      },
    });
  };

  // fill the related data of inputs
  handleChangeInput = (e) => {
    this.setState({
      vilaMainObjcet: {
        ...this.state.vilaMainObjcet,
        [e.target.name]: e.target.value,
      },
    });
  };
  // open and choose file
  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        file: URL.createObjectURL(img),
      });
    }
  }
  // store the id of facilities that have been checked  for => whole villa
  onCheckFacility = (e) => {
    if (e.target.checked) {
      this.setState({
        checkedFacilities: [...this.state.checkedFacilities, e.target.name],
      });
    } else {
      this.setState({
        checkedFacilities: this.state.checkedFacilities.filter(
          (x) => x != e.target.name
        ),
      });
    }
  };
  // store the id of facilities that have been checked  for => room
  onCheckRoomFacility = (e) => {
    if (e.target.checked) {
      this.setState({
        checkedFacilitiesForRoom: [
          ...this.state.checkedFacilitiesForRoom,
          e.target.name,
        ],
      });
    } else {
      this.setState({
        checkedFacilitiesForRoom: this.state.checkedFacilitiesForRoom.filter(
          (x) => x != e.target.name
        ),
      });
    }
  };
  // check and uncheck the options in room object
  roomHandleChangeCheckbox = (e) => {
    this.setState({
      roomObject: {
        ...this.state.roomObject,
        [e.target.name]: e.target.checked ? 1 : 0,
      },
    });
  };
  // fill the related data of inputs in room object
  roomHandleChangeInput = (e) => {
    this.setState({
      roomObject: {
        ...this.state.roomObject,
        [e.target.name]: e.target.value,
      },
    });
  };
  // validate the inputs
  validation = () => {
    let validate = true;
    let nameError,
      AdminName,
      TelNo,
      Dsc,
      Province,
      City,
      AddressName,
      Address,
      typevilla,
      villaView,
      villaLocation,
      landMetraj,
      villaMetraj,
      facilities;

    if (
      this.state.vilaMainObjcet.Name == "" ||
      this.state.vilaMainObjcet.Name == undefined
    ) {
      nameError = "نام اقامتگاه را وارد کنید";
      validate = false;
    }

    if (
      this.state.vilaMainObjcet.AdminName == "" ||
      this.state.vilaMainObjcet.AdminName == undefined
    ) {
      AdminName = "نام صاحب اقامتگاه را وارد کنید";
      validate = false;
    }

    // if (this.state.vilaMainObjcet.TelNo == "" || this.state.vilaMainObjcet.TelNo == undefined) {
    //     TelNo = "a صاحب اقامتگاه را وارد کنید"
    // }

    // if (this.state.vilaMainObjcet.Dsc == "" || this.state.vilaMainObjcet.Dsc == undefined) {
    //     Dsc = "توضیحات مربوط به اقامتگاه را وارد کنید"
    //     validate = false
    // }

    if (
      this.state.vilaMainObjcet.ProvinceId == "-1" ||
      this.state.vilaMainObjcet.ProvinceId == undefined
    ) {
      Province = "لطفا استان را انتخاب کنید";
      validate = false;
    }

    if (
      this.state.vilaMainObjcet.CityId == "-1" ||
      this.state.vilaMainObjcet.CityId == undefined
    ) {
      City = "لطفا شهر را انتخاب کنید";
      validate = false;
    }

    // if (this.state.vilaMainObjcet.AddressName == "" || this.state.vilaMainObjcet.AddressName == undefined) {
    //     AddressName = "لطفا محدوده ویلا را وارد کنید"
    // }

    if (
      this.state.vilaMainObjcet.Address == "" ||
      this.state.vilaMainObjcet.Address == undefined
    ) {
      Address = "لطفا آدرس ویلا را وارد کنید";
      validate = false;
    }

    if (
      (this.state.vilaMainObjcet.EcoFlag == false ||
        this.state.vilaMainObjcet.EcoFlag == undefined) &&
      (this.state.vilaMainObjcet.LuxFlag == false ||
        this.state.vilaMainObjcet.LuxFlag == undefined) &&
      (this.state.vilaMainObjcet.NormalFlag == false ||
        this.state.vilaMainObjcet.NormalFlag == undefined) &&
      (this.state.vilaMainObjcet.SupLuxFlag == false ||
        this.state.vilaMainObjcet.SupLuxFlag == undefined) &&
      (this.state.vilaMainObjcet.TakhfifFlag == false ||
        this.state.vilaMainObjcet.TakhfifFlag == undefined)
    ) {
      typevilla = "لطفا نوع اقامتگاه را انتخاب کنید";
      validate = false;
    }

    if (
      (this.state.roomObject.KohViewFlag == false ||
        this.state.roomObject.KohViewFlag == undefined) &&
      (this.state.roomObject.JangalViewFlag == false ||
        this.state.roomObject.JangalViewFlag == undefined) &&
      (this.state.roomObject.SeaViewFlag == false ||
        this.state.roomObject.SeaViewFlag == undefined) &&
      (this.state.roomObject.PayeViewFlag == false ||
        this.state.roomObject.PayeViewFlag == undefined) &&
      (this.state.roomObject.CityViewFlag == false ||
        this.state.roomObject.CityViewFlag == undefined)
    ) {
      villaView = "لطفا چشم انداز اقامتگاه را انتخاب کنید";
      validate = false;
    }

    if (
      (this.state.vilaMainObjcet.RostaFlag == false ||
        this.state.vilaMainObjcet.RostaFlag == undefined) &&
      (this.state.vilaMainObjcet.SahelFlag == false ||
        this.state.vilaMainObjcet.SahelFlag == undefined) &&
      (this.state.vilaMainObjcet.ShahrakFlag == false ||
        this.state.vilaMainObjcet.ShahrakFlag == undefined) &&
      (this.state.vilaMainObjcet.YeylaFlag == false ||
        this.state.vilaMainObjcet.YeylaFlag == undefined) &&
      (this.state.vilaMainObjcet.JangalFlag == false ||
        this.state.vilaMainObjcet.JangalFlag == undefined) &&
      (this.state.vilaMainObjcet.KohFlag == false ||
        this.state.vilaMainObjcet.KohFlag == undefined)
    ) {
      villaLocation = "لطفا موقعیت اقامتگاه را انتخاب کنید";
      validate = false;
    }

    if (
      this.state.vilaMainObjcet.Metraj == "" ||
      this.state.vilaMainObjcet.Metraj == undefined
    ) {
      landMetraj = "لطفا متراژ زمین را وارد کنید";
      validate = false;
    }

    if (
      this.state.roomObject.Metraj == "" ||
      this.state.roomObject.Metraj == undefined
    ) {
      villaMetraj = "لطفا متراژ اقامتگاه را وارد کنید";
      validate = false;
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
        typevilla: typevilla,
        villaView: villaView,
        villaLocation: villaLocation,
        villaMetraj: villaMetraj,
        landMetraj: landMetraj,
        facilities: facilities,
      },
    });
    return validate;
  };

  render() {
    const arrayOfTen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arrayOfThirty = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];
    return (
      <section>
        <div>
          {/* box 1 */}
          <div>
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                اقـــامتــگاهتان را معـــرفی کنید
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            {/* Parent */}
            <div className="d-flex align-items-start px-3">
              {/* child */}
              <div className="col-lg-9 padding-3px margin-top-10px">
                <div className="row">
                  <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-16">
                      کد ویلای شما
                    </span>
                    <div className="mt-2">
                      <PrimaryTextInput placeholder="کد ویلا" value="0" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-16 pb-2">
                      نام صاحب ویلا
                    </span>
                    <div className="mt-2">
                      <PrimaryTextInput
                        placeholder="نام صاحب ویلا"
                        name="AdminName"
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <span className="color-secondary error-message font-size-14">
                      {" "}
                      {this.state.errors.AdminName}
                    </span>
                  </div>
                  <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-16">
                      نام اقامتگاه
                    </span>
                    <div className="mt-2">
                      <PrimaryTextInput
                        placeholder="نام اقامتگاه"
                        name="Name"
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <span className="color-secondary error-message font-size-14">
                      {" "}
                      {this.state.errors.nameError}
                    </span>
                  </div>

                  <div className="col-lg-3 col-12 padding-3px">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        this.setState({
                          notTheOwner: e.target.checked,
                        });
                      }}
                    />
                    <span
                      style={{ marginRight: 5 }}
                      className="font-bold-iransanse font-size-16"
                    >
                      مالک اقامتگاه نیستم
                    </span>
                    <div
                      className={`${styles["form-input-border-private"]} `}
                    >
                      <PrimaryTextInput
                        style={{ fontSize: 14 }}
                        disabled={!this.state.notTheOwner}
                        placeholder="تلفن تماس مالک اقامتگاه"
                        name="TelNo"
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <span className="color-secondary error-message font-size-14">
                      {" "}
                      {this.state.errors.TelNo}
                    </span>
                  </div>
                </div>
                <div className="row margin-top-10px">
                  <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-16">
                      نوع اقامتگاه
                    </span>
                    <PrimarySelectInput
                      style={{ fontSize: 14 }}
                      value={this.state.currentVilaType}
                      onChange={(e) => {
                        this.setState({
                          currentBuildingType: 0,
                          currentVilaType: e.target.value,
                        });
                      }}
                    >
                      {this.state.vilaTypes.map((type, index) => (
                        <option className="font-yekan" style={{ fontSize: 14 }} value={index}>
                          {type}
                        </option>
                      ))}
                    </PrimarySelectInput>
                  </div>
                  <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-16">
                      نوع ساختمان
                    </span>
                    <PrimarySelectInput
                      style={{ fontSize: 14 }}
                      value={this.state.currentBuildingType}
                      onChange={(e) => {
                        this.setState({
                          currentBuildingType: e.target.value,
                        });
                      }}
                    >
                      {this.state.buildinType[this.state.currentVilaType].map(
                        (type, index) => (
                          <option className="font-yekan" style={{ fontSize: 14 }} value={index}>
                            {type}
                          </option>
                        )
                      )}
                    </PrimarySelectInput>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12 padding-3px">
                    <span
                      style={{ marginRight: 10 }}
                      className="font-bold-iransanse font-size-16"
                    >
                      توضیحات
                    </span>
                    <div
                      className={` form-input-border h-auto ${styles["form-input-border-private"]} `}
                    >
                      <textarea
                        rows="10"
                        className="form-input primary-text"
                        name="Dsc"
                        onChange={this.handleChangeInput}
                      ></textarea>
                    </div>
                    <span className="color-secondary error-message font-size-14">
                      {" "}
                      {this.state.errors.Dsc}
                    </span>
                  </div>
                </div>
              </div>
              {/* child */}
              <div className="col-lg-3 col-12 margin-top-10px me-4">
                <div class="position-relative mb-3">
                  <h6 className="mt-0 font-bold-iransanse">
                    تصـــویر نمــای اقـامتگاه
                  </h6>
                  <div class="d-flex align-items-center">
                    <div class="box-through"></div>
                    <div class="aside-through"></div>
                  </div>
                </div>
                <input
                  id="myInput"
                  type="file"
                  ref={(ref) => (this.upload = ref)}
                  className="d-none"
                  onChange={this.onChangeFile.bind(this)}
                />
                {this.state.file ? (
                  <div className={`h-100 ${styles["uploaded-image-box"]}`}>
                    <img
                      width=""
                      height=""
                      alt="بلیطجا - تصویر اقامتگاه"
                      src={this.state.file}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => {
                        this.setState({
                          file: null,
                        });
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`${styles["upload-box"]} h-100 py-5`}
                    onClick={() => {
                      this.upload.click();
                    }}
                  >
                    <p className="no-margin font-size-15 color-textpill">
                      تصویر نمای خود را بارگذاری کنید
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* box 2 */}
          <div
            className={`${styles["panel-main-content"]}  margin-top-10px`}
          >
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                آدرس ویــلا
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            <div className="d-flex align-items-start flex-wrap px-3 pt-2">
              <div className="col-lg-3 col-12 padding-3px">
                <PrimarySelectInput
                  style={{ fontSize: 14, fontFamily: "BYekan" }}
                  name="ProvinceId"
                  onChange={this.handleChangeInput}
                >
                  <option value="-1" selected></option>
                  {this.state.vilaaddress.map((type, index) => (
                    <option value={index}>{type}</option>
                  ))}
                </PrimarySelectInput>
                <span className="color-secondary error-message font-size-14">
                  {" "}
                  {this.state.errors.Province}
                </span>
              </div>
              <div className="col-lg-3 col-12 padding-3px">
                <PrimarySelectInput
                  name="CityId"
                  onChange={this.handleChangeInput}
                  style={{ fontSize: 14, fontFamily: "BYekan" }}
                >
                  <option
                    style={{ fontSize: 14, fontFamily: "BYekan" }}
                    value="-1"
                    selected
                  ></option>
                  {this.state.vilaaddress
                    ? this.state.vilaaddress.map((city, index) => (
                      <option value={index}>{city}</option>
                    ))
                    : null}
                </PrimarySelectInput>
                <span className="color-secondary error-message font-size-14">
                  {" "}
                  {this.state.errors.City}
                </span>
              </div>
              <div className="col-lg-3 col-12 padding-3px">
                <div
                  className={` form-input-border  ${styles["form-input-border-private"]} `}
                >
                  <PrimaryTextInput
                    style={{ fontSize: 14, fontFamily: "BYekan" }}
                    placeholder="نام محدوده اقامتگاه"
                    name="AddressName"
                    onChange={this.handleChangeInput}
                  />
                </div>
                <span className="color-secondary error-message font-size-14">
                  {" "}
                  {this.state.errors.AddressName}
                </span>
              </div>
              <div className="col-12 padding-3px margin-top-10px">
                <div
                  className={` form-input-border h-auto ${styles["form-input-border-private"]} `}
                >
                  <textarea
                    style={{ fontSize: 14, fontFamily: "BYekan" }}
                    rows="5"
                    placeholder="آدرس کامل اقامتگاه ( آمل-خیابان 1- کوچه 2 -پلاک 110)"
                    className="form-input primary-text"
                    name="Address"
                    onChange={this.handleChangeInput}
                  ></textarea>
                </div>
                <span className="color-secondary error-message font-size-14">
                  {" "}
                  {this.state.errors.Address}
                </span>
              </div>
            </div>
          </div>
          {/* box 3 */}
          <div
            className={`${styles["panel-main-content"]} margin-top-10px`}
          >
            <span className="color-secondary error-message font-size-14">
              {" "}
              {this.state.errors.typevilla}
            </span>
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                نوع اقــامتگـــاه
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            <div className="d-flex align-items-start flex-wrap px-3 pt-2">
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="EcoFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; اقتصادی
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="LuxFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; لوکس
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="NormalFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; معمولی
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="SupLuxFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 16 }} class="form-check-label ">
                    &nbsp; سوپر لوکس
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="TakhfifFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 16 }} class="form-check-label ">
                    &nbsp; تخفیف دار
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* box 4 */}
          <div
            className={`${styles["panel-main-content"]} margin-top-10px`}
          >
            <span className="color-secondary error-message font-size-14">
              {" "}
              {this.state.errors.villaView}
            </span>
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                چشـــم انـــداز
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            <div className="d-flex align-itmes-start flex-wrap px-3 pt-2">
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="KohViewFlag"
                    onChange={this.roomHandleChangeCheckbox}
                  />
                  <label class="form-check-label" style={{ fontSize: 18 }}>
                    &nbsp; کوهستانی
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="JangalViewFlag"
                    onChange={this.roomHandleChangeCheckbox}
                  />
                  <label class="form-check-label " style={{ fontSize: 18 }}>
                    &nbsp; جنگل
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="SeaViewFlag"
                    onChange={this.roomHandleChangeCheckbox}
                  />
                  <label class="form-check-label " style={{ fontSize: 18 }}>
                    &nbsp; دریا
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                {" "}
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="PayeViewFlag"
                    onChange={this.roomHandleChangeCheckbox}
                  />
                  <label class="form-check-label " style={{ fontSize: 18 }}>
                    &nbsp; کوهپایه
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="CityViewFlag"
                    onChange={this.roomHandleChangeCheckbox}
                  />
                  <label class="form-check-label " style={{ fontSize: 17 }}>
                    &nbsp; شهری
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* box 5 */}
          <div
            className={`${styles["panel-main-content"]} margin-top-10px`}
          >
            <span className="color-secondary error-message font-size-14">
              {this.state.errors.villaLocation}
            </span>
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                موقعــیت
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            <div className="d-flex align-items-start flex-wrap px-3 pt-2">
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="RostaFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; روستایی
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="SahelFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; ساحلی
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="ShahrakFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; شهرک
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="YeylaFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; ییلاقی
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="ShahrFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; شهری
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}></div>
              </div>
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="KohFlag"
                    onChange={this.handleChangeCheckbox}
                  />
                  <label style={{ fontSize: 18 }} class="form-check-label ">
                    &nbsp; کوهستانی
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* box 6 */}
          <div
            className={`${styles["panel-main-content"]}  margin-top-10px`}
          >
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                ظرفـــیت ویــلا
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            <div className="d-flex align-items-start px-3 pt-2">
              <div className={`col-lg-3 padding-3px mt-0 ${styles["cap-city"]}`}>
                <div>
                  <div className="col-lg-2 col-2">
                    <br />
                  </div>
                  <div className="col-lg-10 col-10 no-padding">
                    <div className="row">
                      <div className="col-lg-5 col-5 text-right">
                        <p
                          className="margin-top-10px margin-bottom-0px font-size-13 "
                          style={{ fontSize: 18 }}
                        >
                          متراژ زمین
                        </p>
                      </div>
                      <div className="col-lg-7 col-7 padding-3px">
                        <div
                          className={`${styles["form-input-border-private"]} `}
                        >
                          <PrimaryTextInput
                            name="Metraj"
                            onChange={this.handleChangeInput}
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-5 text-right">
                        <p
                          className="margin-top-10px margin-bottom-0px font-size-13"
                          style={{ fontSize: 18 }}
                        >
                          متراژ بنا
                        </p>
                      </div>
                      <div className="col-lg-7 col-7 padding-3px">
                        <div
                          className={`${styles["form-input-border-private"]} `}
                        >
                          <PrimaryTextInput
                            name="Metraj"
                            onChange={this.roomHandleChangeInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-lg-3 padding-3px mt-0 ${styles["cap-city"]}`}>
                <div style={{ marginTop: -6 }}>
                  <div className="col-lg-2 col-2">
                    <br />
                  </div>
                  <div className="col-lg-10 col-10 no-padding">
                    <div className="row">
                      <div className="col-lg-5 col-5 text-right">
                        <p
                          className="margin-top-10px margin-bottom-0px font-size-13 "
                          style={{ fontSize: 18 }}
                        >
                          ظرفیت
                        </p>
                      </div>
                      <div className="col-lg-7 col-7 padding-3px">
                        <PrimarySelectInput
                          style={{ maxHeight: 32 }}
                          name="Cap"
                          onChange={this.roomHandleChangeInput}
                        >
                          {arrayOfThirty.map((number) => (
                            <option value={number}>{number}</option>
                          ))}
                        </PrimarySelectInput>
                      </div>
                      <div className="col-lg-5 col-5 text-right">
                        <p
                          className="margin-top-9px margin-bottom-0px font-size-13 "
                          style={{ fontSize: 18 }}
                        >
                          حداکثر ظرفیت
                        </p>
                      </div>
                      <div className="col-lg-7 col-7 padding-3px">
                        <PrimarySelectInput
                          style={{ maxHeight: 32, marginTop: -10 }}
                          name="CapMax"
                          onChange={this.roomHandleChangeInput}
                        >
                          {arrayOfThirty.map((number) => (
                            <option value={number}>{number}</option>
                          ))}
                        </PrimarySelectInput>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-lg-3 padding-3px mt-0 ${styles["cap-city"]}`}>
                <div style={{ marginTop: -6 }}>
                  <div className="col-lg-10 col-10 no-padding">
                    <div className="row">
                      <div className="col-lg-12 col-12">&nbsp;</div>
                      <div className="col-lg-5 col-5 text-right">
                        <p
                          className="margin-top-10px margin-bottom-0px font-size-13 "
                          style={{ fontSize: 18 }}
                        >
                          تعداد اتاق
                        </p>
                      </div>
                      <div className="col-lg-7 col-7 padding-3px">
                        <PrimarySelectInput
                          style={{ maxHeight: 32, marginTop: -10 }}
                          name="RoomCount"
                          onChange={this.roomHandleChangeInput}
                        >
                          {arrayOfTen.map((number) => (
                            <option value={number}>{number}</option>
                          ))}
                        </PrimarySelectInput>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-5 col-5 text-right">
                        <p
                          className="margin-top-10px margin-bottom-0px font-size-13 "
                          style={{ fontSize: 18 }}
                        >
                          تعداد تشک
                        </p>
                      </div>
                      <div className="col-lg-7 col-7 padding-3px">
                        <PrimarySelectInput
                          name="ToshakCount"
                          onChange={this.roomHandleChangeInput}
                        >
                          {arrayOfTen.map((number) => (
                            <option value={number}>{number}</option>
                          ))}
                        </PrimarySelectInput>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-lg-3 padding-3px mt-0 ${styles["cap-city"]}`}>
                <div style={{ marginTop: 6 }}>
                  <div className="col-lg-2 col-2">
                    <br />
                  </div>
                  <div className="col-lg-10 col-10 no-padding">
                    <div className="row">
                      <div className="col-lg-5 col-5 text-right">
                        <p
                          className="margin-top-8px margin-bottom-0px font-size-13 "
                          style={{ fontSize: 18 }}
                        >
                          تخت 1 نفره
                        </p>
                      </div>
                      <div
                        style={{ marginTop: 0 }}
                        className="col-lg-7 col-7 padding-3px"
                      >
                        <PrimarySelectInput
                          style={{ maxHeight: 32, marginTop: -10 }}
                          name="Takht1Count"
                          onChange={this.roomHandleChangeInput}
                        >
                          {arrayOfTen.map((number) => (
                            <option value={number}>{number}</option>
                          ))}
                        </PrimarySelectInput>
                      </div>
                      <div className="col-lg-5 col-5 text-right">
                        <p
                          className="margin-top-10px font-size-13 "
                          style={{ fontSize: 18 }}
                        >
                          تخت 2 نفره
                        </p>
                      </div>
                      <div
                        style={{ marginTop: -4 }}
                        className="col-lg-7 col-7 padding-3px"
                      >
                        <PrimarySelectInput
                          style={{ maxHeight: 32, marginTop: -10 }}
                          name="Takht2Count"
                          onChange={this.roomHandleChangeInput}
                        >
                          {arrayOfTen.map((number) => (
                            <option value={number}>{number}</option>
                          ))}
                        </PrimarySelectInput>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* box 7 */}
          <div
            className={`${styles["panel-main-content"]}  margin-top-10px`}
          >
            <span className="color-secondary error-message font-size-14">
              {this.state.errors.facilities}
            </span>
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                امکــانات اقامـــتگاه
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            {this.state.facilities.map((facility) => (
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  {" "}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name={facility.EmkanatId}
                    onChange={this.onCheckFacility}
                  />
                  <label class="form-check-label">
                    &nbsp; {facility.EmkanatName}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* box 8 */}
          <div
            className={`${styles["panel-main-content"]}  margin-top-10px`}
          >
            <span className="color-secondary error-message font-size-14">
              {this.state.errors.roomFacilities}
            </span>
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                امکانات اتاق اقامــتگاه
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            {this.state.facilities?.map((facility) => (
              <div className="col-lg-2 col-4 no-padding form-check form-check-inline no-margin">
                <div className={styles["form"]}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name={facility.EmkanatId}
                    onChange={this.onCheckRoomFacility}
                  />
                  <label class="form-check-label">
                    &nbsp; {facility.EmkanatName}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* box 9 */}
          <div
            className={`${styles["panel-main-content"]}  margin-top-10px h-auto`}
          >
            <div class="position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                با انتخاب تصاویر مناسب نمایش خوبی از اقامتگاهتان داشته باشید
              </h6>
              <div class="d-flex align-items-center">
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            <div className="col-lg-2 col-12 mt-3">
              <input
                id="myInput"
                type="file"
                ref={(ref) => (this.upload = ref)}
                className="d-none"
                onChange={this.onChangeFile.bind(this)}
              />
              {this.state.file ? (
                <div className={`h-100 background-white rounded-3 ${styles["uploaded-image-box"]}`}>
                  <img
                    width=""
                    height=""
                    alt="بلیطجا - تصویر اقامتگاه"
                    src={this.state.file}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => {
                      this.setState({
                        file: null,
                      });
                    }}
                  />
                </div>
              ) : (
                <div
                  className={`${styles["upload-box"]} h-100 py-5`}
                  onClick={() => {
                    this.upload.click();
                  }}
                >
                  <p className="no-margin font-size-15 color-textpill">
                    تصویر نمای خود را بارگذاری کنید
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* box 10 (undefined data) */}
          <div className={` ${styles["panel-main-content"]}  margin-top-10px`}>
            <h3
              className={` ${stylesTrack["border-bottom-black-track"]} font-size-16 font-bold-iransanse `}
            >
              با انتخاب تصاویر مناسب نمایش خوبی از اقامتگاهتان داشته باشید
            </h3>

            {this.state.rules.map((rule) => (
              <div className="row">
                <div className="d-flex align-items-start flex-wrap">
                  <div className="col-lg-6 col-7 margin-top-10px">
                    <div className="font-size-14 font-bold-iransanse">
                      {rule.RulesName}
                    </div>
                  </div>
                  <div className="col-lg-6 col-5 margin-top-10px">
                    <div className="font-size-14 font-bold-iransanse">
                      {/* <Switch
                        height={20}
                        onChange={this.handleChange}
                        id={rule.RulesId}
                        checked={this.state.selectedRules.find(
                          (x) => x == rule.RulesId
                        )}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* button register and back */}
          <div className="row">
            <div className="d-flex align-items-stretch justify-content-end">
              <div className="col-lg-2 padding-3px font-bold-iransanse">
                <PrimaryButton
                  value="ثبت"
                  onClick={() => {
                    if (!this.validation()) {
                      alert("لطفا مقادیر فرم را کامل پر کنید");
                      return;
                    }

                    let requestObject = {
                      ...this.state.vilaMainObjcet,
                      EghamatType:
                        this.state.vilaTypes[this.state.currentVilaType],
                      BuildingType:
                        this.state.buildinType[this.state.currentVilaType][
                        this.state.currentBuildingType
                        ],
                    };

                    fetch(`${globals.baseUrl}bj/eghamat/save`, {
                      headers: { "Content-Type": "application/json" },
                      method: "POST",
                      body: JSON.stringify(requestObject),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.status == "OK") {
                          const vilaId = parseInt(data.message);
                          ///  step 1
                          let param = this.state.checkedFacilities.map(
                            (facility) => ({
                              EghamatId: vilaId,
                              EmkanatId: parseInt(facility),
                              Stat: 1,
                            })
                          );
                   

                          fetch(`${globals.baseUrl}bj/eghamatEmkanat/save`, {
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            body: JSON.stringify(param),
                          })
                            .then((res) => res.json())
                            .then((data2) => {
                       
                            });

                          ///  step 2
                          param = this.state.selectedRules.map((x) => ({
                            EghamatId: vilaId,
                            RulesId: parseInt(x),
                            Stat: 1,
                          }));
                          fetch(`${globals.baseUrl}bj/eghamatRules/save`, {
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            body: JSON.stringify(param),
                          })
                            .then((res) => res.json())
                            .then((data2) => {
                              // console.log(data2)
                            });

                          ///  step 3
                          requestObject = {
                            EghamatId: vilaId,
                            ...this.state.roomObject,
                          };
                          fetch(`${globals.baseUrl}bj/eghamatRoom/save`, {
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            body: JSON.stringify(requestObject),
                          })
                            .then((res) => res.json())
                            .then((data2) => {
                              if (data2.status == "OK") {
                                param = this.state.checkedFacilitiesForRoom.map(
                                  (x) => ({
                                    RoomRow: parseInt(data2.message),
                                    EmkanatId: parseInt(x),
                                    EghamatId: vilaId,
                                    Stat: 1,
                                  })
                                );
                                fetch(
                                  `${globals.baseUrl}bj/eghamatRoomEmkanat/save`,
                                  {
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    method: "POST",
                                    body: JSON.stringify(param),
                                  }
                                )
                                  .then((res) => res.json())
                                  .then((data3) => {
                                    // console.log(data2)
                                  });

                                this.props.messageBoxModify({
                                  color:true,
                                  state: true,
                                  message: `عملیات موفقیت آمیز بود ${vilaId}`,
                                });
                              }
                            });
                        } else {
                          this.props.messageBoxModify({
                            state: true,
                            color:false,
                            message:
                              "متاسفانه مشکلی پیش آمده است. لطفا مجدد اقدام کنید",
                          });
                        }
                      });
                  }}
                >{"ثبت"}</PrimaryButton>
              </div>
              <div className="col-lg-2 padding-3px">
                <a
                  href="/panel/villas/search"
                  className="btn-outlined-cancle w-100 font-bold-iransanse"
                >
                  بازگشت
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
});
export default connect(null, mapDispatchesToProps)(AddVilaDesktop);
