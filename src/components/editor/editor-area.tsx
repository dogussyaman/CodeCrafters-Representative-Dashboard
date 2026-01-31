"use client";

import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EditorAreaProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  setEditorRef: (ref: HTMLDivElement) => void;
  onChange: (html: string) => void;
  className?: string;
}

export function EditorArea({
  editorRef,
  setEditorRef,
  onChange,
  className,
}: EditorAreaProps) {
  const handleInput = useCallback(() => {
    const html = editorRef.current?.innerHTML ?? "";
    onChange(html);
  }, [editorRef, onChange]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    el.addEventListener("input", handleInput);
    return () => el.removeEventListener("input", handleInput);
  }, [editorRef, handleInput]);

  return (
    <div className={cn("flex-1 overflow-auto p-4", className)}>
      <div
        ref={(el) => {
          if (el) setEditorRef(el);
        }}
        contentEditable
        className="prose prose-sm dark:prose-invert min-h-[200px] w-full max-w-none rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_table]:border [&_table]:border-border [&_td]:p-2 [&_th]:p-2"
        suppressContentEditableWarning
        data-placeholder="Buraya yazın veya şablon yükleyin..."
      />
    </div>
  );
}
