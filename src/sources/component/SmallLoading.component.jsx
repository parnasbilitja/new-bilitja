import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../../../styles/Loading.module.scss";
//just view, without any functionality
const Loading = () => {
  return (
    <div>
      <div className="loading-row mx-1">
        <SkeletonTheme color="#e2e2e2" highlightColor="#f2f2f2">
          <Skeleton
            className="pull-right"
            circle={true}
            height={75}
            width={75}
          />
          {/* <p>
            <Skeleton count={1} height={10} />
            <Skeleton count={1} height={10} />
            <Skeleton count={1} height={10} />
          </p> */}
        </SkeletonTheme>
      </div>
    </div>
  );
};
export default Loading;
