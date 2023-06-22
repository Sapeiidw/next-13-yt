import TextEditor from "@/components/TextEditor";
import TextEditorQuill from "@/components/TextEditorQuill";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  if (!params.id) return <div>404</div>;
  return (
    <div className='p-5'>
      <TextEditor id={params.id} />
      {/* <TextEditorQuill id={params.id} /> */}
    </div>
  );
};

export default page;
