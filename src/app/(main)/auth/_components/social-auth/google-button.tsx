
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";

export function GoogleButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" className={cn(className)} {...props}>
      <MailIcon className="size-4 text-primary" />
      Şirket maili ile devam et
    </Button>
  );
}
