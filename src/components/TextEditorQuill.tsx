"use client";
import { pusherClient } from "@/lib/pusher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Quill from "quill";
import { FC, useCallback, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface TextEditorQuillProps {
  id: string;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditorQuill: FC<TextEditorQuillProps> = ({ id }) => {
  const [quill, setQuill] = useState<any>(null);

  const { data, refetch } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      return await axios.get(`/api/document/${id}`).then((res) => {
        quill!.setContents(res.data);
        quill.enable();
        return res.data;
      });
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["document", id],
    mutationFn: async (payload: any) => {
      return await axios
        .patch(`/api/document/${id}`, payload)
        .then((res) => res.data);
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = pusherClient.subscribe(`document-${id}`);
    channel.bind("update", (changes: any) => {
      refetch();
    });

    return () => {
      channel.unbind("update");
      pusherClient.unsubscribe(`document-${id}`);
    };
  }, [quill]);

  // useEffect(() => {
  //   if (quill) {
  //     const interval = setInterval(() => {
  //       const content = quill.getContents();
  //       mutateAsync({
  //         id: id,
  //         name: "test",
  //         data: content,
  //       });
  //     }, 2000);
  //     return () => clearInterval(interval);
  //   }
  // }, [quill]);

  // useEffect(() => {
  //   const editor = document.createElement("div");
  //   const q = new Quill(editor, {
  //     theme: "snow",
  //     modules: { toolbar: TOOLBAR_OPTIONS },
  //   });
  //   setQuill(q);
  // }, []);
  // useEffect(() => {
  //   if (quill) {
  //     const handler = (delta: any, oldDelta: any, source: string) => {
  //       // if (source === "user") {
  //       const content = quill.getContents();
  //       mutateAsync(content);
  //       // }
  //     };
  //     quill.on("text-change", handler);
  //     return () => quill.off("text-change", handler);
  //   }
  // }, [quill]);

  // Save interval
  // useEffect(() => {
  //   if (quill) {
  //     const interval = setInterval(() => {
  //       const content = quill.getContents();
  //       mutateAsync(content).then(() => {
  //         queryClient.setQueryData(["document", id], {
  //           ...document,
  //           content,
  //         });
  //       });
  //     }, 2000);
  //     return () => clearInterval(interval);
  //   }
  // }, [id, quill, queryClient, document]);

  // Content change handler
  useEffect(() => {
    if (quill) {
      const handler = (delta: any, oldDelta: any, source: string) => {
        if (source === "user") {
          const content = quill.getContents();
          mutateAsync(content).then(() => {
            queryClient.setQueryData(["document", id], {
              ...document,
              content,
            });
          });
        }
      };
      quill.on("text-change", handler);
      return () => quill.off("text-change", handler);
    }
  }, [id, quill, queryClient, document]);

  const wrapperRef = useCallback(
    (
      wrapper: {
        innerHTML: string;
        append: (arg0: HTMLDivElement) => void;
      } | null
    ) => {
      if (wrapper == null) return;

      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      q.disable();
      setQuill(q);
    },
    []
  );

  return (
    <div className='flex'>
      <div id='editor' ref={wrapperRef} />
    </div>
  );
};

export default TextEditorQuill;
