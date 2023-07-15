import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

import { AddBookPage } from "@/ui/shared/pages/AddBook";
import { BookDetailsPage } from "@/ui/shared/pages/BookDetails";
import { CatalogPage } from "@/ui/shared/pages/Catalog";
import { EditBookPage } from "@/ui/shared/pages/EditBook";
import { HomePage } from "@/ui/shared/pages/Home";
import { MemberProfilePage } from "@/ui/shared/pages/MemberProfile";
import { MemberRegistrationPage } from "@/ui/shared/pages/MemberRegistration";
import { NotFound } from "@/ui/shared/pages/NotFound";

export const App = () => {
  return (
    <Container>
      <header>
        <Link to="/">Home</Link> <Link to="/profile">Profile</Link>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* CATALOG */}
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/add" element={<AddBookPage />} />
        <Route path="/catalog/:bookId" element={<BookDetailsPage />} />
        <Route path="/catalog/:bookId/edit" element={<EditBookPage />} />

        {/* MEMBERS */}
        <Route path="/register" element={<MemberRegistrationPage />} />
        <Route path="/profile" element={<MemberProfilePage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};
