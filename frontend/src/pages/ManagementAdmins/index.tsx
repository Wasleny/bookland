import { useEffect, useState, type FormEvent } from "react";
import SearchForm from "../../components/Form/SearchForm";
import Typography from "../../components/Typography";
import { StyledSection, UserFooter, UserHeader, Users } from "./styles";
import type { UserProps } from "../../types/user";
import users from "../../mocks/mockUsers";
import Avatar from "../../components/Avatar";
import Card from "../../components/Card";
import Button from "../../components/Button";

const ManagementAdmins = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<UserProps[]>([]);
  const [admins, setAdmins] = useState<UserProps[]>([]);
  const [usersMock, setUsersMock] = useState<UserProps[]>(users);
  const breakpoint = "md";

  useEffect(() => {
    setAdmins(usersMock.filter((user) => user.role === "admin"));
    setSearch("");
    setResults([]);
  }, [usersMock]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const filtered = usersMock.filter((user) => user.email === search);
    setResults(filtered);
  };

  const onDelete = (id: string) => {
    setUsersMock(
      usersMock.map((user) => {
        if (user.id === id) {
          return { ...user, role: "user" };
        }
        return user;
      })
    );
  };

  const elevateToAdmin = (id: string) => {
    setUsersMock(
      usersMock.map((user) => {
        if (user.id === id) {
          return { ...user, role: "admin" };
        }
        return user;
      })
    );

    setResults([]);
  };

  return (
    <>
      <SearchForm
        placeholder="Busque por e-mail de usuários..."
        onSubmit={onSubmit}
        search={search}
        setSearch={setSearch}
      />

      <StyledSection>
        {results.length > 0 && (
          <>
            <Users>
              {results.map((result) => (
                <Card
                  breakpoint={breakpoint}
                  key={result.id}
                  justifyContent="space-between"
                  flexDirection="row"
                  gap="lg"
                >
                  <UserHeader>
                    <Avatar key={result.id} path={result.avatarUrl} />
                    <div>
                      <Typography variant="searchTitle">
                        {result.name}
                      </Typography>
                      <Typography variant="body">{result.email}</Typography>
                    </div>
                  </UserHeader>
                  <UserFooter>
                    {result.role === "user" ? (
                      <Button
                        variant="submit"
                        onClick={() => elevateToAdmin(result.id)}
                      >
                        Tornar Admin
                      </Button>
                    ) : (
                      <Button
                        variant="remove"
                        onClick={() => onDelete(result.id)}
                      >
                        Excluir Admin
                      </Button>
                    )}
                  </UserFooter>
                </Card>
              ))}
            </Users>

            <hr />
          </>
        )}

        <Typography variant="h1">Administradores</Typography>
        <Users>
          {admins.map((admin) => (
            <Card
              breakpoint={breakpoint}
              key={admin.id}
              justifyContent="space-between"
              gap="lg"
              flexDirection="row"
            >
              <UserHeader>
                <Avatar key={admin.id} path={admin.avatarUrl} />
                <div>
                  <Typography variant="searchTitle">{admin.name}</Typography>
                  <Typography variant="body">{admin.email}</Typography>
                </div>
              </UserHeader>
              <UserFooter>
                <Button variant="remove" onClick={() => onDelete(admin.id)}>
                  Excluir Admin
                </Button>
              </UserFooter>
            </Card>
          ))}
        </Users>
      </StyledSection>
    </>
  );
};

export default ManagementAdmins;
