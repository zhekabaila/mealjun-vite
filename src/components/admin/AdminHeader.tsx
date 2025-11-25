import { LogOut, User, ExternalLink } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface AdminHeaderProps {
  session: any;
}

export default function AdminHeader({ session }: AdminHeaderProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-gray-900">Selamat Datang, Admin!</h2>
          <p className="text-sm text-gray-500">Kelola website Mealjun dengan mudah</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Website Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <ExternalLink size={18} />
            <span>Lihat Website</span>
          </a>

          {/* User Info */}
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="text-sm">
              <div className="text-gray-900">{session?.user?.email}</div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
