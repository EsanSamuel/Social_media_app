import React, { useEffect, useState, useContext } from "react";
import { ToastContext, IValue } from "../context/ToastProvider";

interface Props {
  msg: any
}

export const ToastSuccess = ({ msg }: Props) => {
  const { toastMsg, setToastMsg } = useContext(ToastContext) as IValue

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastMsg(null);
    }, 3000);

    return () => clearInterval(timeOut);
  });

  return (
    <>
      {toastMsg && (
        <div className='fixed top-2 flex items-center w-full'>
          <h1 className='text-[#eaeaea]'>{msg}</h1>
        </div>
      )}
    </>
  );
};

/*export const toastError = (toast: string) => {
  const [toastModal, setToastModal] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastModal(false);
    }, 3000);

    return () => clearInterval(timeOut);
  }, []);

  return (
    <>
      {toastModal && (
        <div>
          <h1>{toast}</h1>
        </div>
      )}
    </>
  );
};*/
