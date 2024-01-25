import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewsletterSection() {
  return (
    <div className="flex flex-col items-stretch justify-between gap-4 pb-16 pt-12  md:flex-row md:items-center md:pb-0 md:pt-12">
      <div className="space-y-1">
        <Typography variant={"h3"} className="tracking-wide">
          Sign up for our newsletter
        </Typography>
        <Typography variant={"paragraph"} className="tracking-wide">
          Stay up to date with our latest updates and news.
        </Typography>
      </div>

      <div>
        <div className="relative">
          <Input
            type="email"
            placeholder="email@example.com"
            className=" h-12 rounded-xl bg-[#E9E9E9] pr-28 text-black dark:bg-white"
          />
          <Button className="bg-gradient absolute  right-0 top-0 h-12 rounded-xl font-normal text-black hover:opacity-90">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
