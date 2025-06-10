import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Trash2, UploadCloud } from "lucide-react";

const UploadFiles = forwardRef(
  (
    {
      id,
      onChange,
      description,
      fieldTitle = "Haga clic para cargar",
      acceptedFileTypes = [],
    },
    ref
  ) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const inputRef = useRef(null);
    const intervalRef = useRef(null);

    // Functions
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        setFile(selectedFile);
        onChange(selectedFile);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        setFile(droppedFile);
        onChange(droppedFile);
      }
    };

    const handleRemoveFile = () => {
      setFile(null);
      setUploadProgress(0);

      // Restablecer el valor del input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    const simulateUpload = () => {
      let progress = 0;

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        progress += 10;
        if (progress > 90) progress = 90; // tope en 90%
        setUploadProgress(progress);

        if (progress >= 90) clearInterval(intervalRef.current);
      }, 300);
    };

    const completeSimulateUpload = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setUploadProgress(100);
    };

    // Exponer la función simulateUpload
    useImperativeHandle(ref, () => ({
      startSimulateUpload: simulateUpload,
      completeSimulateUpload,
    }));

    useEffect(() => {
      onChange(file);
      if (!file) setUploadProgress(0);
    }, [file]);

    return (
      <div
        className={`w-full overflow-hidden border border-gray-300 rounded-2xl p-4 bg-white shadow-sm ${
          isDragging ? "border-invertiria-2 bg-indigo-50" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <UploadCloud className="text-gray-600" />
          </div>
          <label
            htmlFor={id}
            className="font-medium text-invertiria-2 cursor-pointer hover:underline"
          >
            {fieldTitle}
          </label>
          <input
            id={id}
            type="file"
            ref={inputRef}
            //accept=".webp, .png, .jpg, .jpeg"
            accept={
              acceptedFileTypes.length > 0 ? acceptedFileTypes.join(", ") : "*"
            }
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-center text-gray-500 text-sm">
            {description || "WEBP, PNG, JPG or JPEG (Recomendado: 460×460px)"}
          </p>
        </div>
        {file && (
          <div className="mt-4 p-2 border rounded-lg flex items-center gap-4 bg-gray-50">
            <div className="w-10 h-10 bg-invertiria-1/10 flex items-center justify-center rounded-md shrink-0">
              <span className="text-invertiria-2 text-xs">
                {file.type.split("/")[1]?.toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-700 text-sm font-medium truncate overflow-hidden whitespace-nowrap">
                {file.name}
              </p>
              <p className="text-gray-500 text-xs">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-invertiria-1 h-2 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {uploadProgress < 100
                  ? `Uploading... ${uploadProgress}%`
                  : "Upload complete"}
              </p>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500 shrink-0"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    );
  }
);

UploadFiles.displayName = "UploadFiles";

export default UploadFiles;
