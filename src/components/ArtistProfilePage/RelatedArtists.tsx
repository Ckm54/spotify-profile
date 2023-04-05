import {
  Box,
  Grid,
  Text
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { RelatedArtistsData, RelatedArtistsType } from "../../../types";
import { getArtistRelatedArtists } from "../../api/apiCalls";
import RelatedArtist from "./RelatedArtist";

type Props = {};

const RelatedArtists = (props: Props) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [relatedArtists, setRelatedArtists] = React.useState<
    RelatedArtistsType[]
  >([]);

  const { isLoading } = useQuery(
    ["getRelatedArtists", id],
    () => getArtistRelatedArtists(id!),
    {
      onSuccess: (data: RelatedArtistsData) => {
        setRelatedArtists(data.artists);
      },
      enabled: !!id,
    }
  );

  React.useEffect(() => {
    setRelatedArtists([]);
  }, [pathname])

  return (
    <Box maxW="100%">
      <Text color={"#fff"} fontWeight={600} mb={8} pl={5} mt={{ xl: 4 }}>
        Related Artists
      </Text>

      <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(6, 1fr)"}} gridGap={4} gridRowGap={6}>
        {relatedArtists?.length > 0 &&
          relatedArtists.map((artist: RelatedArtistsType) => (
            <RelatedArtist artist={artist} />
          ))}
      </Grid>
    </Box>
  );
};

export default RelatedArtists;
