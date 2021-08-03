import { useRouter, withRouter } from "next/dist/client/router";
import Link from "next/link";
import { connect } from "react-redux";

const RouteButtons = (props) => {
  const router = useRouter();
  const path = router.asPath;
  return (
    <section>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {props.user_information.name === null ? (
          <li className="nav-item" role="presentation">
            <Link href="/dashboard/complate-profile">
              <button
                className={
                  path === "/dashboard/complate-profile"
                    ? "menu-btn nav-link mx-2 active-menu"
                    : "menu-btn nav-link mx-2"
                }
              >
                تکمیل اطلاعات
              </button>
            </Link>
          </li>
        ) : null}
        {props.user_information.name !== null ? (
          <li className="nav-item" role="presentation">
            <Link href="/dashboard/edit-profile">
              <button
                className={
                  path === "/dashboard/edit-profile"
                    ? "menu-btn nav-link mx-2 active-menu"
                    : "menu-btn nav-link mx-2"
                }
              >
                ویرایش اطلاعات
              </button>
            </Link>
          </li>
        ) : null}

        <li className="nav-item" role="presentation">
          <Link href="/dashboard/change-password">
            <button
              className={
                path === "/dashboard/change-password"
                  ? "menu-btn nav-link mx-2 active-menu"
                  : "menu-btn nav-link mx-2"
              }
            >
              تغییر گذرواژه
            </button>
          </Link>
        </li>
      </ul>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user_information: state.user_information,
});

export default withRouter(connect(mapStateToProps, null)(RouteButtons));
