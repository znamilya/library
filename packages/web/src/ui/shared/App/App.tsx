import Container from "@mui/material/Container";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

import { AddBookPage } from "@/ui/shared/pages/AddBook";
import { BookDetailsPage } from "@/ui/shared/pages/BookDetails";
import { CatalogPage } from "@/ui/shared/pages/Catalog";
import { EditBookPage } from "@/ui/shared/pages/EditBook";
import { MemberProfilePage } from "@/ui/shared/pages/MemberProfile";
import { MemberRegistrationPage } from "@/ui/shared/pages/MemberRegistration";
import { NotFound } from "@/ui/shared/pages/NotFound";
import { Header } from "./partials/Header";

export const App = () => {
  return (
    <>
      <Header mb={3} />
      <Container>
        <Routes>
          <Route path="/" element={<CatalogPage />} />

          {/* CATALOG */}
          <Route path="/catalog/add" element={<AddBookPage />} />
          <Route path="/catalog/:bookId" element={<BookDetailsPage />} />
          <Route path="/catalog/:bookId/edit" element={<EditBookPage />} />

          {/* BORROWING */}
          <Route path="/checkout-book" element={<EditBookPage />} />

          {/* MEMBERS */}
          <Route path="/register" element={<MemberRegistrationPage />} />
          <Route path="/profile" element={<MemberProfilePage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};
