// import { auth, signOut } from "@/auth";
// import { redirect } from "next/navigation";
// import Image from "next/image";

import DashPage from "@/components/dashboard/DashPage";

// export default async function Dashboard() {
//   const session = await auth();

//   if (!session) {
//     redirect("/auth/login");
//   }

//   async function handleSignOut() {
//     "use server";
//     await signOut({ redirectTo: "/" });
//   }

//   return (
//     <>
//       {session.user?.image && (
//         <Image
//           src={session.user.image}
//           alt={session.user?.name ?? "User avatar"}
//           style={{ width: 64, height: 64, borderRadius: 9999 }}
//         />
//       )}

//       <h1>Welcome, {session.user?.name}</h1>
//       <p>{session.user?.email}</p>

//       <form action={handleSignOut}>
//         <button type="submit">Sign Out</button>
//       </form>

//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </>
//   );
// }

export default function Dashboard() {
  return (
    <div>
      <DashPage />
    </div>
  );
}
