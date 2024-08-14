import "./loading.css";

export const Loading = () => {
  return (
    <div className="loader">
      {/* <div className="loading"></div> */}
      <img src="/loading.svg" alt="Loading" />
    </div>
  );
};

export const LoaderBtn = () => {
  return (
    <div className="loader">
      <div className="loader-btn"></div>
    </div>
  );
};
