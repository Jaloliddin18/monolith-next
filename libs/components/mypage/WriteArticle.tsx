import React from "react";
import { Stack } from "@mui/material";
import dynamic from "next/dynamic";

const TuiEditor = dynamic(() => import("../community/TuiEditor"), {
  ssr: false,
});

const WriteArticle = () => {
  return (
    <Stack className="write-article-content">
      <div className="write-article-header">
        <h2 className="write-article-title">Write An Article</h2>
      </div>
      <TuiEditor />
    </Stack>
  );
};

export default WriteArticle;
