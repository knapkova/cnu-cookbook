import {
  Text,
  Heading,
  Box,
  Table,
  Tr,
  TableContainer,
  Button,
  Link,
} from '@chakra-ui/react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { api } from '../api';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  toHoursAndMinutes,
  showSideDish,
  LastModDate,
} from '../components/RecipeCard';

export function RecipeTrimmer(direction) {
  let text = direction;
  let textCopy = [...text];
  let odrazka = '💚';
  for (let i = 0; i < textCopy.length; i++) {
    textCopy[0] = odrazka;
    if (textCopy[i] === '\n') {
      textCopy[i] = <br />;
      textCopy[i + 1] = odrazka;
      textCopy[i + 2] = ' ';
    }
  }
  return textCopy;
}

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [detail, setDetail] = useState(null);

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

  return (
    <Box px={5}>
      {detail && (
        <>
          <Heading align="left">{detail.title}</Heading>
          <Heading align="right">
            <Link as={ReactRouterLink} to={`/edit-recipe/${slug}`}>
              <Button>Upravit/Smazat</Button>
            </Link>
          </Heading>
          <Box display="flex" justifyContent="space-between" mt={10}>
            <Box>
              <Heading size={12}>{'Doba přípravy'}</Heading>
              <Text mb={3}>{toHoursAndMinutes(detail.preparationTime)}</Text>
              <Text size={15}>{showSideDish(detail.sideDish)}</Text>
              <Heading size={12}>{'Ingredience'}</Heading>

              <TableContainer ingredientsTable>
                {detail.ingredients && (
                  <Table size={'sm'} mb={'auto'}>
                    {detail.ingredients.map((ingredient) => (
                      <thead>
                        <Tr key={ingredient._id}>
                          <td>{ingredient.name}</td>
                          <td align="right">{ingredient.amount}</td>
                          <td>{ingredient.amountUnit}</td>
                        </Tr>
                      </thead>
                    ))}
                  </Table>
                )}
              </TableContainer>
              <Heading size={12}>🧹Naposledy upraveno:</Heading>
              <Text>{LastModDate(detail.lastModifiedDate)}</Text>
            </Box>
            <Box marginLeft={20}>{RecipeTrimmer(detail.directions)} </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
