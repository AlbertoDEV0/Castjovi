import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hola123") {
      toast.success("Benvingut, administrador! 👨‍💼");
      navigate("/admin/dashboard");
    } else {
      toast.error("Contrasenya incorrecta");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen relative overflow-hidden p-8 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #FFE5B4 0%, #FFDAB9 25%, #FFE4C4 50%, #FFEFD5 75%, #FFF8DC 100%)",
      }}
    >
      {/* Patrón de textura */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%),
                           radial-gradient(circle at 80% 80%, transparent 0%, rgba(255,200,150,0.3) 50%, transparent 100%)`,
        }}
      />

      {/* Decoraciones */}
      <div
        className="absolute top-20 left-20 w-20 h-20 rounded-full opacity-30 blur-sm"
        style={{
          background:
            "linear-gradient(135deg, #ff0046, #ff4570)",
        }}
      ></div>
      <div
        className="absolute bottom-40 right-20 w-24 h-24 rounded-full opacity-30 blur-sm"
        style={{
          background:
            "linear-gradient(135deg, #00a1e8, #4ab8f0)",
        }}
      ></div>

      {/* Formulario de login */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl w-full relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <img
            src={logo}
            alt="CASTJOVI Logo"
            className="h-32 w-auto mx-auto drop-shadow-2xl mb-6"
          />
          <h2
            className="text-5xl font-black mb-2"
            style={{
              color: "#ff8000",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }}
          >
            Panel d'Administració
          </h2>
        </div>

        {/* Tarjeta de login */}
        <div
          className="rounded-[2.5rem] p-12"
          style={{
            background:
              "linear-gradient(145deg, #ffffff, #f5f5f5)",
            boxShadow:
              "0 10px 0 #d0d0d0, 0 15px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="flex justify-center mb-8">
            <div
              className="p-6 rounded-full"
              style={{
                background:
                  "linear-gradient(145deg, #ff0046, #ff4570)",
                boxShadow:
                  "0 6px 0 #d12456, 0 8px 20px rgba(255, 0, 70, 0.3)",
              }}
            >
              <Lock className="size-16 text-white" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-2xl font-black text-gray-800 mb-3 block">
                Contrasenya
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introdueix la contrasenya"
                className="w-full px-8 py-5 rounded-full text-2xl font-semibold focus:outline-none"
                style={{
                  background:
                    "linear-gradient(145deg, #ffffff, #f9f9f9)",
                  boxShadow:
                    "inset 0 2px 8px rgba(0, 0, 0, 0.1)",
                  border: "2px solid #e5e7eb",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 rounded-full text-3xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
              style={{
                background:
                  "linear-gradient(145deg, #84cc16, #a3e635)",
                color: "white",
                boxShadow:
                  "0 8px 0 #65a30d, 0 12px 25px rgba(132, 204, 22, 0.4)",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Iniciar Sessió
            </button>
          </form>

          <p className="text-center text-gray-500 mt-8 text-lg font-semibold">
          </p>
        </div>

        {/* Botón volver */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 mx-auto block px-8 py-4 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
          style={{
            background: "rgba(255, 221, 0, 0.3)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            color: "white",
            boxShadow:
              "0 8px 32px rgba(255, 221, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 221, 0, 0.4)",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Tornar a Inici
        </button>
      </motion.div>
    </motion.div>
  );
}