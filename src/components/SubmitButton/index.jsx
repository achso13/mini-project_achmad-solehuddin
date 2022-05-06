import React from "react";
import Spinner from "./Spinner";

export default function SubmitButton(props) {
  return (
    <button
      type="submit"
      className="flex items-center justify-center gap-2 rounded border-2 border-red-500 bg-red-500 py-1 px-2 text-center text-white hover:bg-red-600 disabled:bg-red-600"
      disabled={props.loading}
    >
      {props.loading ? (
        <>
          <Spinner />
          <span>Loading...</span>
        </>
      ) : (
        props.children
      )}
    </button>
  );
}
