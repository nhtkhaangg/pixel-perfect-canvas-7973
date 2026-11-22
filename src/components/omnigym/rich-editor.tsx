import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-48 p-4 outline-none text-sm [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
      },
    },
  });
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-input">
      <div className="flex gap-1 border-b border-border p-2">
        {[
          { label: "In đậm", Icon: Bold, run: () => editor?.chain().focus().toggleBold().run() },
          {
            label: "In nghiêng",
            Icon: Italic,
            run: () => editor?.chain().focus().toggleItalic().run(),
          },
          {
            label: "Danh sách",
            Icon: List,
            run: () => editor?.chain().focus().toggleBulletList().run(),
          },
          {
            label: "Danh sách đánh số",
            Icon: ListOrdered,
            run: () => editor?.chain().focus().toggleOrderedList().run(),
          },
          { label: "Hoàn tác", Icon: Undo2, run: () => editor?.chain().focus().undo().run() },
          { label: "Làm lại", Icon: Redo2, run: () => editor?.chain().focus().redo().run() },
        ].map((a) => (
          <Button
            key={a.label}
            type="button"
            size="icon"
            variant="ghost"
            title={a.label}
            aria-label={a.label}
            onClick={a.run}
          >
            <a.Icon className="size-4" />
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
