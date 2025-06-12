export const bookMenu = [
  { name: "Minhas Estantes", to: "/my-shelves" },
];

export const managementMenu = (changeName: boolean) => [
  { name: changeName ? "Gerenciar Catálogo" : "Catálogo", to: "/admin/manage-catalog" },
  {
    name: changeName ? "Gerenciar Administradores" : "Administradores",
    to: "admin/manage-admins",
  },
];

export const userMenu = [
  { name: "Perfil", to: "/profile" },
  { name: "Critérios de Avaliação", to: "/rating-criteria" },
  { name: "Sair", to: "" },
];
