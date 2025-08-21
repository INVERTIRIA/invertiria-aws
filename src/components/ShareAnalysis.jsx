import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const ShareAnalysis = ({
  modelacionId = "7cff7a9b-21d7-44e4-857c-9baa947649ed",
}) => {
  const [open, setOpen] = useState(false);

  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [emailValidate, setEmailValidate] = useState(true);

  const { createUserInstance } = useAuth();
  const userInstance = createUserInstance({});

  // Funciones
  const handleShare = async () => {
    if (!modelacionId) {
      toast.error("Se necesita un ID del análisis");
      return;
    }

    setLoading(true);

    const validate = handleValidateFields();
    if (!validate) return;

    const res = await userInstance.shareAnalysis(
      emailRef.current.value,
      modelacionId
    );

    if (res.status) {
      toast.success("Análisis compartido con exito");
    }

    setLoading(false);
    setOpen(false);
  };

  const handleValidateFields = () => {
    let validate = true;

    if (!emailRef.current.value || !emailRef.current.validity.valid) {
      validate = false;
      setEmailValidate(false);
    }

    if (!validate) {
      setLoading(false);
      setTimeout(() => {
        setEmailValidate(true);
      }, 1500);
    }

    return validate;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="theme">Compartir</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compartir análisis</DialogTitle>
          <DialogDescription>
            Al compartir este análisis con un invitado, ten en cuenta que
            estarás otorgando acceso a información sensible de tu inversión. El
            usuario invitado solo podrá visualizar tu análisis; no podrá
            editarlo ni compartir esta información con terceros.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 my-4">
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Ingresa el correo electrónico"
            ref={emailRef}
            required
          />
          {!emailValidate && (
            <p className="text-red-500 text-sm font-medium">
              El correo electrónico es requerido
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleShare}
            disabled={!emailValidate || loading}
          >
            Compartir{" "}
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareAnalysis;
