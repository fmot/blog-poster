import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";

// MDXコンポーネントのインポート方法を変更
import { MDXContent } from "../../components/mdx-component";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// generateStaticParamsを追加して静的生成を有効にする
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  // asyncキーワードを削除し、awaitも使わない
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post.date}>
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1>{post.title}</h1>
      </div>

      {/* MDXコンテンツをレンダリング */}
      <MDXContent code={post.body.code} />
    </article>
  );
}
