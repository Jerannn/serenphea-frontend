import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError() as Error;

  return <div>{error.message}</div>;
}
