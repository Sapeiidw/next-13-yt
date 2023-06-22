"use client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import ReactQuill, { Value } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { pusherClient, pusherServer } from "@/lib/pusher";
import { useMutation, useQuery } from "@tanstack/react-query";

interface TextEditorProps {
  id: string;
}

const TextEditor: FC<TextEditorProps> = ({ id }) => {
  const [value, setValue] = useState<Value | undefined>(undefined);

  const { data } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      return axios.get(`/api/document/${id}`).then((res) => res.data);
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["document", id],
    mutationFn: async () => {
      return await axios
        .patch(`/api/document/${id}`, {
          id: id,
          name: "test",
          data: value,
        })
        .then((res) => res.data);
    },
  });

  useEffect(() => {
    // if (data) setValue(data.data);

    const channel = pusherClient.subscribe(`document-${id}`);
    channel.bind("update", (changes: any) => {
      setValue(changes);
    });

    return () => {
      pusherClient.unsubscribe(`document-${id}`);
    };
  }, []);

  function handleChange(content: any, delta: any, source: any, editor: any) {
    setValue(editor.getContents());
    pusherServer.trigger(`document-${id}`, "update", editor.getContents());
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["image", "blockquote", "code-block", "link"],
      ["clean"],
    ],
  };
  return (
    <div className='flex flex-col items-center justify-center p-5'>
      <Button onClick={() => mutateAsync()}>Save</Button>
      {JSON.stringify(value)}
      {data && (
        <ReactQuill
          value={value}
          onChange={handleChange}
          theme='snow'
          modules={modules}
          className='lg:w-[21cm] lg:h-[32cm] w-full h-full'
        />
      )}
    </div>
  );
};

export default TextEditor;
