export const bookMenu = [
  { name: "Minhas Estantes", to: "" },
  { name: "Meus Livros", to: "" },
  { name: "Explorar Catálogo", to: "" },
];

export const managementMenu = (changeName: boolean) => [
  { name: changeName ? "Gerenciar Catálogo" : "Catálogo", to: "" },
  {
    name: changeName ? "Gerenciar Administradores" : "Administradores",
    to: "admin/manage-admins",
  },
];

export const userMenu = [
  { name: "Perfil", to: "" },
  { name: "Critérios de Avaliação", to: "" },
  { name: "Sair", to: "" },
];
