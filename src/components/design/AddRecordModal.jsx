// Components
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Hooks
import { cloneElement, isValidElement, useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";

import { Plus } from "lucide-react";

const AddRecordModal = ({
  children,
  title,
  description,
  buttonName = "Nuevo registro",
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const injectedChildren = isValidElement(children)
    ? cloneElement(children, { onOpenChange: setOpen })
    : children;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="w-full 2xs:w-auto font-light" variant="theme">
            <Plus className="size-5" strokeWidth={1.5} /> Nuevo registro
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex max-h-[80vh] flex-col">
          <DrawerHeader className="shrink-0 text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 grow">{injectedChildren}</div>
          <DrawerFooter className="shrink-0 pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full 2xs:w-auto font-light" variant="theme">
          <Plus className="size-5" strokeWidth={1.5} /> {buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">{injectedChildren}</div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecordModal;
