"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  // codeがない場合は早期リターン
  if (!code) {
    return <div>コンテンツがありません</div>;
  }

  // エラーハンドリングを追加
  try {
    const Component = useMDXComponent(code);
    return <Component />;
  } catch (error) {
    console.error("MDXレンダリングエラー:", error);
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded">
        <p className="text-red-500">
          コンテンツの表示中にエラーが発生しました。
        </p>
        <p className="text-sm text-red-400">
          {error instanceof Error ? error.message : "不明なエラー"}
        </p>
      </div>
    );
  }
}
