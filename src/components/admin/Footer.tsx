
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#1A1F2C] border-t border-purple-500/20 p-4">
      <div className="flex justify-between items-center text-sm text-gray-400">
        <p>Last synced: 2 minutes ago</p>
        <div className="flex gap-4">
          <Link to="/admin/help" className="hover:text-purple-400">
            Help
          </Link>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
