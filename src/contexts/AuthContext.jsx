import { User } from "./UserContext";
import { Admin } from "./AdminContext";
import { toast } from "sonner";
import { supabase } from "../supabase";
import { createContext, useContext, useEffect, useState } from "react";
import { decodeJWT } from "../constants/functions";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorToast, setErrorToast] = useState(null);
  //const [isLoading, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* INSTANCES
  _________________________________________ */
  const createUserInstance = (data) => {
    if (!data) {
      console.error("No data provided for User instance");
      return null;
    }
    return new User(data, setErrorToast);
  };

  const createAdminInstance = (data) => {
    if (!data) {
      console.error("No data provided for User instance");
      return null;
    }
    return new Admin(data, setErrorToast);
  };

  /* FUNCTIONS
  _________________________________________ */

  const register = async (data, captchaToken) => {
    const user = new User({ ...data, role: "user" });
    const res = await user.create(captchaToken);

    if (res.error) {
      setErrorToast(res.error.message);
      return;
    }

    return;
  };

  const login = async (data, withPassword = true, captchaToken) => {
    try {
      const user = new User(data);
      const res = await user.login(withPassword, captchaToken);

      if (res.error) {
        setErrorToast(res.error.message);
        return false;
      }

      // Si se logea con OTP, no hay user
      if (!res.data.user) return true;

      const jwt = res.data.session.access_token;
      const decoded = decodeJWT(jwt);

      setUser({
        ...res.data.session.user,
        user_metadata: {
          ...res.data.session.user.user_metadata,
          role: decoded.user_role,
        },
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  const getInfo = async () => {
    const isAuthenticated = await supabase.auth.getUser();

    if (isAuthenticated.error) {
      localStorage.clear();
      setIsAuthenticated(false);
      setUser(null);

      return;
    }

    const res = await supabase
      .from("usuarios")
      .select()
      .eq("usuario_id", user.id)
      .single();

    return res.data;
  };

  const hasPermissions = async (module) => {
    const { data } = await supabase.rpc("authorize", {
      requested_permission: `${module}.get`,
    });

    return data;
  };

  /* HOOKS
  _________________________________________ */

  useEffect(() => {
    // Suscribirse a eventos de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`Auth event: ${event}`);

        if (
          event === "SIGNED_IN" ||
          event === "TOKEN_REFRESHED" ||
          event === "INITIAL_SESSION"
        ) {
          if (session && session.user) {
            const jwt = session.access_token;
            const decoded = decodeJWT(jwt);

            setUser({
              ...session.user,
              user_metadata: {
                ...session.user.user_metadata,
                role: localStorage.getItem("role") || decoded.user_role,
              },
            });
            setIsAuthenticated(true);
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setIsAuthenticated(false);
        }

        setIsLoading(false); // Indicar que la autenticación ha terminado
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (errorToast) {
      toast.error("Error", {
        description: errorToast,
      });
      setErrorToast(null);
    }
  }, [errorToast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isLoading,
        register,
        hasPermissions,
        login,
        logout,
        getInfo,
        createUserInstance,
        createAdminInstance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
