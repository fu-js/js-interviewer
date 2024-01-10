import { useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function (props: any) {
  const [isLoading, setIsLoading] = useState(false);

  const loadingWithState = async () => {
    setIsLoading(true);
    await props.onClick();
    setIsLoading(false);
  };

  return (
    <Button {...props} onClick={loadingWithState}>
      {isLoading ? <ReloadIcon className="w-5 h-5 mr-2 animate-spin" /> : null}
      {props.children}
    </Button>
  );
}
