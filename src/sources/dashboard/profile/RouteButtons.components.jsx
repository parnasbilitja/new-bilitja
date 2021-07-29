import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const RouteButtons = () => {
  const router = useRouter();
  const path = router.asPath;
  return (
    <section>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
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

export default RouteButtons;
