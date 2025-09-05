import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface DeleteDialogProps {
  isOpen: boolean;
  handleDialog: () => void;
  handleDelete: () => void;
}

const DeleteDialog = ({
  handleDialog,
  isOpen,
  handleDelete,
}: DeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Item</DialogTitle>
          <DialogDescription>
            Apakah kamu yakin ingin menghapus item ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"} onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
