import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link href={post.url}>{post.title}</Link>
      </h2>
    </div>
  );
}

export default function Home() {
  const posts = allPosts;

  return (
    <div className="max-w-xl mx-auto my-8">
      <h1 className="text-center">Next.js + Contentlayer Example</h1>
      {posts.map((post) => (
        <PostCard {...post} key={post._id} />
      ))}
    </div>
  );
}
