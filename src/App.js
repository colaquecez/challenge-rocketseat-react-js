import React, { useState, useEffect } from "react";
import Api from "./services/api";
import "./styles.css";

function App() {
  const uuid = require("uuid");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    Api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await Api.post("repositories", {
      title: `Repository ${uuid.v4()}`,
      url: "http://www.colaquecez.dev",
      techs: ["Node", "React Native", "React"],
    });

    const project = response.data;

    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    await Api.delete(`repositories/${id}`);
    const index = repositories.findIndex((rep) => rep.id === id);
    setRepositories(repositories.filter((item, i) => i !== index));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <React.Fragment key={repository.id}>
            <li>
              <h1>{repository.title}</h1>
            </li>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </React.Fragment>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
