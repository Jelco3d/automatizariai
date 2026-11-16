import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { useEffect, useRef, useState } from "react";
import { Bold, Code, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Minus, Quote, Redo2, Undo2, Video } from "lucide-react";
import { toast } from "sonner";
import { uploadBlogImage } from "@/lib/blog";
import { cn } from "@/lib/utils";

type Props = { value: string; onChange: (html: string) => void; onReady?: (e: Editor) => void };

function Btn({ on, active, label, children }: { on: () => void; active?: boolean; label: string; children: React.ReactNode }) {
  return (
    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={on} aria-label={label} title={label}
      className={cn("rounded-md p-1.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "bg-primary/15 text-primary" : "text-popover-foreground hover:bg-accent")}>
      {children}
    </button>
  );
}

const setLink = (editor: Editor) => {
  const prev = editor.getAttributes("link").href as string | undefined;
  const url = window.prompt("Adresa linkului (lasă gol ca să-l scoți)", prev ?? "https://");
  if (url === null) return;
  if (!url) return editor.chain().focus().unsetLink().run();
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
};
const addVideo = (editor: Editor) => {
  const url = window.prompt("Link YouTube");
  if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
};

type SlashItem = { label: string; hint: string; icon: React.ElementType; run: (e: Editor) => void };

export function RichTextEditor({ value, onChange, onReady }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [slash, setSlash] = useState<{ query: string; top: number; left: number; from: number } | null>(null);
  const [slashIdx, setSlashIdx] = useState(0);
  const slashRef = useRef(slash); slashRef.current = slash;
  const idxRef = useRef(slashIdx); idxRef.current = slashIdx;

  const SLASH: SlashItem[] = [
    { label: "Titlu secțiune", hint: "H2", icon: Heading2, run: (e) => e.chain().focus().setHeading({ level: 2 }).run() },
    { label: "Titlu mic", hint: "H3", icon: Heading3, run: (e) => e.chain().focus().setHeading({ level: 3 }).run() },
    { label: "Imagine", hint: "încarcă", icon: ImagePlus, run: () => fileRef.current?.click() },
    { label: "Citat", hint: "blockquote", icon: Quote, run: (e) => e.chain().focus().toggleBlockquote().run() },
    { label: "Cod", hint: "bloc de cod", icon: Code, run: (e) => e.chain().focus().toggleCodeBlock().run() },
    { label: "Listă", hint: "puncte", icon: List, run: (e) => e.chain().focus().toggleBulletList().run() },
    { label: "Listă numerotată", hint: "1, 2, 3", icon: ListOrdered, run: (e) => e.chain().focus().toggleOrderedList().run() },
    { label: "Separator", hint: "linie", icon: Minus, run: (e) => e.chain().focus().setHorizontalRule().run() },
    { label: "Video YouTube", hint: "embed", icon: Video, run: (e) => addVideo(e) },
  ];
  const matches = (q: string) => SLASH.filter((s) => s.label.toLowerCase().includes(q.toLowerCase()));

  const runSlash = (editor: Editor, item: SlashItem) => {
    const s = slashRef.current; if (!s) return;
    editor.chain().focus().deleteRange({ from: s.from, to: editor.state.selection.from }).run();
    setSlash(null);
    item.run(editor);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }), Link.configure({ openOnClick: false }), Image,
      Youtube.configure({ nocookie: true, width: 720, height: 405 }),
      Placeholder.configure({ placeholder: "Începe să scrii… apasă „/” pentru blocuri" }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      const { $from, empty } = editor.state.selection;
      const text = $from.parent.textBetween(0, $from.parentOffset, undefined, "\ufffc");
      const m = empty ? /(?:^|\s)\/([\p{L}\s]{0,20})$/u.exec(text) : null;
      if (m && matches(m[1]).length) {
        const coords = editor.view.coordsAtPos($from.pos);
        const box = editor.view.dom.closest(".blog-editor")!.getBoundingClientRect();
        setSlash({ query: m[1], top: coords.bottom - box.top + 6, left: coords.left - box.left, from: $from.pos - m[1].length - 1 });
        setSlashIdx(0);
      } else setSlash(null);
    },
    editorProps: {
      attributes: { class: "prose prose-neutral dark:prose-invert max-w-none min-h-[50vh] font-serif text-[1.125rem] leading-[1.8] focus:outline-none prose-headings:font-serif prose-a:text-primary prose-blockquote:border-l-primary prose-img:rounded-lg", "aria-label": "Conținutul articolului" },
      handleKeyDown: (_view, e) => {
        const s = slashRef.current; if (!s || !editorRef.current) return false;
        const list = matches(s.query);
        if (e.key === "ArrowDown") { setSlashIdx((i) => (i + 1) % list.length); return true; }
        if (e.key === "ArrowUp") { setSlashIdx((i) => (i - 1 + list.length) % list.length); return true; }
        if (e.key === "Enter") { runSlash(editorRef.current, list[idxRef.current] ?? list[0]); return true; }
        if (e.key === "Escape") { setSlash(null); return true; }
        return false;
      },
    },
  });
  const editorRef = useRef<Editor | null>(null); editorRef.current = editor;

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value && editor.isEmpty) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);
  useEffect(() => { if (editor) onReady?.(editor); }, [editor]); // eslint-disable-line react-hooks/exhaustive-deps

  const onImage = async (f?: File) => {
    if (!f || !editor) return;
    const t = toast.loading("Se încarcă imaginea…");
    try {
      const url = await uploadBlogImage(f);
      editor.chain().focus().setImage({ src: url, alt: f.name.replace(/\.[^.]+$/, "") }).run();
      toast.success("Imagine adăugată", { id: t });
    } catch { toast.error("Nu am putut încărca imaginea", { id: t }); }
  };

  if (!editor) return <div className="min-h-[50vh]" />;
  const list = slash ? matches(slash.query) : [];

  return (
    <div className="blog-editor relative">
      <div className="sticky top-14 z-10 -mx-2 mb-4 flex flex-wrap gap-0.5 rounded-lg border border-border bg-background/90 p-1 backdrop-blur" role="toolbar" aria-label="Formatare">
        <Btn label="Titlu secțiune" on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="h-4 w-4" /></Btn>
        <Btn label="Titlu mic (H3)" on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 className="h-4 w-4" /></Btn>
        <Btn label="Listă" on={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="h-4 w-4" /></Btn>
        <Btn label="Listă numerotată" on={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className="h-4 w-4" /></Btn>
        <Btn label="Citat" on={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="h-4 w-4" /></Btn>
        <Btn label="Imagine" on={() => fileRef.current?.click()}><ImagePlus className="h-4 w-4" /></Btn>
        <Btn label="Video YouTube" on={() => addVideo(editor)}><Video className="h-4 w-4" /></Btn>
        <Btn label="Separator" on={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></Btn>
        <span className="mx-1 w-px self-stretch bg-border" aria-hidden />
        <Btn label="Anulează" on={() => editor.chain().focus().undo().run()}><Undo2 className="h-4 w-4" /></Btn>
        <Btn label="Refă" on={() => editor.chain().focus().redo().run()}><Redo2 className="h-4 w-4" /></Btn>
      </div>

      <BubbleMenu editor={editor} className="flex gap-0.5 rounded-lg border border-border bg-popover p-1 shadow-sm">
        <Btn label="Îngroșat" on={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="h-4 w-4" /></Btn>
        <Btn label="Cursiv" on={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="h-4 w-4" /></Btn>
        <Btn label="Link" on={() => setLink(editor)} active={editor.isActive("link")}><Link2 className="h-4 w-4" /></Btn>
        <Btn label="Titlu secțiune" on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="h-4 w-4" /></Btn>
        <Btn label="Citat" on={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="h-4 w-4" /></Btn>
        <Btn label="Cod" on={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")}><Code className="h-4 w-4" /></Btn>
      </BubbleMenu>

      <EditorContent editor={editor} />

      {slash && list.length > 0 && (
        <div role="listbox" aria-label="Blocuri" className="absolute z-30 w-64 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-sm" style={{ top: slash.top, left: Math.max(0, slash.left) }}>
          {list.map((s, i) => (
            <button key={s.label} type="button" role="option" aria-selected={i === slashIdx} onMouseDown={(e) => { e.preventDefault(); runSlash(editor, s); }} onMouseEnter={() => setSlashIdx(i)}
              className={cn("flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-popover-foreground", i === slashIdx && "bg-accent")}>
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background"><s.icon className="h-4 w-4" /></span>
              <span className="flex-1">{s.label}</span><span className="text-xs text-muted-foreground">{s.hint}</span>
            </button>
          ))}
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { onImage(e.target.files?.[0]); e.target.value = ""; }} />
    </div>
  );
}
