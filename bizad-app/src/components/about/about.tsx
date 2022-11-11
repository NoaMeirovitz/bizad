import { Link } from "react-router-dom";
import { Header } from "../header/header";

export const About = () => {
  return (
    <div id="about">
      <Header
        description="What makes BizAd the #1 app for advertising businesses"
        title="About This App"
      />
      <div className="content d-flex justify-content-center align-items-center flex-column pt-5">
        <div className="text pb-3" style={{ maxWidth: "600px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          dicta ipsum vel blanditiis cum velit! Beatae inventore rem quod esse
          incidunt eius, aperiam laboriosam, deserunt in molestias, iure
          expedita. Aliquid asperiores, dignissimos ut ullam consequatur rerum
          magni quam officiis accusantium sed aliquam doloribus temporibus amet
          nesciunt molestias praesentium ratione. Soluta, suscipit. Itaque
          molestias aspernatur voluptatem animi dolorem recusandae praesentium
          perspiciatis.
        </div>
        <Link to="/">
          <span className="btn btn-primary">Start now</span>
        </Link>
      </div>
    </div>
  );
};
