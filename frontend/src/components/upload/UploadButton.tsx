import { useRef } from "react";
import { Upload } from "lucide-react";

export function UploadButton({ onFile }: { onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      <button onClick={() => ref.current?.click()} className="glass flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-secondary/60">
        <Upload className="h-4 w-4" /> Upload document
      </button>
    </>
  );
}
