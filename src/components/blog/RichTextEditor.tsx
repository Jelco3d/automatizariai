import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef } from "react";
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Link2, ImagePlus, Undo2, Redo2, Minus } from "lucide-react";
import { toast } from "sonner";
import { uploadBlogImage } from "@/lib/blog";

type Props = { value: string; onChange: (html: string) => void };

function Btn({ on, active, label, children }: { on: () => void; active?: boolean; label: string; children: React.ReactNode }) {
  return (
    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={on} aria-label={label} title={label}
      className={`p-2 rounded-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 ${active ? "bg-amber-500/20 text-amber-300" : "text-gray-300 hover:bg-white/10"}`}>
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Adresa linkului (lasă gol ca să-l scoți)", prev ?? "https://");
    if (url === null) return;
    if (!url) return editor.chain().focus().unsetLink().run();
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
  const onImage = async (f?: File) => {
    if (!f) return;
    try {
      const url = await uploadBlogImage(f);
      editor.chain().focus().setImage({ src: url, alt: f.name.replace(/\.[^.]+$/, "") }).run();
    } catch { toast.error("Nu am putut încărca imaginea"); }
  };
  return (
    <div className="flex flex-wrap gap-1 border-b border-amber-500/20 p-2 sticky top-0 bg-[#1A1F2C] z-10">
      <Btn label="Îngroșat" on={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="h-4 w-4" /></Btn>
      <Btn label="Cursiv" on={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="h-4 w-4" /></Btn>
      <Btn label="Titlu secțiune" on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="h-4 w-4" /></Btn>
      <Btn label="Subtitlu" on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 className="h-4 w-4" /></Btn>
      <Btn label="Listă" on={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="h-4 w-4" /></Btn>
      <Btn label="Listă numerotată" on={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className="h-4 w-4" /></Btn>
      <Btn label="Citat" on={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="h-4 w-4" /></Btn>
      <Btn label="Linie separatoare" on={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></Btn>
      <Btn label="Link" on={setLink} active={editor.isActive("link")}><Link2 className="h-4 w-4" /></Btn>
      <Btn label="Imagine" on={() => fileRef.current?.click()}><ImagePlus className="h-4 w-4" /></Btn>
      <Btn label="Anulează" on={() => editor.chain().focus().undo().run()}><Undo2 className="h-4 w-4" /></Btn>
      <Btn label="Refă" on={() => editor.chain().focus().redo().run()}><Redo2 className="h-4 w-4" /></Btn>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { onImage(e.target.files?.[0]); e.target.value = ""; }} />
    </div>
  );
}

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image, Placeholder.configure({ placeholder: "Scrie articolul aici..." })],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "prose prose-invert max-w-none min-h-[420px] p-4 focus:outline-none prose-a:text-amber-300 prose-headings:text-white prose-p:text-gray-200" } },
  });
  // load content once it arrives (edit mode)
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value && editor.isEmpty) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);
  if (!editor) return <div className="min-h-[420px]" />;
  return (
    <div className="rounded-lg border border-amber-500/20 bg-[#1A1F2C]/50 overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
