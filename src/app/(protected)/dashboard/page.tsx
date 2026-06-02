import { getSavedCardForUser } from "@/app/actions/cards";
import { getCardTemplates } from "@/app/actions/templates";
import DashboardPage from "@/components/dashboard/dashboard-page";

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
      <DashboardPage
        key={initialCard?.id ?? "new"}
        templates={templates}
        initialCard={initialCard}
      />
    </div>
  );
}
