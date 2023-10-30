import { useContext } from "react";
import { Button, Input } from "..";
import { GUIClientContext } from "../../App";
import { useDispatch } from "react-redux";
import {
  setDialogMessage,
  setShowDialog,
} from "../../redux/slices/uiStateSlice";
import { ContextItem } from "../../schema/ContextItem";

function AddContextGroupDialog({
  selectedContextItems,
}: {
  selectedContextItems: ContextItem[];
}) {
  const dispatch = useDispatch();
  const client = useContext(GUIClientContext);

  let inputElement: HTMLInputElement | null = null;

  const handleCreate = () => {
    dispatch(setDialogMessage(undefined));
    dispatch(setShowDialog(false));
    const title = inputElement ? inputElement.value : "My Context Group";
    client?.saveContextGroup(title, selectedContextItems);
  };

  return (
    <div className="p-4">
      <Input
        defaultValue="My Context Group"
        type="text"
        ref={(input) => {
          inputElement = input;
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreate();
          }
        }}
      />
      <br />
      <Button className="ml-auto" onClick={handleCreate}>
        Create
      </Button>
    </div>
  );
}

export default AddContextGroupDialog;