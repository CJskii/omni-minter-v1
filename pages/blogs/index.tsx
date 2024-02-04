import { Layout } from "@/components/dashboard/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import blog from "@/assets/blog.svg";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const smapleBlogs: BlogCardProps[] = [
  {
    title: "Lorem ipsum sit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit ultricies lacus tristique a feugiat nunc.",
    image: blog,
    url: "#",
  },
  {
    title: "Lorem ipsum sit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit ultricies lacus tristique a feugiat nunc.",
    image: blog,
    url: "#",
  },
  {
    title: "Lorem ipsum sit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit ultricies lacus tristique a feugiat nunc.",
    image: blog,
    url: "#",
  },
  {
    title: "Lorem ipsum sit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit ultricies lacus tristique a feugiat nunc.",
    image: blog,
    url: "#",
  },
  {
    title: "Lorem ipsum sit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit ultricies lacus tristique a feugiat nunc.",
    image: blog,
    url: "#",
  },
  {
    title: "Lorem ipsum sit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit ultricies lacus tristique a feugiat nunc.",
    image: blog,
    url: "#",
  },
];

export default function Blogs() {
  return (
    <Layout className="py-24 md:w-11/12 mx-auto min-h-[90vh]" showGrid={false}>
      <div className=" pb-24 pt-12  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {smapleBlogs.map((blog, idx) => (
          <div key={idx}>
            <BlogCard
              title={blog.title}
              description={blog.description}
              image={blog.image}
              url={blog.url}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export function BlogCard({ title, description, image, url }: BlogCardProps) {
  const blogHref = title.split(" ").join("-");
  return (
    <>
      <Card className="flex dark:border-neutral-600 flex-col justify-between overflow-hidden rounded-xl shadow-none">
        <div className="flex flex-col gap-3">
          <Link href={`/blogs/${blogHref}`}>
            <Image
              width={200}
              height={100}
              src={image}
              alt={title}
              className="w-full rounded-t-xl md:max-w-full lg:max-h-56 object-top lg:object-cover"
            />
          </Link>
          <div className=" space-y-2 p-4">
            <Typography variant="large" className=" line-clamp-1">
              {title}
            </Typography>

            <Typography variant="paragraph" className="line-clamp-3">
              {description}
            </Typography>
          </div>
        </div>

        <Link href={`/blogs/${blogHref}`} className="px-5 pb-5">
          <Typography
            variant={"smallTitle"}
            className=" flex items-center gap-2 font-semibold"
          >
            <span>Read More</span> <ArrowRight className=" h-4 w-4" />
          </Typography>{" "}
        </Link>
      </Card>
    </>
  );
}
