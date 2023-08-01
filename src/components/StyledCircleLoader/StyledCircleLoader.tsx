import React, { CSSProperties } from "react";
import { CircleLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "100px auto",
  borderColor: "red",
  padding: 100,
};

export default function StyledCircleLoader({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <CircleLoader
      color={"#6B7280"}
      loading={isLoading}
      cssOverride={override}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
