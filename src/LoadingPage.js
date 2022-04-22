import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { userActions } from "./store/user-slice";

let timer;
const MAX_PERCENT = 60;

const LoadingPage = () => {
  const dispatch = useDispatch();
  const { isLoading, progress } = useSelector((state) => state.users);

  const increment = (c) => {
    if (c > 0) {
      dispatch(userActions.updateProgress(0.5));
      timer = setTimeout(() => {
        increment(c);
      }, 50);
      c--;
    }
  };

  if (progress == 100 && isLoading) {
    setTimeout(() => {
      dispatch(userActions.resetProgress());
    }, 500);
  }

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      increment(MAX_PERCENT);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading]);

  return (
    <Fragment>
      {isLoading &&
        ReactDOM.createPortal(
          <div className="loading">
            <div className="loading__wrapper">
              <h1>Loading</h1>
              <div className="loading__progress">
                <div className="loading__progress--background">
                  <div
                    className="loading__progress--completed"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById("overlay-root")
        )}
    </Fragment>
  );
};

export default LoadingPage;
