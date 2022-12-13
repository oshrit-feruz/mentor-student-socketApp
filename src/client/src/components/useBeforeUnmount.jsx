import React from "react";
import BeforeUnmount from "./BeforeUnmount";

/**
 *
 * @param {()=>any} cb
 */
function useBeforeUnmount(cb) {
  const temp = <BeforeUnmount beforeUnmount={cb} />;
  return temp;
}

export default useBeforeUnmount;
