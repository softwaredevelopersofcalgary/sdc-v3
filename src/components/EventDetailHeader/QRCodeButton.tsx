import { useEffect, Fragment, useState, useRef } from "react";
import QRCode from "qrcode";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  link: string;
};

const QRCodeButton: React.FC<Props> = (props) => {
  const [svg, setSvg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCodeSvg = await QRCode.toString(props.link, { type: "svg" });
        setSvg(qrCodeSvg);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [props.link]);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
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
                <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6">
                  <div
                    className="w-42"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  ></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <button
        dangerouslySetInnerHTML={{ __html: svg }}
        className="w-14"
        onClick={() => toggle()}
      />
    </>
  );
};

export default QRCodeButton;
