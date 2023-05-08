import { useRouteError } from "react-router-dom";
import Portal from "../layouts/portal";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Portal>
      <div id="error-page" className="text-center pt-5" style={{height: '40vh'}}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Portal>
  );
}
