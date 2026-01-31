import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div
      style={{
        padding: "2rem 5rem",
      }}
    >
      <Skeleton
        height={"300px"}
        width={"100%"}
        count={1}
        baseColor="darkgrey"
      />
    </div>
  );
}
