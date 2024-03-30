import { Dialog, Transition } from "@headlessui/react";
import { type Dispatch, Fragment, type SetStateAction, useRef } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  setIsSuper: Dispatch<SetStateAction<boolean>>;
  setIsImport: Dispatch<SetStateAction<boolean>>;
}

export default function NewProjectCard({
  isOpen,
  setIsOpen,
  setIsNew,
  setIsSuper,
}: Props) {
  const cancelButtonRef = useRef(null);

  const handleNewButtonClick = () => {
    setIsOpen(false);
    setIsNew(true);
  };
  const handleSuperButtonClick = () => {
    setIsOpen(false);
    setIsSuper(true);
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-flex transform justify-center overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="inline-flex gap-10 px-4 py-3 sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
                    onClick={handleSuperButtonClick}
                  >
                    Select Super Project
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none"
                    onClick={handleNewButtonClick}
                  >
                    Add New Project
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
