import DashboardPage from '@/components/dashboard/dashboard-page';
import { getCardTemplates } from '../actions/templates';

export default async function Dashboard() {
  const templates = await getCardTemplates();

  return (
    <div>
      <DashboardPage templates={templates} />
    </div>
  );
}
