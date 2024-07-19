import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Table, Checkbox } from "../../index";

type Story = StoryObj<typeof Table>;

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

const data = [
  {
    id: "1",
    name: "Benjamin Martinez",
    email: "benjamin.martinez@example.com",
  },
  {
    id: "2",
    name: "Sophia Chang",
    email: "sophia.chang@example.com",
  },
  {
    id: "3",
    name: "Olivia Patel",
    email: "olivia.patel@example.com",
  },
];

export const Base: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell as="th">ID</Table.Cell>
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Email</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, email }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};

export const Border: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    appearance: ["border", "border-rows", "border-columns"],
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell as="th">ID</Table.Cell>
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Email</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, email }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Foot>
          <Table.Cell colSpan={4}>Foot</Table.Cell>
        </Table.Foot>
      </>
    ),
  },
};

export const Striped: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    appearance: ["striped"],
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell as="th">ID</Table.Cell>
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Email</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, email }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};

export const Error: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    appearance: ["border", "border-rows"],
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell as="th">
              <Checkbox indeterminate />
            </Table.Cell>
            <Table.Cell as="th">ID</Table.Cell>
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Email</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, email }, index) => (
            <Table.Row key={id} skin={index === 1 ? "critical" : "default"}>
              <Table.Cell>
                <Checkbox skin={index === 1 ? "critical" : "primary"} />
              </Table.Cell>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};
