import React from "react";
import Row from "./Row";
import Filter from "./Filter";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import globals from "./../../Global";
import style from "./Filter.module.scss";
import axios from "axios";

const SaveAllDialog = ({ open, close, save }) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <h3 className="text-danger">آیا از ذخیره کلی اطلاعات اطمینان دارید؟</h3>
        <div className="mt-2 d-flex">
          <div className="col-6 me-1">
            <button className="btn btn-primary-0 col-12" onClick={save}>
              ذخیره کردن
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-primary-1 col-12" onClick={close}>
              انصراف
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PriceHandling = () => {
  const router = useRouter();
  const [agency, setAgency] = React.useState(null);
  const [filter, setFilter] = React.useState(null);
  const [openSaveAll, setSaveAll] = React.useState(false);

  const getList = async () => {
    const agencies = await axios.get(
      `${globals.baseUrlNew}BilitAirLines/GetAzhansList`
    );
    const agenciesDeclare = await axios.get(
      `${globals.baseUrlNew}BilitAirLines/GetRavisKndSysDeclare/1a157116-a01a-4027-ab10-74098ac63815`
    );
    if (agencies.data.length != 0) {
      const items = agencies.data.map((element) =>
        agenciesDeclare.data.map((ele) => {
          const newItem = { ...element, ...ele };
          return newItem;
        })
      );
      setFilter(items[0]);
      setAgency(items[0]);
    }
  };

  React.useEffect(() => {
    getList();
  }, []);

  const handleCancel = async () => {
    router.reload();
  };

  const handleSave = async () => {
    const list = [...filter];
    list.map(async (option) => {
      const info = {
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        kndSys: option.kndsys,
        reserveStat: option.reserveStat,
        markupPercent: +option.markupPercent,
        markupPrice: +option.markupPrice,
        userIdSabt: "1a157116-a01a-4027-ab10-74098ac63815",
      };

      const feteched = await fetch(
        `${globals.baseUrlNew}BilitAirLines/SetRavisKndSysDeclare`,
        {
          method: "POST",
          body: JSON.stringify(info),
          headers: { "Content-Type": "application/json" },
        }
      );
      const response = await feteched.json();
      if (response.status == "0") {
        alert("ثبت با موفقیت انجام شد");
      } else {
        alert("در ثبت خطایی رخ داده است");
      }
    });
  };

  return (
    <section>
      <div>
        <div class="position-relative">
          <h6 className="mt-0 font-bold-iransanse">
            مدیـریت قـیمت گـذاری
          </h6>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
        <Filter
          list={agency}
          setFilter={(data) => setFilter(data)}
          cancel={handleCancel}
          filters={filter}
        />

        <div>
          <div>
            <div>
              <div className={style["header-title-page"]}>
                <div>
                  <h5>فعالسازی</h5>
                </div>
                <div>
                  <h5>کد</h5>
                </div>
                <div>
                  <h5>عنوان چارتر</h5>
                </div>
                <div>
                  <h5> درصد افزایش</h5>
                </div>
                <div>
                  <h5>مبلغ افزایش</h5>
                </div>
                <div>
                  <h5>ذخیره</h5>
                </div>
              </div>

              {filter != null ? (
                filter.map((option, index) => (
                  <Row
                    option={option}
                    index={index}
                    key={index}
                    filters={filter}
                  />
                ))
              ) : (
                <div className="text-center pt-2 pb-2">
                  <h5 className="text-dark">درحال پردازش...</h5>
                </div>
              )}
            </div>
          </div>
          <div className={style["save"]}>
            <button onClick={() => setSaveAll(true)}>ذخیره کلی</button>
          </div>
        </div>
        <SaveAllDialog
          open={openSaveAll}
          close={() => setSaveAll(false)}
          save={handleSave}
        />
      </div>
    </section>
  );
};

export default PriceHandling;
