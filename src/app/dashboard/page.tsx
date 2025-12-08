import { Logout } from '@/components/logout';

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <Logout />
    </div>
  );
}
