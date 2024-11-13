import React, { useCallback, useState } from "react";
import type { Meta } from "@storybook/react";
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
  Popover,
  Segmented,
  Text,
  TextField,
  Theme,
  useSnackbar,
  Box,
  useTheme,
  TextArea,
  Gradient,
} from "@stewed/react";
// Hooks
import { useToggle, useFetch } from "@stewed/hooks";
// Icons
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { RiHistoryLine, RiAlbumFill, RiPlayListFill } from "react-icons/ri";
import { TbMenuDeep, TbMicrophone2 } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { RxGrid } from "react-icons/rx";
import { LuListMusic, LuMusic2 } from "react-icons/lu";
import {
  IoPersonCircleOutline,
  IoRadioOutline,
  IoAttach,
  IoImage,
  IoMailOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PiBrowsersFill } from "react-icons/pi";
import { GoArrowRight, GoTasklist } from "react-icons/go";
import { BsBodyText } from "react-icons/bs";
import {
  MdNotifications,
  MdOutlinePlayCircleOutline,
  MdOutlinePodcasts,
  MdLightMode,
  MdDarkMode,
  MdComputer,
  MdSettings,
  MdLogout,
  MdHelpCenter,
  MdAccountCircle,
  MdHome,
} from "react-icons/md";

