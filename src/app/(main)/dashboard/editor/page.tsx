"use client";

import { EditorArea } from "@/components/editor/editor-area";
import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { TemplatesSidebar } from "@/components/editor/templates-sidebar";
import { useTemplates } from "@/hooks/use-templates";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function EditorPage() {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();

  const setEditorRef = (ref: HTMLDivElement) => {
    editorRef.current = ref;
  };

  // URL'den templateId varsa şablonu yükle
  useEffect(() => {
    const templateId = searchParams.get('templateId');
    if (templateId && templates.length > 0) {
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        setSelectedTemplate(templateId);
        setContent(template.content);
        setIsEditMode(true);
        if (editorRef.current) {
          editorRef.current.innerHTML = template.content;
          updateWordCount(template.content);
        }
      }
    }
  }, [searchParams, templates]);

  const handleLoadTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setContent(template.content);
      setIsEditMode(true);
      if (editorRef.current) {
        editorRef.current.innerHTML = template.content;
        updateWordCount(template.content);
      }
      toast.success(`"${template.name}" şablonu yüklendi`);
    }
  };

  const handleSaveTemplate = (name: string, unit: string) => {
    const currentContent = editorRef.current?.innerHTML ?? "";
    const preview = (editorRef.current?.textContent ?? "").substring(0, 50);

    if (!currentContent.trim()) {
      toast.error("Boş şablon kaydedilemez");
      return;
    }

    if (isEditMode && selectedTemplate) {
      // Güncelleme modu
      updateTemplate(selectedTemplate, {
        name,
        unit,
        preview,
        content: currentContent,
      });
      toast.success(`"${name}" şablonu güncellendi`);
    } else {
      // Yeni şablon ekleme
      addTemplate({
        name,
        unit,
        preview,
        content: currentContent,
      });
      toast.success(`"${name}" şablonu ${unit} birimine kaydedildi`);
      
      // Yeni şablon eklendikten sonra editörü temizleme (opsiyonel - kullanıcı isterse kaldırabilir)
      // Şablon kaydedildikten sonra editörü temizlemek istemiyorsanız aşağıdaki satırları yorum satırı yapın
      // setSelectedTemplate(null);
      // setIsEditMode(false);
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    deleteTemplate(templateId);
    if (selectedTemplate === templateId) {
      setSelectedTemplate(null);
      setContent("");
      setIsEditMode(false);
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    }
    toast.success(`"${template?.name}" şablonu silindi`);
  };

  const handleContentChange = (html: string) => {
    setContent(html);
    updateWordCount(html);
  };

  const updateWordCount = (html: string) => {
    const text = html.replace(/<[^>]*>/g, "").trim();
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
  };

  const handleClearEditor = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      setContent("");
      setWordCount(0);
      setSelectedTemplate(null);
      setIsEditMode(false);
      toast.info("Editör temizlendi");
    }
  };

  return (
    <div className="bg-background text-foreground flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <TemplatesSidebar
          templates={templates}
          selectedTemplate={selectedTemplate}
          onLoadTemplate={handleLoadTemplate}
          onDeleteTemplate={handleDeleteTemplate}
        />

        <div className="flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/5">
          <EditorToolbar
            editorRef={editorRef as React.RefObject<HTMLDivElement>}
            onSaveTemplate={handleSaveTemplate}
            onClear={handleClearEditor}
            isEditMode={isEditMode}
            selectedTemplateName={templates.find(t => t.id === selectedTemplate)?.name}
            selectedTemplateUnit={templates.find(t => t.id === selectedTemplate)?.unit}
          />

          <EditorArea
            editorRef={editorRef as React.RefObject<HTMLDivElement>}
            setEditorRef={setEditorRef}
            onChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
}

