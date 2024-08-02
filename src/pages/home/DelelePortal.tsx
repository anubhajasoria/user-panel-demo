import React from "react";
import { useDispatch } from "react-redux";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Portal, Button } from "../../components";
import { deleteItem } from "../../store/contentSlice";

interface DeletePortalProps {
  isOpen: boolean;
  onClose: () => void;
  index: number;
}

const DeletePortal: React.FC<DeletePortalProps> = ({
  isOpen,
  onClose,
  index,
}) => {
  const dispatch = useDispatch();

  return (
    <Portal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-xl bg-white shadow p-12 gap-y-8 flex flex-col max-h-[70vh] overflow-y-scroll text-gray-700">
        Are you sure about deleting this item?
        <div className="flex items-center justify-end mt-8">
          <Button title="Cancel" primaryType={false} onClick={onClose} />
          <Button
            title="Delete"
            primaryType={true}
            onClick={() => {
              dispatch(deleteItem({ index }));
              onClose();
            }}
          />
        </div>
      </div>
    </Portal>
  );
};

export default DeletePortal;