const meta: Meta = {
  title: "Examples/Applications",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

function Discover(): React.ReactElement {
  // State to manage the value of the segmented control between "music" and "podcast"
  const [segmentedValue, setSegmentedValue] = useState<"music" | "podcast">("music");

  // State to manage the visibility of a drawer (a toggle state)
  const [drawerState, onHandleDrawer] = useToggle(false);

  // State to manage the visibility of the music dialog (a toggle state)
  const [musicDialogState, onHandleMusicDialog] = useToggle(false);

  // State to manage the visibility of the podcast dialog (a toggle state)
  const [podcastDialogState, onHandlePodcastDialog] = useToggle(false);

  // Snackbar hook to display notifications
  const { add } = useSnackbar();

  // Theme management hook to set and retrieve the current theme
  const { setTheme, theme } = useTheme();

  // Unique identifier generated using the current timestamp
  const idx = new Date().getTime().toString();

  // API key for accessing Unsplash API
  const accessKey = "5c037b46041a86b80e941bc0ff3eb418c572d7bcb5def98f309e77c1ef6d576b";

  // Fetching images from Unsplash API with a search query for "music", limited to 8 results
  const { data: images } = useFetch<{
    results: {
      alt_description: string;
      urls: {
        raw: string;
      };
    }[];
  }>(`https://api.unsplash.com/search/photos?query="music"&client_id=${accessKey}&per_page=8`);

  // Callback function triggered when an item is clicked, showing an error message in the Snackbar
  const onHandleClick = useCallback(
    (index: number) => {
      add({
        id: idx,
        title: "Unexpected error happened",
        content: (
          <>
            We have encountered an error when trying to reproduce{" "}
            <strong>Daily Mix {index + 1}</strong>. Please try again later.
          </>
        ),
        skin: "critical",
        dismissDuration: 5000,
      });
    },
    [add, idx],
  );

  return (
    <Box skin="default" fullScreen>
      <Container as="header" screen="full">
        <Box padding={{ inline: "xl", block: "sm" }}>
          <Grid cols={2} responsive={{ sm: { cols: 6 }, lg: { cols: 3 } }} items="center">
            <Grid.Item>
              <Button
                leftSlot={<TbMenuDeep />}
                skin="secondary"
                appearance="ghost"
                onClick={onHandleDrawer}
                iconOnly
              >
                Menu
              </Button>
            </Grid.Item>

            <Grid.Item
              hidden={true}
              responsive={{ sm: { hidden: false, colSpan: 4 }, lg: { colSpan: undefined } }}
            >
              <Stack items="center" gap="md">
                <Button appearance="ghost" skin="secondary" leftSlot={<MdHome />} iconOnly>
                  Home
                </Button>
                <Popover<HTMLDivElement>
                  renderAnchor={({ ref: inputSearchRef, open, close }) => (
                    <TextField
                      onFocus={() => open()}
                      onBlur={() => close()}
                      rootRef={inputSearchRef}
                      list="recent-search"
                      appearance="soft"
                      skin="neutral-faded"
                      leftSlot={<FiSearch />}
                      rightSlot={
                        <Stack gap="sm">
                          <Separator orientation="vertical" />
                          <Button
                            leftSlot={<PiBrowsersFill />}
                            size="sm"
                            skin="secondary"
                            appearance="ghost"
                            iconOnly
                          >
                            Browse
                          </Button>
                        </Stack>
                      }
                      size="xl"
                      placeholder="What do you want to play?"
                      fullWidth
                    />
                  )}
                >
                  {({ reference }) => {
                    return (
                      <Box padding={{ block: "md", inline: "sm" }}>
                        <ListBox style={{ width: `${reference?.width}px` }}>
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
                                          skin="secondary"
                                          appearance="ghost"
                                          leftSlot={<IoMdClose />}
                                          iconOnly
                                        >
                                          Remove
                                        </Button>
                                      ) : undefined
                                    }
                                  >
                                    Daily Mix 1
                                  </ListBox.Item>
                                )}
                              </Hoverable>
                            ))}
                          </ListBox.Group>
                        </ListBox>
                      </Box>
                    );
                  }}
                </Popover>
              </Stack>
            </Grid.Item>

            <Grid.Item>
              <Stack justify="end">
                <Button appearance="ghost" skin="secondary" leftSlot={<MdNotifications />} iconOnly>
                  Notifications
                </Button>
                <Separator orientation="vertical" space={{ inline: "xl" }} />
                <Dropdown<HTMLDivElement>
                  placement="bottom-end"
                  renderAnchor={({ ref, open, close, isOpen }) => (
                    <Avatar
                      ref={ref}
                      onClick={isOpen ? close : open}
                      name="Devon Lane"
                      image={{
                        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
                      }}
                    />
                  )}
                >
                  {({ close }) => (
                    <Box padding={{ block: "sm", inline: "sm" }}>
                      <Stack items="center" gap="md">
                        <Avatar
                          skin="primary"
                          size="md"
                          name="Devon Lane"
                          image={{
                            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
                          }}
                        />
                        <Stack direction="column" gap="xs">
                          <Text weight="medium">Devon Lane</Text>
                          <Text as="a" href="" size="xs" skin="secondary">
                            devon.lane@example.com
                          </Text>
                        </Stack>
                      </Stack>
                      <Separator space={{ block: "sm" }} />
                      <Segmented value={theme} fullWidth>
                        <Segmented.Item
                          value="default"
                          leftSlot={<MdLightMode />}
                          aria-label="Light"
                          onClick={() => {
                            close();
                            setTheme("default");
                          }}
                        />
                        <Segmented.Item
                          value="dark"
                          leftSlot={<MdDarkMode />}
                          aria-label="Dark"
                          onClick={() => {
                            close();
                            setTheme("dark");
                          }}
                        />
                        <Segmented.Item
                          value="system"
                          leftSlot={<MdComputer />}
                          aria-label="System"
                          disabled
                        />
                      </Segmented>
                      <Separator space={{ block: "sm" }} />
                      <ListBox>
                        <ListBox.Item leftSlot={<MdAccountCircle />}>Account</ListBox.Item>
                        <ListBox.Item leftSlot={<MdSettings />}>Settings</ListBox.Item>
                        <ListBox.Item leftSlot={<MdHelpCenter />}>Help Center</ListBox.Item>
                        <Separator space={{ block: "sm" }} />
                        <ListBox.Item leftSlot={<MdLogout />}>Log Out</ListBox.Item>
                      </ListBox>
                    </Box>
                  )}
                </Dropdown>
              </Stack>
            </Grid.Item>
          </Grid>
        </Box>
      </Container>

      <Separator />

      <Container as="main" screen="2xl" alignment="center">
        <Box padding={{ inline: "2xl", block: "lg" }}>
          <Box space={{ y: "4xl" }}>
            <Stack items="baseline" justify="between">
              <Segmented<"music" | "podcast">
                value={segmentedValue}
                onValueChange={setSegmentedValue}
              >
                <Segmented.Item value="music">Music</Segmented.Item>
                <Segmented.Item value="podcast">Podcast</Segmented.Item>
                <Segmented.Item value="live" disabled>
                  Live
                </Segmented.Item>
              </Segmented>

              <Button
                skin="secondary"
                onClick={onHandleMusicDialog}
                size="lg"
                leftSlot={<IoMdAdd />}
                iconOnly
              >
                Add Music
              </Button>
            </Stack>
          </Box>

          {segmentedValue === "music" ? (
            <>
              <Grid cols={1} responsive={{ sm: { cols: 2 }, md: { cols: 4 } }} gap="md">
                {images?.results?.map((image, index) => (
                  <Grid.Item key={index}>
                    <Hoverable>
                      {({ isHovering, isTouch }) => (
                        <Card skin="neutral-faded" shadow="none">
                          <Box>
                            <Stack direction="row" items="center" justify="between" grow>
                              <Stack items="center" gap="md">
                                <img
                                  src={`${image.urls.raw}&w=80&h=80&fit=crop`}
                                  alt={image.alt_description}
                                  style={{ height: "100%" }}
                                />
                                <Text weight="medium">Daily Mix {index + 1}</Text>
                              </Stack>
                              {(isHovering || isTouch) && (
                                <Box padding={{ inline: "md" }}>
                                  <Stack items="center">
                                    <Button
                                      leftSlot={<FaPlay />}
                                      onClick={() => onHandleClick(index)}
                                      iconOnly
                                    >
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
                    md: { perView: 4 },
                  }}
                  navigation={{
                    renderPrev: (props) => (
                      <Button skin="secondary" leftSlot={<FiChevronLeft />} {...props} iconOnly>
                        Prev
                      </Button>
                    ),
                    renderNext: (props) => (
                      <Button skin="secondary" leftSlot={<FiChevronRight />} {...props} iconOnly>
                        Next
                      </Button>
                    ),
                  }}
                  loop={false}
                >
                  {images?.results?.map((image, index) => (
                    <Card key={index} shadow="none" padding={{ block: "lg", inline: "md" }}>
                      <Card.Media
                        src={`${image.urls.raw}&w=300&h=500&fit=crop`}
                        alt={image.alt_description}
                        style={{ width: "100%", height: "100%" }}
                      />
                      <Card.Body>
                        <Text size="sm" weight="medium">
                          React Rendezvous
                        </Text>
                        <Text size="sm" skin="neutral">
                          Ethan Byte
                        </Text>
                      </Card.Body>
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
                  {images?.results?.map((image, index) => (
                    <Card skin="neutral-faded" key={index} padding={{ block: "lg", inline: "md" }}>
                      <Card.Media
                        src={`${image.urls.raw}&w=200&h=200&fit=crop`}
                        alt={image.alt_description}
                        style={{ width: "100%", height: "100%" }}
                      />

                      <Card.Body>
                        <Text size="sm" weight="medium">
                          React Rendezvous
                        </Text>
                        <Text size="xs" skin="neutral">
                          Ethan Byte
                        </Text>
                      </Card.Body>
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

                <Box
                  padding={{ block: "9xl", inline: "9xl" }}
                  radius="md"
                  borderWidth={1}
                  borderStyle="dashed"
                  borderColor="neutral-faded"
                >
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
                    <Button size="md" skin="secondary" onClick={onHandlePodcastDialog}>
                      Add Podcast
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </>
          )}
        </Box>

        <Drawer
          size="sm"
          onClose={onHandleDrawer}
          onClickOutside={onHandleDrawer}
          onEscape={onHandleDrawer}
          open={drawerState}
        >
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
          size="md"
          onClose={onHandleMusicDialog}
          onClickOutside={onHandleMusicDialog}
          open={musicDialogState}
        >
          <Dialog.Header>
            <Text as="h5">Add music</Text>
            <Text size="sm" skin="secondary">
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
                <FormField.Label htmlFor="description">Description</FormField.Label>
                <FormField.Control>
                  <TextArea
                    id="description"
                    placeholder="An options description"
                    rows={4}
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
          size="md"
          onClose={onHandlePodcastDialog}
          onClickOutside={onHandlePodcastDialog}
          open={podcastDialogState}
        >
          <Dialog.Header>
            <Text as="h5">Add Podcast</Text>
            <Text size="sm" skin="secondary">
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
                    size="lg"
                    placeholder="https://example.com/feed.xml"
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
    </Box>
  );
}

export const Music = {
  decorators: [
    (Story) => (
      <Theme<"default" | "dark">
        theme="default"
        tokens={{
          default: {
            color: {
              "primary-background": "#1db954",
              "primary-background-hovered": "#1aa64b",
              "primary-background-pressed": "#179443",
              "primary-border": "#1db954",
              "primary-border-faded": "teal-200",
              "primary-foreground": "#1db954",
              "secondary-background": "#121212",
              "secondary-background-hovered": "#101010",
              "secondary-background-pressed": "#101010",
              "secondary-foreground": "#121212",
            },
            components: {
              button: {
                radius: "full",
              },
            },
          },
          dark: {
            color: {
              "background-backdrop": "#aaaaaaa8",
              "background-default": "#0f162a",
              "background-elevated": "#0f162a",
              "background-surface": "#0f162a",
              "foreground-default": "#fff",
              "neutral-background": "gray-500",
              "neutral-background-faded": "gray-800",
              "neutral-border-faded": "gray-700",
              "neutral-foreground": "gray-100",
              "secondary-background": "#fff",
              "secondary-background-hovered": "#FCFCFC",
              "secondary-foreground": "#fff",
              "secondary-foreground-on-background": "#121212",
            },
          },
        }}
      >
        <Story />
      </Theme>
    ),
  ],
  render: function Render() {
    return (
      <Snackbar screen="sm" placement="bottom" max={3}>
        <Discover />
      </Snackbar>
    );
  },
};

export const ChatAI = {
  render: function Render() {
    return (
      <Theme>
        <Box skin="neutral-faded" padding={{ block: "9xl", inline: "9xl" }} fullScreen fullWidth>
          <Container screen="lg" alignment="center">
            <Box space={{ y: "4xl" }}>
              <Text weight="medium" size="7xl">
                Hi there,{" "}
                <Gradient from="indigo-500" to="pink-800" clipText>
                  <Text skin="transparent" as="span" weight="extra-bold" inherit>
                    Devon Lane
                  </Text>
                </Gradient>
              </Text>

              <Text weight="semi-bold" size="5xl" space={{ y: "lg" }}>
                What would like to know?
              </Text>

              <Text size="xl" skin="neutral">
                Use one of the most common prompts below or use your own to begin
              </Text>
            </Box>

            <Box space={{ y: "9xl" }}>
              <Stack items="start" direction="column" gap="lg">
                <Grid
                  cols={2}
                  responsive={{
                    sm: {
                      cols: 4,
                    },
                  }}
                  gap="lg"
                >
                  <Card skin="neutral-faded">
                    <Card.Body>
                      <Text size="sm" skin="neutral">
                        Write a to-do list for a personal project or task
                      </Text>
                    </Card.Body>
                    <Card.Footer>
                      <Text skin="neutral">
                        <GoTasklist size={18} />
                      </Text>
                    </Card.Footer>
                  </Card>
                  <Card skin="neutral-faded">
                    <Card.Body>
                      <Text size="sm" skin="neutral">
                        Generate an email ro reply to a job offer
                      </Text>
                    </Card.Body>
                    <Card.Footer>
                      <Text skin="neutral">
                        <IoMailOutline size={18} />
                      </Text>
                    </Card.Footer>
                  </Card>
                  <Card skin="neutral-faded">
                    <Card.Body>
                      <Text size="sm" skin="neutral">
                        Summarize this article or text for me in one paragraph
                      </Text>
                    </Card.Body>
                    <Card.Footer>
                      <Text skin="neutral">
                        <BsBodyText size={18} />
                      </Text>
                    </Card.Footer>
                  </Card>
                  <Card skin="neutral-faded">
                    <Card.Body>
                      <Text size="sm" skin="neutral">
                        How does Al work in a technical capacity
                      </Text>
                    </Card.Body>
                    <Card.Footer>
                      <Text skin="neutral">
                        <IoSettingsOutline size={18} />
                      </Text>
                    </Card.Footer>
                  </Card>
                </Grid>
              </Stack>
            </Box>

            <Card skin="default" padding={{ block: "md", inline: "md" }} shadow="md">
              <Card.Body>
                <Stack direction="column" gap="md">
                  <TextArea
                    rows={5}
                    autoHeight
                    appearance="ghost"
                    placeholder="Ask whatever you want..."
                    resize="none"
                  />

                  <Stack gap="md" justify="between">
                    <Stack gap="sm">
                      <Button
                        skin="neutral"
                        appearance="ghost"
                        size="sm"
                        leftSlot={<IoAttach size={16} />}
                      >
                        Add Attachment
                      </Button>
                      <Button
                        skin="neutral"
                        appearance="ghost"
                        size="sm"
                        leftSlot={<IoImage size={16} />}
                      >
                        Use Image
                      </Button>
                    </Stack>
                    <Stack items="center" gap="sm">
                      <Text size="xs" skin="neutral">
                        0/1000
                      </Text>
                      <Button
                        skin="primary"
                        size="sm"
                        leftSlot={<GoArrowRight size={16} />}
                        iconOnly
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Card.Body>
            </Card>
          </Container>
        </Box>
      </Theme>
    );
  },
};