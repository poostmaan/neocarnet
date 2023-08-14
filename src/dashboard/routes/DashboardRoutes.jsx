import { Navigate, Route, Routes } from "react-router-dom";
import {
  CarnetPage,
  ControlPersons,
  MainPage,
  ProfilePage,
  CarnetsPage,
} from "../pages";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dashboard" element={<MainPage />} />
      <Route path="/dashboard/persons" element={<ControlPersons />} />
      <Route path="/dashboard/carnets" element={<CarnetsPage />} />
      <Route path="/dashboard/editor" element={<CarnetsPage />} />
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
