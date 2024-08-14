import React, { useCallback, useRef, useState } from "react";
// UI Components
import {
  Avatar,
  Stack,
  Button,
  Card,
  Carousel,
  Container,
  Dialog,
  Drawer,
  Dropdown,
  FormField,
  Grid,
  Hoverable,
  ListBox,
  Select,
  Separator,
  Snackbar,
  Tabs,
  Text,
  TextField,
  Theme,
  useSnackbar,
  Box,
  Scope,
} from "@stewed/react";
// Hooks
import { useToggle, useFloating } from "@stewed/hooks";
// Icons
import { IoMdClose } from "react-icons/io";
import { RiHistoryLine } from "react-icons/ri";
import { TbMenuDeep } from "react-icons/tb";
import { FaPlayCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlinePlayCircleOutline, MdOutlinePodcasts } from "react-icons/md";
import { IoRadioOutline } from "react-icons/io5";
import { RxGrid } from "react-icons/rx";
import { RiPlayListFill } from "react-icons/ri";
import { LuListMusic } from "react-icons/lu";
import { LuMusic2 } from "react-icons/lu";
import { TbMicrophone2 } from "react-icons/tb";
import { RiAlbumFill } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { PiBrowsersFill } from "react-icons/pi";

const meta = {
  title: "Examples/Music",
  decorators: [
    (Story) => (
      <Theme
        theme="default"
        tokens={{
          default: {
            color: {
              primary: "#1DB954",
              secondary: "#333",
            },
            components: {
              "button": {
                radius: "full",
              },
              "text-field": {
                radius: "full",
              },
              "select": {
                radius: "full",
              },
            },
          },
        }}>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

function Music(): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tabValue, setTabValue] = useState<"music" | "podcast">("music");
  const [drawerState, onHandleDrawer] = useToggle(false);
  const [musicDialogState, onHandleMusicDialog] = useToggle(false);
  const [podcastDialogState, onHandlePodcastDialog] = useToggle(false);
  const [displayRecentSearch, onHandleDisplayRecentSearch] = useToggle(false);

  const { add } = useSnackbar();

  const idx = new Date().getTime().toString();

  const { floating, x, y, isPositioned, width } = useFloating<HTMLInputElement, HTMLDivElement>({
    open: displayRecentSearch,
    placement: "bottom",
    reference: inputRef.current,
    offset: 12,
  });

  const onHandleClick = useCallback(
    (index: number) => {
      add({
        id: idx,
        title: "Unexpected error happened",
        message: (
          <Text space={{ y: "none" }} size="sm">
            We have encountered an error when try to reproduce{" "}
            <strong>Daily Mix {index + 1}</strong> again later.
          </Text>
        ),
        skin: "critical",
        dismissDuration: 5000,
      });
    },
    [add],
  );

  return (
    <Container screen="full">
      <Grid cols={3}>
        <Grid.Item>
          <Button
            leftSlot={<TbMenuDeep />}
            skin="secondary"
            appearance="ghost"
            onClick={onHandleDrawer}
            iconOnly>
            Menu
          </Button>
        </Grid.Item>

        <Grid.Item>
          <TextField
            onFocus={onHandleDisplayRecentSearch}
            onBlur={onHandleDisplayRecentSearch}
            rootRef={inputRef}
            list="recent-search"
            skin="neutral"
            appearance="soft"
            leftSlot={<FiSearch />}
            rightSlot={
              <Stack gap="sm">
                <Separator orientation="vertical" />
                <Button
                  leftSlot={<PiBrowsersFill />}
                  size="sm"
                  skin="neutral"
                  appearance="ghost"
                  iconOnly>
                  Browse
                </Button>
              </Stack>
            }
            size="lg"
            placeholder="What do you want to play?"
            fullWidth
          />

          {displayRecentSearch && (
            <Scope elevation="navigation">
              <Card
                ref={floating}
                padding={{ block: "md", inline: "md" }}
                style={{
                  position: "absolute",
                  visibility: isPositioned ? "visible" : "hidden",
                  width: `${width}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                }}>
                <Card.Body>
                  <ListBox>
                    <ListBox.Group title="Recent searches">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <Hoverable key={index}>
                          {({ isHovering, isTouch }) => (
                            <ListBox.Item
                              leftSlot={<RiHistoryLine />}
                              rightSlot={
                                isHovering || isTouch ? (
                                  <Button
                                    size="xs"
                                    skin="neutral"
                                    appearance="ghost"
                                    leftSlot={<IoMdClose />}
                                    iconOnly>
                                    Remove
                                  </Button>
                                ) : undefined
                              }>
                              Daily Mix 1
                            </ListBox.Item>
                          )}
                        </Hoverable>
                      ))}
                    </ListBox.Group>
                  </ListBox>
                </Card.Body>
              </Card>
            </Scope>
          )}
        </Grid.Item>

        <Grid.Item>
          <Stack justify="end">
            <Dropdown<HTMLDivElement>
              placement="bottom-end"
              content={
                <ListBox>
                  <ListBox.Item>Account</ListBox.Item>
                  <ListBox.Item>Profile</ListBox.Item>
                  <ListBox.Item>Settings</ListBox.Item>
                  <ListBox.Item>Logout</ListBox.Item>
                </ListBox>
              }>
              {({ ref, open, close, isOpen }) => (
                <Avatar
                  rootRef={ref}
                  onClick={isOpen ? close : open}
                  src="https://placehold.co/100x100"
                  name="Mauro Vieira"
                />
              )}
            </Dropdown>
          </Stack>
        </Grid.Item>
      </Grid>

      <Separator space={{ block: "md" }} />

      <Box space={{ y: "4xl" }}>
        <Stack items="baseline">
          <Tabs<"music" | "podcast"> value={tabValue} onValueChange={setTabValue}>
            <Tabs.List>
              <Tabs.Item value="music">Music</Tabs.Item>
              <Tabs.Item value="podcast">Podcast</Tabs.Item>
              <Tabs.Item value="live" disabled>
                Live
              </Tabs.Item>
            </Tabs.List>
          </Tabs>

          <Button onClick={onHandleMusicDialog} size="lg" leftSlot={<IoMdAdd />} iconOnly>
            Add music
          </Button>
        </Stack>
      </Box>

      {tabValue === "music" ? (
        <>
          <Grid cols={1} responsive={{ sm: { cols: 2 }, md: { cols: 4 } }} gap="md">
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid.Item key={index}>
                <Hoverable>
                  {({ isHovering, isTouch }) => (
                    <Card shadow="none">
                      <Box skin="neutral-faded">
                        <Stack direction="row" items="center" justify="between" grow>
                          <Stack items="center" gap="md">
                            <img src="https://placehold.co/80x80" style={{ height: "100%" }} />
                            <Text weight="medium">Daily Mix {index + 1}</Text>
                          </Stack>
                          {(isHovering || isTouch) && (
                            <Box padding={{ inline: "md" }}>
                              <Stack items="center">
                                <Button
                                  skin="primary"
                                  leftSlot={<FaPlayCircle />}
                                  onClick={() => onHandleClick(index)}
                                  iconOnly>
                                  Play
                                </Button>
                              </Stack>
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    </Card>
                  )}
                </Hoverable>
              </Grid.Item>
            ))}
          </Grid>

          <Stack direction="column">
            <Text as="h4" space={{ y: "xs" }}>
              Listen Now
            </Text>
            <Text size="sm" skin="neutral">
              Top picks for you. Updated daily.
            </Text>

            <Separator space={{ block: "lg" }} />

            <Carousel
              responsive={{
                xs: {
                  perView: 2,
                },
                md: { perView: 5 },
              }}
              loop={false}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Card key={index} shadow="none">
                  <Stack direction="column" gap="md">
                    <img
                      src="https://placehold.co/900x1200"
                      style={{ width: "100%", height: "100%" }}
                    />

                    <Stack direction="column">
                      <Text size="sm" weight="medium">
                        React Rendezvous
                      </Text>
                      <Text size="sm" skin="neutral">
                        Ethan Byte
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Carousel>
          </Stack>

          <Stack direction="column">
            <Text as="h4" space={{ y: "xs" }}>
              Made for You
            </Text>
            <Text size="sm" skin="neutral">
              Your personal playlists. Updated daily.
            </Text>
            <Separator space={{ block: "lg" }} />
            <Grid cols={2} responsive={{ sm: { cols: 4 }, md: { cols: 8 } }} gap="md">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} shadow="none">
                  <Stack direction="column" gap="md">
                    <img
                      src="https://placehold.co/200x200"
                      style={{ width: "100%", height: "100%" }}
                    />

                    <div>
                      <Text size="sm" weight="medium">
                        React Rendezvous
                      </Text>
                      <Text size="xs" skin="neutral">
                        Ethan Byte
                      </Text>
                    </div>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </>
      ) : (
        <>
          <Stack direction="column">
            <Text as="h4" space={{ y: "xs" }}>
              New Episodes
            </Text>
            <Text size="sm" skin="neutral">
              Your favorite podcasts. Updated daily.
            </Text>

            <Separator space={{ block: "lg" }} />

            <Card>
              <Box skin="neutral-faded" padding={{ block: "7xl", inline: "7xl" }}>
                <Stack direction="column" justify="center" items="center" gap="lg">
                  <Text size="6xl" skin="neutral">
                    <MdOutlinePodcasts />
                  </Text>
                  <Text size="xl" weight="medium">
                    No episodes added
                  </Text>
                  <Text skin="neutral" size="sm">
                    You have not added any podcasts. Add one below.
                  </Text>
                  <Button size="sm" skin="secondary" onClick={onHandlePodcastDialog}>
                    Add Podcast
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Stack>
        </>
      )}

      <Drawer size="sm" onClose={onHandleDrawer} onClickOutside={onHandleDrawer} open={drawerState}>
        <Drawer.Header>
          <Text size="lg" weight="semi-bold">
            Your Library
          </Text>
        </Drawer.Header>
        <Drawer.Body>
          <Box space={{ y: "2xl" }}>
            <Stack direction="column" gap="md">
              <Text weight="bold">Discover</Text>
              <ListBox>
                <ListBox.Item leftSlot={<MdOutlinePlayCircleOutline />}>Listen now</ListBox.Item>
                <ListBox.Item leftSlot={<RxGrid />}>Browse</ListBox.Item>
                <ListBox.Item leftSlot={<IoRadioOutline />}>Radio</ListBox.Item>
              </ListBox>
            </Stack>
          </Box>

          <Box space={{ y: "2xl" }}>
            <Stack direction="column" gap="md">
              <Text weight="bold">Library</Text>
              <ListBox>
                <ListBox.Item leftSlot={<RiPlayListFill />}>Playlist</ListBox.Item>
                <ListBox.Item leftSlot={<LuMusic2 />}>Songs</ListBox.Item>
                <ListBox.Item leftSlot={<IoPersonCircleOutline />}>Made for you</ListBox.Item>
                <ListBox.Item leftSlot={<TbMicrophone2 />}>Artists</ListBox.Item>
                <ListBox.Item leftSlot={<RiAlbumFill />}>Albums</ListBox.Item>
              </ListBox>
            </Stack>
          </Box>

          <Box space={{ y: "2xl" }}>
            <Stack direction="column" gap="md">
              <Text weight="bold">Playlists</Text>
              <ListBox>
                <ListBox.Item leftSlot={<LuListMusic />}>Recently Added</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Recently Played</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Songs</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Albums</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Artists</ListBox.Item>
              </ListBox>
            </Stack>
          </Box>
        </Drawer.Body>
      </Drawer>

      <Dialog
        onClose={onHandleMusicDialog}
        onClickOutside={onHandleMusicDialog}
        open={musicDialogState}>
        <Dialog.Header>
          <Text as="h5">Add music</Text>
          <Text size="sm" skin="neutral">
            Upload a music directly to a playlist
          </Text>
        </Dialog.Header>
        <Dialog.Body>
          <Stack direction="column" gap="xl">
            <FormField>
              <FormField.Label htmlFor="name">Name</FormField.Label>
              <FormField.Control>
                <TextField
                  id="name"
                  type="text"
                  placeholder="Enter music name"
                  size="lg"
                  fullWidth
                />
              </FormField.Control>
            </FormField>

            <FormField>
              <FormField.Label htmlFor="name">Playlists</FormField.Label>
              <FormField.Control>
                <Select size="lg">
                  <Select.Option>Daily Mix 1</Select.Option>
                  <Select.Option>Daily Mix 2</Select.Option>
                  <Select.Option>Daily Mix 3</Select.Option>
                  <Select.Option>Daily Mix 4</Select.Option>
                  <Select.Option>Daily Mix 5</Select.Option>
                  <Select.Option>Daily Mix 6</Select.Option>
                </Select>
              </FormField.Control>
            </FormField>
          </Stack>
        </Dialog.Body>
        <Dialog.Footer>
          <Stack justify="end">
            <Button size="lg">Add Music</Button>
          </Stack>
        </Dialog.Footer>
      </Dialog>

      <Dialog
        onClose={onHandlePodcastDialog}
        onClickOutside={onHandlePodcastDialog}
        open={podcastDialogState}>
        <Dialog.Header>
          <Text as="h5">Add Podcast</Text>
          <Text size="sm" skin="neutral">
            Copy and paste the podcast feed URL to import.
          </Text>
        </Dialog.Header>
        <Dialog.Body>
          <Stack direction="column" gap="xl">
            <FormField>
              <FormField.Label htmlFor="url">Podcast URL</FormField.Label>
              <FormField.Control>
                <TextField
                  id="url"
                  type="text"
                  placeholder="https://example.com/feed.xml"
                  size="lg"
                  fullWidth
                />
              </FormField.Control>
            </FormField>
          </Stack>
        </Dialog.Body>
        <Dialog.Footer>
          <Stack justify="end">
            <Button size="lg">Import podcast</Button>
          </Stack>
        </Dialog.Footer>
      </Dialog>
    </Container>
  );
}

export const Discover = {
  render: function Render() {
    return (
      <Snackbar screen="sm" placement="bottom" max={3}>
        <Music />
      </Snackbar>
    );
  },
};
