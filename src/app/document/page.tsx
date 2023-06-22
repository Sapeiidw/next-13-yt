"use client";
import ButtonCreateNewDocument from "@/components/ButtonCreateNewDocument";
import ButtonDeleteDocument from "@/components/ButtonDeleteDocument";
import { db } from "@/lib/db";
import { Document } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Copy, Link2, Plus } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () =>
      await axios.get(`/api/document`).then((res) => res.data),
  });

  return (
    <div>
      <div className='grid grid-cols-3 gap-4 p-4'>
        <div className='bg-gray-200 shadow-sm rounded-lg p-5 flex flex-col items-center justify-center'>
          <h1 className='text-3xl '>
            <Plus size={100} className='text-gray-400' />
          </h1>
          <ButtonCreateNewDocument>Create New</ButtonCreateNewDocument>
        </div>
        {documents &&
          documents.map((document: Document) => (
            <div className='bg-gray-200 shadow-sm rounded-lg p-5'>
              <h1 className='text-3xl font-bold'>{document.name}</h1>
              <Link
                href={`/document/${document.id}`}
                className='text-gray-500 hover:text-blue-500 truncate text-sm flex items-center gap-1'
              >
                <Link2 size={15} />
                {document.id}
              </Link>
              <ButtonDeleteDocument docId={document.id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
