import TextEditor from "@/components/TextEditor";
import TextEditorQuill from "@/components/TextEditorQuill";
import { FC } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  if (!params.id) return <div>404</div>;
  return (
    <div className='p-5'>
      <TextEditor id={params.id} />
      {/* <TextEditorQuill id={params.id} /> */}
    </div>
  );
};

export default Page;
