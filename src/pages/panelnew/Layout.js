import ManagerNav from "./compo/ManagerNav.component";

export default function Layout({ children }) {
  return (
    <>
      <div className="panel-manager-main-container">
        <div className="panel-manager-content-container">{children}</div>
      </div>
    </>
  );
}
