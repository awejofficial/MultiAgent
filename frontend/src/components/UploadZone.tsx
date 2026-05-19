import { useCallback, useRef, useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onFile: (file: File) => void;
  loading?: boolean;
}

export function UploadZone({ onFile, loading }: Props) {
  const [drag, setDrag] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || !files[0]) return;
      setName(files[0].name);
      onFile(files[0]);
    },
    [onFile],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "group relative cursor-pointer rounded-2xl border-2 border-dashed bg-card p-12 text-center transition-all",
        drag
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/50 hover:bg-secondary/40",
      )}
      style={{ boxShadow: drag ? "var(--shadow-glow)" : "var(--shadow-soft)" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
        {loading ? (
          <Loader2 className="h-7 w-7 animate-spin" />
        ) : name ? (
          <FileText className="h-7 w-7" />
        ) : (
          <Upload className="h-7 w-7" />
        )}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {loading ? "Analyzing document…" : name ?? "Drop a document here"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {loading
          ? "Classifying and routing to the right pipeline"
          : "PDF, image, or text. We'll classify and route automatically."}
      </p>
    </div>
  );
}