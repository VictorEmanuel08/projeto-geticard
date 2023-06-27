import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { CreateUser } from "../pages/CreateUser";
import { CreateCard } from "../pages/CreateCard";
import { CardUser } from "../pages/CardUser";
import { CardView } from "../pages/CardView";
import { CardEdit } from "../pages/CardEdit";
import { AuthProvider } from "../context/UserContext";
import { Private } from "../components/Private";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastrar-usuario/:card_id" element={<CreateUser />} />

          <Route
            path="/cadastrar-card/:card_id"
            element={
              <Private>
                <CreateCard />
              </Private>
            }
          />

          <Route
            path="/editar-card/:card_id"
            element={
              <Private>
                <CardEdit />
              </Private>
            }
          />
          <Route
            path="/card-user/:card_id"
            element={
              <Private>
                <CardUser />
              </Private>
            }
          />
          <Route path="/card-view/:card_id" element={<CardView />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
