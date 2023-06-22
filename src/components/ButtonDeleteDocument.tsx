"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ButtonDeleteDocumentProps {
  docId: string;
}

const ButtonDeleteDocument: FC<ButtonDeleteDocumentProps> = ({ docId }) => {
  const qc = useQueryClient();
  const { data, isLoading, mutateAsync } = useMutation({
    mutationKey: ["deleteDocument", docId],
    mutationFn: async () => {
      return await axios
        .delete(`/api/document/${docId}`)
        .then((res) => res.data);
    },
    // Always refetch after error or success:
    onSettled: () => {
      return qc.refetchQueries({ queryKey: ["documents"] });
    },
  });
  return (
    <Button
      variant={"destructive"}
      onClick={() => mutateAsync()}
      isLoading={isLoading}
    >
      Delete
    </Button>
  );
};

export default ButtonDeleteDocument;
