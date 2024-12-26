import React from "react";
// UI Components
import { Grid, Card, Text, Stack, AspectRatio, Skeleton } from "@stewed/react";
// API
import { useGetImages } from "../../../../../api/useGetImages";

export function MadeForYou(): React.ReactElement {
  // Get images
  const { data, isLoading } = useGetImages({ query: "albums" });

  return (
    <Grid cols={2} responsive={{ sm: { cols: 4 }, md: { cols: 8 } }} gap="md">
      {isLoading ? (
        <>
          {Array.from({ length: 8 }).map((_, key) => (
            <Card key={key}>
              <AspectRatio ratio="3:2">
                <Skeleton radius="none" size="auto" />
              </AspectRatio>

              <Card.Body>
                <Stack direction="column" gap="sm">
                  <Skeleton size="xs" />
                  <Skeleton size="xxs" />
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <>
          {data?.results?.map(({ urls, user, alt_description }, index) => (
            <Card key={index} padding={{ block: "lg", inline: "md" }}>
              <Card.Media
                image={{ src: `${urls.raw}&w=200&h=200&fit=crop`, alt: alt_description }}
              />

              <Card.Body>
                <Text size="sm" weight="medium">
                  {user.name}
                </Text>
                <Text size="xs" skin="neutral">
                  @{user.username}
                </Text>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Grid>
  );
}