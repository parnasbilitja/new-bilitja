import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const RouteButtons = () => {
  const router = useRouter();
  const path = router.asPath;
  return (
    <section>
      <ul
        className="nav nav-pills justify-content-end"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <Link href="/panelnew/profile">
            <button
              className={
                path === "/panelnew/profile"
                  ? "menu-btn nav-link mx-2 active-menu"
                  : "menu-btn nav-link mx-2"
              }
            >
              پروفایل
            </button>
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link href="/panelnew/profile/complate-profile">
            <button
              className={
                path === "/panelnew/profile/complate-profile"
                  ? "menu-btn nav-link mx-2 active-menu"
                  : "menu-btn nav-link mx-2"
              }
            >
              تکمیل اطلاعات
            </button>
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link href="/panelnew/profile/edit-profile">
            <button
              className={
                path === "/panelnew/profile/edit-profile"
                  ? "menu-btn nav-link mx-2 active-menu"
                  : "menu-btn nav-link mx-2"
              }
            >
              ویرایش اطلاعات
            </button>
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link href="/panelnew/profile/change-password">
            <button
              className={
                path === "/panelnew/profile/change-password"
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
