import { LoaderCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useTransition } from "react";
import { supabase } from "../supabase";
import { toast } from "sonner";

const BulkDeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  tableName,
  fieldName = "id",
  records,
}) => {
  const [isPending, startTransition] = useTransition();

  const handlerConfirm = () => {
    startTransition(async () => {
      const response = await supabase
        .from(tableName)
        .delete()
        .in(fieldName, records)
        .select();

      if (!response.error && response.data.length === 0) {
        toast.error("No autorizado, su rol no tiene los permisos necesarios.");
        onClose();
        return;
      }

      await onConfirm();
      return onClose();
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogTrigger />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmación de eliminación</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás completamente seguro? Esta acción no se puede deshacer.
            Eliminará permanentemente los datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handlerConfirm}>
            Eliminar {isPending && <LoaderCircle className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BulkDeleteConfirmation;
