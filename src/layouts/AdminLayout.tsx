import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* AdminSidebar placeholder - components/admin/AdminSidebar.tsx */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* AdminTopbar placeholder - components/admin/AdminTopbar.tsx */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
