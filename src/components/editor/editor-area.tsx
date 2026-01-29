'use client';

import { useEffect, useRef } from 'react';
import { FileText, Save } from 'lucide-react';

interface EditorAreaProps {
  editorRef: React.RefObject<HTMLDivElement> | null;
  setEditorRef: (ref: HTMLDivElement) => void;
  onChange?: (html: string) => void;
}

export function EditorArea({ editorRef, setEditorRef, onChange }: EditorAreaProps) {
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localRef.current && (!editorRef || !editorRef.current)) {
      setEditorRef(localRef.current);
    }
  }, [editorRef, setEditorRef]);

  // Yapıştırma işlemini handle et - formatı koru
  useEffect(() => {
    const editor = localRef.current;
    if (!editor) return;

    const handlePaste = (e: ClipboardEvent) => {
      // Varsayılan yapıştırma davranışını kullan - formatı korur
      // Sadece onChange'i tetiklemek için input event'ini bekliyoruz
      // Bu sayede yapıştırılan içerik olduğu gibi kalır
    };

    editor.addEventListener('paste', handlePaste);
    return () => {
      editor.removeEventListener('paste', handlePaste);
    };
  }, []);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const currentContent = (e.currentTarget as HTMLDivElement).innerHTML;
    onChange?.(currentContent);
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-muted/20 via-muted/10 to-background p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Email-like container */}
        <div className="bg-card rounded-lg border border-border/60 shadow-lg overflow-hidden">
          {/* Editor Content Area */}
          <div className="relative">
            <div
              ref={localRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleInput}
              className="min-h-[500px] w-full p-8 md:p-12 bg-card text-foreground focus:outline-none focus:ring-0 transition-all editor-content"
              data-placeholder="Şablonunuzu yazmaya başlayın..."
            />
          </div>

          {/* Status Bar */}
          <div className="border-t border-border/60 bg-muted/30 px-6 py-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" />
                <span>İçerik otomatik olarak kaydedilir</span>
              </div>
              <div className="flex items-center gap-2">
                <Save className="h-3.5 w-3.5" />
                <span>Ctrl+S ile şablonu kaydedin</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="opacity-70">Segoe UI</span>
              <span className="opacity-50">10pt</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          opacity: 0.4;
          font-style: italic;
          pointer-events: none;
          font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 10pt;
        }
        
        .editor-content {
          word-wrap: break-word;
          overflow-wrap: break-word;
          line-height: 1.6;
        }
        
        /* Sadece boş editor için varsayılan font uygula */
        .editor-content:empty {
          font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 10pt;
        }
        
        /* Yapıştırılan içeriğin kendi stillerini koru - override etme */
        .editor-content * {
          /* Yapıştırılan içeriğin kendi font stillerini koru */
        }
        
        .editor-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1em 0;
        }
        
        .editor-content a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }
        
        .editor-content a:hover {
          opacity: 0.8;
        }
        
        /* Yapıştırılan tablolar için */
        .editor-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }
        
        .editor-content table td,
        .editor-content table th {
          border: 1px solid hsl(var(--border));
          padding: 8px;
        }
      `}</style>
    </div>
  );
}

