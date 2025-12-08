import { redirect } from "next/navigation";


export default function Page() {
  const today = new Date();

  redirect(
    "/dashboard/calendar/" + today.getFullYear() + "/" + (today.getMonth() + 1),
  );
}
