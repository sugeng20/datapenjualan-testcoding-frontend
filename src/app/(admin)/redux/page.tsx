"use client";

import type { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/lib/features/counter/counterSlice";
import ButtonSmallComponent from "@/components/ButtonSmallComponent";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const ReduxPage: React.FC = (): JSX.Element => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <div className="py-6 px-8 bg-white border shadow mt-4 rounded-2xl">
        <p className="text-lg">
          <span className="text-blue-700 font-bold">Redux / </span>
          <span>Belajar Redux</span>
        </p>
      </div>

      <div className="py-10 px-8 bg-white border shadow mt-8 rounded-2xl">
        <div className="flex">
          <ButtonSmallComponent
            icon={faMinus}
            onClick={() => dispatch(decrement())}
            type="button"
            color="green"
          >
            Kurang
          </ButtonSmallComponent>
          <div>{count}</div>
          <ButtonSmallComponent
            icon={faPlus}
            onClick={() => dispatch(increment())}
            type="button"
            color="green"
          >
            Tambah
          </ButtonSmallComponent>
        </div>
      </div>
    </>
  );
};

export default ReduxPage;
