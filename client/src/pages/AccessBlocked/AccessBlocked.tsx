import { Link } from "react-router-dom";

export const AccessBlocked = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-12">
      <h1 className="sceroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Access Blocked!!
      </h1>
      <p>You don't have permission to be here... Go Back!</p>
      <Link
        to={"/"}
        className="bg-muted p-2 rounded-2xl transition-all hover:bg-muted-foreground text-black"
      >
        Go Back
      </Link>
    </div>
  );
};
