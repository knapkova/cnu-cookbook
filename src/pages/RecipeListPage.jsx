import { useEffect, useState } from 'react';
import { Heading, Box, Text, Input } from '@chakra-ui/react';
import { api } from '/Users/terezaknapkova/Documents/cnu-cookbook/src/api.js';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { RecipeList } from '../components/RecipeList';

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');

  //při načtení stránky se automaticky načte
  useEffect(() => {
    function getRecipes() {
      setIsLoading(true);
      api
        .get('/recipes')
        .then((response) => setRecipes(response.data))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }

    getRecipes();
  }, []);

  function handleInputValueChange(event) {
    setSearchValue(event.currentTarget.value);
  }
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Box px={5}>
      <Heading align="left" my={4} color="dodgerblue">
        {' '}
        Recepty{' '}
      </Heading>
      <Heading align="right">
        <Input
          placeholder="Hledej"
          value={searchValue}
          onChange={handleInputValueChange}
          width={555}
        />
      </Heading>

      {isLoading && <LoadingSpinner />}
      {error && <Text>{error}</Text>}
      <RecipeList recipes={filteredRecipes} />
    </Box>
  );
}
