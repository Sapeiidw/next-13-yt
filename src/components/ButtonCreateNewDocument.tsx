"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ButtonCreateNewDocumentProps {
  children: React.ReactNode;
}

const ButtonCreateNewDocument: FC<ButtonCreateNewDocumentProps> = ({
  children,
}) => {
  const qc = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationKey: ["createDocument"],
    mutationFn: async () => {
      return await axios
        .post(`/api/document`, {
          name: "test",
          data: [],
        })
        .then((res) => res.data);
    },
    onSettled: () => {
      return qc.refetchQueries({ queryKey: ["documents"] });
    },
  });

  return <Button onClick={() => mutateAsync()}>{children}</Button>;
};

export default ButtonCreateNewDocument;
