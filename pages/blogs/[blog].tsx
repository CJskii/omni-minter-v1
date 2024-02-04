import { Layout } from "@/components/dashboard/layout";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import blog from "@/assets/blog.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Blog() {
  return (
    <Layout
      className="py-24 md:w-11/12 mx-auto min-h-[90vh]"
      showGrid={false}
      showGradient={false}
    >
      <div className=" py-10 space-y-8">
        <div className=" space-y-3 flex items-center justify-between flex-wrap">
          <Typography variant={"h1"}>Lorem Ipsum - Blog title</Typography>
          <div>
            <Link className="flex items-center gap-2" href={"#"}>
              <Typography variant={"large"}>Abbas Khan</Typography>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
        <Image
          src={blog}
          alt={"blog banner"}
          className=" w-full max-h-96 object-cover rounded-xl"
        />
        <Typography variant={"paragraph"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          deserunt quisquam explicabo maxime repellendus, sed fugit! Quis
          nostrum, eaque aliquid temporibus eius perspiciatis, itaque nam optio
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          deserunt quisquam explicabo maxime repellendus, sed fugit! Quis
          nostrum, eaque aliquid temporibus eius perspiciatis, itaque nam optio
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          deserunt quisquam explicabo maxime repellendus, sed fugit! Quis
          nostrum, eaque aliquid temporibus eius perspiciatis,
          <br />
          <br />
          itaque nam optio Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consequuntur deserunt quisquam explicabo maxime repellendus, sed
          fugit! Quis nostrum, eaque aliquid temporibus eius perspiciatis,
          itaque nam optio Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consequuntur deserunt quisquam explicabo maxime repellendus, sed
          fugit! Quis nostrum, eaque aliquid temporibus eius perspiciatis,
          itaque nam optio suscipit, laudantium accusantium ex.{" "}
        </Typography>
      </div>
    </Layout>
  );
}
