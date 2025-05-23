"use client";

import { Outlet } from "react-router-dom";

const CMSLayout: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.30.0/tabler-icons.min.css"
        rel="stylesheet"
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default CMSLayout;
