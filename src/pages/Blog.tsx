import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to start your web development journey.",
    date: "2024-03-15",
    category: "Development"
  },
  {
    id: 2,
    title: "Essential Developer Tools",
    description: "Discover the most useful tools that every developer should know about.",
    date: "2024-03-14",
    category: "Tools"
  },
  {
    id: 3,
    title: "Productivity Tips for Developers",
    description: "Boost your productivity with these essential tips and tricks.",
    date: "2024-03-13",
    category: "Productivity"
  }
];

const Blog = () => {
  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground">
            Latest articles and tutorials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString()} · {post.category}
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0">
                  Read more →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;