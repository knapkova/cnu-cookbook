import { Box, Heading, Text, Button, Table, Tr } from '@chakra-ui/react';
import { useState, useId, useEffect } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import '/Users/terezaknapkova/Documents/cnu-cookbook/src/App.css';
import { api } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

export function EditRecipePage() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [detail, setDetail] = useState(null);
  const [tempDetail, setTempDetail] = useState(null);
  const [title, setTitle] = useState('');
  const [tempTitle, setTempTitle] = useState('');
  const [preparationTime, setPrepTime] = useState('');
  const [tempPreparationTime, setTempPrepTime] = useState('');
  const [sideDish, setSideDish] = useState('');
  const [tempSideDish, setTempSideDish] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [tempIngredient, setTempIngredient] = useState('');
  const [amountUnit, setAmountOfIngr] = useState('');
  const [tempAmountUnit, setTempAmountOfIngr] = useState('');
  const [instruction, setInstruction] = useState('');
  const [tempInstruction, setTempInstruction] = useState('');
  const [unit, setUnit] = useState('');
  const [tempunit, setTempUnit] = useState('');
  const [message, setMessage] = useState('');
  const _id = useId();

  useEffect(() => {
    function getRecipeDetail() {
      setIsLoading(true);
      api
        .get(`/recipes/${slug}`)
        .then((response) => setDetail(response.data))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }

    getRecipeDetail();
  }, [slug]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Text>Error</Text>;
  }

  /*function getUsers() {
    fetch(`https://exercise.cngroup.dk/api/recipes/${_id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setTitle(resp[0].title);
        setAmountOfIngr(resp[0].amountOfIngr);
        setIngredient(resp[0].ingredient);
        setInstruction(resp[0].instruction);
        setPrepTime(resp[0].preparationTime);
        setSideDish(resp[0].preparationTime);
        setAmountOfIngr(resp[0].preparationTime);
      });
    });
  }

  function deleteUser(_id) {
    fetch(`https://exercise.cngroup.dk/api/recipes/${_id}`, {
      method: 'DELETE',
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUsers();
      });
    });
  }

  function updateRecipe() {
    let item = {
      title,
      preparationTime,
      sideDish,
      ingredient,
      amountUnit,
      unit,
    };
    console.warn('item', item);
    fetch(` https://exercise.cngroup.dk/api/recipes/${_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUsers();
      });
    });
  }
*/
  return (
    <>
      {' '}
      <form>
        <table border="1" style={{ float: 'left' }}>
          <Box display="flex" justifyContent="space-between" mt={10}>
            <Heading placeholder="Název receptu">{title}</Heading>
            {detail && (
              <>
                <Box>
                  <Text>Název</Text>
                  <input
                    type="text"
                    value={detail.title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <Text>Čas přípravy</Text>
                  <input
                    type="int"
                    value={detail.preparationTime}
                    onChange={(e) => {
                      setPrepTime(e.target.value);
                    }}
                  />
                  <Text>Příloha</Text>
                  <input
                    type="text"
                    value={detail.sideDish}
                    onChange={(e) => setSideDish(e.target.value)}
                  />
                </Box>
                <Box>
                  <Table size={'sm'} mb={'auto'} width={20}>
                    {detail.ingredients.map((ingredient) => (
                      <thead>
                        <Tr key={ingredient._id}>
                          <td>
                            <input
                              type="text"
                              width={22}
                              value={ingredient.name}
                              onChange={(e) => setIngredient(e.target.value)}
                            />
                          </td>
                          <td align="right">
                            {' '}
                            <input
                              type="int"
                              value={ingredient.amount}
                              onChange={(e) => setAmountOfIngr(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={ingredient.amountUnit}
                              onChange={(e) => setUnit(e.target.value)}
                            />
                          </td>
                        </Tr>
                      </thead>
                    ))}
                    <Button>Přidat ingredienci</Button>
                  </Table>
                  <Box>
                    <textarea
                      type="text"
                      value={detail.directions}
                      onChange={(e) => setInstruction(e.target.value)}
                    />
                  </Box>{' '}
                </Box>
                <Box>
                  <button>Uložit změny</button>
                  <button>Smazat repect</button>
                </Box>
              </>
            )}{' '}
          </Box>
        </table>
      </form>{' '}
    </>
  );
}
