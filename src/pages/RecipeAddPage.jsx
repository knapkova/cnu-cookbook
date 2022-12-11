import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useState, useId } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import '/Users/terezaknapkova/Documents/cnu-cookbook/src/App.css';
import axios from 'axios';

export function RecipeAddPage() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [preparationTime, setPrepTime] = useState('');
  const [sideDish, setSideDish] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [amountUnit, setAmountUnit] = useState('');
  const [instruction, setInstruction] = useState('');
  const [message, setMessage] = useState('');
  const [unit, setUnit] = useState('');
  const [value, setValue] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleChange = (event) => setValue(event.target.value);
  const _id = useId();
  const recipesInfo = axios.create({
    baseURL: 'https://exercise.cngroup.dk/api/recipes/',
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Text>Error</Text>;
  }

  const handleTitle = (event) => {
    const title = event.target.value;
    setTitle(title);
  };
  const handlePrepTime = (event) => {
    const preparationTime = event.target.value;
    setPrepTime(preparationTime);
  };
  const handleSideDish = (event) => {
    const sideDish = event.target.value;
    setSideDish(sideDish);
  };
  const handleInstruction = (event) => {
    const instruction = event.target.value;
    setInstruction(instruction);
  };
  var date = new Date();

  const submitRecipe = async (e) => {
    e.preventDefault();
    const recipeData = {
      _id: _id,
      title: title,
      preparationTime: preparationTime,
      sideDish: sideDish,
      ingredient: ingredient,
      amountUnit: amountUnit,
      lastModifiedDate: date.toISOString(),
      slug: title.replace(' ', '-'),
      unit: unit,
      instruction: instruction,
    };
    await axios
      .post(
        `https://exercise.cngroup.dk/api/recipes/${_id}`,
        JSON.stringify(recipeData),
      )
      .then((result) => {
        setMessage(result.data.msg);
        console.log(result.data);
        console.log(result.data.msg);
      });
  };

  return (
    <>
      {' '}
      <form onSubmit={submitRecipe}>
        <Heading placeholder="Název receptu">{title}</Heading>
        <Box
          display="flex"
          justifyContent="space-between"
          mt={10}
          paddingRight={5}
        >
          <Box>
            <input
              type="text"
              value={title}
              placeholder="Název receptu"
              onChange={(e) => handleTitle(e)}
            />
            <input
              type="int"
              value={preparationTime}
              placeholder="Čas přípravy"
              onChange={(e) => handlePrepTime(e)}
            />
            <input
              type="text"
              value={sideDish}
              placeholder="Příloha"
              onChange={(e) => handleSideDish(e)}
            />
          </Box>
          <Box ingredientBox>
            <input
              type="text"
              value={ingredient}
              placeholder="Ingredience"
              onChange={(e) => setIngredient(e.target.value)}
            />
            <input
              type="int"
              value={amountUnit}
              placeholder="množství"
              onChange={(e) => setAmountUnit(e.target.value)}
            />
            <input
              type="text"
              value={unit}
              placeholder="jednotka"
              onChange={(e) => setUnit(e.target.value)}
            />
            <Button size={15}>Přidat ingredienci</Button>
          </Box>
          <Box></Box>
          <textarea
            type="text"
            width={144}
            value={instruction}
            placeholder="popis"
            onChange={(e) => handleInstruction(e)}
          />{' '}
          <button type="submit" width={15}>
            Vytvořit
          </button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </Box>{' '}
      </form>
      <Heading>Náhled</Heading>
    </>
  );
}
