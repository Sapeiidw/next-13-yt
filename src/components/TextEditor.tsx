"use client";
import { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {}

const TextEditor: FC<TextEditorProps> = ({}) => {
  const [value, setValue] = useState<string>("");
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
      //   [{ header: [1, 2, false] }],
      //   ["bold", "italic", "underline", "strike", "blockquote"],
      //   [
      //     { list: "ordered" },
      //     { list: "bullet" },
      //     { indent: "-1" },
      //     { indent: "+1" },
      //   ],
      //   ["link", "image"],
      //   ["clean"],
    ],
  };
  return (
    <div className='flex justify-center'>
      <ReactQuill
        value={value}
        onChange={setValue}
        theme='snow'
        modules={modules}
        className='w-[21cm] h-[32cm]'
      />
    </div>
  );
};

export default TextEditor;
