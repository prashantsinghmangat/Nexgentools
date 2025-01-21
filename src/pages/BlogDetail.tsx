import { useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { blogPosts } from '../data/blogPosts';

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === Number(id));

  if (!post) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString()} · {post.category}
          </div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>
          <div className="prose prose-slate max-w-none">
            {/* This is where the full blog content would go */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogDetail;