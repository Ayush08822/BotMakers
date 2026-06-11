import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo with Gradient */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm">
            <span className="text-indigo-600 text-sm font-bold">T</span>
          </div>
          <span className="font-display font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
            Task<span className="text-slate-800">Flow</span>
          </span>
        </div>

        {/* User info + logout */}
        {user && (
          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">
                {user.name || "User"}
              </p>
              <p className="text-xs text-slate-500 mt-1">{user.email}</p>
            </div>
            <span
              className={user.role === "ADMIN" ? "badge-admin" : "badge-user"}
            >
              {user.role === "ADMIN" ? "⬡" : "◈"} {user.role}
            </span>
            <div className="w-px h-8 bg-slate-200 mx-1"></div> {/* Divider */}
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors duration-200 uppercase tracking-wider"
            >
              Logout →
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
