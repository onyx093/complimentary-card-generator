import DashboardPage from "@/components/dashboard/dashboard-page";
import { getCardTemplates } from "../actions/templates";
import { getSavedCardForUser } from "../actions/cards";

type DashboardProps = {
  searchParams?:
    | {
        edit?: string | string[];
      }
    | Promise<{
        edit?: string | string[];
      }>;
};

export default async function Dashboard({ searchParams }: DashboardProps) {
  const templates = await getCardTemplates();
  const resolvedSearchParams = await searchParams;
  const editParam = resolvedSearchParams?.edit;
  const editCardId =
    typeof editParam === "string"
      ? editParam
      : Array.isArray(editParam)
        ? editParam[0]
        : undefined;
  const initialCard = editCardId ? await getSavedCardForUser(editCardId) : null;

  return (
    <div>
      <DashboardPage templates={templates} initialCard={initialCard} />
    </div>
  );
}
